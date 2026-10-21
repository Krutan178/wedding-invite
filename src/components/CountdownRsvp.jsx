import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { useSectionView } from "../lib/useSectionView";
import { track } from "../lib/tracking";
import { WEDDING } from "../weddingConfig";

const pad = (n) => String(n).padStart(2, "0");
const unitsOf = (diff) => [
  ["days", Math.floor(diff / 86400000)],
  ["hours", pad(Math.floor((diff % 86400000) / 3600000))],
  ["mins", pad(Math.floor((diff % 3600000) / 60000))],
  ["secs", pad(Math.floor((diff % 60000) / 1000))],
];

/* downloadable .ics so guests can save the date with one tap */
function buildIcsHref() {
  const start = new Date(WEDDING.dateISO);
  const end = new Date(start.getTime() + 3 * 3600 * 1000); // ceremony + lunch
  const fmt = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//wedding-invite//EN",
    "BEGIN:VEVENT",
    `UID:${WEDDING.hashtag}@invite`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${WEDDING.groom} & ${WEDDING.bride} Wedding`,
    `LOCATION:${WEDDING.venue.name}, ${WEDDING.venue.addressLines.join(" ")}`,
    `DESCRIPTION:${WEDDING.dateLong} · ${WEDDING.timeLong}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return "data:text/calendar;charset=utf-8," + encodeURIComponent(ics);
}

export default function CountdownRsvp() {
  useSectionView("rsvp");

  const target = new Date(WEDDING.dateISO).getTime();
  const [now, setNow] = useState(() => Date.now());
  const [pops, setPops] = useState({});
  const prev = useRef({});

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const diff = target - now;
    if (diff <= 0) return;
    unitsOf(diff).forEach(([label, val]) => {
      const str = String(val);
      if (prev.current[label] !== undefined && prev.current[label] !== str) {
        setPops((p) => ({ ...p, [label]: true }));
        setTimeout(() => setPops((p) => ({ ...p, [label]: false })), 500);
      }
      prev.current[label] = str;
    });
  }, [now, target]);

  const diff = target - now;
  const done = diff <= 0;
  const units = done ? [] : unitsOf(diff);

  return (
    <section id="rsvp" className="section rsvp">
      <div className="section-head">
        <Reveal as="span" className="kicker">The wait begins</Reveal>
        <Reveal as="h2" className="title">Countdown to Forever</Reveal>
        <Reveal as="span" className="divider">✦‿✦</Reveal>
      </div>

      {done ? (
        <p className="countdown-done">🎉 It’s the big day! 🎉</p>
      ) : (
        <Reveal as="div" className="countdown" aria-live="polite">
          {units.map(([label, val]) => (
            <div className="cd-box" key={label}>
              <span className={pops[label] ? "pop" : ""}>{val}</span>
              <small>{label}</small>
            </div>
          ))}
        </Reveal>
      )}

      <Reveal as="div" className="rsvp-card">
        <h3>Will you grace our celebration?</h3>
        <p>
          Kindly confirm by <strong>{WEDDING.rsvpDeadline}</strong> so we can save
          you a seat, some sweetness and a dance.
        </p>
        <a
          className="gold-btn"
          href={`https://wa.me/${WEDDING.whatsapp}?text=` +
            encodeURIComponent(`Yay! Count me in for ${WEDDING.groom} & ${WEDDING.bride}'s wedding! 💛`)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("rsvp_click")}
        >
          💬 RSVP on WhatsApp
        </a>
        <a
          className="ghost-btn"
          href={buildIcsHref()}
          download={`${WEDDING.groom}-${WEDDING.bride}-wedding.ics`}
          onClick={() => track("calendar_download")}
        >
          📅 Add to Calendar
        </a>
      </Reveal>
    </section>
  );
}
