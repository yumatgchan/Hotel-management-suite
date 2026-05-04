<?php
ob_start();
 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");
 
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
 
require_once __DIR__ . "/../config/database.php";
require_once __DIR__ . "/../models/Service.php";
 
$db = (new Database())->connect();
$service = new Service($db);
 
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $result = $service->getServices();
    ob_clean();
    echo json_encode($result->fetchAll(PDO::FETCH_ASSOC));
    exit();
}
 
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"));
 
    if (!$data || !isset($data->name) || !isset($data->price)) {
        ob_clean();
        echo json_encode(["error" => "Missing fields"]);
        exit();
    }
 
    $service->name = $data->name;
    $service->price = $data->price;
 
    if ($service->createService()) {
        ob_clean();
        echo json_encode(["message" => "Service created", "success" => true]);
    } else {
        ob_clean();
        echo json_encode(["error" => "Failed to create service"]);
    }
    exit();
}