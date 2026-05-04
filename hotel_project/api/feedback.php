<?php
ob_start();
 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");
 
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
 
require_once __DIR__ . "/../config/database.php";
require_once __DIR__ . "/../models/Feedback.php";
 
$db = (new Database())->connect();
$feedback = new Feedback($db);
 
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $result = $feedback->getFeedback();
    ob_clean();
    echo json_encode($result->fetchAll(PDO::FETCH_ASSOC));
    exit();
}
 
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    if (!$data || !isset($data->rating)) {
        ob_clean();
        echo json_encode(["error" => "Missing fields"]);
        exit();
    }
 
    $feedback->guest_id = $data->guest_id;
    $feedback->message = $data->message;
    $feedback->rating = $data->rating;
 
    if ($feedback->createFeedback()) {
        ob_clean();
        echo json_encode(["message" => "Feedback added", "success" => true]);
    } else {
        ob_clean();
        echo json_encode(["error" => "Failed to save feedback"]);
    }
    exit();
}