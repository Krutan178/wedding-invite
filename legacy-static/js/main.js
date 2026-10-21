/* ============================================================
   AARAV & DIYA — scroll effects, parallax, envelope, countdown
   ============================================================ */

/* ------------------ EDIT ME: all site details ------------------ */
const WEDDING = {
  dateISO: "2027-02-14T10:30:00+05:30",   // countdown target
  mapsUrl: "https://maps.google.com/?q=The+Grand+Utsav+Palace+Jaipur",
  whatsapp: "919999999999",               // RSVP number (country code + number)
};
document.getElementById("maps-link").href = WEDDING.mapsUrl;
document.getElementById("rsvp-link").href =
  `https://wa.me/${WEDDING.whatsapp}?text=` +
  encodeURIComponent("Yay! Count me in for Aarav & Diya's wedding! 💛");
/* ---------------------------------------------------------------- */

/* ---------- envelope opening ---------- */
const envelope = document.getElementById("envelope-screen");
const openBtn = document.getElementById("open-btn");

openBtn.addEventListener("click", () => {
  envelope.classList.add("opening");          // flap flips, card slides out
  setTimeout(() => {
    envelope.classList.add("opened");         // fade whole screen away
    document.body.style.overflow = "";
    celebrationBurst();                       // a welcome popper 🎉
  }, 900);
});
document.body.style.overflow = "hidden";      // lock scroll behind envelope

/* for the fallback click anywhere */
envelope.addEventListener("click", (e) => {
  if (e.target === envelope || e.target.classList.contains("tap-hint")) openBtn.click();
});

/* ---------- reveal on scroll ---------- */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        io.unobserve(en.target);
      }
    });
  },
  { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* stagger photo clip-reveals */
const clipIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        const img = en.target;
        const wrap = img.closest(".photo-wrap");
        const wraps = [...document.querySelectorAll(".photo-wrap")];
        const delay = (wraps.indexOf(wrap) % 2) * 160;
        setTimeout(() => img.classList.add("big"), delay);
        clipIO.unobserve(img);
      }
    });
  },
  { threshold: 0.35 }
);
document.querySelectorAll(".clip-reveal").forEach((img) => clipIO.observe(img));

/* ---------- scroll-linked parallax (names, hints) ---------- */
const parallaxEls = [...document.querySelectorAll("[data-parallax]")];
const names = document.querySelectorAll(".hero-names .name");

let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const y = window.scrollY;
    const vh = window.innerHeight;

    // hero elements drift at different speeds for depth
    parallaxEls.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax);
      const move = Math.min(y, vh) * speed;
      // names: slide inward on first scroll, then parallax up
      el.style.transform = `translateY(${-move}px)`;
    });

    // names slide toward each other as you start scrolling
    const slide = Math.min(y / (vh * 0.55), 1) * 70;
    if (names[0]) names[0].style.transform = `translateX(${-slide}px) translateY(${y * 0.25}px)`;
    if (names[2]) names[2].style.transform = `translateX(${slide}px) translateY(${y * 0.25}px)`;
    if (names[1]) names[1].style.transform = `translateY(${y * 0.12}px)`;

    // gallery photos gently drift while scrolling over them
    document.querySelectorAll(".photo-wrap").forEach((wrap) => {
      const r = wrap.getBoundingClientRect();
      const over = (vh - r.top) / (vh + r.height); // 0..1 as it crosses screen
      if (over > -0.2 && over < 1.2) {
        const drift = (over - 0.5) * 34;
        wrap.style.translate = `0 ${drift}px`;
      }
    });

    ticking = false;
  });
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- countdown ---------- */
const target = new Date(WEDDING.dateISO).getTime();
const doneMsg = document.getElementById("countdown-done");
const pad = (n) => String(n).padStart(2, "0");

function tickCountdown() {
  const diff = target - Date.now();
  if (diff <= 0) {
    doneMsg.hidden = false;
    document.getElementById("countdown").style.display = "none";
    clearInterval(cdTimer);
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  const boxes = {
    "cd-days": d, "cd-hours": pad(h), "cd-mins": pad(m), "cd-secs": pad(s),
  };
  for (const [id, val] of Object.entries(boxes)) {
    const el = document.getElementById(id);
    const str = String(val);
    if (str !== el.dataset.val) {
      el.dataset.val = str;
      el.textContent = str;
      el.classList.remove("pop");
      void el.offsetWidth;              // restart animation
      el.classList.add("pop");
    }
  }
}
const cdTimer = setInterval(tickCountdown, 1000);
tickCountdown();

/* ---------- party popper bursts (shared by scratch.js) ---------- */
function partyPopper(xRatio = 0.15, yRatio = 0.85) {
  if (typeof confetti !== "function") return; // library missing — skip gracefully

  const origin = { x: xRatio, y: yRatio };
  // the "pop" cone
  confetti({
    particleCount: 90,
    spread: 75,
    startVelocity: 42,
    angle: xRatio < 0.5 ? 60 : 120,
    origin,
    colors: ["#c2a14d", "#a8842c", "#8a3324", "#f3ead7", "#fffdf6"],
    shapes: ["square", "circle", "star"],
    scalar: 1.15,
    ticks: 230,
  });
  // a second whip of streamers
  setTimeout(() => {
    confetti({
      particleCount: 55,
      spread: 100,
      angle: xRatio < 0.5 ? 70 : 110,
      origin,
      colors: ["#c2a14d", "#8a3324", "#e8d9a8"],
      shapes: ["circle"],
      scalar: 0.8,
    });
  }, 180);
}

function celebrationBurst() {
  if (typeof confetti !== "function") return;
  partyPopper(0.12, 0.9);
  setTimeout(() => partyPopper(0.88, 0.9), 350);
  setTimeout(() => {
    confetti({
      particleCount: 70,
      spread: 120,
      startVelocity: 30,
      origin: { y: 0.6 },
      colors: ["#c2a14d", "#f3ead7", "#8a3324"],
      shapes: ["circle"],
      scalar: 0.9,
    });
  }, 700);
}

const popperBtn = document.getElementById("popper-btn");
let popperSide = 0.12;                                  // fire from left first
popperBtn.addEventListener("click", () => {
  partyPopper(popperSide, 0.88);
  popperSide = popperSide < 0.5 ? 0.88 : 0.12;          // alternate corners 🎉
});
