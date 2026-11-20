import { useState } from "react";
import { guest, track } from "../lib/tracking";
import { WEDDING } from "../weddingConfig";

/** A sealed letter that opens into the invitation (demo-invitation style) */
export default function EnvelopeScreen({ opened, onOpen }) {
  const [opening, setOpening] = useState(false);
  const [y, m, d] = WEDDING.dateISO.slice(0, 10).split("-");
  const dateStamp = `${d} · ${m} · ${y}`;

  /* personalized browser tab title */
  document.title = guest
    ? `${guest} · ${WEDDING.groom} & ${WEDDING.bride} — Wedding Invitation`
    : `${WEDDING.groom} & ${WEDDING.bride} — Wedding Invitation`;

  const handleOpen = () => {
    if (opening) return;
    track("invite_opened", { style: "envelope", msSinceLoad: Math.round(performance.now()) });
    setOpening(true);
    setTimeout(onOpen, 1750); // flap lifts, letter rises, then the screen fades
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
      <div className="env-head">
        <p className="doors-kicker">✦ For you, a letter has arrived ✦</p>
        <p className="doors-names">
          {WEDDING.groom} <em>&amp;</em> {WEDDING.bride}
        </p>
        <p className="env-dear">
          {guest ? (
            <>To <span>{guest}</span>,</>
          ) : (
            "To our dearest,"
          )}
        </p>
        <p className="doors-sub">kindly open with a smile</p>
      </div>

      <button
        className="envelope"
        type="button"
        onClick={handleOpen}
        aria-label="Open the invitation letter"
      >
        <span className="env-back" aria-hidden="true" />

        <span className="env-letter" aria-hidden="true">
          <span className="env-letter-mono">
            R<em>&amp;</em>A
          </span>
          <span className="env-letter-rule" />
          <span className="env-letter-script">save the date</span>
          <span className="env-letter-date">{dateStamp}</span>
        </span>

        <span className="env-front" aria-hidden="true" />
        <span className="env-flap" aria-hidden="true" />
        <span className="env-seal" aria-hidden="true">
          R<em>&amp;</em>A
        </span>
      </button>

      <div className="env-foot">
        <span className="doors-sub env-tap">
          <span className="env-tap-dot" aria-hidden="true" />
          Tap the envelope to open
        </span>
      </div>
    </div>
  );
}
