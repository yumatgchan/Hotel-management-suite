const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const bookingForms = document.querySelectorAll("[data-booking-form]");
const authForms = document.querySelectorAll("[data-auth-form]");
const requestForms = document.querySelectorAll("[data-request-form]");
const filterButtons = document.querySelectorAll("[data-filter]");
const roomCards = document.querySelectorAll("[data-room-type]");
const tabButtons = document.querySelectorAll("[data-tab]");
const tabPanels = document.querySelectorAll("[data-tab-panel]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const roleSelect = document.querySelector("[data-role-select]");
const rolePreview = document.querySelector("[data-role-preview]");

const roleProfiles = {

  guest: {
    label: "Guest dashboard",
    accessTitle: "Guest access",
    accessText: "Reservations, digital key, services, folio, feedback, and privacy requests.",
    greeting: (name) => `Good evening, ${name}.`,
    summary:
      "A cozy guest portal for reservation status, digital key, concierge requests, billing preview, loyalty, feedback, and privacy support.",
    portalTitle: "Manage your stay",
    notificationBadge: "Guest notifications",
    notificationTitle: "Stay alerts",
    kpis: [
      ["Upcoming reservation", "Signature Suite", "Confirmed · 24 Apr to 28 Apr · 2 guests", "Inquiry → Confirmed"],
      ["Digital key", "Ready at 15:00", "Time-limited access appears after identity check-in.", "Secure simulation"],
      ["Loyalty", "Gold guest", "7 stays · upgrade eligible · referral reward available.", "VIP flag active"],
    ],
    notices: [
      ["Room readiness", "Housekeeping marked your suite as inspecting."],
      ["Concierge", "Airport pickup is scheduled for 13:10."],
      ["Folio", "Spa deposit is refundable until 18:00 today."],
    ],
    actions: [
      ["Reserve", "View booking state and room readiness", "reservation"],
      ["Request", "Ask concierge or housekeeping for service", "services"],
      ["Checkout", "Review folio, feedback, and privacy", "folio"],
    ],
  },

  manager: {
    label: "Manager dashboard",
    accessTitle: "Manager access",
    accessText: "Reports, staff roles, hotel performance, VIP guests, and operational oversight.",
    greeting: (name) => `Good evening, Manager ${name}.`,
    summary:
      "A management view for occupancy, revenue signals, staff coordination, VIP service quality, and hotel-wide decisions.",
    portalTitle: "Manage hotel operations",
    notificationBadge: "Manager brief",
    notificationTitle: "Today’s overview",
    kpis: [
      ["Occupancy", "86%", "42 arrivals · 37 departures · 12 VIP stays.", "High demand"],
      ["Revenue", "$48.2K", "Room, café, spa, and service revenue forecast.", "On target"],
      ["Staffing", "6 teams active", "Front desk, housekeeping, café, spa, accounting, IT.", "Coordinated"],
    ],
    notices: [
      ["VIP arrival", "Signature Suite requires anniversary setup before 15:00."],
      ["Overbooking watch", "Family Loft has 2 waitlist inquiries for tonight."],
      ["Service quality", "Post-stay feedback average is 4.8/5 this week."],
    ],
    actions: [
      ["Review reports", "Occupancy, ADR, service revenue, and feedback", "manager-report"],
      ["Approve staffing", "Balance housekeeping and front desk coverage", "manager-staff"],
      ["Monitor VIPs", "Track loyalty guests and personalized requests", "manager-vip"],
    ],
  },

  frontDesk: {
    label: "Front desk dashboard",
    accessTitle: "Front desk access",
    accessText: "Bookings, check-in/out, walk-ins, room allocation, waitlist, and guest communication.",
    greeting: (name) => `Good evening, ${name}. Front desk is ready.`,
    summary:
      "A front-desk workspace for arrivals, reservation state changes, room assignment, walk-in pricing, and guest messages.",
    portalTitle: "Handle arrivals and reservations",
    notificationBadge: "Front desk queue",
    notificationTitle: "Arrival desk",
    kpis: [
      ["Arrivals", "42 today", "8 early check-in requests · 3 VIP guests.", "Active"],
      ["Room allocation", "31 ready", "9 inspecting · 2 out of order.", "Live status"],
      ["Walk-ins", "4 pending", "Dynamic rates prepared for available rooms.", "Pricing ready"],
    ],
    notices: [
      ["Room 1208", "Housekeeping inspection should finish in 20 minutes."],
      ["Group booking", "Master account requested split folio review."],
      ["Guest message", "Airport delay noted for Signature Suite arrival."],
    ],
    actions: [
      ["Check in", "Move reservation from confirmed to checked in", "frontdesk-checkin"],
      ["Assign room", "Match room type, readiness, and preferences", "frontdesk-assign"],
      ["Message guest", "Send arrival updates and service notes", "frontdesk-message"],
    ],
  },

  housekeeper: {
    label: "Housekeeping dashboard",
    accessTitle: "Housekeeper access",
    accessText: "Room status, cleaning tasks, inspections, maintenance flags, and front-desk readiness alerts.",
    greeting: (name) => `Good evening, ${name}. Rooms are waiting.`,
    summary:
      "A housekeeping view focused on cleaning queues, inspection status, maintenance alerts, guest preferences, and room readiness.",
    portalTitle: "Coordinate room readiness",
    notificationBadge: "Housekeeping board",
    notificationTitle: "Room tasks",
    kpis: [
      ["Clean queue", "18 rooms", "Priority rooms for early check-in listed first.", "In progress"],
      ["Inspections", "9 pending", "Suites and VIP rooms require supervisor check.", "Needs review"],
      ["Maintenance", "2 alerts", "AC filter and bathroom light reported.", "Flagged"],
    ],
    notices: [
      ["Room 1208", "VIP setup: firm pillows, sparkling water, anniversary card."],
      ["Room 801", "Guest requested hypoallergenic bedding."],
      ["Front desk alert", "Send ready signal after supervisor inspection."],
    ],
    actions: [
      ["Mark clean", "Update room from dirty to inspecting", "hk-clean"],
      ["Request repair", "Create maintenance alert for out-of-order risks", "hk-repair"],
      ["Notify desk", "Tell front desk when room is guest-ready", "hk-ready"],
    ],
  },

  accountant: {
    label: "Accounting dashboard",
    accessTitle: "Accountant access",
    accessText: "Folios, tax calculations, split bills, service charges, refunds, and closeout reports.",
    greeting: (name) => `Good evening, ${name}. Folios are organized.`,
    summary:
      "An accounting view for guest folios, posted service charges, taxes, refunds, split bills, and daily close monitoring.",
    portalTitle: "Review billing and folios",
    notificationBadge: "Finance queue",
    notificationTitle: "Billing alerts",
    kpis: [
      ["Open folios", "64", "12 checkouts need review before close.", "Action needed"],
      ["POS charges", "$3.8K", "Spa and café postings synced to rooms.", "Reconciled"],
      ["Refunds", "3 pending", "Cancellation fee exceptions require approval.", "Review"],
    ],
    notices: [
      ["Split bill", "Group account requested separate company invoice."],
      ["Tax check", "City tax rule applied to 37 active reservations."],
      ["Folio close", "Room 1208 pending café charge confirmation."],
    ],
    actions: [
      ["Close folio", "Finalize charges after checkout", "acct-close"],
      ["Split bill", "Separate personal and company charges", "acct-split"],
      ["Export report", "Prepare daily revenue and tax report", "acct-export"],
    ],
  },

  cafeStaff: {
    label: "Café staff dashboard",
    accessTitle: "Café staff access",
    accessText: "Post-to-room charges, café orders, room dining requests, and POS bridge status.",
    greeting: (name) => `Good evening, ${name}. Café orders are live.`,
    summary:
      "A café and room-dining view for posting charges to rooms, monitoring POS bridge activity, and coordinating guest orders.",
    portalTitle: "Manage café and room dining",
    notificationBadge: "Café board",
    notificationTitle: "Order alerts",
    kpis: [
      ["Room dining", "14 orders", "4 scheduled breakfast trays for suites.", "Active"],
      ["POS bridge", "Online", "Charges can post directly to guest folios.", "Connected"],
      ["Pending posts", "$428", "Awaiting room validation for 3 orders.", "Check"],
    ],
    notices: [
      ["Room 1208", "Vegetarian breakfast preference saved."],
      ["Room 905", "Café charge needs guest signature confirmation."],
      ["Service timing", "VIP tray requested before 08:30."],
    ],
    actions: [
      ["Post charge", "Send café POS amount to room folio", "cafe-post"],
      ["Prepare order", "Coordinate breakfast and room dining", "cafe-prepare"],
      ["Confirm guest", "Validate room number before posting", "cafe-confirm"],
    ],
  },

  itAdmin: {
    label: "IT administrator dashboard",
    accessTitle: "IT administrator access",
    accessText: "User roles, permissions, security settings, backups, uptime, and system configuration.",
    greeting: (name) => `Good evening, ${name}. Systems are stable.`,
    summary:
      "An IT administration view for role permissions, security posture, integrations, backups, uptime, and privacy controls.",
    portalTitle: "Manage system configuration",
    notificationBadge: "System health",
    notificationTitle: "Admin alerts",
    kpis: [
      ["Uptime", "99.9%", "Monitoring target aligned with SRS non-functional requirements.", "Healthy"],
      ["Roles", "7 active", "Guest, manager, front desk, housekeeping, accounting, café, IT.", "RBAC"],
      ["Backups", "Last run 02:00", "Daily backup and recovery signals ready.", "Protected"],
    ],
    notices: [
      ["Permission review", "Manager role requested report export access."],
      ["Security", "Encryption and privacy controls marked active."],
      ["Integration", "POS bridge heartbeat received 3 minutes ago."],
    ],
    actions: [
      ["Edit roles", "Adjust permissions by hotel department", "it-roles"],
      ["Check backup", "Review last successful backup window", "it-backup"],
      ["Audit access", "Review login activity and privacy requests", "it-audit"],
    ],
  },
};

const roleWorkspaces = {
  manager: `

    <div class="workspace-panel workspace-panel-feature">
      <span class="status gold">Manager-only controls</span>
      <h3>Operational editor</h3>
      <p>Adjust the live dashboard signals, publish a staff notice, approve security flags, and keep audit notes visible for leadership.</p>
      <form class="form-grid compact-form" data-manager-editor>
      
        <div class="field-row">
          <div class="field">
            <label for="manager-occupancy">Occupancy</label>
            <input id="manager-occupancy" data-edit-target="occupancy" type="text" value="86%" />
          </div>

          <div class="field">
            <label for="manager-revenue">Revenue forecast</label>
            <input id="manager-revenue" data-edit-target="revenue" type="text" value="$48.2K" />
          </div>

        </div>

        <div class="field">
          <label for="manager-notice">Hotel-wide notice</label>
          <textarea id="manager-notice" data-edit-target="notice">Tonight’s terrace dinner has high demand. Prioritize VIP arrivals and café capacity.</textarea>
        </div>

        <button class="btn btn-primary" type="button" data-role-control="manager-apply">Apply dashboard changes</button>
        <p class="form-message" data-workspace-message aria-live="polite"></p>
      </form>
    </div>

    <div class="control-grid">
      <article class="control-card">
        <span class="label">Staff role</span>
        <h3>Permission review</h3>
        <p>Managers can oversee staff-role access without exposing guest-only portal tools.</p>
        <select aria-label="Staff role to review" data-staff-shift>
          <option>Front desk coverage</option>
          <option>Housekeeping supervisor</option>
          <option>Accounting close team</option>
          <option>Café POS operator</option>
        </select>
        <button class="btn btn-soft" type="button" data-role-control="manager-staff">Approve staffing update</button>
      </article>

      <article class="control-card">
        <span class="label">Security flag</span>
        <h3>Overbooking watch</h3>
        <p>Approve a reminder for family loft inventory and waitlist risk before selling walk-ins.</p>
        <button class="btn btn-soft" type="button" data-role-control="manager-report">Refresh report</button>
        <button class="btn btn-primary" type="button" data-role-control="manager-vip">Approve VIP priority</button>
      </article>

    </div>

    <ul class="workspace-log" data-workspace-log>
      <li><strong>Audit note</strong><span>Manager workspace opened with report, role, security, and VIP controls.</span></li>
    </ul>
  `,
  frontDesk: `
    <div class="workspace-panel workspace-panel-feature">
      <span class="status gold">Front desk workspace</span>
      <h3>Reservation operations</h3>
      <p>Create, update, check in, check out, and assign rooms without showing the guest-only reservation tab.</p>
      <div class="field-row">
        <div class="field">
          <label for="desk-reservation">Reservation</label>
          <select id="desk-reservation" data-frontdesk-reservation>
            <option>RSV-1208 · Signature Suite · Confirmed</option>
            <option>RSV-0905 · Classic King · Inquiry</option>
            <option>GRP-2210 · Family Loft · Waitlist</option>
          </select>
        </div>
        <div class="field">
          <label for="desk-room">Room assignment</label>
          <select id="desk-room" data-frontdesk-room>
            <option>1208 · Inspecting</option>
            <option>1002 · Ready</option>
            <option>0814 · Dirty</option>
          </select>
        </div>
      </div>
      <div class="control-grid">
        <button class="control-card action-card" type="button" data-role-control="frontdesk-checkin">
          <span class="label">State change</span><strong>Check guest in</strong><small>Confirmed → Checked in</small>
        </button>
        <button class="control-card action-card" type="button" data-role-control="frontdesk-assign">
          <span class="label">Allocation</span><strong>Assign best room</strong><small>Match readiness and preference</small>
        </button>
        <button class="control-card action-card" type="button" data-role-control="frontdesk-message">
          <span class="label">Guest message</span><strong>Send arrival update</strong><small>Notify with room timing</small>
        </button>
      </div>
      <p class="form-message" data-workspace-message aria-live="polite"></p>
    </div>
    <ul class="workspace-log" data-workspace-log>
      <li><strong>Desk queue</strong><span>42 arrivals, 8 early check-in checks, and 4 walk-ins are ready for action.</span></li>
    </ul>
  `,
  housekeeper: `
    <div class="workspace-panel workspace-panel-feature">
      <span class="status gold">Housekeeping workspace</span>
      <h3>Room status board</h3>
      <p>Update cleaning, inspection, and maintenance statuses so front desk sees reliable room readiness.</p>
      <div class="field-row">
        <div class="field">
          <label for="hk-room">Room</label>
          <select id="hk-room" data-housekeeping-room>
            <option>1208 · VIP setup</option>
            <option>801 · Hypoallergenic bedding</option>
            <option>414 · Maintenance light</option>
          </select>
        </div>
        <div class="field">
          <label for="hk-status">New status</label>
          <select id="hk-status" data-housekeeping-status>
            <option>Cleaned · awaiting inspection</option>
            <option>Guest-ready</option>
            <option>Maintenance required</option>
            <option>Out of order</option>
          </select>
        </div>
      </div>
      <div class="control-grid">
        <button class="control-card action-card" type="button" data-role-control="hk-clean">
          <span class="label">Cleaning</span><strong>Mark room clean</strong><small>Dirty → Inspecting</small>
        </button>
        <button class="control-card action-card" type="button" data-role-control="hk-repair">
          <span class="label">Maintenance</span><strong>Create repair flag</strong><small>Alert operations team</small>
        </button>
        <button class="control-card action-card" type="button" data-role-control="hk-ready">
          <span class="label">Front desk</span><strong>Notify room ready</strong><small>Release room for arrival</small>
        </button>
      </div>
      <p class="form-message" data-workspace-message aria-live="polite"></p>
    </div>
    <ul class="workspace-log" data-workspace-log>
      <li><strong>Priority</strong><span>Room 1208 needs VIP setup before supervisor inspection.</span></li>
    </ul>
  `,
  accountant: `
    <div class="workspace-panel workspace-panel-feature">
      <span class="status gold">Accounting workspace</span>
      <h3>Billing control center</h3>
      <p>Review folios, refunds, taxes, split bills, and close reports as accounting tasks, not as a guest folio preview.</p>
      <div class="field-row">
        <div class="field">
          <label for="acct-folio">Finance task</label>
          <select id="acct-folio" data-accounting-task>
            <option>Room 1208 · café posting pending</option>
            <option>Group account · split invoice</option>
            <option>Cancellation exception · refund approval</option>
          </select>
        </div>
        <div class="field">
          <label for="acct-period">Report period</label>
          <select id="acct-period" data-accounting-period>
            <option>Daily close</option>
            <option>Monthly balance sheet</option>
            <option>Yearly summary</option>
          </select>
        </div>
      </div>
      <div class="control-grid">
        <button class="control-card action-card" type="button" data-role-control="acct-close">
          <span class="label">Closeout</span><strong>Close reviewed folio</strong><small>Finalize after checkout</small>
        </button>
        <button class="control-card action-card" type="button" data-role-control="acct-split">
          <span class="label">Invoice</span><strong>Prepare split bill</strong><small>Separate company and personal charges</small>
        </button>
        <button class="control-card action-card" type="button" data-role-control="acct-export">
          <span class="label">Reports</span><strong>Announce report</strong><small>Send summary to manager</small>
        </button>
      </div>
      <p class="form-message" data-workspace-message aria-live="polite"></p>
    </div>
    <ul class="workspace-log" data-workspace-log>
      <li><strong>Finance queue</strong><span>Refund overrides and POS postings remain visible for audit review.</span></li>
    </ul>
  `,
  cafeStaff: `
    <div class="workspace-panel workspace-panel-feature">
      <span class="status gold">Café workspace</span>
      <h3>POS bridge</h3>
      <p>Post room-dining and café charges to validated rooms while keeping guest folio details private.</p>
      <div class="field-row">
        <div class="field">
          <label for="cafe-room">Room</label>
          <select id="cafe-room" data-cafe-room>
            <option>1208 · Signature Suite</option>
            <option>905 · Classic King</option>
            <option>706 · Terrace Junior Suite</option>
          </select>
        </div>
        <div class="field">
          <label for="cafe-amount">Charge amount</label>
          <input id="cafe-amount" data-cafe-amount type="text" value="$28.50" />
        </div>
      </div>
      <div class="control-grid">
        <button class="control-card action-card" type="button" data-role-control="cafe-post">
          <span class="label">Charge</span><strong>Post to room</strong><small>Send through POS bridge</small>
        </button>
        <button class="control-card action-card" type="button" data-role-control="cafe-prepare">
          <span class="label">Order</span><strong>Prepare tray</strong><small>Coordinate room dining</small>
        </button>
        <button class="control-card action-card" type="button" data-role-control="cafe-confirm">
          <span class="label">Validation</span><strong>Confirm guest</strong><small>Check room and signature</small>
        </button>
      </div>
      <p class="form-message" data-workspace-message aria-live="polite"></p>
    </div>
    <ul class="workspace-log" data-workspace-log>
      <li><strong>POS heartbeat</strong><span>Online bridge can post verified café charges to rooms.</span></li>
    </ul>
  `,
  itAdmin: `
    <div class="workspace-panel workspace-panel-feature">
      <span class="status gold">IT administrator workspace</span>
      <h3>Roles, permissions, and security</h3>
      <p>Configure role access, verify backups, inspect audit activity, and keep guest privacy controls protected.</p>
      <div class="permission-grid">
        <article>
          <strong>Guest</strong>
          <span>Reservation, services, folio, feedback, privacy.</span>
        </article>
        <article>
          <strong>Staff roles</strong>
          <span>Only department workspaces assigned by RBAC.</span>
        </article>
        <article>
          <strong>Manager</strong>
          <span>Reports, staff oversight, security flags, audit logs.</span>
        </article>
      </div>
      <div class="field-row">
        <div class="field">
          <label for="it-role">Role to configure</label>
          <select id="it-role" data-it-role>
            <option>Manager · reports and staff roles</option>
            <option>Front desk · reservation operations</option>
            <option>Housekeeper · room status only</option>
            <option>Accountant · billing closeout</option>
          </select>
        </div>
        <div class="field">
          <label for="it-permission">Permission change</label>
          <select id="it-permission" data-it-permission>
            <option>Grant report export</option>
            <option>Restrict privacy center</option>
            <option>Require audit approval</option>
          </select>
        </div>
      </div>
      <div class="control-grid">
        <button class="control-card action-card" type="button" data-role-control="it-roles">
          <span class="label">RBAC</span><strong>Apply permission</strong><small>Update role configuration</small>
        </button>
        <button class="control-card action-card" type="button" data-role-control="it-backup">
          <span class="label">Backup</span><strong>Run backup check</strong><small>Verify recovery readiness</small>
        </button>
        <button class="control-card action-card" type="button" data-role-control="it-audit">
          <span class="label">Audit</span><strong>Review access log</strong><small>Inspect suspicious activity</small>
        </button>
      </div>
      <p class="form-message" data-workspace-message aria-live="polite"></p>
    </div>
    <ul class="workspace-log" data-workspace-log>
      <li><strong>System note</strong><span>Staff portals are separated from guest-only reservation, services, folio, feedback, and privacy tools.</span></li>
    </ul>
  `,
};

function getPageParams() {
  const hashParams = window.location.hash.includes("=") ? window.location.hash.slice(1) : "";
  return new URLSearchParams(hashParams || window.location.search);
}

const requestedTheme = getPageParams().get("theme");
let activeTheme =
  requestedTheme === "dark" || requestedTheme === "light"
    ? requestedTheme
    : window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
document.documentElement.setAttribute("data-theme", activeTheme);

function updateThemeToggle() {
  if (!themeToggle) return;
  themeToggle.textContent = activeTheme === "dark" ? "Light mode" : "Dark mode";
  themeToggle.setAttribute("aria-label", `Switch to ${activeTheme === "dark" ? "light" : "dark"} theme`);
}

updateThemeToggle();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    activeTheme = activeTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", activeTheme);
    updateThemeToggle();
  });
}

