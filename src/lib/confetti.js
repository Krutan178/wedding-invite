/* ============================================================
   CONFETTI / PARTY POPPERS (wraps canvas-confetti)
   ============================================================ */
import confetti from "canvas-confetti";

const WEDDING_COLORS = ["#c2a14d", "#a8842c", "#8a3324", "#f3ead7", "#fffdf6"];

/** One party popper burst from a screen corner */
export function partyPopper(xRatio = 0.15, yRatio = 0.85) {
  const origin = { x: xRatio, y: yRatio };
  confetti({
    particleCount: 90,
    spread: 75,
    startVelocity: 42,
    angle: xRatio < 0.5 ? 60 : 120,
    origin,
    colors: WEDDING_COLORS,
    shapes: ["square", "circle", "star"],
    scalar: 1.15,
    ticks: 230,
  });
  setTimeout(() => confetti({
    particleCount: 55,
    spread: 100,
    angle: xRatio < 0.5 ? 70 : 110,
    origin,
    colors: ["#c2a14d", "#8a3324", "#e8d9a8"],
    shapes: ["circle"],
    scalar: 0.8,
  }), 180);
}

/** Welcome burst: both corners + middle */
export function celebrationBurst() {
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

/** Double poppers + gold rain — used when the date is revealed */
export function slotMachineJackpot() {
  setTimeout(() => {
    partyPopper(0.12, 0.88);
    setTimeout(() => partyPopper(0.88, 0.88), 300);
    setTimeout(() => {
      const end = Date.now() + 1600;
      (function rain() {
        confetti({ particleCount: 4, angle: 60, spread: 60, startVelocity: 40,
          origin: { x: 0, y: 1 }, colors: ["#c2a14d", "#f3ead7", "#8a3324"], shapes: ["circle"] });
        confetti({ particleCount: 4, angle: 120, spread: 60, startVelocity: 40,
          origin: { x: 1, y: 1 }, colors: ["#c2a14d", "#f3ead7", "#8a3324"], shapes: ["circle"] });
        if (Date.now() < end) requestAnimationFrame(rain);
      })();
    }, 600);
  }, 450);
}
