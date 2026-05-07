<?php

require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, 'Method not allowed.');
}
$input    = getInput();
$email    = trim($input['email']    ?? '');
$password = trim($input['password'] ?? '');
$role     = trim($input['role']     ?? 'guest');
if (!$email || !$password) {
    jsonResponse(false, 'Email and password are required.');
}
$pdo = getDB();
if ($role === 'guest') {
    $stmt = $pdo->prepare('SELECT guest_id, name, email, password FROM guest WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password'])) {
        jsonResponse(false, 'Invalid email or password.');
    }

    jsonResponse(true, 'Login successful.', [
        'user' => [
            'id'    => $user['guest_id'],
            'name'  => $user['name'],
            'email' => $user['email'],
            'role'  => 'guest',
        ],
    ]);
}

$roleMap = [
    'manager'     => 'manager',
    'frontDesk'   => 'reception',
    'housekeeper' => 'cleaning',
    'accountant'  => 'accountant',
    'cafeStaff'   => 'cafeStaff',
    'itAdmin'     => 'maintenance',
];
$dbRole = $roleMap[$role] ?? null;
if (!$dbRole) {
    jsonResponse(false, 'Unknown role.');
}
$stmt = $pdo->prepare('SELECT staff_id, name, email, role, password FROM staff WHERE email = ? AND role = ? LIMIT 1');
$stmt->execute([$email, $dbRole]);
$staff = $stmt->fetch();

if (!$staff) {
    jsonResponse(false, 'Invalid credentials or role mismatch.');
}
$passwordOk = false;
if (password_verify($password, (string) $staff['password'])) {
    $passwordOk = true;
} elseif ((string)$password === (string)$staff['password']) {
    $passwordOk = true;
}

if (!$passwordOk) {
    jsonResponse(false, 'Invalid email or password.');
}
$uiRole = array_search($staff['role'], $roleMap) ?: $staff['role'];
jsonResponse(true, 'Login successful.', [
    'user' => [
        'id'    => $staff['staff_id'],
        'name'  => $staff['name'],
        'email' => $staff['email'],
        'role'  => $uiRole,
    ],
]);
