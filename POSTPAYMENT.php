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

require_once "../../config/database.php";
require_once "../../models/Payment.php";


$body = json_decode(file_get_contents("php://input"), true);

if (!$body) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid JSON body."]);
    exit();
}


$required = ["reservation_id", "amount", "method"];
$missing  = [];
foreach ($required as $field) {
    if (empty($body[$field])) {
        $missing[] = $field;
    }
}
if (!empty($missing)) {
    http_response_code(422);
    echo json_encode([
        "success" => false,
        "message" => "Missing required fields: " . implode(", ", $missing)
    ]);
    exit();
}


if ((float)$body["amount"] <= 0) {
    http_response_code(422);
    echo json_encode(["success" => false, "message" => "Amount must be greater than zero."]);
    exit();
}


$db      = (new Database())->getConnection();
$payment = new Payment($db);

$payment->reservation_id = (int)$body["reservation_id"];
$payment->amount         = (float)$body["amount"];
$payment->method         = trim($body["method"]);

$result = $payment->processPayment();

http_response_code($result["success"] ? 201 : 400);
echo json_encode($result);
?>
