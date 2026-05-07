<?php
session_start();
ob_start();
 
error_reporting(E_ALL);
ini_set('display_errors', 1);
 
$conn = mysqli_connect("localhost", "root", "", "hotel_system");
$error = "";
$success = "";
 
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
 
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['registerBtn'])) {
    $firstName   = trim($_POST['firstName'] ?? '');
    $lastName    = trim($_POST['lastName'] ?? '');
    $email       = trim($_POST['email'] ?? '');
    $phone       = trim($_POST['phone'] ?? '');
    $password    = $_POST['password'] ?? '';
    $confirm     = $_POST['confirmPassword'] ?? '';
    $language    = $_POST['language'] ?? 'English';
    $currency    = $_POST['currency'] ?? 'USD';
    $preferences = trim($_POST['preferences'] ?? '');
 
    if ($firstName === '' || $lastName === '' || $email === '' || $phone === '' || $password === '') {
        $error = "❌ Please fill in all required fields.";
    } elseif ($password !== $confirm) {
        $error = "❌ Passwords do not match.";
    } else {
        $name           = $firstName . " " . $lastName;
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
 
        // تأكد إن الإيميل مش موجود
        $check = mysqli_query($conn, "SELECT guest_id FROM guest WHERE email='$email'");
        if (mysqli_num_rows($check) > 0) {
            $error = "❌ Email already registered.";
        } else {
            $stmt = mysqli_prepare(
                $conn,
                "INSERT INTO guest (name, email, phone, password, language, currency, preferences) VALUES (?, ?, ?, ?, ?, ?, ?)"
            );
 
            if (!$stmt) {
                $error = "Prepare failed: " . mysqli_error($conn);
            } else {
                mysqli_stmt_bind_param($stmt, "sssssss", $name, $email, $phone, $hashedPassword, $language, $currency, $preferences);
 
                if (mysqli_stmt_execute($stmt)) {
                    $success = "✅ Registration successful! Redirecting...";
                    header("refresh:2;url=login.php");
                } else {
                    $error = "Insert failed: " . mysqli_stmt_error($stmt);
                }
                mysqli_stmt_close($stmt);
            }
        }
    }
}
 
mysqli_close($conn);
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Register User Account</title>
    <link rel="stylesheet" href="css/style.css" />
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header" data-header>
      <div class="nav-shell">
        <a class="brand" href="index.html" aria-label="Aurelia Suites home">
          <span class="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 40 40" focusable="false">
              <path d="M20 4 33 12v16L20 36 7 28V12L20 4Z" />
              <path d="M14 27 20 12l6 15M16.7 22h6.6" />
            </svg>
          </span>
          <span class="brand-copy"><strong>Aurelia Suites</strong><span>Boutique Hotel</span></span>
        </a>
        <nav class="nav-links" aria-label="Main navigation">
          <a href="index.html">Home</a>
          <a href="rooms.html">Rooms</a>
          <a href="index.html#experience">Experience</a>
          <a href="index.html#contact">Contact</a>
        </nav>
        <div class="nav-actions">
          <a class="btn btn-outline" href="login.php">Login</a>
          <a class="btn btn-gold active" href="register.php">Register</a>
          <button class="theme-toggle" type="button" data-theme-toggle aria-label="Switch color theme">Dark mode</button>
        </div>
        <button class="menu-toggle" type="button" data-menu-toggle aria-label="Open menu" aria-expanded="false">
          <span></span><span></span>
        </button>
      </div>
    </header>
 
    <main id="main" class="auth-layout auth-layout-register">
      <section class="auth-visual auth-visual-register">
        <div class="auth-copy reveal">
          <span class="eyebrow">User profile</span>
          <h1>Sign up, dear guest</h1>
          <p>Your information and preferences will be securely stored.</p>
        </div>
      </section>
 
      <section class="auth-panel" aria-labelledby="register-title">
        <div class="auth-card reveal">
          <span class="status gold">Guest registration</span>
          <h2 id="register-title">Create account</h2>
 
          <?php if ($error): ?>
            <p style="color:red; font-weight:bold;"><?= $error ?></p>
          <?php endif; ?>
          <?php if ($success): ?>
            <p style="color:green; font-weight:bold;"><?= $success ?></p>
          <?php endif; ?>
 
          <form class="form-grid" method="POST">
            <div class="field-row">
              <div class="field">
                <label for="first-name">First name</label>
                <input id="first-name" name="firstName" type="text" placeholder="Your first name.." required />
              </div>
              <div class="field">
                <label for="last-name">Last name</label>
                <input id="last-name" name="lastName" type="text" placeholder="Your last name.." required />
              </div>
            </div>
 
            <div class="field">
              <label for="register-email">Email address</label>
              <input id="register-email" name="email" type="email" placeholder="guest@example.com" required />
            </div>
 
            <div class="field">
              <label for="register-phone">Phone</label>
              <input id="register-phone" name="phone" type="tel" placeholder="+20 1234567890" required />
            </div>
 
            <div class="field-row">
              <div class="field">
                <label for="register-password">Password</label>
                <input id="register-password" name="password" type="password" placeholder="Create password" required />
              </div>
              <div class="field">
                <label for="confirm-password">Confirm password</label>
                <input id="confirm-password" name="confirmPassword" type="password" placeholder="Repeat password" required />
              </div>
            </div>
 
            <div class="field-row">
              <div class="field">
                <label for="preferred-language">Language</label>
                <select id="preferred-language" name="language">
                  <option>English</option>
                  <option>Arabic</option>
                  <option>French</option>
                  <option>Spanish</option>
                </select>
              </div>
              <div class="field">
                <label for="preferred-currency">Currency</label>
                <select id="preferred-currency" name="currency">
                  <option>USD</option>
                  <option>EUR</option>
                  <option>EGP</option>
                  <option>SAR</option>
                </select>
              </div>
            </div>
 
            <div class="field">
              <label for="stay-preferences">Stay preferences</label>
              <textarea id="stay-preferences" name="preferences"
                placeholder="Example: feather pillows, spa, vegetarian breakfast, anniversary note"></textarea>
            </div>
 
            <label class="checkline" for="privacy-consent">
              <input id="privacy-consent" type="checkbox" required />
              <span>I agree to create a guest profile and understand I can request privacy deletion later.</span>
            </label>
 
            <button class="btn btn-primary" type="submit" name="registerBtn">Create profile</button>
          </form>
 
          <p class="auth-note">Already registered? <a href="login.php">Sign in</a></p>
        </div>
      </section>
    </main>
 
    <footer class="footer" id="contact">
      <div class="footer-inner">
        <p class="footer-bottom">© <span id="yr"></span> Aurelia Suites.</p>
      </div>
    </footer>
    <script src="js/main.js"></script>
    <script>document.getElementById('yr').textContent = new Date().getFullYear();</script>
  </body>
</html>