function updateHeader() {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 24);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll(".nav-links a, .nav-actions a").forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
  });
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -4% 0px" }
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      element.classList.add("visible");
      return;
    }
    revealObserver.observe(element);
  });
  document.documentElement.classList.add("reveal-ready");
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
}

function showMessage(form, message) {
  const messageBox = form.querySelector(".form-message");
  if (!messageBox) return;
  messageBox.textContent = message;
  messageBox.classList.add("show");
}

bookingForms.forEach((form) => {
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const params = new URLSearchParams(new FormData(form));
  const destination = form.getAttribute("data-redirect") || "rooms.html";
  window.location.href = `${destination}?${params.toString()}`;
});

});

authForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let role = form.querySelector("[data-role-select]")?.value || "guest";

    if (form.dataset.authType === "register") {
      role = "guest";
    }

    const nameField = form.querySelector('[name="displayName"]');
    const firstNameField = form.querySelector('[name="firstName"]');
    const name = (nameField?.value || firstNameField?.value || "Leila").trim();
    showMessage(form, "Success. Opening your dashboard.");
    setTimeout(() => {
      const params = new URLSearchParams({ role, name, theme: activeTheme });
      window.location.href = `guest-dashboard.html#${params.toString()}`;
    }, 700);
  });
});

function updateRolePreview() {
  if (!roleSelect || !rolePreview) return;
  const profile = roleProfiles[roleSelect.value] || roleProfiles.guest;
  rolePreview.innerHTML = `<strong>${profile.accessTitle}</strong><span>${profile.accessText}</span>`;
}

