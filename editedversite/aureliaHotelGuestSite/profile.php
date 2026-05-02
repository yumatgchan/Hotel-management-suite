<?php  
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hotel";

$conn= new mysqli($servername,$username,$password,$dbname);


$myname = "";
$myemail = "";
$myphone = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $myname = $_POST['firstName'] . " " . $_POST['lastName'];  
    $myemail = $_POST['email'];  
    $myphone = $_POST['phone'];  
    $mypassword = password_hash($_POST['password'], PASSWORD_DEFAULT);  

    $stmt = mysqli_prepare($conn,
        "INSERT INTO guest (name, email, phone, password) VALUES (?, ?, ?, ?)"
    );

    mysqli_stmt_bind_param($stmt, "ssss", $myname, $myemail, $myphone, $mypassword);
    mysqli_stmt_execute($stmt);
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css" />
</head>
<body>
    <h1>my profile</h1>
    <h3>name is <?php echo $myname?></h3>
    <h3>email is <?php echo $myemail?></h3>
    <h3>phone is <?php echo $myphone?></h3>
    <h3>Password saved successfully</h3>
</body>
</html>