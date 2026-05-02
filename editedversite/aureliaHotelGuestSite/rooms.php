<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Rooms & Suites</title>
    <meta
      name="description"
      content="Browse Aurelia Suites rooms and suites."/>
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
          <a href="index.php">Home</a>
          <a class="active" href="rooms.php">Rooms</a>
          <a href="index.php#experience">Experience</a>
          <a href="index.php#contact">Contact</a>
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
      <section class="page-hero rooms-hero">
        <div class="hero-inner">
          <div class="hero-content reveal">
    
            <span class="eyebrow">Rooms</span>
            <h1>Choose the room that fits your style.</h1>
            
            <p>
              From cozy classics to spacious suites, each room type is designed to offer a unique blend
              of comfort, style, and personalized service for an unforgettable stay.
            </p>
    
          </div>
        </div>
      </section>


      <section class="section section-alt">
        <div class="section-inner">
      
          <form class="booking-bar booking-bar-inline reveal" data-booking-form data-redirect="rooms.php">
      
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
      
            <button class="btn btn-primary" type="submit">Search rooms</button>
            <p class="form-message" aria-live="polite"></p>
      
          </form>
      
        </div>
      </section>


      <section class="section">
        <div class="section-inner">
          <div class="section-heading reveal">
            <h2>Room collection</h2>
            <p>
              Filter by room type and compare comfort, services, and guest-facing PMS features before
              registration or login.
            </p>
          </div>

          <div class="filters reveal" aria-label="Room filters">
            <button class="filter-btn active" type="button" data-filter="all">All rooms</button>
            <button class="filter-btn" type="button" data-filter="suite">Suites</button>
            <button class="filter-btn" type="button" data-filter="classic">Classic</button>
            <button class="filter-btn" type="button" data-filter="family">Family</button>
          </div>

          <div class="rooms-grid">

            <article class="room-card reveal" data-room-type="suite">
              <img src="assets/images/360_F_29133877_bfA2n7cWV53fto2BomyZ6pyRujJTBwjd.jpg" alt="Signature hotel suite with open lounge and ocean view" loading="lazy" />
              <div class="room-body">

                <div class="room-topline">
                  <span class="status gold">Suite</span>
                  <span class="price">$320 / night</span>
                </div>

                <h3>Signature Suite</h3>
                <p>Large living area, premium minibar preferences, fast folio preview, and celebration setup options.</p>

                <div class="tags">
                  <span class="tag">Digital key</span>
                  <span class="tag">VIP flag</span>
                  <span class="tag">Split bill</span>
                </div>
                
                <a class="btn btn-primary" href="register.php">Reserve suite</a>
              </div>
            </article>

            <article class="room-card reveal" data-room-type="suite">
              <img src="assets/images/luxury-pool.jpg" alt="Poolside luxury hotel view with outdoor lounge" loading="lazy" />
            
              <div class="room-body">
                <div class="room-topline">
                  <span class="status gold">Suite</span>
                  <span class="price">$360 / night</span>
                </div>
            
                <h3>Terrace Pool Suite</h3>
                <p>Private terrace energy, concierge arrival planning, and room-service preference capture.</p>
            
                <div class="tags">
                  <span class="tag">Concierge</span>
                  <span class="tag">Early check-in</span>
                  <span class="tag">Room dining</span>
                </div>
            
                <a class="btn btn-primary" href="register.php">Reserve suite</a>
              </div>
            </article>

            <article class="room-card reveal" data-room-type="classic">
              <img src="assets/images/depositphotos_246304748-stock-photo-hotel-bedroom-interior-bed-beige.webp" alt="Elegant boutique hotel." loading="lazy" />
              <div class="room-body">
                <div class="room-topline">
                  <span class="status">Classic</span>
                  <span class="price">$180 / night</span>
                </div>
                <h3>Classic King</h3>
                <p>Quiet city stay with pillow preferences, housekeeping alerts, and direct booking benefits.</p>
                <div class="tags">
                  <span class="tag">Preference log</span>
                  <span class="tag">HK alerts</span>
                  <span class="tag">Multi-currency</span>
                </div>
                <a class="btn btn-primary" href="register.php">Reserve room</a>
              </div>
            </article>

            <article class="room-card reveal" data-room-type="family">
              <img src="assets\images\photo-1611892440504-42a792e24d32.avif" alt="Spacious connected hotel room." loading="lazy" />
              <div class="room-body">
                <div class="room-topline">
                  <span class="status warn">Family</span>
                  <span class="price">$260 / night</span>
                </div>
                <h3>Family Loft</h3>
                <p>Flexible sleeping setup, allergy notes, connected billing, and activity requests for children.</p>
                <div class="tags">
                  <span class="tag">Group stay</span>
                  <span class="tag">Master account</span>
                  <span class="tag">Service requests</span>
                </div>
                <a class="btn btn-primary" href="register.php">Reserve room</a>
              </div>
            </article>

            <article class="room-card reveal" data-room-type="classic">
              <img src="assets\images\photo-1631049552057-403cdb8f0658.avif" alt="Relaxing hotel pool and leisure deck" loading="lazy" />
              <div class="room-body">
                <div class="room-topline">
                  <span class="status">Classic</span>
                  <span class="price">$205 / night</span>
                </div>
                <h3>Pool View Room</h3>
                <p>Bright balcony view, spa add-ons, café posting support, and real-time service notifications.</p>
                <div class="tags">
                  <span class="tag">Spa</span>
                  <span class="tag">Café POS</span>
                  <span class="tag">Notifications</span>
                </div>
                <a class="btn btn-primary" href="register.php">Reserve room</a>
              </div>
            </article>

            <article class="room-card reveal" data-room-type="family">
              <img src="assets/images/boutique-lobby.jpg" alt="Warm boutique hotel lounge for group guests" loading="lazy" />
              <div class="room-body">
                <div class="room-topline">
                  <span class="status warn">Family</span>
                  <span class="price">$300 / night</span>
                </div>
                <h3>Connected Rooms</h3>
                <p>Two-room configuration for families or small groups with shared folio and separate guest preferences.</p>
                <div class="tags">
                  <span class="tag">Group booking</span>
                  <span class="tag">Waitlist</span>
                  <span class="tag">Loyalty</span>
                </div>
                <a class="btn btn-primary" href="register.php">Reserve room</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="section section-dark">
        <div class="section-inner split">
          <div class="content-stack reveal">
            <span class="eyebrow">Operational confidence</span>
            <h2>Room availability meets hotel operations.</h2>
            <p>
              The rooms page mirrors core PMS needs: room allocation, housekeeping readiness,
              overbooking waitlist concepts, walk-in pricing, group booking, and guest profile capture.
            </p>
          </div>
          <div class="info-card reveal">
            <h3>Designed roles behind the guest view</h3>
            <p>
              Front desk manages booking status, housekeeping updates room readiness, accountants close
              folios, and managers review reports while guests see one elegant booking experience.
            </p>
            <div class="tags">
              <span class="tag">Guest</span>
              <span class="tag">Front desk</span>
              <span class="tag">Housekeeping</span>
              <span class="tag">Accountant</span>
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
