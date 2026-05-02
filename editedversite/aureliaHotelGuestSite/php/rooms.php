<?php 
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hotel";

$conn= new mysqli($servername,$username,$password,$dbname);

if ($conn-> connect_error){
    die("connection failed and my fingers hurt bro:".$conn->connect_error);

}

$sql="SELECT * FROM rooms";
$result = $conn->query($sql);

while ($row= $result-> fetch_assoc()){
    echo "ID: ".$row["ID"] ." || Name: ". $row["name"]." || Type: ". $row["type"]." || Status: ".$row["status"]." || Price: ". $row["price"];    
    echo "<br>";
}
$conn->close();

//---------------------------------------------------------------------------------------------------------------------------------------------






?>