<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed. Use POST."]);
    exit();
}

require_once "../../../config/database.php";
require_once "../../../models/Invoice.php";


$body = json_decode(file_get_contents("php://input"), true);

if (!$body || empty($body["reservation_id"])) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Missing required field: reservation_id"
    ]);
    exit();
}

$reservationId = (int)$body["reservation_id"];

if ($reservationId <= 0) {
    http_response_code(422);
    echo json_encode(["success" => false, "message" => "reservation_id must be a positive integer."]);
    exit();
}


$db      = (new Database())->getConnection();
$invoice = new Invoice($db);
$result  = $invoice->generateInvoice($reservationId);

http_response_code($result["success"] ? 201 : 400);
echo json_encode($result);
?>