if (roleSelect) {
  roleSelect.addEventListener("change", updateRolePreview);
  updateRolePreview();
}

function setGuestOnlyVisibility(activeRole) {
  const isGuest = activeRole === "guest";
  const guestWorkspace = document.querySelector("[data-guest-workspace]");
  const staffWorkspace = document.querySelector("[data-staff-workspace]");

  document.querySelectorAll("[data-guest-only-nav], [data-guest-footer]").forEach((element) => {
    element.classList.toggle("hidden", !isGuest);
    element.setAttribute("aria-hidden", String(!isGuest));
  });

  [...tabButtons, ...tabPanels].forEach((element) => {
    element.classList.toggle("hidden", !isGuest);
    element.setAttribute("aria-hidden", String(!isGuest));
  });

  if (guestWorkspace) {
    guestWorkspace.classList.toggle("hidden", !isGuest);
    guestWorkspace.setAttribute("aria-hidden", String(!isGuest));
  }

  if (!staffWorkspace) return;
  staffWorkspace.classList.toggle("hidden", isGuest);
  staffWorkspace.setAttribute("aria-hidden", String(isGuest));

  if (isGuest) {
    staffWorkspace.innerHTML = "";
    if (!document.querySelector(".tab-panel.active")) activateTab("reservation");
    return;
  }

  staffWorkspace.innerHTML = roleWorkspaces[activeRole] || "";
  tabButtons.forEach((button) => button.classList.remove("active"));
  tabPanels.forEach((panel) => panel.classList.remove("active"));

  if (["#services", "#folio", "#feedback"].includes(window.location.hash)) {
    history.replaceState(null, "", window.location.pathname);
  }
}

