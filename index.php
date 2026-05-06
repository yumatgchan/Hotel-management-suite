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
require_once "../../../models/Payment.php";


$id = null;

if (!empty($_GET["id"])) {
    $id = (int)$_GET["id"];
} else {
    // Try to parse last path segment: /api/payments/5
    $uri     = $_SERVER["REQUEST_URI"];
    $parts   = explode("/", rtrim(parse_url($uri, PHP_URL_PATH), "/"));
    $lastSeg = end($parts);
    if (is_numeric($lastSeg)) {
        $id = (int)$lastSeg;
    }
}

if (!$id || $id <= 0) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "A valid payment ID is required."]);
    exit();
}


$db      = (new Database())->getConnection();
$payment = new Payment($db);
$result  = $payment->getPaymentById($id);

http_response_code($result["success"] ? 200 : 404);
echo json_encode($result);
?>
