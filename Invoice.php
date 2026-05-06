<?php


class Invoice {
    private $conn;
    private $table      = "invoice";
    const   TAX_RATE    = 0.14;   // 14 % VAT

    public $invoice_id;
    public $reservation_id;
    public $total_amount;
    public $tax;
    public $date;

    public function __construct($db) {
        $this->conn = $db;
    }

   
    public function getBillByReservation($reservation_id) {
        
        $resQuery = "SELECT
                       r.reservation_id,
                       r.check_in_date,
                       r.check_out_date,
                       r.total_price,
                       r.status,
                       g.guest_id,
                       g.name  AS guest_name,
                       g.email AS guest_email,
                       g.phone AS guest_phone,
                       rm.room_number,
                       rm.type  AS room_type,
                       rm.price AS room_price_per_night
                     FROM reservation r
                     JOIN guest g  ON r.guest_id = g.guest_id
                     JOIN room  rm ON r.room_id  = rm.room_id
                     WHERE r.reservation_id = :reservation_id";

        $resStmt = $this->conn->prepare($resQuery);
        $resStmt->bindParam(":reservation_id", $reservation_id);
        $resStmt->execute();

        if ($resStmt->rowCount() === 0) {
            return ["success" => false, "message" => "Reservation not found."];
        }
        $res = $resStmt->fetch();

        // 2. Calculate number of nights
        $checkIn   = new DateTime($res["check_in_date"]);
        $checkOut  = new DateTime($res["check_out_date"]);
        $nights    = (int)$checkIn->diff($checkOut)->days;
        $nights    = max($nights, 1); // minimum 1 night

        // 3. Fetch all services attached to this reservation
        $svcQuery = "SELECT
                       s.name         AS service_name,
                       s.price        AS unit_price,
                       rs.quantity,
                       rs.service_date,
                       (s.price * rs.quantity) AS line_total
                     FROM reservation_service rs
                     JOIN service s ON rs.service_id = s.service_id
                     WHERE rs.reservation_id = :reservation_id";

        $svcStmt = $this->conn->prepare($svcQuery);
        $svcStmt->bindParam(":reservation_id", $reservation_id);
        $svcStmt->execute();
        $services = $svcStmt->fetchAll();

      
        $roomSubtotal    = (float)$res["room_price_per_night"] * $nights;
        $servicesSubtotal = 0.0;
        foreach ($services as $svc) {
            $servicesSubtotal += (float)$svc["line_total"];
        }
        $subtotal    = $roomSubtotal + $servicesSubtotal;
        $taxAmount   = round($subtotal * self::TAX_RATE, 2);
        $grandTotal  = round($subtotal + $taxAmount, 2);

       
        $invQuery = "SELECT invoice_id, total_amount, tax, date
                     FROM invoice
                     WHERE reservation_id = :reservation_id
                     ORDER BY invoice_id DESC LIMIT 1";
        $invStmt = $this->conn->prepare($invQuery);
        $invStmt->bindParam(":reservation_id", $reservation_id);
        $invStmt->execute();
        $existingInvoice = $invStmt->fetch();

        
        $payQuery = "SELECT payment_id, amount, method, payment_date, status
                     FROM payment
                     WHERE reservation_id = :reservation_id
                     ORDER BY payment_id DESC LIMIT 1";
        $payStmt = $this->conn->prepare($payQuery);
        $payStmt->bindParam(":reservation_id", $reservation_id);
        $payStmt->execute();
        $payment = $payStmt->fetch();

        return [
            "success" => true,
            "data"    => [
                "bill_summary" => [
                    "reservation_id"   => (int)$reservation_id,
                    "reservation_status" => $res["status"],
                    "check_in_date"    => $res["check_in_date"],
                    "check_out_date"   => $res["check_out_date"],
                    "nights"           => $nights
                ],
                "guest" => [
                    "guest_id"   => (int)$res["guest_id"],
                    "name"       => $res["guest_name"],
                    "email"      => $res["guest_email"],
                    "phone"      => $res["guest_phone"]
                ],
                "room" => [
                    "room_number"       => (int)$res["room_number"],
                    "type"              => $res["room_type"],
                    "price_per_night"   => (float)$res["room_price_per_night"],
                    "nights"            => $nights,
                    "room_subtotal"     => round($roomSubtotal, 2)
                ],
                "services"          => $services,
                "services_subtotal" => round($servicesSubtotal, 2),
                "calculation" => [
                    "subtotal"    => round($subtotal, 2),
                    "tax_rate"    => (self::TAX_RATE * 100) . "%",
                    "tax_amount"  => $taxAmount,
                    "grand_total" => $grandTotal
                ],
                "invoice" => $existingInvoice
                    ? [
                        "invoice_id"   => (int)$existingInvoice["invoice_id"],
                        "total_amount" => (float)$existingInvoice["total_amount"],
                        "tax"          => (float)$existingInvoice["tax"],
                        "date"         => $existingInvoice["date"],
                        "generated"    => true
                    ]
                    : ["generated" => false, "message" => "No invoice generated yet. Use POST /api/bill/generate"],
                "payment" => $payment
                    ? [
                        "payment_id"   => (int)$payment["payment_id"],
                        "amount"       => (float)$payment["amount"],
                        "method"       => $payment["method"],
                        "payment_date" => $payment["payment_date"],
                        "status"       => $payment["status"]
                    ]
                    : ["status" => "unpaid"]
            ]
        ];
    }

  
    public function generateInvoice($reservation_id) {
        // Re-use getBillByReservation to calculate totals
        $bill = $this->getBillByReservation($reservation_id);
        if (!$bill["success"]) {
            return $bill;
        }

        $calc       = $bill["data"]["calculation"];
        $grandTotal = $calc["grand_total"];
        $taxAmount  = $calc["tax_amount"];
        $today      = date("Y-m-d");

        $checkQuery = "SELECT invoice_id FROM invoice WHERE reservation_id = :reservation_id";
        $checkStmt  = $this->conn->prepare($checkQuery);
        $checkStmt->bindParam(":reservation_id", $reservation_id);
        $checkStmt->execute();
        $existing = $checkStmt->fetch();

        if ($existing) {
            $query = "UPDATE invoice
                      SET total_amount = :total_amount,
                          tax          = :tax,
                          date         = :date
                      WHERE reservation_id = :reservation_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":total_amount",    $grandTotal);
            $stmt->bindParam(":tax",             $taxAmount);
            $stmt->bindParam(":date",            $today);
            $stmt->bindParam(":reservation_id",  $reservation_id);
            $stmt->execute();

            $invoiceId = (int)$existing["invoice_id"];
            $action    = "updated";
        } else {
            $query = "INSERT INTO invoice (reservation_id, total_amount, tax, date)
                      VALUES (:reservation_id, :total_amount, :tax, :date)";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":reservation_id", $reservation_id);
            $stmt->bindParam(":total_amount",   $grandTotal);
            $stmt->bindParam(":tax",            $taxAmount);
            $stmt->bindParam(":date",           $today);
            $stmt->execute();

            $invoiceId = (int)$this->conn->lastInsertId();
            $action    = "created";
        }

        return [
            "success"    => true,
            "message"    => "Invoice {$action} successfully.",
            "invoice_id" => $invoiceId,
            "data"       => [
                "invoice_id"      => $invoiceId,
                "reservation_id"  => (int)$reservation_id,
                "subtotal"        => $calc["subtotal"],
                "tax_rate"        => $calc["tax_rate"],
                "tax_amount"      => $taxAmount,
                "total_amount"    => $grandTotal,
                "date"            => $today,
                "bill_breakdown"  => $bill["data"]
            ]
        ];
    }
}
?>
