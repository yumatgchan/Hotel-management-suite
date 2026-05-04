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
 
    <div class="workspace-panel workspace-panel-feature" style="margin-top:1rem">
      <span class="status gold">Manage Services</span>
      <h3>Add New Service</h3>
      <p>Add a new service to the system so guests can request it from their portal.</p>
      <div class="field-row">
        <div class="field">
          <label for="new-service-name">Service name</label>
          <input id="new-service-name" type="text" placeholder="e.g. Airport Pickup" />
        </div>
        <div class="field">
          <label for="new-service-price">Price ($)</label>
          <input id="new-service-price" type="number" placeholder="e.g. 50" />
        </div>
      </div>
      <button class="btn btn-primary" type="button" data-role-control="manager-add-service">Add Service</button>
      <p class="form-message" data-manage-service-message aria-live="polite"></p>
      <div id="manager-services-list" style="margin-top:1rem"></div>
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
 
  if (action === "manager-add-service") {
    console.log("manager-add-service fired!");
    
    const workspace = document.querySelector("[data-staff-workspace]");
    const nameInput = workspace?.querySelector("#new-service-name");
    const priceInput = workspace?.querySelector("#new-service-price");
    const msgEl = workspace?.querySelector("[data-manage-service-message]");

    const name = nameInput?.value.trim();
    const price = priceInput?.value.trim();
    
    console.log("Name:", name, "Price:", price);

    if (!name || !price) {
      if (msgEl) { msgEl.textContent = "❌ Please enter service name and price."; msgEl.classList.add("show"); }
      return;
    }

    fetch(window.location.origin + "/hotel_project/api/services.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, price: parseFloat(price) })
    })
    .then(res => res.json())
    .then(data => {
      console.log("Response:", data);
      if (data.success) {
        alert("✅ Service added successfully!");
        if (nameInput) nameInput.value = "";
        if (priceInput) priceInput.value = "";
        loadManagerServices();
      } else {
        if (msgEl) { msgEl.textContent = "❌ " + (data.error || "Error occurred"); msgEl.classList.add("show"); }
      }
    })
    .catch((err) => {
  console.log("Add service error:", err);
  });
    return;
}
 
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
 
 
function loadServices() {
  fetch(window.location.origin + "/hotel_project/api/services.php")
    .then(res => res.json())
    .then(services => {
      const select = document.getElementById("service-type");
      if (!select) return;
 
      console.log("Services from DB:", services);
 
      select.innerHTML = services.map(s => 
        `<option value="${s.service_id}">${s.name} — $${s.price}</option>`
      ).join("");
 
      attachServiceFormListener();
    })
    .catch(err => console.error("Failed to load services:", err));
}
 
function attachServiceFormListener() {
  const form = document.querySelector("[data-service-form]");
  if (!form) {
    console.log("Form not found!");
    return;
  }
 
  // if (form.dataset.listenerAttached) return;
  // form.dataset.listenerAttached = "true";
 
  console.log("Listener attached ✅");
 
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    console.log("SUBMIT FIRED!");
 
    const select = document.getElementById("service-type");
    const serviceId = select.value;
    const messageEl = document.querySelector("#services .form-message");
 
    console.log("Service ID:", serviceId);
 
    messageEl.textContent = "Sending...";
    messageEl.classList.add("show");
 
    fetch(window.location.origin + "/hotel_project/api/reservation_services.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reservation_id: 1,
        service_id: serviceId,
        quantity: 1,
        service_date: new Date().toISOString().split("T")[0]
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log("Response:", data);
      if (data.success) {
        messageEl.textContent = "✅ Service requested successfully!";
        loadBookedServices();
 
function loadManagerServices() {
  const container = document.querySelector("[data-staff-workspace] #manager-services-list");
  if (!container) return;
 
  fetch(window.location.origin + "/hotel_project/api/services.php")
    .then(res => res.json())
    .then(services => {
      if (!Array.isArray(services) || services.length === 0) {
        container.innerHTML = "<p>No services yet.</p>";
        return;
      }
      container.innerHTML = `
        <ul class="notification-list">
          ${services.map(s => `
            <li>
              <strong>${s.name}</strong>
              <span>$${s.price}</span>
            </li>
          `).join("")}
        </ul>`;
    })
    .catch(err => console.error("loadManagerServices error:", err));
}
      } else {
        messageEl.textContent = "❌ " + (data.error || "Error occurred");
      }
    })
    .catch(err => {
      console.log("Fetch error:", err);
      messageEl.textContent = "❌ Connection error.";
    });
  });
}
 
loadServices();
 
function loadBookedServices() {
  fetch(window.location.origin + "/hotel_project/api/reservation_services.php?reservation_id=1")
    .then(res => res.json())
    .then(services => {
      const container = document.getElementById("booked-services");
      if (!container) return;
 
      // تأكد إن services array
      if (!Array.isArray(services)) {
        console.error("Expected array but got:", services);
        return;
      }
 
      if (services.length === 0) {
        container.innerHTML = "<p>No services requested yet.</p>";
        return;
      }
 
      container.innerHTML = `
        <ul class="notification-list">
          ${services.map(s => `
            <li>
              <strong>${s.name}</strong>
              <span>$${s.price} · ${s.service_date}</span>
              <button class="btn btn-soft" onclick="removeService(${s.id})" style="margin-top:0.5rem">
                Remove
              </button>
            </li>
          `).join("")}
        </ul>`;
    })
    .catch(err => console.error("loadBookedServices error:", err));
}
 
function removeService(id) {
  fetch(window.location.origin + "/hotel_project/api/reservation_services.php", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id })
  })
  .then(res => res.json())
  .then(() => loadBookedServices());
}
 
loadBookedServices();
 
document.addEventListener("DOMContentLoaded", function() {
  const feedbackForm = document.querySelector("[data-feedback-form]");
  if (!feedbackForm) return;
 
  feedbackForm.addEventListener("submit", function(e) {
    e.preventDefault();
    console.log("Feedback SUBMIT FIRED!");
 
    const score = document.getElementById("feedback-score").value;
    const notes = document.getElementById("feedback-notes").value;
    const messageEl = this.querySelector(".form-message");
    const rating = parseInt(score.charAt(0));
 
    messageEl.textContent = "Sending...";
    messageEl.classList.add("show");
 
    fetch(window.location.origin + "/hotel_project/api/feedback.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guest_id: 1,
        message: notes,
        rating: rating
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log("Feedback response:", data);
      if (data.success) {
        messageEl.textContent = "✅ Feedback submitted. Thank you!";
        this.reset();
      } else {
        messageEl.textContent = "❌ " + (data.error || "Error occurred");
      }
    })
    .catch(err => {
      console.log("Feedback error:", err);
      messageEl.textContent = "❌ Connection error.";
    });
  });
});