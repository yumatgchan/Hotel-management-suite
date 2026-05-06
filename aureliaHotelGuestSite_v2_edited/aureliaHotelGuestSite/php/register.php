<?php
require_once __DIR__ . '/config.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, 'Method not allowed.');
}

$input    = getInput();
$name     = trim($input['name']     ?? '');
$email    = trim($input['email']    ?? '');
$phone    = trim($input['phone']    ?? '');
$password = trim($input['password'] ?? '');

if (!$name || !$email || !$password) {
    jsonResponse(false, 'Name, email, and password are required.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    jsonResponse(false, 'Invalid email address.');
}

if (strlen($password) < 6) {
    jsonResponse(false, 'Password must be at least 6 characters.');
}

$pdo = getDB();
$check = $pdo->prepare('SELECT guest_id FROM guest WHERE email = ? LIMIT 1');
$check->execute([$email]);
if ($check->fetch()) {
    jsonResponse(false, 'An account with this email already exists.');
}
$hashed = password_hash($password, PASSWORD_BCRYPT);
$stmt   = $pdo->prepare('INSERT INTO guest (name, email, phone, password) VALUES (?, ?, ?, ?)');
$stmt->execute([$name, $email, $phone, $hashed]);
$newId = (int) $pdo->lastInsertId();
jsonResponse(true, 'Account created successfully.', [
    'user' => [
        'id'    => $newId,
        'name'  => $name,
        'email' => $email,
        'role'  => 'guest',
    ],
]);
