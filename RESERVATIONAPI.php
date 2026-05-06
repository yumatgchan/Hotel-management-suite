<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed. Use GET."]);
    exit();
}

require_once "../../../config/database.php";
require_once "../../../models/Invoice.php";


$reservationId = null;

if (!empty($_GET["id"])) {
    $reservationId = (int)$_GET["id"];
} else {
    $uri   = $_SERVER["REQUEST_URI"];
    $parts = explode("/", parse_url($uri, PHP_URL_PATH));
    
    $idx = array_search("reservations", $parts);
    if ($idx !== false && isset($parts[$idx + 1]) && is_numeric($parts[$idx + 1])) {
        $reservationId = (int)$parts[$idx + 1];
    }
}

if (!$reservationId || $reservationId <= 0) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "A valid reservation ID is required."]);
    exit();
}


$db      = (new Database())->getConnection();
$invoice = new Invoice($db);
$result  = $invoice->getBillByReservation($reservationId);

http_response_code($result["success"] ? 200 : 404);
echo json_encode($result);
?>