function renderDashboardRole() {
  const greeting = document.querySelector("[data-dashboard-greeting]");
  if (!greeting) return;
  const serverUser = window.__HOTEL_USER__;
  const params = getPageParams();

  const role  = serverUser?.role  || params.get("role")  || "guest";
  const name  = serverUser?.name  || params.get("name")  || "Guest";
  const theme = serverUser?.theme || params.get("theme") || "dark";

  const activeRole = roleProfiles[role] ? role : "guest";
  const profile    = roleProfiles[activeRole];

  document.documentElement.setAttribute("data-theme", theme);
  document.body.dataset.role = activeRole;

  const setText = (selector, text) => {
    const node = document.querySelector(selector);
    if (node) node.textContent = text;
  };

  setText("[data-role-label]", profile.label);
  setText("[data-dashboard-greeting]", profile.greeting(name));
  setText("[data-dashboard-summary]", profile.summary);
  setText("[data-portal-title]", profile.portalTitle);
  setText("[data-notification-badge]", profile.notificationBadge);
  setText("[data-notification-title]", profile.notificationTitle);

  const kpis = document.querySelector("[data-dashboard-kpis]");
  if (kpis) {
    kpis.innerHTML = profile.kpis
      .map(
        ([label, title, copy, status], index) => `
          <article class="dashboard-card reveal visible">
            <span class="label">${label}</span>
            <h3>${title}</h3>
            <p>${copy}</p>
            <span class="status ${index === 1 ? "" : "gold"}">${status}</span>
          </article>
        `
      )
      .join("");
  }

  const notices = document.querySelector("[data-notification-list]");
  if (notices) {
    notices.innerHTML = profile.notices.map(([title, copy]) => `<li><strong>${title}</strong><span>${copy}</span></li>`).join("");
  }

  const actions = document.querySelector("[data-role-actions]");
  if (actions) {
    actions.innerHTML = profile.actions
      .map(
        ([title, copy, action], index) => `
          <button class="role-action" type="button" data-role-control="${action || `${activeRole}-${index}`}">
            <strong>${title}</strong>
            <span>${copy}</span>
          </button>
        `
      )
      .join("");
  }

  setGuestOnlyVisibility(activeRole);
}

renderDashboardRole();

function updateKpiCard(index, title, copy, status) {
  const card = document.querySelectorAll("[data-dashboard-kpis] .dashboard-card")[index];
  if (!card) return;
  if (title) card.querySelector("h3").textContent = title;
  if (copy) card.querySelector("p").textContent = copy;
  if (status) card.querySelector(".status").textContent = status;
}

function showWorkspaceMessage(message) {
  const messageBox = document.querySelector("[data-workspace-message]");
  if (!messageBox) return;
  messageBox.textContent = message;
  messageBox.classList.add("show");
}

function pushWorkspaceLog(title, copy) {
  const log = document.querySelector("[data-workspace-log]");
  if (!log) return;
  const item = document.createElement("li");
  const strong = document.createElement("strong");
  const span = document.createElement("span");
  strong.textContent = title;
  span.textContent = copy;
  item.append(strong, span);
  log.prepend(item);
}

