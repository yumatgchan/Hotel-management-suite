<?php

class Guest {
    private $conn;
    private $table = "guest";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function register($name, $email, $phone, $password) {
        $query = "INSERT INTO " . $this->table . " 
                  (name, email, phone, password) 
                  VALUES (:name, :email, :phone, :password)";

        $stmt = $this->conn->prepare($query);

        $passwordHash = password_hash($password, PASSWORD_DEFAULT);

        $stmt->bindParam(":name", $name);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":phone", $phone);
        $stmt->bindParam(":password", $passwordHash);

        return $stmt->execute();
    }
}