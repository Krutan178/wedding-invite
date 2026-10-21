import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { useSectionView } from "../lib/useSectionView";
import { track } from "../lib/tracking";
import { partyPopper, slotMachineJackpot } from "../lib/confetti";
import { WEDDING } from "../weddingConfig";

export default function ScratchSection() {
  useSectionView("date");

  return (
    <section id="date" className="section scratch-section">
      <div className="section-head">
        <Reveal as="span" className="kicker">A little mystery</Reveal>
        <Reveal as="h2" className="title">Scratch to Reveal the Date</Reveal>
        <Reveal as="span" className="divider">✦‿✦</Reveal>
      </div>
      <Reveal as="p" className="scratch-sub">
        Use your finger or mouse to scratch away the golden foil ✨
      </Reveal>

      <ScratchCard />

      <Reveal as="div" className="party-btns">
        <PopperButton />
      </Reveal>
    </section>
  );
}

/* ---------------- scratch card ---------------- */

function ScratchCard() {
  const cardRef = useRef(null);
  const canvasRef = useRef(null);
  const [opened, setOpened] = useState(false);
  const loadTime = useRef(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    const card = cardRef.current;
    const ctx = canvas.getContext("2d");
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0, h = 0;
    let down = false, lastPoint = null, dots = 0, scratched = false, done = false;

    /* paint the golden foil */
    const paintFoil = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, "#e9d5a3");
      g.addColorStop(0.35, "#c2a14d");
      g.addColorStop(0.65, "#a8842c");
      g.addColorStop(1, "#d8b96a");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      /* shimmer stripes */
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

      /* speckle texture */
      ctx.save();
      ctx.globalAlpha = 0.08;
      for (let i = 0; i < 260; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? "#fffdf6" : "#4a3b24";
        ctx.fillRect(Math.random() * w, Math.random() * h, 1.6, 1.6);
      }
      ctx.restore();

      /* label */
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
    };

    const point = (e) => {
      const r = canvas.getBoundingClientRect();
      const src = e.touches ? e.touches[0] : e;
      if (!r || !src) return null;
      return { x: src.clientX - r.left, y: src.clientY - r.top };
    };

    const scratchLine = (from, to) => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = 30;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
      dots++;
    };

    const start = (e) => {
      if (done) return;
      e.preventDefault();
      const p = point(e);
      if (!p) return;
      down = true;
      canvas.classList.add("scratching");
      lastPoint = p;
      scratchLine(lastPoint, lastPoint);
      scratched = true;
    };

    const move = (e) => {
      if (!down || done) return;
      e.preventDefault();
      const p = point(e);
      if (!p || !lastPoint) return;
      scratchLine(lastPoint, p);
      lastPoint = p;
      if (dots % 24 === 0) checkProgress();
    };

    const end = () => {
      down = false;
      canvas.classList.remove("scratching");
      checkProgress();
    };

    /* progress sampling */
    const checkProgress = () => {
      if (done || !scratched) return;
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let clear = 0;
      const step = 40;
      for (let i = 3; i < data.length; i += 4 * step) {
        if (data[i] < 40) clear++;
      }
      const total = Math.floor(data.length / step);
      if (clear / total > 0.58) finish();
    };

    const finish = () => {
      done = true;
      canvas.classList.add("done");
      setOpened(true);
      track("date_revealed", { scratchSeconds: Math.round((Date.now() - loadTime.current) / 1000) });
      setTimeout(() => { canvas.style.display = "none"; }, 800);
      slotMachineJackpot();
    };

    /* input — pointer events cover touch/pen/mouse */
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

    paintFoil();
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { if (!done) paintFoil(); }, 250);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointerup", end);
      clearTimeout(resizeTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="scratch-wrap reveal in">
      <div className={`scratch-card ${opened ? "opened" : ""}`} ref={cardRef}>
        <div className="scratch-reward">
          <p className="reveal-kicker">mark your calendars</p>
          <p className="reveal-date">{WEDDING.dateDay}</p>
          <p className="reveal-date" id="scratch-day">{WEDDING.dateMain}</p>
          <p className="reveal-time">{WEDDING.timeLong}</p>
          <span className="orn">❋ ❋ ❋</span>
        </div>
        <canvas
          id="scratch-canvas"
          ref={canvasRef}
          className={opened ? "done" : ""}
          aria-label="Scratch here to reveal the wedding date"
        />
      </div>
    </div>
  );
}

/* ---------------- party popper button ---------------- */

function PopperButton() {
  const sideRef = useRef(0.12); // fire from the left first
  return (
    <button
      id="popper-btn"
      className="gold-btn"
      type="button"
      onClick={() => {
        partyPopper(sideRef.current, 0.88);
        sideRef.current = sideRef.current < 0.5 ? 0.88 : 0.12;
        track("party_popper", { side: sideRef.current });
      }}
    >
      🎉 Pull the party popper!
    </button>
  );
}