function handleRoleControl(action, control) {
  const activeRole = document.body.dataset.role || "guest";

  if (activeRole === "guest" && ["reservation", "services", "folio", "feedback"].includes(action)) {
    if (activateTab(action)) {
      document.querySelector("[data-dashboard-workspace]")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return;
  }

  const messageMap = {
    "manager-report": ["Report refreshed", "Occupancy, revenue, service quality, and security signals have been refreshed for the manager view."],
    "manager-staff": ["Staffing approved", "Staff coverage update was approved and added to the audit log."],
    "manager-vip": ["VIP priority approved", "VIP arrival setup is now marked as priority for front desk and housekeeping."],
    "frontdesk-checkin": ["Guest checked in", "Reservation state changed from confirmed to checked in."],
    "frontdesk-assign": ["Room assigned", "The best available room was matched to readiness, type, and guest preference."],
    "frontdesk-message": ["Guest notified", "Arrival update was sent to the selected guest profile."],
    "hk-clean": ["Room marked clean", "Room status moved to cleaned and awaiting inspection."],
    "hk-repair": ["Repair flag created", "Maintenance alert was created and visible to operations."],
    "hk-ready": ["Front desk notified", "Room readiness signal was sent to front desk."],
    "acct-close": ["Folio closed", "Reviewed charges were finalized for checkout closeout."],
    "acct-split": ["Split bill prepared", "Company and personal charges were separated for invoice review."],
    "acct-export": ["Report announced", "Daily close summary was prepared for manager approval."],
    "cafe-post": ["Charge posted", "Validated café charge was sent through the POS bridge."],
    "cafe-prepare": ["Order prepared", "Room-dining tray status moved to preparation."],
    "cafe-confirm": ["Guest confirmed", "Room number and guest signature status were validated."],
    "it-roles": ["Permission applied", "Role permission configuration was updated in the RBAC preview."],
    "it-backup": ["Backup checked", "Recovery readiness signal was verified for the latest backup window."],
    "it-audit": ["Audit reviewed", "Access activity was reviewed and logged for security follow-up."],
  };

  if (action === "manager-apply") {
    const occupancy = document.querySelector("[data-edit-target='occupancy']")?.value.trim() || "86%";
    const revenue = document.querySelector("[data-edit-target='revenue']")?.value.trim() || "$48.2K";
    const notice = document.querySelector("[data-edit-target='notice']")?.value.trim();
    updateKpiCard(0, occupancy, "Manager-updated occupancy signal with arrivals, departures, and VIP stays.", "Updated");
    updateKpiCard(1, revenue, "Manager-updated revenue forecast across rooms, café, spa, and services.", "Updated");
    const firstNotice = document.querySelector("[data-notification-list] li span");
    if (firstNotice && notice) firstNotice.textContent = notice;
    showWorkspaceMessage("Dashboard information updated. Occupancy, revenue, and notice text now reflect the manager edits.");
    pushWorkspaceLog("Dashboard edited", `Occupancy set to ${occupancy}; revenue set to ${revenue}.`);
    return;
  }

  const [title, copy] = messageMap[action] || ["Action complete", "The workspace state was updated."];
  showWorkspaceMessage(copy);
  pushWorkspaceLog(title, copy);

  if (action === "frontdesk-checkin") updateKpiCard(0, "41 remaining", "One arrival moved from confirmed to checked in.", "Updated");
  if (action === "frontdesk-assign") updateKpiCard(1, "32 ready", "One inspecting room was assigned and released for check-in.", "Assigned");
  if (action === "hk-clean") updateKpiCard(0, "17 rooms", "One priority room moved from cleaning to inspection.", "Updated");
  if (action === "hk-ready") updateKpiCard(1, "8 pending", "One inspected room was released to front desk.", "Ready");
  if (action === "acct-export") updateKpiCard(2, "Report sent", "Monthly or daily report announced to manager/owner.", "Delivered");
  if (action === "cafe-post") {
    const amount = document.querySelector("[data-cafe-amount]")?.value.trim() || "$28.50";
    const room = document.querySelector("[data-cafe-room]")?.value.split("·")[0].trim() || "selected room";
    updateKpiCard(2, amount, `Latest validated café charge posted to room ${room}.`, "Posted");
  }
  if (action === "it-backup") updateKpiCard(2, "Checked now", "Backup verification completed for recovery readiness.", "Verified");

  if (control) {
    control.classList.add("is-updated");
    setTimeout(() => control.classList.remove("is-updated"), 900);
  }
}

document.addEventListener("click", (event) => {
  const control = event.target.closest("[data-role-control]");
  if (!control) return;
  handleRoleControl(control.dataset.roleControl, control);
});

requestForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    showMessage(form, "Request received. The concierge team has been notified.");
    form.reset();
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    roomCards.forEach((card) => {
      const match = filter === "all" || card.dataset.roomType === filter;
      card.style.display = match ? "" : "none";
    });
  });
});

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activateTab(button.dataset.tab);
  });
});

function activateTab(target) {
  if (!target) return;
  let matched = false;
  tabButtons.forEach((btn) => {
    const isActive = btn.dataset.tab === target;
    matched = matched || isActive;
    btn.classList.toggle("active", isActive);
  });
  tabPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.tabPanel === target);
  });
  return matched;
}

function syncHashToTab() {
  const hash = window.location.hash.replace("#", "");
  if (!hash) return;
  const hashMap = {
    services: "services",
    folio: "folio",
    feedback: "feedback",
  };
  const target = hashMap[hash];
  if (activateTab(target)) {
    setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }
}

syncHashToTab();
window.addEventListener("hashchange", () => {
  if (window.location.hash.includes("=")) renderDashboardRole();
  syncHashToTab();
});

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});






























