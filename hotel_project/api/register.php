$language    = $data->language ?? 'English';
$currency    = $data->currency ?? 'USD';
$preferences = $data->preferences ?? '';
$phone       = $data->phone ?? '';
 
$stmt = $db->prepare(
    "INSERT INTO guest (name, email, phone, password, language, currency, preferences)
     VALUES (:name, :email, :phone, :password, :language, :currency, :preferences)"
);
 
$stmt->bindParam(":name",        $data->name);
$stmt->bindParam(":email",       $data->email);
$stmt->bindParam(":phone",       $phone);
$stmt->bindParam(":password",    $hashedPassword);
$stmt->bindParam(":language",    $language);
$stmt->bindParam(":currency",    $currency);
$stmt->bindParam(":preferences", $preferences);
 
if ($stmt->execute()) {
    $guestId = $db->lastInsertId();
    ob_clean();
    echo json_encode([
        "success" => true,
        "message" => "Registration successful",
        "guest_id" => $guestId
    ]);
} else {
    ob_clean();
    echo json_encode(["error" => "Registration failed"]);
}