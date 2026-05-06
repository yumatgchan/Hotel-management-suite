<?php
require_once __DIR__ . '/config.php';
$pdo    = getDB();
$method = $_SERVER['REQUEST_METHOD'];
$pdo->exec("
    CREATE TABLE IF NOT EXISTS `room_notifications` (
        `notification_id` INT(11) NOT NULL AUTO_INCREMENT,
        `staff_id`        INT(11) NOT NULL,
        `room_id`         INT(11) NOT NULL,
        `new_status`      VARCHAR(50) NOT NULL,
        `message`         TEXT DEFAULT NULL,
        `sent_at`         DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `is_dismissed`    TINYINT(1) NOT NULL DEFAULT 0,
        `is_applied`      TINYINT(1) NOT NULL DEFAULT 0,
        PRIMARY KEY (`notification_id`),
        KEY `room_id`  (`room_id`),
        KEY `staff_id` (`staff_id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
");

if ($method === 'GET') {
    $staffId    = (int) ($_GET['staff_id'] ?? 0);
    $dismissed  = isset($_GET['dismissed']) ? 1 : 0;
    if ($staffId) {
        $stmt = $pdo->prepare("
            SELECT n.*, s.name AS staff_name, s.role AS staff_role,
                   r.room_number, r.type AS room_type, r.status AS current_status
            FROM room_notifications n
            JOIN staff s ON s.staff_id = n.staff_id
            JOIN room  r ON r.room_id  = n.room_id
            WHERE n.staff_id = ?
            ORDER BY n.sent_at DESC
        ");
        $stmt->execute([$staffId]);
    } else {
        $stmt = $pdo->prepare("
            SELECT n.*, s.name AS staff_name, s.role AS staff_role,
                   r.room_number, r.type AS room_type, r.status AS current_status
            FROM room_notifications n
            JOIN staff s ON s.staff_id = n.staff_id
            JOIN room  r ON r.room_id  = n.room_id
            WHERE n.is_dismissed = ?
            ORDER BY n.sent_at DESC
        ");
        $stmt->execute([$dismissed]);
    }
    $rows = $stmt->fetchAll();
    echo json_encode(['success' => true, 'notifications' => $rows]);
    exit;
}
if ($method === 'POST') {
    $input  = getInput();
    $action = $input['action'] ?? '';

    switch ($action) {
        case 'send': {
            $staffId   = (int)  ($input['staff_id']  ?? 0);
            $roomId    = (int)  ($input['room_id']   ?? 0);
            $newStatus = trim(  $input['new_status'] ?? '');
            $message   = trim(  $input['message']    ?? '');

            if (!$staffId || !$roomId || !$newStatus) {
                jsonResponse(false, 'staff_id, room_id, and new_status are required.');
            }

            $allowed = ['cleaned','inspected','guest_ready','maintenance_required','out_of_order'];
            if (!in_array($newStatus, $allowed, true)) {
                jsonResponse(false, 'Invalid status. Allowed: ' . implode(', ', $allowed));
            }
            $staffStmt = $pdo->prepare("SELECT role FROM staff WHERE staff_id = ? LIMIT 1");
            $staffStmt->execute([$staffId]);
            $staffRow = $staffStmt->fetch();
            if (!$staffRow || $staffRow['role'] !== 'cleaning') {
                jsonResponse(false, 'Only housekeeping staff can send room-status notifications.');
            }

            $stmt = $pdo->prepare("
                INSERT INTO room_notifications (staff_id, room_id, new_status, message)
                VALUES (?, ?, ?, ?)
            ");
            $stmt->execute([$staffId, $roomId, $newStatus, $message]);
            $newId = (int) $pdo->lastInsertId();

            jsonResponse(true, 'Notification sent to front desk.', [
                'notification_id' => $newId,
            ]);
        }
        case 'apply': {
            $notifId = (int) ($input['notification_id'] ?? 0);
            if (!$notifId) jsonResponse(false, 'notification_id is required.');
            $notifStmt = $pdo->prepare('SELECT * FROM room_notifications WHERE notification_id = ? LIMIT 1');
            $notifStmt->execute([$notifId]);
            $notif = $notifStmt->fetch();
            if (!$notif) jsonResponse(false, 'Notification not found.');
            $statusMap = [
                'cleaned'              => 'available',
                'inspected'            => 'available',
                'guest_ready'          => 'available',
                'maintenance_required' => 'maintenance',
                'out_of_order'         => 'out_of_order',
            ];
            $roomStatus = $statusMap[$notif['new_status']] ?? 'available';
            $pdo->prepare('UPDATE room SET status = ? WHERE room_id = ?')
                ->execute([$roomStatus, $notif['room_id']]);
            $pdo->prepare('UPDATE room_notifications SET is_applied = 1, is_dismissed = 1 WHERE notification_id = ?')
                ->execute([$notifId]);

            jsonResponse(true, 'Room status updated to ' . $roomStatus . '.');
        }
        case 'dismiss': {
            $notifId = (int) ($input['notification_id'] ?? 0);
            if (!$notifId) jsonResponse(false, 'notification_id is required.');

            $pdo->prepare('UPDATE room_notifications SET is_dismissed = 1 WHERE notification_id = ?')
                ->execute([$notifId]);

            jsonResponse(true, 'Notification dismissed.');
        }

        default:
            jsonResponse(false, 'Unknown action.');
    }
}
jsonResponse(false, 'Method not allowed.');