function initRoomsPage() {
  const user        = (() => { try { return JSON.parse(sessionStorage.getItem('hotel_user')); } catch { return null; } })();
  const isFrontDesk = user && user.role === 'frontDesk';

  const urlP      = new URLSearchParams(window.location.search);
  let   activeIn  = urlP.get('arrival')   || '';
  let   activeOut = urlP.get('departure') || '';

  if (user) {
    const loginBtn = document.getElementById('nav-login-btn');
    const regBtn   = document.getElementById('nav-register-btn');
    if (loginBtn) { loginBtn.textContent = 'Dashboard'; loginBtn.href = 'guest-dashboard.html'; }
    if (regBtn)   { regBtn.style.display = 'none'; }
  }

  if (isFrontDesk) {
    document.getElementById('fd-room-manager').classList.add('visible');
  }

  const typeImages = {
    suite  : 'assets/images/360_F_29133877_bfA2n7cWV53fto2BomyZ6pyRujJTBwjd.jpg',
    double : 'assets/images/luxury-pool.jpg',
    single : 'assets/images/depositphotos_246304748-stock-photo-hotel-bedroom-interior-bed-beige.webp',
    family : 'assets/images/photo-1611892440504-42a792e24d32.avif',
  };
  const typeLabels  = { suite: 'Suite', double: 'Double', single: 'Single', family: 'Family' };
  const statusClass = { available: 'available', occupied: 'occupied', maintenance: 'maintenance', out_of_order: 'out_of_order' };

  function reserveURL(room) {
    if (user && user.role === 'guest') {
      const p = new URLSearchParams({
        role              : 'guest',
        name              : user.name,
        pending_room_id   : room.room_id,
        pending_room_name : 'Room ' + room.room_number,
      });
      if (activeIn)  p.set('pending_check_in',  activeIn);
      if (activeOut) p.set('pending_check_out', activeOut);
      return 'guest-dashboard.html#' + p.toString();
    }
    const p = new URLSearchParams({
      room_id   : room.room_id,
      room_name : 'Room ' + room.room_number + ' (' + typeLabels[room.type] + ')',
    });
    if (activeIn)  p.set('check_in',  activeIn);
    if (activeOut) p.set('check_out', activeOut);
    return 'login.html?' + p.toString();
  }

  function renderCards(rooms) {
    const grid = document.getElementById('rooms-grid');
    if (!rooms.length) {
      grid.innerHTML = '<p style="text-align:center;padding:2rem;color:var(--clr-text-soft,#6b7280)">No available rooms found for these dates.</p>';
      return;
    }
    grid.innerHTML = rooms.map(function (r) {
      const img   = typeImages[r.type] || typeImages.single;
      const lbl   = typeLabels[r.type] || r.type;
      const avail = r.status === 'available';
      const badge = '<span class="room-status-badge ' + (statusClass[r.status] || '') + '">' + r.status.replace('_', ' ') + '</span>';
      const btn   = avail
        ? '<a class="btn btn-primary" href="' + reserveURL(r) + '">Reserve room</a>'
        : '<button class="btn btn-soft" disabled title="Not available">Not available</button>';
      return [
        '<article class="room-card reveal" data-room-type="' + r.type + '">',
        '  <img src="' + img + '" alt="' + lbl + ' room" loading="lazy" />',
        '  <div class="room-body">',
        '    <div class="room-topline">',
        '      <span class="status' + (r.type === 'suite' ? ' gold' : r.type === 'family' ? ' warn' : '') + '">' + lbl + '</span>',
        '      <span class="price">$' + parseFloat(r.price).toFixed(0) + ' / night</span>',
        '    </div>',
        '    <h3>Room ' + r.room_number + ' · ' + lbl + '</h3>',
        '    <p>' + badge + ' &nbsp; Room ' + r.room_number + ' — ' + lbl + ' room at $' + parseFloat(r.price).toFixed(2) + '/night.</p>',
        '    <div class="tags"><span class="tag">' + lbl + '</span><span class="tag">Room ' + r.room_number + '</span></div>',
        '    ' + btn,
        '  </div>',
        '</article>',
      ].join('\n');
    }).join('\n');

    document.querySelectorAll('.room-card.reveal').forEach(function (el) { el.classList.add('visible'); });
    attachFilters();
  }

  function renderFDTable(rooms) {
    const tbody = document.getElementById('fd-rooms-tbody');
    if (!tbody) return;
    if (!rooms.length) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:1rem;color:#888">No rooms found.</td></tr>';
      return;
    }
    tbody.innerHTML = rooms.map(function (r, i) {
      const sc = statusClass[r.status] || '';
      return [
        '<tr data-room-id="' + r.room_id + '">',
        '<td>' + (i + 1) + '</td>',
        '<td>' + r.room_number + '</td>',
        '<td style="text-transform:capitalize">' + r.type + '</td>',
        '<td>$' + parseFloat(r.price).toFixed(2) + '</td>',
        '<td><span class="room-status-badge ' + sc + '">' + r.status.replace('_', ' ') + '</span></td>',
        '<td>',
        '  <select class="fd-status-select" style="font-size:.78rem;padding:.2rem .4rem;border-radius:4px;border:1px solid #ccc">',
        '    <option value="available"'    + (r.status === 'available'    ? ' selected' : '') + '>Available</option>',
        '    <option value="occupied"'     + (r.status === 'occupied'     ? ' selected' : '') + '>Occupied</option>',
        '    <option value="maintenance"'  + (r.status === 'maintenance'  ? ' selected' : '') + '>Maintenance</option>',
        '    <option value="out_of_order"' + (r.status === 'out_of_order' ? ' selected' : '') + '>Out of order</option>',
        '  </select>',
        '  <button class="btn-sm btn-edit"   type="button" data-action="update" data-room-id="' + r.room_id + '" style="margin-left:.4rem">Save</button>',
        '  <button class="btn-sm btn-danger"  type="button" data-action="delete" data-room-id="' + r.room_id + '" style="margin-left:.3rem">Delete</button>',
        '</td>',
        '</tr>',
      ].join('');
    }).join('');

    tbody.querySelectorAll('[data-action]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const action = btn.dataset.action;
        const roomId = parseInt(btn.dataset.roomId);
        const row    = btn.closest('tr');

        if (action === 'delete') {
          if (!confirm('Delete room ' + roomId + '? This cannot be undone.')) return;
          apiRoom({ action: 'delete', room_id: roomId }, function (ok, msg) {
            showFDMsg(msg, ok);
            if (ok) loadRooms();
          });
        }

        if (action === 'update') {
          const sel   = row.querySelector('.fd-status-select');
          const newSt = sel ? sel.value : null;
          if (!newSt) return;
          apiRoom({ action: 'update', room_id: roomId, status: newSt }, function (ok, msg) {
            showFDMsg(msg, ok);
            if (ok) loadRooms();
          });
        }
      });
    });
  }

  function apiRoom(payload, cb) {
    fetch('php/rooms.php', {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify(payload),
    })
    .then(function (r) { return r.json(); })
    .then(function (d) { cb(d.success, d.message); })
    .catch(function ()  { cb(false, 'Network error.'); });
  }

  function showFDMsg(msg, ok) {
    const el = document.getElementById('fd-form-msg');
    if (!el) return;
    el.textContent = msg;
    el.style.color = ok ? '#065f46' : '#991b1b';
  }

  function loadRooms(checkIn, checkOut) {
    let url = 'php/rooms.php';
    if (checkIn && checkOut) {
      url += '?check_in=' + encodeURIComponent(checkIn) + '&check_out=' + encodeURIComponent(checkOut);
    }
    fetch(url)
      .then(function (r) { return r.json(); })
      .then(function (d) {
        const rooms = d.rooms || [];
        renderCards(rooms);
        if (isFrontDesk) renderFDTable(rooms);
      })
      .catch(function () {
        document.getElementById('rooms-grid').innerHTML =
          '<p style="text-align:center;padding:2rem;color:#991b1b">Failed to load rooms. Is the server running?</p>';
      });
  }

  const availForm = document.getElementById('avail-form');
  const availMsg  = document.getElementById('avail-msg');

  if (activeIn)  { const el = document.getElementById('arrival');   if (el) el.value = activeIn; }
  if (activeOut) { const el = document.getElementById('departure'); if (el) el.value = activeOut; }

  availForm.addEventListener('submit', function (e) {
    e.preventDefault();
    activeIn  = document.getElementById('arrival').value;
    activeOut = document.getElementById('departure').value;
    if (!activeIn || !activeOut) return;
    if (new Date(activeIn) >= new Date(activeOut)) {
      availMsg.textContent = 'Check-out must be after check-in.';
      return;
    }
    availMsg.textContent = 'Showing available rooms for ' + activeIn + ' → ' + activeOut;
    loadRooms(activeIn, activeOut);
  });

  if (isFrontDesk) {
    document.getElementById('fd-add-btn').addEventListener('click', function () {
      const num    = parseInt(document.getElementById('fd-num').value);
      const type   = document.getElementById('fd-type').value;
      const price  = parseFloat(document.getElementById('fd-price').value);
      const status = document.getElementById('fd-status').value;

      if (!num || !type || !price) { showFDMsg('Please fill in all fields.', false); return; }

      apiRoom({ action: 'create', room_number: num, type, price, status }, function (ok, msg) {
        showFDMsg(msg, ok);
        if (ok) {
          document.getElementById('fd-num').value   = '';
          document.getElementById('fd-price').value = '';
          loadRooms();
        }
      });
    });
  }

  function attachFilters() {
    document.querySelectorAll('[data-filter]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const filter = btn.dataset.filter;
        document.querySelectorAll('[data-filter]').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        document.querySelectorAll('[data-room-type]').forEach(function (card) {
          card.style.display = (filter === 'all' || card.dataset.roomType === filter) ? '' : 'none';
        });
      });
    });
  }

  if (activeIn && activeOut) {
    loadRooms(activeIn, activeOut);
  } else {
    loadRooms();
  }
}


/* 
   register.html
    */
function initRegisterPage() {
  const form      = document.getElementById('register-form');
  const msgEl     = document.getElementById('reg-message');
  const submitBtn = document.getElementById('register-btn');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const name     = form.name.value.trim();
    const email    = form.email.value.trim();
    const phone    = form.phone.value.trim();
    const password = form.password.value;
    const confirm  = form.confirm.value;

    if (password !== confirm) {
      msgEl.textContent = 'Passwords do not match.';
      msgEl.className   = 'form-message show';
      return;
    }

    submitBtn.disabled = true;
    msgEl.textContent  = 'Creating your account…';
    msgEl.className    = 'form-message show';

    try {
      const res  = await fetch('php/register.php', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({ name, email, phone, password }),
      });
      const data = await res.json();

      if (!data.success) {
        msgEl.textContent  = data.message || 'Registration failed.';
        submitBtn.disabled = false;
        return;
      }

      msgEl.textContent = 'Account created! Redirecting to login…';
      sessionStorage.setItem('hotel_user', JSON.stringify(data.user));

      setTimeout(function () { window.location.href = 'login.html'; }, 1000);

    } catch (err) {
      msgEl.textContent  = 'Network error. Please try again.';
      submitBtn.disabled = false;
    }
  });
}

