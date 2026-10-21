/* ============================================================
   AMBIENT EFFECTS
   falling marigold petals, fireflies, sparkle cursor trail,
   scroll progress bar, guest personalisation, music toggle
   ============================================================ */
(function () {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- guest personalisation: index.html?guest=Your+Name ---------- */
  const guest = new URLSearchParams(location.search).get("guest");
  if (guest) {
    document.getElementById("env-guest").textContent = guest;
    document.title = `${guest} · Aarav & Diya — Wedding Invitation`;
  }

  /* ---------- scroll progress bar ---------- */
  const bar = document.getElementById("scroll-progress");
  function updateBar() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  }
  window.addEventListener("scroll", updateBar, { passive: true });
  window.addEventListener("resize", updateBar);
  updateBar();

  /* ---------- music toggle ---------- */
  const music = document.getElementById("bg-music");
  const musicBtn = document.getElementById("music-btn");
  let musicTried = false;
  musicBtn.addEventListener("click", () => {
    if (music.paused) {
      music.play()
        .then(() => musicBtn.classList.add("playing"))
        .catch(() => {
          if (!musicTried) {
            musicTried = true;
            musicBtn.classList.add("missing");
            setTimeout(() => musicBtn.classList.remove("missing"), 3200);
          }
        });
    } else {
      music.pause();
      musicBtn.classList.remove("playing");
    }
  });

  /* ================= fixed fx canvas ================= */
  const canvas = document.getElementById("fx-canvas");
  const ctx = canvas.getContext("2d");
  if (!canvas) return;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  let W = 0, H = 0;

  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * DPR; canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  const PETAL_COLORS = ["#e0a33a", "#d97e14", "#c2a14d", "#f0c46a", "#c65a3f"];
  const LITE = Math.min(window.innerWidth, window.innerHeight) < 640; // phones: lighter load
  const MAX_PETALS = LITE ? 22 : 60;
  const PETAL_RATE = LITE ? 0.022 : 0.045;
  const FLIES = LITE ? 8 : 14;
  const SPARK_GAP = LITE ? 60 : 40;
  let petals = [], fireflies = [], sparks = [];

  function spawnPetal() {
    if (petals.length >= MAX_PETALS) return;   // never overload low-end devices
    petals.push({
      x: Math.random() * (W + 80) - 40,
      y: -30,
      vy: 0.5 + Math.random() * 1.1,          // fall speed
      vx: -0.4 + Math.random() * 0.8,         // horizontal drift
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.01 + Math.random() * 0.02,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.03,
      w: 7 + Math.random() * 7,               // petal length
      color: PETAL_COLORS[(Math.random() * PETAL_COLORS.length) | 0],
      alpha: 0.55 + Math.random() * 0.35,
    });
  }

  function spawnFirefly() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: 1.2 + Math.random() * 1.8,
      phase: Math.random() * Math.PI * 2,
      flicker: 0.02 + Math.random() * 0.04,
      drift: 0.15 + Math.random() * 0.25,
      dir: Math.random() * Math.PI * 2,
    };
  }

  for (let i = 0; i < FLIES; i++) fireflies.push(spawnFirefly());

  /* pre-built glow sprite — avoids creating a radial gradient per firefly per frame */
  const glowSprite = document.createElement("canvas");
  glowSprite.width = glowSprite.height = 64;
  {
    const gs = glowSprite.getContext("2d");
    const g = gs.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,214,120,1)");
    g.addColorStop(1, "rgba(255,214,120,0)");
    gs.fillStyle = g;
    gs.fillRect(0, 0, 64, 64);
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, p.w * 0.45, p.w, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = p.alpha * 0.5;
    ctx.strokeStyle = "#8a5a1d";
    ctx.lineWidth = 0.6;
    ctx.stroke();
    ctx.restore();
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);

    /* --- fireflies (warm glow dots) --- */
    fireflies.forEach((f) => {
      f.phase += f.flicker;
      f.dir += (Math.random() - 0.5) * 0.04;
      f.x += Math.cos(f.dir) * f.drift;
      f.y += Math.sin(f.dir) * f.drift;
      if (f.x < -20) f.x = W + 20; if (f.x > W + 20) f.x = -20;
      if (f.y < -20) f.y = H + 20; if (f.y > H + 20) f.y = -20;
      const glow = 0.5 + Math.sin(f.phase) * 0.45;
      if (glow <= 0.02) return;
      const size = f.r * 10;
      ctx.globalAlpha = 0.75 * glow;
      ctx.drawImage(glowSprite, f.x - size / 2, f.y - size / 2, size, size);
      ctx.globalAlpha = 1;
    });

    /* --- falling petals --- */
    if (Math.random() < PETAL_RATE) spawnPetal();
    petals = petals.filter((p) => {
      p.sway += p.swaySpeed;
      p.x += p.vx + Math.cos(p.sway) * 0.8;
      p.y += p.vy;
      p.rot += p.vr;
      if (p.y > H + 40) return false;
      drawPetal(p);
      return true;
    });

    /* --- sparkle cursor trail --- */
    sparks = sparks.filter((s) => {
      s.alpha -= 0.035;
      s.size += 0.15;
      if (s.alpha <= 0) return false;
      ctx.save();
      ctx.globalAlpha = s.alpha;
      ctx.fillStyle = s.color;
      ctx.translate(s.x, s.y);
      ctx.rotate(s.size * 0.2);
      // 4-point star sparkle
      const r = s.size, r2 = r * 0.35;
      ctx.beginPath();
      ctx.moveTo(0, -r); ctx.lineTo(r2, -r2); ctx.lineTo(r, 0); ctx.lineTo(r2, r2);
      ctx.lineTo(0, r); ctx.lineTo(-r2, r2); ctx.lineTo(-r, 0); ctx.lineTo(-r2, -r2);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      return true;
    });

    requestAnimationFrame(loop);
  }

  if (!reduced) {
    loop();

    /* pointer trail */
    let lastSpark = 0;
    window.addEventListener("pointermove", (e) => {
      const now = performance.now();
      if (now - lastSpark < SPARK_GAP) return;
      lastSpark = now;
      sparks.push({
        x: e.clientX, y: e.clientY,
        size: 2.5 + Math.random() * 3,
        alpha: 0.9,
        color: Math.random() > 0.5 ? "#c2a14d" : "#f0c46a",
      });
    }, { passive: true });

    /* click heart-burst 💌 */
    window.addEventListener("click", (e) => {
      if (e.target.closest("button, a")) return;   // don't fight real buttons
      for (let i = 0; i < 8; i++) {
        sparks.push({
          x: e.clientX + (Math.random() - 0.5) * 30,
          y: e.clientY + (Math.random() - 0.5) * 30,
          size: 3 + Math.random() * 4,
          alpha: 1,
          color: "#c65a3f",
        });
      }
    });
  }
})();
