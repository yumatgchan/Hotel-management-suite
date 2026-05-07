<?php

session_start();

error_reporting(E_ALL);
ini_set('display_errors', 1);

$conn = mysqli_connect("localhost", "root", "", "hotel_system");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if (!isset($_SESSION['guest_id'])) {
    header("Location: login.php");
    exit();
}

$guest_id = (int) $_SESSION['guest_id'];
$success = "";
$error = "";

/* ===================== UPDATE PROFILE ===================== */
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['update_profile'])) {

    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $newPassword = $_POST['new_password'] ?? '';
    $confirmPassword = $_POST['confirm_password'] ?? '';

    if ($name === '' || $email === '' || $phone === '') {
        $error = "Please fill in name, email and phone.";
    } elseif ($newPassword !== '' && $newPassword !== $confirmPassword) {
        $error = "New password and confirm password do not match.";
    } else {

        if ($newPassword !== '') {
            $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

            $stmt = mysqli_prepare(
                $conn,
                "UPDATE guest 
                 SET name = ?, email = ?, phone = ?, passwordtud = ?
                 WHERE guest_id = ?"
            );

            if (!$stmt) {
                die("Prepare failed: " . mysqli_error($conn));
            }

            mysqli_stmt_bind_param($stmt, "ssssi", $name, $email, $phone, $hashedPassword, $guest_id);
        } else {
            $stmt = mysqli_prepare(
                $conn,
                "UPDATE guest 
                 SET name = ?, email = ?, phone = ?
                 WHERE guest_id = ?"
            );

            if (!$stmt) {
                die("Prepare failed: " . mysqli_error($conn));
            }

            mysqli_stmt_bind_param($stmt, "sssi", $name, $email, $phone, $guest_id);
        }

        if (mysqli_stmt_execute($stmt)) {
            $_SESSION['guest_name'] = $name;
            header("Location: profile.php?updated=1");
            exit();
        } else {
            $error = "Update failed: " . mysqli_stmt_error($stmt);
        }

        mysqli_stmt_close($stmt);
    }
}

if (isset($_GET['updated'])) {
    $success = "Profile updated successfully.";
}

/* ===================== FETCH USER DATA ===================== */
$stmt = mysqli_prepare(
    $conn,
    "SELECT guest_id, name, email, phone
     FROM guest
     WHERE guest_id = ?"
);

if (!$stmt) {
    die("Prepare failed: " . mysqli_error($conn));
}

mysqli_stmt_bind_param($stmt, "i", $guest_id);
mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);
$user = mysqli_fetch_assoc($result);

