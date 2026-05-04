<?php
class ReservationService {
    private $conn;
    private $table = "reservation_services";

    public $reservation_id;
    public $service_id;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function addService() {
        $query = "INSERT INTO " . $this->table . "
                  (reservation_id, service_id)
                  VALUES (:rid, :sid)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":rid", $this->reservation_id);
        $stmt->bindParam(":sid", $this->service_id);
        return $stmt->execute();
    }

    public function removeService() {
        $query = "DELETE FROM " . $this->table . "
                  WHERE reservation_id = :rid AND service_id = :sid";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":rid", $this->reservation_id);
        $stmt->bindParam(":sid", $this->service_id);
        return $stmt->execute();
    }
}