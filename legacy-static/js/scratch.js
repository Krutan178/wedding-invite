/* ============================================================
   SCRATCHABLE WEDDING DATE — canvas foil with progress detection
   ============================================================ */
(function () {
  const canvas = document.getElementById("scratch-canvas");
  const card = canvas.closest(".scratch-card");
  const ctx = canvas.getContext("2d");
  if (!canvas) return;

  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0, h = 0, scratched = false, done = false;
  let down = false, lastPoint = null, dots = 0;
  const loadTime = Date.now();       // for measuring scratch duration

  /* ---- paint the golden foil ---- */
  function paintFoil() {
    const rect = canvas.getBoundingClientRect();
    w = rect.width; h = rect.height;
    canvas.width = w * DPR;
    canvas.height = h * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    // base gold
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#e9d5a3");
    g.addColorStop(0.35, "#c2a14d");
    g.addColorStop(0.65, "#a8842c");
    g.addColorStop(1, "#d8b96a");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // diagonal shimmer stripes
    ctx.save();
    ctx.globalAlpha = 0.15;
    ctx.fillStyle = "#fffdf6";
    for (let x = -h; x < w; x += 26) {
      ctx.beginPath();
      ctx.moveTo(x, 0); ctx.lineTo(x + 14, 0);
      ctx.lineTo(x + 14 + h * 0.6, h); ctx.lineTo(x + h * 0.6, h);
      ctx.closePath(); ctx.fill();
    }
    ctx.restore();

    // subtle speckle for texture
    ctx.save();
    ctx.globalAlpha = 0.08;
    for (let i = 0; i < 260; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? "#fffdf6" : "#4a3b24";
      ctx.fillRect(Math.random() * w, Math.random() * h, 1.6, 1.6);
    }
    ctx.restore();

    // label
    ctx.save();
    ctx.globalAlpha = 0.95;
    ctx.fillStyle = "#5b4315";
    ctx.textAlign = "center";
    ctx.font = `600 ${Math.round(w * 0.032)}px Marcellus, serif`;
    ctx.fillText("SCRATCH TO REVEAL", w / 2, h / 2 - w * 0.02);
    ctx.globalAlpha = 0.7;
    ctx.font = `${Math.round(w * 0.048)}px "Cormorant Garamond", serif`;
    ctx.fillText("✦ our wedding date ✦", w / 2, h / 2 + w * 0.05);
    ctx.restore();
  }

  /* ---- scratch input ---- */
  function point(e) {
    const r = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    if (!r || !src) return null;
    return { x: src.clientX - r.left, y: src.clientY - r.top };
  }

  function scratchLine(from, to) {
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 30;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    dots++;
  }

  function start(e) {
    if (done) return;
    e.preventDefault();
    const p = point(e);
    if (!p) return;
    down = true;
    canvas.classList.add("scratching");
    lastPoint = p;
    scratchLine(lastPoint, lastPoint);
    scratched = true;
  }

  function move(e) {
    if (!down || done) return;
    e.preventDefault();
    const p = point(e);
    if (!p || !lastPoint) return;
    scratchLine(lastPoint, p);
    lastPoint = p;
    if (dots % 24 === 0) checkProgress();
  }

  function end() {
    down = false;
    canvas.classList.remove("scratching");
    checkProgress();
  }

  /* register input once — pointer events cover touch, pen and mouse;
     only fall back to mouse+touch APIs on very old browsers */
  if (window.PointerEvent) {
    canvas.addEventListener("pointerdown", start);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointercancel", end);
    window.addEventListener("pointerup", end);
  } else {
    canvas.addEventListener("mousedown", start);
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", end);
    canvas.addEventListener("touchstart", start, { passive: false });
    canvas.addEventListener("touchmove", move, { passive: false });
    canvas.addEventListener("touchend", end);
  }

  /* ---- progress: sample cleared pixels ---- */
  function checkProgress() {
    if (done || !scratched) return;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0;
    const step = 40; // sample every 40th pixel of raw buffer
    for (let i = 3; i < data.length; i += 4 * step) {
      if (data[i] < 40) clear++;      // alpha 0 → scratched away
    }
    const total = Math.floor(data.length / step);
    if (clear / total > 0.58) finish();
  }

  function finish() {
    done = true;
    canvas.classList.add("done");
    card.classList.add("opened");

    /* tell the tracker the mystery is solved 🎉 */
    if (window.WEDDING_TRACK) {
      WEDDING_TRACK.track("date_revealed", { scratchSeconds: Math.round((Date.now() - loadTime) / 1000) });
    }

    setTimeout(() => { canvas.style.display = "none"; }, 800);

    // double poppers + gold rain — the big reveal 🎉
    setTimeout(() => {
      partyPopper(0.12, 0.88);
      setTimeout(() => partyPopper(0.88, 0.88), 300);
      setTimeout(() => {
        if (typeof confetti === "function") {
          const end = Date.now() + 1600;
          (function rain() {
            confetti({
              particleCount: 4,
              angle: 60, spread: 60, startVelocity: 40,
              origin: { x: 0, y: 1 },
              colors: ["#c2a14d", "#f3ead7", "#8a3324"],
              shapes: ["circle"],
            });
            confetti({
              particleCount: 4,
              angle: 120, spread: 60, startVelocity: 40,
              origin: { x: 1, y: 1 },
              colors: ["#c2a14d", "#f3ead7", "#8a3324"],
              shapes: ["circle"],
            });
            if (Date.now() < end) requestAnimationFrame(rain);
          })();
        }
      }, 600);
    }, 450);
  }

  /* ---- init / resize ---- */
  paintFoil();
  let resizeT;
  window.addEventListener("resize", () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(() => {
      if (!done) paintFoil();       // rebuild foil if still un-scratched
    }, 250);
  });
})();