/* nav: restore loggedin state*/
(function () {
  let user = null;
  try { user = JSON.parse(sessionStorage.getItem('hotel_user')); } catch {}
  if (!user) return;
  const loginBtn = document.getElementById('nav-login-btn');
  const regBtn   = document.getElementById('nav-register-btn');
  if (loginBtn) {
    loginBtn.textContent = 'Dashboard';
    loginBtn.href = 'guest-dashboard.html';
  }
  if (regBtn) regBtn.style.display = 'none';
})();

/* 
   Page router 
    */
(function () {
  const path = window.location.pathname;
  if (path.endsWith('rooms.html')    || path.endsWith('/rooms'))    initRoomsPage();
  if (path.endsWith('register.html') || path.endsWith('/register')) initRegisterPage();
})();
/* login.html*/
function initLoginPage() {
  const params   = new URLSearchParams(window.location.search);
  const checkIn  = params.get('check_in');
  const checkOut = params.get('check_out');
  const roomId   = params.get('room_id');
  const roomName = params.get('room_name');

  if (checkIn && checkOut) {
    const ctx = document.getElementById('booking-context');
    if (ctx) {
      ctx.style.display = 'block';
      document.getElementById('ctx-dates').textContent =
        (roomName || 'Room') + ' · ' + checkIn + ' → ' + checkOut;
    }
  }
  const form     = document.getElementById('login-form');
  const msgEl    = document.getElementById('login-message');
  const loginBtn = document.getElementById('login-btn');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    loginBtn.disabled = true;
    msgEl.textContent = 'Signing in…';
    msgEl.className   = 'form-message show';

    const email    = form.email.value.trim();
    const password = form.password.value.trim();
    const role     = form.role.value;

    try {
      const res  = await fetch('php/auth.php', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({ email, password, role }),
      });
      const data = await res.json();

      if (!data.success) {
        msgEl.textContent = data.message || 'Login failed.';
        loginBtn.disabled = false;
        return;
      }

      msgEl.textContent = 'Success! Opening your dashboard…';
      sessionStorage.setItem('hotel_user', JSON.stringify(data.user));

      const user  = data.user;
      const theme = document.documentElement.getAttribute('data-theme') || 'light';
      const up    = new URLSearchParams({ role: user.role, name: user.name, theme });
      if (user.role === 'guest' && checkIn && checkOut && roomId) {
        up.set('pending_check_in',  checkIn);
        up.set('pending_check_out', checkOut);
        up.set('pending_room_id',   roomId);
        up.set('pending_room_name', roomName || 'Room');
      }

      setTimeout(function () {
        window.location.href = 'guest-dashboard.html#' + up.toString();
      }, 700);

    } catch (err) {
      msgEl.textContent = 'Network error. Please try again.';
      loginBtn.disabled = false;
    }
  });
}


  // Page router 
(function () {
  const path = window.location.pathname;
  if (path.endsWith('rooms.html')    || path.endsWith('/rooms'))    initRoomsPage();
  if (path.endsWith('register.html') || path.endsWith('/register')) initRegisterPage();
  if (path.endsWith('login.html')    || path.endsWith('/login'))    initLoginPage();
})();



   //guest-dashboard.html 
