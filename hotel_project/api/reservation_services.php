<?php
ob_start();

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, GET, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . "/../config/database.php";
require_once __DIR__ . "/../models/ReservationService.php";

$db = (new Database())->connect();

// =====================
// GET - جيب الـ services
// =====================
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $reservation_id = $_GET['reservation_id'] ?? 1;
    $query = "SELECT rs.id, s.name, s.price, rs.service_date 
              FROM reservation_services rs
              JOIN service s ON rs.service_id = s.service_id
              WHERE rs.reservation_id = :rid";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":rid", $reservation_id);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    ob_clean();
    echo json_encode($result);
    exit();
}

// =====================
// POST - احجز service
// =====================
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if (!$data || !isset($data->reservation_id) || !isset($data->service_id)) {
        ob_clean();
        echo json_encode(["error" => "Missing required fields"]);
        exit();
    }

    $rs = new ReservationService($db);
    $rs->reservation_id = $data->reservation_id;
    $rs->service_id = $data->service_id;

    if ($rs->addService()) {
        ob_clean();
        echo json_encode(["message" => "Service added", "success" => true]);
    } else {
        ob_clean();
        echo json_encode(["error" => "Failed to add service"]);
    }
    exit();
}

// =====================
// DELETE - امسح service
// =====================
if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $data = json_decode(file_get_contents("php://input"));

    if (!$data || !isset($data->id)) {
        ob_clean();
        echo json_encode(["error" => "Missing id"]);
        exit();
    }

    $query = "DELETE FROM reservation_services WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":id", $data->id);
    $stmt->execute();
    ob_clean();
    echo json_encode(["message" => "Service removed", "success" => true]);
    exit();
}
