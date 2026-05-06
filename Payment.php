<?php


class Payment {
    private $conn;
    private $table = "payment";

    
    public $payment_id;
    public $reservation_id;
    public $amount;
    public $method;
    public $payment_date;
    public $status;

    public function __construct($db) {
        $this->conn = $db;
    }

   
    public function processPayment() {
       
        $checkQuery = "SELECT r.reservation_id, r.total_price, r.status AS res_status
                       FROM reservation r
                       WHERE r.reservation_id = :reservation_id";
        $checkStmt = $this->conn->prepare($checkQuery);
        $checkStmt->bindParam(":reservation_id", $this->reservation_id);
        $checkStmt->execute();

        if ($checkStmt->rowCount() === 0) {
            return ["success" => false, "message" => "Reservation not found."];
        }

        $reservation = $checkStmt->fetch();

      
        $dupQuery = "SELECT payment_id FROM payment
                     WHERE reservation_id = :reservation_id AND status = 'completed'";
        $dupStmt = $this->conn->prepare($dupQuery);
        $dupStmt->bindParam(":reservation_id", $this->reservation_id);
        $dupStmt->execute();

        if ($dupStmt->rowCount() > 0) {
            return ["success" => false, "message" => "This reservation already has a completed payment."];
        }

     
        $allowedMethods = ["cash", "credit_card", "debit_card", "bank_transfer"];
        if (!in_array(strtolower($this->method), $allowedMethods)) {
            return [
                "success" => false,
                "message" => "Invalid payment method. Allowed: " . implode(", ", $allowedMethods)
            ];
        }

        $this->payment_date = date("Y-m-d");
        $this->status       = "completed";

        $query = "INSERT INTO {$this->table}
                    (reservation_id, amount, method, payment_date, status)
                  VALUES
                    (:reservation_id, :amount, :method, :payment_date, :status)";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":reservation_id", $this->reservation_id);
        $stmt->bindParam(":amount",         $this->amount);
        $stmt->bindParam(":method",         $this->method);
        $stmt->bindParam(":payment_date",   $this->payment_date);
        $stmt->bindParam(":status",         $this->status);

        if ($stmt->execute()) {
            $newId = $this->conn->lastInsertId();
            return [
                "success"    => true,
                "message"    => "Payment processed successfully.",
                "payment_id" => (int)$newId,
                "data"       => [
                    "payment_id"     => (int)$newId,
                    "reservation_id" => (int)$this->reservation_id,
                    "amount"         => (float)$this->amount,
                    "method"         => $this->method,
                    "payment_date"   => $this->payment_date,
                    "status"         => $this->status
                ]
            ];
        }

        return ["success" => false, "message" => "Failed to process payment."];
    }


    public function getPaymentById($id) {
        $query = "SELECT
                    p.payment_id,
                    p.reservation_id,
                    p.amount,
                    p.method,
                    p.payment_date,
                    p.status,
                    g.name  AS guest_name,
                    g.email AS guest_email,
                    r.check_in_date,
                    r.check_out_date,
                    r.total_price AS reservation_total,
                    rm.room_number,
                    rm.type AS room_type
                  FROM {$this->table} p
                  JOIN reservation r  ON p.reservation_id = r.reservation_id
                  JOIN guest g        ON r.guest_id       = g.guest_id
                  JOIN room  rm       ON r.room_id        = rm.room_id
                  WHERE p.payment_id = :payment_id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":payment_id", $id);
        $stmt->execute();

        if ($stmt->rowCount() === 0) {
            return ["success" => false, "message" => "Payment not found."];
        }

        $row = $stmt->fetch();
        return [
            "success" => true,
            "data"    => [
                "payment_id"        => (int)$row["payment_id"],
                "reservation_id"    => (int)$row["reservation_id"],
                "amount"            => (float)$row["amount"],
                "method"            => $row["method"],
                "payment_date"      => $row["payment_date"],
                "status"            => $row["status"],
                "guest_name"        => $row["guest_name"],
                "guest_email"       => $row["guest_email"],
                "check_in_date"     => $row["check_in_date"],
                "check_out_date"    => $row["check_out_date"],
                "reservation_total" => (float)$row["reservation_total"],
                "room_number"       => (int)$row["room_number"],
                "room_type"         => $row["room_type"]
            ]
        ];
    }
}
?>