function initDashboardPage() {

  /* ── Load user ── always prefer sessionStorage ─────────────── */
  const storedUser = (function () {
    try { return JSON.parse(sessionStorage.getItem('hotel_user')); }
    catch { return null; }
  })();

  function getHashParams() {
    const hash = window.location.hash.includes('=') ? window.location.hash.slice(1) : '';
    return new URLSearchParams(hash || '');
  }
  const hashP = getHashParams();
  if (!storedUser) {
    window.location.href = 'login.html';
    return;
  }

  const user = storedUser; 
  /* ── Log out ──────────────────────────────────────────────────── */
  document.getElementById('logout-btn').addEventListener('click', function () {
    sessionStorage.removeItem('hotel_user');
    window.location.href = 'login.html';
  });

  /* ── Role-based panel visibility ─────────────────────────────── */
  const role = user.role;

  const roleLabel = document.querySelector('[data-role-label]');
if (roleLabel) {
  const labels = {
    guest       : 'Guest dashboard',
    manager     : 'Manager dashboard',
    frontDesk   : 'Front desk dashboard',
    housekeeper : 'Housekeeping dashboard',
    accountant  : 'Accounting dashboard',
    cafeStaff   : 'Café staff dashboard',
    itAdmin     : 'IT administrator dashboard',
  };
  roleLabel.textContent = labels[role] || 'Dashboard';
}

// Update greeting
const greeting = document.querySelector('[data-dashboard-greeting]');
if (greeting) greeting.textContent = 'Good evening, ' + user.name + '.';

  if (role === 'housekeeper') {
    document.getElementById('hk-panel').classList.add('visible');
    loadHKRooms();
    loadHKHistory();
  }
  if (role === 'frontDesk') {
    document.getElementById('fd-notif-panel').classList.add('visible');
    loadFDNotifications();
  }
  if (role === 'guest' && user.id) {
    loadGuestReservations();
    handlePendingReservation();
  }

  /* ════════════════════════════════════════════════════════════════
     GUEST: pending reservation (from rooms.html reserve button)
  ════════════════════════════════════════════════════════════════ */
  function handlePendingReservation() {
    const pendingRoomId   = hashP.get('pending_room_id');
    const pendingRoomName = hashP.get('pending_room_name') || 'Selected Room';
    const pendingIn       = hashP.get('pending_check_in');
    const pendingOut      = hashP.get('pending_check_out');

    if (!pendingRoomId) return;

    const banner = document.getElementById('pending-reservation-banner');
    banner.style.display = 'block';
    document.getElementById('pending-room-info').textContent = 'Room: ' + pendingRoomName;

    if (pendingIn)  document.getElementById('pend-checkin').value  = pendingIn;
    if (pendingOut) document.getElementById('pend-checkout').value = pendingOut;

    document.getElementById('pend-confirm-btn').addEventListener('click', function () {
      const checkIn  = document.getElementById('pend-checkin').value;
      const checkOut = document.getElementById('pend-checkout').value;
      const msgEl    = document.getElementById('pend-msg');

      if (!checkIn || !checkOut) { msgEl.textContent = 'Please select check-in and check-out dates.'; return; }
      if (new Date(checkIn) >= new Date(checkOut)) { msgEl.textContent = 'Check-out must be after check-in.'; return; }

      msgEl.textContent = 'Processing reservation…';

      fetch('php/reservations.php', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({
          action         : 'create',
          guest_id       : user.id,
          room_id        : parseInt(pendingRoomId),
          check_in_date  : checkIn,
          check_out_date : checkOut,
        }),
      })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d.success) {
          msgEl.style.color  = '#065f46';
          msgEl.textContent  = 'Reservation confirmed! ' + d.nights + ' nights · $' + d.total_price;
          banner.style.background = '#065f46';
          loadGuestReservations();
          updateKPI(pendingRoomName, checkIn + ' → ' + checkOut, 'Confirmed');
        } else {
          msgEl.style.color = '#991b1b';
          msgEl.textContent = d.message || 'Reservation failed.';
        }
      })
      .catch(function () {
        msgEl.style.color = '#991b1b';
        msgEl.textContent = 'Network error. Please try again.';
      });
    });
  }

  function updateKPI(title, body, status) {
    const kpiTitle  = document.getElementById('kpi-res-title');
    const kpiBody   = document.getElementById('kpi-res-body');
    const kpiStatus = document.getElementById('kpi-res-status');
    if (kpiTitle)  kpiTitle.textContent  = title;
    if (kpiBody)   kpiBody.textContent   = body;
    if (kpiStatus) kpiStatus.textContent = status;
  }

  /* ════════════════════════════════════════════════════════════════
     GUEST: load my reservations
  ════════════════════════════════════════════════════════════════ */
  function loadGuestReservations() {
    if (!user.id) return;
    fetch('php/reservations.php?guest_id=' + user.id)
      .then(function (r) { return r.json(); })
      .then(function (d) {
        const list = document.getElementById('my-reservations');
        const res  = d.reservations || [];

        if (!res.length) {
          list.innerHTML = '<p style="color:var(--clr-text-soft,#6b7280)">No reservations yet. <a href="rooms.html">Browse rooms →</a></p>';
          return;
        }

        list.innerHTML = res.map(function (r) {
          const badge = '<span class="res-badge ' + r.status + '">' + r.status.replace('_', ' ') + '</span>';
          return [
            '<div class="res-card">',
            '<h4>Room ' + r.room_number + ' · ' + r.type + ' ' + badge + '</h4>',
            '<p>Check-in: ' + r.check_in_date + '  &nbsp;·&nbsp;  Check-out: ' + r.check_out_date + '</p>',
            '<p>Total: $' + parseFloat(r.total_price).toFixed(2) + '  &nbsp;·&nbsp;  Room status: <span class="rs-badge rs-' + r.room_status + '">' + (r.room_status || '').replace('_', ' ') + '</span></p>',
            r.status === 'confirmed'
              ? '<button class="btn btn-soft" style="margin-top:.4rem;font-size:.78rem;padding:.28rem .7rem" type="button" data-cancel-id="' + r.reservation_id + '">Cancel reservation</button>'
              : '',
            '</div>',
          ].join('');
        }).join('');

        // Wire cancel buttons
        list.querySelectorAll('[data-cancel-id]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            if (!confirm('Cancel this reservation?')) return;
            fetch('php/reservations.php', {
              method : 'POST',
              headers: { 'Content-Type': 'application/json' },
              body   : JSON.stringify({ action: 'cancel', reservation_id: parseInt(btn.dataset.cancelId), guest_id: user.id }),
            })
            .then(function (r) { return r.json(); })
            .then(function (d) { alert(d.message); if (d.success) loadGuestReservations(); });
          });
        });

        // Update KPI with first confirmed reservation
        const first = res.find(function (r) { return r.status === 'confirmed'; });
        if (first) {
          updateKPI(
            'Room ' + first.room_number + ' · ' + first.type,
            first.check_in_date + ' → ' + first.check_out_date,
            'Confirmed'
          );
        }
      })
      .catch(function () {
        document.getElementById('my-reservations').innerHTML =
          '<p style="color:#991b1b">Failed to load reservations.</p>';
      });
  }

  /* ════════════════════════════════════════════════════════════════
     HOUSEKEEPER: room dropdown + notification history
  ════════════════════════════════════════════════════════════════ */
  function loadHKRooms() {
    fetch('php/rooms.php')
      .then(function (r) { return r.json(); })
      .then(function (d) {
        const sel   = document.getElementById('hk-room-sel');
        const rooms = d.rooms || [];
        sel.innerHTML = rooms.map(function (r) {
          return '<option value="' + r.room_id + '">Room ' + r.room_number + ' (' + r.type + ') — ' + r.status + '</option>';
        }).join('');
      });
  }

  function loadHKHistory() {
    if (!user.id) return;
    fetch('php/notifications.php?staff_id=' + user.id)
      .then(function (r) { return r.json(); })
      .then(function (d) {
        const hist   = document.getElementById('hk-history');
        const notifs = d.notifications || [];

        if (!notifs.length) {
          hist.innerHTML = '<p style="color:var(--clr-text-soft,#6b7280)">No notifications sent yet.</p>';
          return;
        }

        hist.innerHTML = notifs.map(function (n) {
          const applied   = n.is_applied   == 1;
          const dismissed = n.is_dismissed == 1;
          return [
            '<div class="notif-item">',
            '<h4>Room ' + n.room_number + ' · ' + (n.new_status || '').replace('_', ' ') + '</h4>',
            '<p>' + (n.message || 'No message') + '</p>',
            '<p style="font-size:.75rem">Sent: ' + n.sent_at + ' &nbsp;·&nbsp; ',
            applied
              ? '<span style="color:#065f46">✓ Applied by front desk</span>'
              : (dismissed
                  ? '<span style="color:#374151">Dismissed</span>'
                  : '<span style="color:#92400e">Pending review</span>'),
            '</p>',
            '</div>',
          ].join('');
        }).join('');
      });
  }

  // Housekeeper send notification
  const hkSendBtn = document.getElementById('hk-send-btn');
  if (hkSendBtn) {
    hkSendBtn.addEventListener('click', function () {
      const roomId    = document.getElementById('hk-room-sel').value;
      const newStatus = document.getElementById('hk-new-status').value;
      const message   = document.getElementById('hk-message').value;
      const msgEl     = document.getElementById('hk-notif-msg');

      if (!roomId) { msgEl.textContent = 'Please select a room.'; return; }

      fetch('php/notifications.php', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({ action: 'send', staff_id: user.id, room_id: parseInt(roomId), new_status: newStatus, message }),
      })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        msgEl.style.color = d.success ? '#065f46' : '#991b1b';
        msgEl.textContent = d.message;
        if (d.success) {
          document.getElementById('hk-message').value = '';
          loadHKHistory();
        }
      })
      .catch(function () { msgEl.textContent = 'Network error.'; });
    });
  }

  /* ════════════════════════════════════════════════════════════════
     FRONT DESK: notification inbox
  ════════════════════════════════════════════════════════════════ */
  function loadFDNotifications() {
    fetch('php/notifications.php')
      .then(function (r) { return r.json(); })
      .then(function (d) {
        const list   = document.getElementById('fd-notif-list');
        const notifs = d.notifications || [];

        if (!notifs.length) {
          list.innerHTML = '<p style="color:var(--clr-text-soft,#6b7280)">No pending notifications from housekeeping.</p>';
          return;
        }

        list.innerHTML = notifs.map(function (n) {
          return [
            '<div class="notif-item" data-notif-id="' + n.notification_id + '">',
            '<h4>Room ' + n.room_number + ' (' + n.room_type + ') — ' + (n.new_status || '').replace('_', ' ') + '</h4>',
            '<p>Notified by: <strong>' + n.staff_name + '</strong> · ' + n.sent_at + '</p>',
            '<p>' + (n.message || 'No additional message') + '</p>',
            '<p>Current room status: <span class="rs-badge rs-' + n.current_status + '">' + (n.current_status || '').replace('_', ' ') + '</span></p>',
            '<div class="notif-actions">',
            '<button class="btn-sm btn-accept"  type="button" data-notif-action="apply"   data-notif-id="' + n.notification_id + '">✓ Apply status change</button>',
            '<button class="btn-sm btn-dismiss" type="button" data-notif-action="dismiss" data-notif-id="' + n.notification_id + '">Dismiss</button>',
            '</div>',
            '</div>',
          ].join('');
        }).join('');

        // Wire actions
        list.querySelectorAll('[data-notif-action]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            const action  = btn.dataset.notifAction;
            const notifId = parseInt(btn.dataset.notifId);

            fetch('php/notifications.php', {
              method : 'POST',
              headers: { 'Content-Type': 'application/json' },
              body   : JSON.stringify({ action, notification_id: notifId }),
            })
            .then(function (r) { return r.json(); })
            .then(function (d) {
              alert(d.message);
              if (d.success) loadFDNotifications();
            });
          });
        });
      })
      .catch(function () {
        document.getElementById('fd-notif-list').innerHTML =
          '<p style="color:#991b1b">Failed to load notifications.</p>';
      });
  }

}