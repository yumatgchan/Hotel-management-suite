<?php
class Feedback {
    private $conn;
    private $table = "feedback";

    public $id;
    public $guest_id;
    public $message;
    public $rating;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function createFeedback() {
        $query = "INSERT INTO " . $this->table . "
                  (guest_id, comment, rating)
                  VALUES (:gid, :msg, :rating)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":gid", $this->guest_id);
        $stmt->bindParam(":msg", $this->message);
        $stmt->bindParam(":rating", $this->rating);
        return $stmt->execute();
    }

    public function getFeedback() {
        $query = "SELECT * FROM " . $this->table;
        return $this->conn->query($query);
    }
}