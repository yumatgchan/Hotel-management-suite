<?php
require_once __DIR__ . '/config.php';

$pdo = getDB();
$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'GET') {
    $checkIn  = $_GET['check_in']  ?? '';
    $checkOut = $_GET['check_out'] ?? '';

    if ($checkIn && $checkOut) {
        $sql = "
            SELECT r.*
            FROM room r
            WHERE r.status = 'available'
              AND r.room_id NOT IN (
                  SELECT res.room_id
                  FROM reservation res
                  WHERE res.status NOT IN ('cancelled', 'checked_out')
                    AND res.check_in_date  < :check_out
                    AND res.check_out_date > :check_in
              )
            ORDER BY r.room_number
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':check_in' => $checkIn, ':check_out' => $checkOut]);
    } else {
        $stmt = $pdo->query('SELECT * FROM room ORDER BY room_number');
    }

    $rooms = $stmt->fetchAll();
    echo json_encode(['success' => true, 'rooms' => $rooms]);
    exit;
}

if ($method === 'POST') {
    $input  = getInput();
    $action = $input['action'] ?? '';

    switch ($action) {
        case 'create': {
            $roomNumber = (int)   ($input['room_number'] ?? 0);
            $type       = trim(   $input['type']         ?? '');
            $price      = (float) ($input['price']       ?? 0);
            $status     = trim(   $input['status']       ?? 'available');

            if (!$roomNumber || !$type || $price <= 0) {
                jsonResponse(false, 'room_number, type, and price are required.');
            }

            $allowed = ['single','double','suite','family'];
            if (!in_array($type, $allowed, true)) {
                jsonResponse(false, 'Invalid room type. Allowed: ' . implode(', ', $allowed));
            }

            $allowedStatus = ['available','occupied','maintenance','out_of_order'];
            if (!in_array($status, $allowedStatus, true)) {
                $status = 'available';
            }

            $dup = $pdo->prepare('SELECT room_id FROM room WHERE room_number = ? LIMIT 1');
            $dup->execute([$roomNumber]);
            if ($dup->fetch()) {
                jsonResponse(false, "Room number {$roomNumber} already exists.");
            }
            $stmt = $pdo->prepare(
                'INSERT INTO room (room_number, type, price, status) VALUES (?, ?, ?, ?)'
            );
            $stmt->execute([$roomNumber, $type, $price, $status]);
            $newId = (int) $pdo->lastInsertId();
            jsonResponse(true, 'Room created.', ['room_id' => $newId]);
        }

        case 'update': {
            $roomId = (int) ($input['room_id'] ?? 0);
            if (!$roomId) jsonResponse(false, 'room_id is required.');
            $fields = [];
            $params = [];
            if (isset($input['room_number'])) {
                $fields[] = 'room_number = ?';
                $params[] = (int) $input['room_number'];
            }
            if (isset($input['type'])) {
                $fields[] = 'type = ?';
                $params[] = trim($input['type']);
            }
            if (isset($input['price'])) {
                $fields[] = 'price = ?';
                $params[] = (float) $input['price'];
            }
            if (isset($input['status'])) {
                $fields[] = 'status = ?';
                $params[] = trim($input['status']);
            }
            if (empty($fields)) {
                jsonResponse(false, 'Nothing to update.');
            }

            $params[] = $roomId;
            $sql = 'UPDATE room SET ' . implode(', ', $fields) . ' WHERE room_id = ?';
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            jsonResponse(true, 'Room updated.', ['rows' => $stmt->rowCount()]);
        }

        case 'delete': {
            $roomId = (int) ($input['room_id'] ?? 0);
            if (!$roomId) jsonResponse(false, 'room_id is required.');
            $check = $pdo->prepare(
                "SELECT reservation_id FROM reservation
                 WHERE room_id = ? AND status NOT IN ('cancelled','checked_out')
                 LIMIT 1"
            );
            $check->execute([$roomId]);
            if ($check->fetch()) {
                jsonResponse(false, 'Cannot delete a room with active reservations.');
            }
            $stmt = $pdo->prepare('DELETE FROM room WHERE room_id = ?');
            $stmt->execute([$roomId]);

            if ($stmt->rowCount() === 0) {
                jsonResponse(false, 'Room not found.');
            }
            jsonResponse(true, 'Room deleted.');
        }
        default:
            jsonResponse(false, 'Unknown action.');
    }
}
jsonResponse(false, 'Method not allowed.');