if (!$user) {
    die("User not found.");
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Profile</title>

    <!-- main css -->
    <link rel="stylesheet" href="style.css">

    <!-- profile css -->
    <style>

        /* ================= PROFILE PAGE ================= */

        .profile-shell {
            min-height: 100svh;
            padding-bottom: 4rem;
            background:
                radial-gradient(circle at top left,
                    rgba(184, 137, 77, 0.14),
                    transparent 28rem),
                var(--cream);
        }

        .profile-hero {
            min-height: 42svh;
            display: grid;
            align-items: end;

            padding:
                9rem
                clamp(1rem, 5vw, 4rem)
                3rem;

            background:
                linear-gradient(
                    90deg,
                    rgba(0,0,0,0.65),
                    rgba(0,0,0,0.18)
                ),
                url("../assets/images/grand-suite.jpg")
                center / cover;

            color: var(--white);

            border-radius: 0 0 2rem 2rem;
            overflow: hidden;

            box-shadow: var(--shadow);
        }

        .profile-hero h1 {
            margin-top: 1rem;
            max-width: 12ch;

            font-size: clamp(3rem, 6vw, 5.5rem);
            letter-spacing: -0.06em;
        }

        .profile-layout {
            width: min(1150px, calc(100% - 2rem));

            margin:
                -3rem auto 0;

            display: grid;

            grid-template-columns:
                0.9fr 1.1fr;

            gap: 1rem;
        }

        .profile-card,
        .profile-panel {
            border: 1px solid var(--border);

            border-radius: var(--radius-xl);

            background: var(--linen);

            box-shadow: var(--shadow-soft);
        }

        .profile-card {
            padding: 1.5rem;
        }

        .profile-panel {
            padding: 1.5rem;
        }

        .profile-header {
            display: flex;
            align-items: center;
            gap: 1rem;

            margin-bottom: 1.5rem;
        }

        .profile-avatar {
            width: 5rem;
            height: 5rem;

            border-radius: 50%;

            display: grid;
            place-items: center;

            background: var(--forest);
            color: var(--white);

            font-family: var(--font-display);

            font-size: 2rem;
            font-weight: 700;

            box-shadow: var(--shadow-soft);

            flex: 0 0 auto;
        }

        .profile-title h2 {
            font-size: clamp(2rem, 4vw, 3rem);

            letter-spacing: -0.05em;

            margin-bottom: 0.3rem;
        }

        .profile-title p {
            color: var(--muted);
        }

        .profile-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;

            border-radius: 999px;

            background:
                rgba(184, 137, 77, 0.16);

            color: var(--gold-dark);

            font-size: 0.75rem;
            font-weight: 900;

            letter-spacing: 0.08em;

            text-transform: uppercase;

            padding: 0.45rem 0.8rem;

            margin-bottom: 0.8rem;
        }

        .profile-badge::before {
            width: 0.45rem;
            height: 0.45rem;

            border-radius: 50%;

            background: currentColor;

            content: "";
        }

        .profile-stats {
            display: grid;
            gap: 1rem;
        }

        .profile-stat,
        .profile-info-box {

            border: 1px solid var(--border);

            border-radius: var(--radius-lg);

            background: var(--cream);

            padding: 1rem;
        }

        .profile-stat strong,
        .profile-info-box strong {

            display: block;

            color: var(--ink);

            font-size: 0.78rem;
            font-weight: 900;

            letter-spacing: 0.12em;

            text-transform: uppercase;

            margin-bottom: 0.4rem;
        }

        .profile-stat span,
        .profile-info-box span {

            color: var(--muted);

            font-weight: 700;

            word-break: break-word;
        }

        .profile-actions {

            display: flex;
            flex-wrap: wrap;

            gap: 0.8rem;

            margin-top: 1.5rem;
        }

        .profile-info-grid {

            display: grid;

            grid-template-columns:
                repeat(2, minmax(0, 1fr));

            gap: 1rem;
        }

        .profile-note {
            margin-top: 1.5rem;

            color: var(--muted);

            line-height: 1.7;
        }

        /* ================ DARK MODE ================= */

        [data-theme="dark"] .profile-card,
        [data-theme="dark"] .profile-panel {

            background:
                rgba(42, 31, 23, 0.96);

            border-color:
                rgba(255, 244, 229, 0.14);
        }

        [data-theme="dark"] .profile-stat,
        [data-theme="dark"] .profile-info-box {

            background:
                rgba(36, 28, 24, 0.96);

            border-color:
                rgba(255, 244, 229, 0.14);
        }

        [data-theme="dark"] .profile-title p,
        [data-theme="dark"] .profile-stat span,
        [data-theme="dark"] .profile-info-box span,
        [data-theme="dark"] .profile-note {

            color:
                rgba(255, 244, 229, 0.72);
        }

        /* ================= RESPONSIVE ================= */

        @media (max-width: 900px) {

            .profile-layout {
                grid-template-columns: 1fr;
            }

            .profile-info-grid {
                grid-template-columns: 1fr;
            }

            .profile-hero {
                min-height: 36svh;
            }
        }

        @media (max-width: 560px) {

            .profile-hero h1 {
                font-size: clamp(2.5rem, 14vw, 4rem);
            }

            .profile-actions {
                flex-direction: column;
            }

            .profile-actions .btn {
                width: 100%;
            }
        }

    </style>
</head>

