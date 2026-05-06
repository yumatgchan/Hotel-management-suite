<?php
require_once __DIR__ . '/config.php';
$pdo    = getDB();
$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'GET') {
    $guestId  = (int) ($_GET['guest_id']  ?? 0);
    $staffId  = (int) ($_GET['staff_id']  ?? 0);
    $allFlag  = isset($_GET['all']);

    if ($guestId) {
        $stmt = $pdo->prepare("
            SELECT r.*, rm.room_number, rm.type, rm.price, rm.status AS room_status
            FROM reservation r
            JOIN room rm ON rm.room_id = r.room_id
            WHERE r.guest_id = ?
            ORDER BY r.check_in_date DESC
        ");
        $stmt->execute([$guestId]);
    } elseif ($allFlag || $staffId) {
        // Front desk: all reservations
        $stmt = $pdo->query("
            SELECT r.*, g.name AS guest_name, g.email AS guest_email,
                   rm.room_number, rm.type, rm.price, rm.status AS room_status
            FROM reservation r
            JOIN guest g  ON g.guest_id  = r.guest_id
            JOIN room  rm ON rm.room_id  = r.room_id
            ORDER BY r.check_in_date DESC
        ");
    } else {
        jsonResponse(false, 'guest_id or all parameter is required.');
    }

    $rows = $stmt->fetchAll();
    echo json_encode(['success' => true, 'reservations' => $rows]);
    exit;
}

if ($method === 'POST') {
    $input  = getInput();
    $action = $input['action'] ?? '';
    switch ($action) {
        case 'create': {
            $guestId  = (int)   ($input['guest_id']      ?? 0);
            $roomId   = (int)   ($input['room_id']        ?? 0);
            $checkIn  = trim(   $input['check_in_date']  ?? '');
            $checkOut = trim(   $input['check_out_date'] ?? '');

            if (!$guestId || !$roomId || !$checkIn || !$checkOut) {
                jsonResponse(false, 'guest_id, room_id, check_in_date, check_out_date are required.');
            }

            if (strtotime($checkIn) >= strtotime($checkOut)) {
                jsonResponse(false, 'Check-out must be after check-in.');
            }

            if (strtotime($checkIn) < strtotime('today')) {
                jsonResponse(false, 'Check-in date cannot be in the past.');
            }
            $roomStmt = $pdo->prepare('SELECT * FROM room WHERE room_id = ? LIMIT 1');
            $roomStmt->execute([$roomId]);
            $room = $roomStmt->fetch();
            if (!$room) {
                jsonResponse(false, 'Room not found.');
            }
            if ($room['status'] !== 'available') {
                jsonResponse(false, 'Room is not available (status: ' . $room['status'] . ').');
            }
            $conflict = $pdo->prepare("
                SELECT reservation_id FROM reservation
                WHERE room_id = ?
                  AND status NOT IN ('cancelled','checked_out')
                  AND check_in_date  < ?
                  AND check_out_date > ?
                LIMIT 1
            ");
            $conflict->execute([$roomId, $checkOut, $checkIn]);
            if ($conflict->fetch()) {
                jsonResponse(false, 'Room is already reserved for the selected dates.');
            }

            $nights = (int) ceil(
                (strtotime($checkOut) - strtotime($checkIn)) / 86400
            );
            $totalPrice = $nights * (float) $room['price'];
            $stmt = $pdo->prepare("
                INSERT INTO reservation
                    (guest_id, room_id, check_in_date, check_out_date, total_price, status)
                VALUES (?, ?, ?, ?, ?, 'confirmed')
            ");
            $stmt->execute([$guestId, $roomId, $checkIn, $checkOut, $totalPrice]);
            $newId = (int) $pdo->lastInsertId();
            $pdo->prepare("UPDATE room SET status = 'occupied' WHERE room_id = ?")
                ->execute([$roomId]);
            jsonResponse(true, 'Reservation created.', [
                'reservation_id' => $newId,
                'total_price'    => $totalPrice,
                'nights'         => $nights,
            ]);
        }
        case 'cancel': {
            $reservationId = (int) ($input['reservation_id'] ?? 0);
            $guestId       = (int) ($input['guest_id']       ?? 0);
            if (!$reservationId) {
                jsonResponse(false, 'reservation_id is required.');
            }
            $cond = $guestId ? 'AND guest_id = ?' : '';
            $params = $guestId ? ['cancelled', $reservationId, $guestId] : ['cancelled', $reservationId];
            $stmt = $pdo->prepare(
                "UPDATE reservation SET status = ? WHERE reservation_id = ? {$cond}"
            );
            $stmt->execute($params);
            if ($stmt->rowCount() === 0) {
                jsonResponse(false, 'Reservation not found or access denied.');
            }
            $res = $pdo->prepare('SELECT room_id FROM reservation WHERE reservation_id = ?');
            $res->execute([$reservationId]);
            $r = $res->fetch();
            if ($r) {
                $pdo->prepare("UPDATE room SET status = 'available' WHERE room_id = ?")
                    ->execute([$r['room_id']]);
            }
            jsonResponse(true, 'Reservation cancelled.');
        }
        case 'update_status': {
            $reservationId = (int)  ($input['reservation_id'] ?? 0);
            $status        = trim(  $input['status']           ?? '');

            $allowed = ['confirmed','checked_in','checked_out','cancelled','no_show'];
            if (!$reservationId || !in_array($status, $allowed, true)) {
                jsonResponse(false, 'reservation_id and a valid status are required.');
            }
            $stmt = $pdo->prepare('UPDATE reservation SET status = ? WHERE reservation_id = ?');
            $stmt->execute([$status, $reservationId]);
            if (in_array($status, ['checked_out','cancelled','no_show'], true)) {
                $res = $pdo->prepare('SELECT room_id FROM reservation WHERE reservation_id = ?');
                $res->execute([$reservationId]);
                $r = $res->fetch();
                if ($r) {
                    $pdo->prepare("UPDATE room SET status = 'available' WHERE room_id = ?")
                        ->execute([$r['room_id']]);
                }
            }
            jsonResponse(true, 'Status updated to ' . $status . '.');
        }

        default:
            jsonResponse(false, 'Unknown action.');
    }
}
jsonResponse(false, 'Method not allowed.');
