<?php
session_start();
ob_start();
 
$conn = mysqli_connect("localhost", "root", "", "hotel_system");
$error = "";
 
if (isset($_POST['login'])) {
    $email    = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $role     = $_POST['role'] ?? 'guest';
 
    if (!empty($email) && !empty($password)) {
        $query = mysqli_query($conn, "SELECT * FROM guest WHERE email='$email'");
 
        if (mysqli_num_rows($query) == 1) {
            $user = mysqli_fetch_assoc($query);
 
            if (password_verify($password, $user['password'])) {
                $_SESSION['user_id']   = $user['guest_id'];
                $_SESSION['user_name'] = $user['name'];
                $_SESSION['user_role'] = $role;
 
                // redirect to dashboard
                $name = urlencode($user['name']);
                header("Location: guest-dashboard.html?role=$role&name=$name&theme=light");
                exit();
            } else {
                $error = "❌ Wrong password.";
            }
        } else {
            $error = "❌ Email not found.";
        }
    } else {
        $error = "❌ Please fill in all fields.";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>User Login</title>
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
          <a class="btn btn-outline active" href="login.php">Login</a>
          <a class="btn btn-gold" href="register.php">Register</a>
          <button class="theme-toggle" type="button" data-theme-toggle aria-label="Switch color theme">Dark mode</button>
        </div>
        <button class="menu-toggle" type="button" data-menu-toggle aria-label="Open menu" aria-expanded="false">
          <span></span><span></span>
        </button>
      </div>
    </header>
 
    <main id="main" class="auth-layout">
      <section class="auth-visual">
        <div class="auth-copy reveal">
          <span class="eyebrow">Guest portal</span>
          <h1>Welcome back to Aurelia Suites.</h1>
          <p>Sign in to access your personalized guest experience and manage your stay.</p>
        </div>
      </section>
 
      <section class="auth-panel" aria-labelledby="login-title">
        <div class="auth-card reveal">
          <span class="status gold">Secure guest access</span>
          <h2 id="login-title">Login</h2>
 
          <?php if ($error): ?>
            <p style="color:red; font-weight:bold;"><?= $error ?></p>
          <?php endif; ?>
 
          <form class="form-grid" method="POST">
            <div class="field">
              <label for="login-email">Email address</label>
              <input id="login-email" name="email" type="email" placeholder="email@example.com" required />
            </div>
            <div class="field">
              <label for="login-password">Password</label>
              <input id="login-password" name="password" type="password" placeholder="Enter password...." required />
            </div>
            <div class="field">
              <label for="login-role">Login role</label>
              <select id="login-role" name="role" data-role-select>
                <option value="guest" selected>Guest</option>
                <option value="manager">Manager</option>
                <option value="frontDesk">Front desk</option>
                <option value="housekeeper">Housekeeper</option>
                <option value="accountant">Accountant</option>
                <option value="cafeStaff">Café staff</option>
                <option value="itAdmin">IT administrator</option>
              </select>
            </div>
            <div class="role-preview" data-role-preview>
              <strong>Guest access</strong>
              <span>Reservations, digital key, services, folio, feedback, and privacy requests.</span>
            </div>
            <button class="btn btn-primary" type="submit" name="login">Open dashboard</button>
          </form>
 
          <p class="auth-note">New to Aurelia? <a href="register.php">Register</a></p>
        </div>
 
        <div class="auth-meta reveal">
          <article><strong>Safety first</strong><span>Your information is protected with industry-standard security.</span></article>
          <article><strong>Worldwide currencies</strong><span>Support for multiple currencies for international guests.</span></article>
          <article><strong>Fast folio</strong><span>Quick access to your folio information at any time.</span></article>
          <article><strong>24/7 support</strong><span>Our support team is available around the clock.</span></article>
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