<body>

    <main class="profile-shell">

        <!-- HERO -->

        <section class="profile-hero">

            <div class="section-inner">

                <span class="eyebrow">
                    Guest profile
                </span>

                <h1>
                    Welcome,
                    <?php echo htmlspecialchars($user['name']); ?>
                </h1>

                <p>
                    Your personal details and guest information are shown below.
                </p>

            </div>

        </section>

        <!-- PROFILE CONTENT -->

        <section class="profile-layout">

            <!-- LEFT CARD -->

            <div class="profile-card">

                <div class="profile-header">

                    <div class="profile-avatar">
                        <?php echo strtoupper(substr($user['name'], 0, 1)); ?>
                    </div>

                    <div class="profile-title">

                        <span class="profile-badge">
                            Registered Guest
                        </span>

                        <h2>
                            <?php echo htmlspecialchars($user['name']); ?>
                        </h2>

                        <p>
                            Guest ID:
                            <?php echo htmlspecialchars($user['guest_id']); ?>
                        </p>

                    </div>

                </div>

                <div class="profile-stats">

                    <div class="profile-stat">
                        <strong>Email</strong>

                        <span>
                            <?php echo htmlspecialchars($user['email']); ?>
                        </span>
                    </div>

                    <div class="profile-stat">
                        <strong>Phone</strong>

                        <span>
                            <?php echo htmlspecialchars($user['phone']); ?>
                        </span>
                    </div>

                </div>

                <div class="profile-actions">

                    <a class="btn btn-primary" href="index.php">
                        Back Home
                    </a>

                    <a class="btn btn-outline" href="logout.php">
                        Logout
                    </a>

                </div>

            </div>

            <!-- RIGHT PANEL -->

            <div class="profile-panel">

                <h2 style="margin-bottom: 1rem;">
                    Account Summary
                </h2>

                <div class="profile-info-grid">

                    <div class="profile-info-box">
                        <strong>Full Name</strong>

                        <span>
                            <?php echo htmlspecialchars($user['name']); ?>
                        </span>
                    </div>

                    <div class="profile-info-box">
                        <strong>Guest ID</strong>

                        <span>
                            <?php echo htmlspecialchars($user['guest_id']); ?>
                        </span>
                    </div>

                    <div class="profile-info-box">
                        <strong>Email Address</strong>

                        <span>
                            <?php echo htmlspecialchars($user['email']); ?>
                        </span>
                    </div>

                    <div class="profile-info-box">
                        <strong>Phone Number</strong>

                        <span>
                            <?php echo htmlspecialchars($user['phone']); ?>
                        </span>
                    </div>

                </div>
                <h2 style="margin: 1.5rem 0 1rem;">Edit Profile</h2>

<?php if (!empty($success)): ?>
    <p style="margin-bottom: 1rem; color: var(--forest); font-weight: 800;">
        <?php echo htmlspecialchars($success); ?>
    </p>
<?php endif; ?>

<?php if (!empty($error)): ?>
    <p style="margin-bottom: 1rem; color: var(--rose); font-weight: 800;">
        <?php echo htmlspecialchars($error); ?>
    </p>
<?php endif; ?>

<form class="form-grid" method="POST" action="">
    <div class="field">
        <label for="edit-name">Full name</label>
        <input
            id="edit-name"
            type="text"
            name="name"
            value="<?php echo htmlspecialchars($user['name']); ?>"
            required
        />
    </div>

    <div class="field">
        <label for="edit-email">Email address</label>
        <input
            id="edit-email"
            type="email"
            name="email"
            value="<?php echo htmlspecialchars($user['email']); ?>"
            required
        />
    </div>

    <div class="field">
        <label for="edit-phone">Phone number</label>
        <input
            id="edit-phone"
            type="tel"
            name="phone"
            value="<?php echo htmlspecialchars($user['phone']); ?>"
            required
        />
    </div>

    <div class="field-row">
        <div class="field">
            <label for="new-password">New password</label>
            <input
                id="new-password"
                type="password"
                name="new_password"
                placeholder="Leave blank if unchanged"
            />
        </div>

        <div class="field">
            <label for="confirm-password">Confirm new password</label>
            <input
                id="confirm-password"
                type="password"
                name="confirm_password"
                placeholder="Repeat new password"
            />
        </div>
    </div>

    <button class="btn btn-primary" type="submit" name="update_profile">
        Save changes
    </button>
    </form>
                <p class="profile-note">
                    This profile page displays the information saved during account registration.
                </p>

            </div>

        </section>

    </main>

</body>
</html>