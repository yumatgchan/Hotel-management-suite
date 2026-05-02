<?php
session_start();
session_destroy();

header("Location: login.php");
exit();
?>
<!-- دي بتروح login علشان يبقي كدا خرج يعني -->