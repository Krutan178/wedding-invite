import { useState } from "react";
import { guest, track } from "../lib/tracking";
import { WEDDING } from "../weddingConfig";

/** Premium 3D double-door reveal (inspired by the royal-grace demo) */
export default function EnvelopeScreen({ opened, onOpen }) {
  const [opening, setOpening] = useState(false);

  /* personalized browser tab title */
  document.title = guest
    ? `${guest} · ${WEDDING.groom} & ${WEDDING.bride} — Wedding Invitation`
    : `${WEDDING.groom} & ${WEDDING.bride} — Wedding Invitation`;

  const handleOpen = () => {
    if (opening) return;
    track("invite_opened", { style: "doors", msSinceLoad: Math.round(performance.now()) });
    setOpening(true);
    setTimeout(onOpen, 1600); // doors swing, light bursts, then the screen fades
  };

  return (
    <div
      id="doors-screen"
      className={`${opened ? "opened" : ""} ${opening ? "opening" : ""}`}
      onClick={(e) => {
        if (e.target.id === "doors-screen") handleOpen();
      }}
      aria-label="Open invitation"
    >
      <div className="doors-scene">
        <div className="doors-glow" aria-hidden="true" />
        <div className="door door-left" aria-hidden="true">
          <span className="door-panel-line" />
          <span className="door-panel-line line-2" />
          <span className="door-crest">✦</span>
          <span className="door-handle" />
        </div>
        <div className="door door-right" aria-hidden="true">
          <span className="door-panel-line" />
          <span className="door-panel-line line-2" />
          <span className="door-crest">✦</span>
          <span className="door-handle" />
        </div>
      </div>

      <div className="doors-overlay">
        <p className="doors-kicker">The Wedding Of</p>
        <p className="doors-names">
          {WEDDING.groom} <em>&amp;</em> {WEDDING.bride}
        </p>
        {guest && (
          <p className="env-dear">
            For <span>{guest}</span>,
          </p>
        )}
        <p className="doors-sub">You are cordially invited</p>
        <button className="open-btn" type="button" onClick={handleOpen}>
          <span className="open-btn-inner">Open&nbsp;Invitation</span>
        </button>
      </div>
    </div>
  );
}
