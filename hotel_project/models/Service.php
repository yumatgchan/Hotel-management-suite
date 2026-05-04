<?php
class Service {
    private $conn;
    private $table = "service";

    public $id;
    public $name;
    public $price;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getServices() {
        $query = "SELECT * FROM " . $this->table;
        return $this->conn->query($query);
    }

    public function createService() {
        $query = "INSERT INTO " . $this->table . " (name, price)
                  VALUES (:name, :price)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":price", $this->price);
        return $stmt->execute();
    }
}