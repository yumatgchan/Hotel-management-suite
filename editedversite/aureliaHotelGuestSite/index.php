<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Aurelia Suites</title>
    <meta
      name="description"
      content="A hotel website for Aurelia Suites."
    />
    <link rel="stylesheet" href="css/style.css" />
  </head>
  
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header" data-header>

      <div class="nav-shell">
        <a class="brand" href="index.php" aria-label="Aurelia Suites home">

          <span class="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 40 40" focusable="false">
              <path d="M20 4 33 12v16L20 36 7 28V12L20 4Z" />
              <path d="M14 27 20 12l6 15M16.7 22h6.6" />
            </svg>
          </span>

          <span class="brand-copy"><strong>Aurelia Suites</strong><span>Boutique Hotel</span></span>
        </a>


        <nav class="nav-links" aria-label="Main navigation">
          <a class="active" href="index.php">Home</a>
          <a href="rooms.php">Rooms</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>


        <div class="nav-actions">
          <a class="btn btn-outline" href="login.php">Login</a>
          <a class="btn btn-gold" href="register.php">Register</a>
          <button class="theme-toggle" type="button" data-theme-toggle aria-label="Switch color theme">Dark mode</button>
        </div>


        <button class="menu-toggle" type="button" data-menu-toggle aria-label="Open menu" aria-expanded="false">
          <span></span><span></span>
        </button>
      </div>

    </header>


    
    <main id="main">
      <section class="hero hero-home">
        <div class="hero-inner">
          <div class="hero-content reveal">
            <span class="eyebrow">Direct booking · Guest-first PMS</span>
            <h1>Stay where you can make memories.</h1>
            <p>
              Book your stay at Aurelia Suites, a boutique hotel experience powered by a modern
               hospitality management suite that puts guests first. 
              From seamless reservations to personalized service requests,
               our website is designed to make your stay unforgettable.  
            </p>
            <div class="hero-actions">
              <a class="btn btn-gold" href="rooms.php">Explore Rooms</a>
              <a class="btn btn-outline" href="guest-dashboard.php">Open User Portal</a>
            </div>
          </div>


          <form class="booking-bar reveal" data-booking-form data-redirect="rooms.php">

            <div class="booking-field">
              <label for="arrival">Arrival</label>
              <input id="arrival" name="arrival" type="date" required />
            </div>

            <div class="booking-field">
              <label for="departure">Departure</label>
              <input id="departure" name="departure" type="date" required />
            </div>

            <div class="booking-field">
              <label for="guests">Guests</label>
              <select id="guests" name="guests">
                <option>1 guest</option>
                <option selected>2 guests</option>
                <option>3 guests</option>
                <option>4 guests</option>
              </select>
            </div>
            
            <div class="booking-field">
              <label for="currency">Currency</label>
              <select id="currency" name="currency">
                <option>USD</option>
                <option>EUR</option>
                <option>EGP</option>
                <option>SAR</option>
              </select>
            </div>
            <div class="booking-field">
              <label for="language">Language</label>
              <select id="language" name="language">
                <option>English</option>
                <option>Arabic</option>
                <option>French</option>
              </select>
            </div>
            <button class="btn btn-primary" type="submit">Check availability</button>
            <p class="form-message" aria-live="polite"></p>
          </form>
        </div>
      </section>

      
      <section class="section section-alt">
        <div class="section-inner split">
          <div class="image-frame reveal">
            <img src="assets/images/wp8815354.jpg" alt="Grand boutique hotel" loading="lazy" />
            <div class="floating-card">
              <span class="label">Direct booking</span>
              <strong>30% off</strong>
              <p>Members receive flexible check-in and room upgrade alerts.</p>
            </div>
          </div>
          <div class="content-stack reveal">
            <span class="eyebrow">Designed for guests</span>
            <h2>A boutique stay powered by an invisible management suite.</h2>
            <p>
              The SRS calls for reservations, guest profiles, billing details, service requests,
              notifications, feedback, personalization, and privacy support. This website turns those
              requirements into a calm guest journey from first search to checkout.
            </p>
            <ul class="feature-list">
              <li>Reservation workflow from inquiry to folio closed</li>
              <li>Preference logger for pillows, drinks, dietary needs, and setup tasks</li>
              <li>Pre-arrival concierge wizard 48 hours before arrival</li>
              <li>Guest billing preview with fast folio access</li>
            </ul>
            <div class="button-row">
              <a class="btn btn-primary" href="register.php">Create guest account</a>
              <a class="btn btn-soft" href="rooms.php">View room collection</a>
            </div>
          </div>
        </div>
      </section>


      <section class="section" id="experience">
        <div class="section-inner">


          <div class="section-heading reveal">

            <h2>Hospitality features make each moment more lively.</h2>

            <p>
              From booking to post-stay feedback, the guest experience is supported by features that
              bring the warmth of hospitality to every step of the journey.
            </p>

          </div>


          <div class="cards-grid">

            <article class="feature-card reveal">
              <span class="status gold">Pre-arrival</span>
              <h3>Concierge wizard</h3>
              <p>Collect arrival time, transport requests, dietary needs, and celebration notes before the stay begins.</p>
            </article>

            <article class="feature-card reveal">
              <span class="status">During stay</span>
              <h3>Services and alerts</h3>
              <p>Guests can request housekeeping, spa, café, maintenance, or room dining and receive status notifications at anytime.</p>
            </article>

            <article class="feature-card reveal">
              <span class="status warn">Checkout</span>
              <h3>Folio and feedback</h3>
              <p>Billing details, split-bill concepts, cancellation fees, and post-stay feedback are visible from the portal.</p>
            </article>

          </div>
        </div>
      </section>


      <section class="section section-dark">

        <div class="section-inner">
          <div class="section-heading reveal">
            <h2>The guest journey, reimagined.</h2>
            <p>Scrollable moments give guests confidence at every stage, while the PMS handles the operational logic behind the scenes.</p>
          </div>
          
          <div class="journey">

            <article class="journey-step reveal">
              <h3>Search</h3>
              <p>Responsive room discovery, language selection, currency signals, and direct booking benefits.</p>
            </article>

            <article class="journey-step reveal">
              <h3>Reserve</h3>
              <p>Room allocation, overbooking waitlist messaging, group booking concepts, and preference capture.</p>
            </article>

            <article class="journey-step reveal">
              <h3>Stay</h3>
              <p>Digital key simulation, service requests, HK readiness alerts, and anniversary surprise suggestions.</p>
            </article>

            <article class="journey-step reveal">
              <h3>Checkout</h3>
              <p>Folio preview, split bill logic, feedback loop, loyalty tracking, and privacy request support.</p>
            </article>
            
          </div>
        </div>
      </section>


      <section class="section">
        <div class="section-inner split">

          <div class="content-stack reveal">
            <span class="eyebrow">Rooms and amenities</span>
            <h2>Urban calm, poolside leisure, and suites made for long stays.</h2>
            <p>
              Browse guest rooms, suites, and family rooms with responsive card layouts, direct booking
              rates, and amenity tags that make comparison effortless.
            </p>
            <div class="button-row">
              <a class="btn btn-primary" href="rooms.php">See all rooms</a>
              <a class="btn btn-soft" href="login.php">Manage booking</a>
            </div>
          </div>

          <div class="image-frame reveal">
            <img src="assets/images/360_F_29133877_bfA2n7cWV53fto2BomyZ6pyRujJTBwjd.jpg" alt="hotel pic" loading="lazy" />
            <div class="floating-card">
              <span class="label">Guest satisfaction</span>
              <strong>4.8/5</strong>
              <p>Feedback helps us improve for better service.</p>
            </div>
          </div>

        </div>
      </section>

    </main>


    <footer class="footer" id="contact">
      <div class="footer-inner">
        <div class="footer-grid">

          <div>
            <h2>Aurelia Suites</h2>
            <p>Boutique hotel experience with a modern hospitality management suite.</p>
          </div>
          
                    <div>

          </div>

          <div>
            <h3>Explore</h3>
            <ul>
              <li><a href="rooms.php">Rooms</a></li>
              <li><a href="register.php">Membership</a></li>
            </ul>
          </div>



          <div>
            <h3>Contact</h3>
            <ul>
              <li><a href="mailto:contact@aureliasuites.com">contact@aureliasuites.com</a></li>
              <li><a href="tel:+2012345670">+20 12345670</a></li>
              <li><a href="#">13th street, giza, october city </a></li>
            </ul>
          </div>

        </div>
        <p class="footer-bottom">© <span data-year></span> Aurelia Suites. Hotel and management site for better guest experiences.</p>
      </div>
    </footer>
    <script src="js/main.js"></script>
  </body>
</html>
