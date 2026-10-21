import { useState } from "react";
import { guest, track } from "../lib/tracking";
import { WEDDING } from "../weddingConfig";

export default function EnvelopeScreen({ opened, onOpen }) {
  const [opening, setOpening] = useState(false);

  /* personalized browser tab title */
  document.title = guest
    ? `${guest} · ${WEDDING.groom} & ${WEDDING.bride} — Wedding Invitation`
    : `${WEDDING.groom} & ${WEDDING.bride} — Wedding Invitation`;

  const handleOpen = () => {
    if (opening) return;
    track("invite_opened", { msSinceLoad: Math.round(performance.now()) });
    setOpening(true);
    setTimeout(onOpen, 900); // flap flips, card rises, then screen fades
  };

  return (
    <div
      id="envelope-screen"
      className={`${opened ? "opened" : ""} ${opening ? "opening" : ""}`}
      onClick={(e) => {
        if (e.target.id === "envelope-screen") handleOpen();
      }}
      aria-label="Open invitation"
    >
      <div className="envelope-wrap">
        <div className="envelope-flap" />
        <div className="envelope-pocket" />
        <div className="envelope-card">
          <span className="mini-mandala">✦</span>
          {guest && (
            <p className="env-dear">
              For <span>{guest}</span>,
            </p>
          )}
          <p className="env-to">You are cordially invited</p>
          <p className="env-names">
            {WEDDING.groom} <em>&amp;</em> {WEDDING.bride}
          </p>
        </div>
        <button className="open-btn" type="button" onClick={handleOpen}>
          <span className="open-btn-inner">Open&nbsp;Invitation</span>
        </button>
      </div>
      <p className="tap-hint">tap to open ✦</p>
    </div>
  );
}
