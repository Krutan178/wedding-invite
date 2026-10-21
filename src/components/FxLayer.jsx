/* FxLayer — fixed full-screen canvas with falling marigold petals,
   wandering fireflies and a sparkle cursor trail. */
import { useEffect, useRef } from "react";

export default function FxLayer() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * DPR; canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const PETAL_COLORS = ["#e0a33a", "#d97e14", "#c2a14d", "#f0c46a", "#c65a3f"];
    const LITE = Math.min(window.innerWidth, window.innerHeight) < 640;
    const MAX_PETALS = LITE ? 22 : 60;
    const PETAL_RATE = LITE ? 0.022 : 0.045;
    const FLIES = LITE ? 8 : 14;
    const SPARK_GAP = LITE ? 60 : 40;
    const petals = [], fireflies = [], sparks = [];

    const spawnPetal = () => {
      if (petals.length >= MAX_PETALS) return;
      petals.push({
        x: Math.random() * (W + 80) - 40,
        y: -30,
        vy: 0.5 + Math.random() * 1.1,
        vx: -0.4 + Math.random() * 0.8,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.01 + Math.random() * 0.02,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.03,
        w: 7 + Math.random() * 7,
        color: PETAL_COLORS[(Math.random() * PETAL_COLORS.length) | 0],
        alpha: 0.55 + Math.random() * 0.35,
      });
    };

    for (let i = 0; i < FLIES; i++) fireflies.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 1.2 + Math.random() * 1.8,
      phase: Math.random() * Math.PI * 2,
      flicker: 0.02 + Math.random() * 0.04,
      drift: 0.15 + Math.random() * 0.25,
      dir: Math.random() * Math.PI * 2,
    });

    /* pre-rendered glow sprite (cheap on phones) */
    const glowSprite = document.createElement("canvas");
    glowSprite.width = glowSprite.height = 64;
    const gs = glowSprite.getContext("2d");
    const g = gs.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,214,120,1)");
    g.addColorStop(1, "rgba(255,214,120,0)");
    gs.fillStyle = g;
    gs.fillRect(0, 0, 64, 64);

    let raf;
    const loop = () => {
      ctx.clearRect(0, 0, W, H);

      /* fireflies */
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

      /* petals */
      if (Math.random() < PETAL_RATE) spawnPetal();
      for (let i = petals.length - 1; i >= 0; i--) {
        const p = petals[i];
        p.sway += p.swaySpeed;
        p.x += p.vx + Math.cos(p.sway) * 0.8;
        p.y += p.vy;
        p.rot += p.vr;
        if (p.y > H + 40) { petals.splice(i, 1); continue; }
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

      /* sparkle trail */
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.alpha -= 0.035;
        s.size += 0.15;
        if (s.alpha <= 0) { sparks.splice(i, 1); continue; }
        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = s.color;
        ctx.translate(s.x, s.y);
        ctx.rotate(s.size * 0.2);
        const r = s.size, r2 = r * 0.35;
        ctx.beginPath();
        ctx.moveTo(0, -r); ctx.lineTo(r2, -r2); ctx.lineTo(r, 0); ctx.lineTo(r2, r2);
        ctx.lineTo(0, r); ctx.lineTo(-r2, r2); ctx.lineTo(-r, 0); ctx.lineTo(-r2, -r2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    let lastSpark = 0;
    const onMove = (e) => {
      const now = performance.now();
      if (now - lastSpark < SPARK_GAP) return;
      lastSpark = now;
      sparks.push({
        x: e.clientX, y: e.clientY,
        size: 2.5 + Math.random() * 3,
        alpha: 0.9,
        color: Math.random() > 0.5 ? "#c2a14d" : "#f0c46a",
      });
    };

    const onClick = (e) => {
      if (e.target.closest("button, a, canvas")) return;
      for (let i = 0; i < 8; i++) {
        sparks.push({
          x: e.clientX + (Math.random() - 0.5) * 30,
          y: e.clientY + (Math.random() - 0.5) * 30,
          size: 3 + Math.random() * 4,
          alpha: 1,
          color: "#c65a3f",
        });
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return <canvas id="fx-canvas" ref={canvasRef} aria-hidden="true" />;
}
