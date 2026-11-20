/* ============================================================
   Exact demo-invitation structure and behaviour,
   populated only from weddingConfig.js
   ============================================================ */
import { useEffect, useRef } from "react";
import { WEDDING, mapsUrl } from "./weddingConfig";
import { track } from "./lib/tracking";
import { initDemo } from "./lib/demo";

const BASE = import.meta.env.BASE_URL || "/";
const asset = (file) => `${BASE}assets/${file}`;

/* our six real/placeholder photos, mapped into the demo's image slots */
const shots = WEDDING.photos.map((p) =>
  p.src.startsWith("assets/") ? asset(p.src.slice(7)) : p.src
);
const hero = shots[0];
const albumImages = [
  shots[0], shots[1], shots[2], shots[3], shots[4],
  shots[5], shots[0], shots[2], shots[4], shots[1],
];
const albumCaptions = [
  ...WEDDING.photos.map((p) => p.caption),
  "hand in hand, always",
  "our favourite kind of day",
  "and the best is yet to come",
  "with you, everywhere",
];
const IMG = {
  stamp: hero,
  hero,
  now: hero,
  then: shots[1],
  ...Object.fromEntries(albumImages.map((src, i) => [`a${i + 1}`, src])),
  band: hero,
  final: hero,
  c0: hero, c1: shots[1], c2: shots[2], c3: shots[3],
  c4: shots[4], c5: shots[5], c6: hero, c7: shots[2],
};

/* date pieces */
const [Y, M, D] = WEDDING.dateISO.slice(0, 10).split("-");
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const month = MONTHS[Number(M) - 1];
const day = WEDDING.dateDay || "Saturday";
const stampDate = `${D} · ${M} · ${Y}`;
const ringDate = `${D}.${M}.${Y}`;
const names = `${WEDDING.groom} & ${WEDDING.bride}`;
const venueLabel = WEDDING.venue.name;

const dirUrl =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent(`${venueLabel}, ${WEDDING.venue.addressLines.join(" ")}`);

const start = new Date(WEDDING.dateISO);
const icsFmt = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const calendarURL =
  "https://calendar.google.com/calendar/render?" +
  new URLSearchParams({
    action: "TEMPLATE",
    text: `${names}’s Wedding`,
    dates: `${icsFmt(start)}/${icsFmt(new Date(start.getTime() + 3 * 3600 * 1000))}`,
    details: `${WEDDING.dateLong} · ${WEDDING.timeLong}. At ${venueLabel}.`,
    location: `${venueLabel}, ${WEDDING.venue.addressLines.join(" ")}`,
  }).toString();

const demoConfig = {
  IMG,
  WEDDING_MS: start.getTime(),
  MAPS_URL: mapsUrl,
  DIR_URL: dirUrl,
  CALENDAR_URL: calendarURL,
  SCRATCH_ARIA: WEDDING.dateLong,
  SCRATCH_TEXT: `${day}, ${Number(D)} ${month}. We’ll be waiting for you!`,
  MONO_A: WEDDING.groom[0],
  MONO_B: WEDDING.bride[0],
};

const Orn = () => <svg className="orn" aria-hidden="true"><use href="#orn" /></svg>;

function Defs() {
  return (
    <svg className="defs" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="gPaper" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F9EEE8"/><stop offset=".6" stopColor="#F1DFD5"/><stop offset="1" stopColor="#E8D1C5"/></linearGradient>
        <linearGradient id="gPocketL" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#F3E4DB"/><stop offset="1" stopColor="#E6CEC1"/></linearGradient>
        <linearGradient id="gPocketR" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stopColor="#F0DFD6"/><stop offset="1" stopColor="#E3CABD"/></linearGradient>
        <linearGradient id="gPocketB" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#F7E9E1"/><stop offset="1" stopColor="#ECD8CD"/></linearGradient>
        <linearGradient id="gFlap" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E9D3C7"/><stop offset="1" stopColor="#F6E8E0"/></linearGradient>
        <pattern id="pJaali" width="16" height="19.2" patternUnits="userSpaceOnUse"><rect width="16" height="19.2" fill="#5C1129"/><path d="M1.6 19.2V9.6a6.4 6.4 0 0 1 12.8 0v9.6" fill="none" stroke="#D6B06A" strokeOpacity=".5" strokeWidth=".5"/><circle cx="8" cy="1.5" r=".55" fill="#D6B06A" fillOpacity=".7"/></pattern>
        <radialGradient id="gWax" cx="38%" cy="32%" r="75%"><stop offset="0" stopColor="#A63452"/><stop offset=".55" stopColor="#761B37"/><stop offset="1" stopColor="#4A0C1F"/></radialGradient>
        <linearGradient id="gGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F7E6B8"/><stop offset=".4" stopColor="#CDA45E"/><stop offset=".66" stopColor="#F0DCA9"/><stop offset="1" stopColor="#9E722F"/></linearGradient>
        <linearGradient id="gArch" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#C9A15B"/><stop offset=".72" stopColor="#C9A15B"/><stop offset="1" stopColor="#C9A15B" stopOpacity="0"/></linearGradient>
        <filter id="fSoft" x="-10%" y="-20%" width="120%" height="140%"><feDropShadow dx="0" dy="-1" stdDeviation="1.8" floodColor="#5A2A2A" floodOpacity=".2"/></filter>
        <clipPath id="cEnv"><rect width="300" height="200" rx="6"/></clipPath>
        <symbol id="orn" viewBox="0 0 120 16"><g fill="none" stroke="currentColor" strokeWidth=".9" strokeLinecap="round"><path d="M4 8h38M78 8h38"/><path d="M42 8c3-4.5 7-4.5 10 0M78 8c-3-4.5-7-4.5-10 0"/><path d="M60 1.5 66.5 8 60 14.5 53.5 8Z"/></g><circle cx="60" cy="8" r="1.6" fill="currentColor"/><circle cx="3" cy="8" r="1.2" fill="currentColor"/><circle cx="117" cy="8" r="1.2" fill="currentColor"/></symbol>
      </defs>
    </svg>
  );
}

function Intro() {
  return (
    <div className="intro" id="intro">
      <canvas id="introFx" aria-hidden="true" />
      <div className="intro-inner">
        <p className="intro-kicker" id="kicker"><span className="k-script">For you,</span>a letter has arrived</p>
        <div className="stage" id="stage">
          <div className="env-wrap" id="envWrap">
            <div className="env" id="env" role="button" tabIndex={0} aria-label="Open the invitation envelope">
              <span className="env-face env-front" id="envFront">
                <svg className="paper" viewBox="0 0 300 200" preserveAspectRatio="none" aria-hidden="true">
                  <rect width="300" height="200" rx="6" fill="url(#gPaper)" />
                  <rect x="9" y="9" width="282" height="182" rx="3" fill="none" stroke="#C9A15B" strokeOpacity=".62" strokeWidth=".7" />
                  <rect x="12.5" y="12.5" width="275" height="175" rx="2" fill="none" stroke="#C9A15B" strokeOpacity=".35" strokeWidth=".4" />
                </svg>
                <span className="tex" />
                <span className="ret" aria-hidden="true">{WEDDING.groom[0]} &amp; {WEDDING.bride[0]}</span>
                <svg className="stamp" id="stamp" viewBox="0 0 70 84" aria-hidden="true" />
                <svg className="postmark" viewBox="0 0 130 70" aria-hidden="true">
                  <g fill="none" stroke="#6E1630" strokeOpacity=".5">
                    <circle cx="38" cy="35" r="27" strokeWidth="1.1" />
                    <circle cx="38" cy="35" r="20.5" strokeWidth=".6" />
                    <path d="M68 21q7-5 14 0t14 0 14 0 14 0M68 30q7-5 14 0t14 0 14 0 14 0M68 39q7-5 14 0t14 0 14 0 14 0M68 48q7-5 14 0t14 0 14 0 14 0" strokeWidth="1" />
                  </g>
                  <g fill="#6E1630" fillOpacity=".55" fontFamily="Cormorant Garamond, Georgia, serif" fontWeight="600" textAnchor="middle">
                    <text x="38" y="33" fontSize="8" letterSpacing=".6">WITH</text>
                    <text x="38" y="43" fontSize="8" letterSpacing=".6">LOVE</text>
                  </g>
                </svg>
                <span className="addr">
                  <span className="addr-to">To,</span>
                  <span className="addr-name">you</span>
                  <span className="addr-rule" />
                  <span className="addr-from">kindly open with a smile</span>
                </span>
                <span className="sheen" />
              </span>

              <span className="env-face env-back" id="envBack" hidden>
                <svg className="liner" viewBox="0 0 300 200" preserveAspectRatio="none" aria-hidden="true"><rect width="300" height="200" rx="6" fill="url(#pJaali)" /></svg>
                <span className="letter" id="letter">
                  <span className="panel panel-top">
                    <span className="lt-deva" lang="hi">शुभ विवाह</span>
                    <svg className="lt-orn" aria-hidden="true"><use href="#orn" /></svg>
                    <span className="lt-hosts">The families of {WEDDING.groom} &amp; {WEDDING.bride}</span>
                    <span className="lt-line">request the pleasure of your company<br />at the wedding celebration of</span>
                  </span>
                  <span className="panel panel-bot" id="panelBot">
                    <span className="pb-face pb-front">
                      <span className="lb-name">{WEDDING.groom}</span>
                      <span className="lb-amp">&amp;</span>
                      <span className="lb-name">{WEDDING.bride}</span>
                      <span className="lb-hint">The date is waiting inside</span>
                      <button className="lb-enter" id="enterBtn" type="button" tabIndex={-1}>Step inside</button>
                    </span>
                    <span className="pb-face pb-back">
                      <span className="mono">{WEDDING.groom[0]}<i>&amp;</i>{WEDDING.bride[0]}</span>
                      <span className="mono-sub">an invitation, just for you</span>
                    </span>
                  </span>
                </span>
                <svg className="pocket" viewBox="0 0 300 200" preserveAspectRatio="none" aria-hidden="true">
                  <g clipPath="url(#cEnv)">
                    <path d="M0 0 147 103 0 200Z" fill="url(#gPocketL)" stroke="rgba(120,70,60,.14)" strokeWidth=".5" />
                    <path d="M300 0 153 103 300 200Z" fill="url(#gPocketR)" stroke="rgba(120,70,60,.14)" strokeWidth=".5" />
                    <path d="M0 200V197L137 96Q150 86 163 96L300 197V200Z" fill="url(#gPocketB)" filter="url(#fSoft)" />
                  </g>
                </svg>
                <span className="flap-wrap" id="flapWrap">
                  <svg className="flap" viewBox="0 0 300 116" preserveAspectRatio="none" aria-hidden="true">
                    <path id="flapOut" d="M0 5Q0 0 6 0H294Q300 0 300 5L164 104Q150 115 136 104Z" fill="url(#gFlap)" stroke="rgba(120,70,60,.2)" strokeWidth=".6" />
                    <path id="flapIn" d="M0 5Q0 0 6 0H294Q300 0 300 5L164 104Q150 115 136 104Z" fill="url(#pJaali)" opacity="0" />
                  </svg>
                </span>
                <span className="seal" id="seal"><span className="seal-half l" /><span className="seal-half r" /></span>
              </span>
            </div>
          </div>
        </div>
        <p className="intro-hint" id="introHint"><span className="tap-ring" />Tap the envelope to open</p>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-mandala" id="mandala" aria-hidden="true" />
      <canvas id="heroFx" aria-hidden="true" />
      <p className="shubh" lang="hi">शुभ विवाह</p>
      <div className="arch">
        <div className="arch-photo"><img data-img="hero" src={hero} alt={`${names} together`} draggable="false" /></div>
        <svg className="arch-line" viewBox="0 0 300 400" preserveAspectRatio="none" aria-hidden="true">
          <path className="ln" pathLength="1" strokeWidth="1.3" d="M150 1.5A148.5 148.5 0 0 0 1.5 150V400" />
          <path className="ln" pathLength="1" strokeWidth="1.3" d="M150 1.5A148.5 148.5 0 0 1 298.5 150V400" />
          <path className="ln" pathLength="1" strokeWidth=".6" d="M150 7A143 143 0 0 0 7 150V400" />
          <path className="ln" pathLength="1" strokeWidth=".6" d="M150 7A143 143 0 0 1 293 150V400" />
          <path className="arch-star" d="M150-17 153.5-8 150 1 146.5-8Z" />
        </svg>
      </div>
      <h1 className="names" id="heroTitle" tabIndex={-1}>
        <span className="nm n1">{WEDDING.groom}</span>
        <span className="amp" aria-hidden="true">&amp;</span>
        <span className="sr-amp" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>and</span>
        <span className="nm n2">{WEDDING.bride}</span>
      </h1>
      <p className="hero-sub">are getting married</p>
      <a className="cue" href="#invite">Scroll<i /></a>
    </section>
  );
}

function Invite() {
  return (
    <section className="sec alt jaali" id="invite">
      <div className="invite-card" data-reveal>
        <span className="corner c-tl" /><span className="corner c-tr" /><span className="corner c-bl" /><span className="corner c-br" />
        <p className="inv-lead">With joy in our hearts</p>
        <p className="inv-text">we invite you to share in the wedding celebration of</p>
        <p className="inv-names">{WEDDING.groom} <span>&amp;</span> {WEDDING.bride}</p>
        <p className="inv-text">Come bless the couple, dance at the baraat and stay for dinner. It simply wouldn’t feel complete without you.</p>
        <Orn />
        <p className="inv-note">The date is hidden just below, under a little gold.</p>
      </div>
    </section>
  );
}

function DateSection() {
  return (
    <section className="sec" id="date">
      <h2 className="sec-title" data-reveal>Save the date</h2>
      <div className="scratch" id="scratch" tabIndex={0} role="button" aria-label="Scratch card hiding the wedding date" data-reveal style={{ "--d": ".15s" }}>
        <div className="scratch-under">
          <span className="sd-day">{day}</span>
          <span className="sd-main"><span className="sd-num">{Number(D)}</span><span className="sd-month">{month}</span></span>
          <span className="sd-year">{Y}</span>
        </div>
        <canvas aria-hidden="true" />
      </div>
      <p className="scratch-hint" id="scratchHint">Scratch the gold with your finger</p>
      <p className="cd-label" data-reveal>until the baraat arrives</p>
      <div className="countdown" role="timer" aria-live="off" data-reveal style={{ "--d": ".1s" }}>
        <div className="cd"><b id="cdD">00</b><small>days</small></div>
        <div className="cd"><b id="cdH">00</b><small>hours</small></div>
        <div className="cd"><b id="cdM">00</b><small>minutes</small></div>
        <div className="cd"><b id="cdS">00</b><small>seconds</small></div>
      </div>
      <a className="btn" id="calBtn" href={calendarURL} target="_blank" rel="noopener" data-reveal style={{ "--d": ".2s" }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4M12 13v4M10 15h4"/></svg>
        Add to Google Calendar
      </a>
    </section>
  );
}

function Story() {
  return (
    <section className="sec alt" id="story">
      <h2 className="sec-title" data-reveal>Our story, so far</h2>
      <p className="sec-sub" data-reveal style={{ "--d": ".1s" }}>Long before the big day, this is where it all began. Drag the line to see how it turned out.</p>
      <div className="compare" id="compare" data-reveal style={{ "--d": ".15s" }}>
        <img className="cmp-now" data-img="now" src={hero} alt={`${names} today`} draggable="false" />
        <img className="cmp-then" data-img="then" src={shots[1]} alt="A memory from when we first began" draggable="false" />
        <span className="cmp-tag tag-then">Then</span><span className="cmp-tag tag-now">Now</span>
        <div className="cmp-handle" id="cmpHandle" role="slider" tabIndex={0} aria-label="Compare then and now" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50">
          <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 7l-5 5 5 5M15 7l5 5-5 5"/></svg></span>
        </div>
      </div>
      <p className="cmp-cap" data-reveal>Same two smiles, a few years later.</p>
    </section>
  );
}

function Page({ img, i, caption, n, rot }) {
  return (
    <div className={`lf ${i % 2 === 0 ? "f sheet pg-r" : "b sheet pg-l"}`}>
      <span className="spine" />
      <figure className="snap" style={{ "--r": rot }}>
        <span className="tape" />
        <img data-img={`a${n}`} src={img} alt={caption} draggable="false" />
        <figcaption>{caption}</figcaption>
      </figure>
    </div>
  );
}

function Moments() {
  const leaves = [];
  const rotations = ["-3deg", "2.5deg", "-2deg", "3deg", "-2.5deg", "2deg", "-3deg", "2.5deg", "-2deg", "3deg"];
  for (let i = 0; i < albumImages.length; i += 2) {
    leaves.push(
      <div className="leaf pages" key={i}>
        <Page img={albumImages[i]} i={0} caption={albumCaptions[i]} n={i + 1} rot={rotations[i]} />
        <Page img={albumImages[i + 1]} i={1} caption={albumCaptions[i + 1]} n={i + 2} rot={rotations[i + 1]} />
      </div>
    );
  }
  return (
    <section className="sec" id="moments">
      <h2 className="sec-title" data-reveal>Little moments</h2>
      <p className="sec-sub" data-reveal style={{ "--d": ".1s" }}>Turn the pages through a few of our favourites.</p>
      <div className="album" data-reveal style={{ "--d": ".15s" }}>
        <div className="book closed" id="book" tabIndex={0} role="group" aria-roledescription="photo album" aria-label="Photo album. Use the arrow keys to turn the pages.">
          <div className="bk-back leather"><div className="sheet pg-r inset-r"><span className="spine" /><div className="ep"><p className="ep-script">to be continued…</p><svg className="ep-orn" aria-hidden="true"><use href="#orn" /></svg><p className="ep-line">the next page, we’ll write with you</p><p className="ep-date">{stampDate}</p></div></div></div>
          <div className="leaf cover">
            <div className="lf f leather cover-f">
              <span className="cv-frame"><i /><i /><i /><i /></span>
              <p className="cv-kick">{names}</p>
              <div className="cv-mono"><span className="foil">{WEDDING.groom[0]}<i>&amp;</i>{WEDDING.bride[0]}</span></div>
              <p className="cv-title foil">Little moments</p>
              <svg className="cv-orn" aria-hidden="true"><use href="#orn" /></svg>
              <p className="cv-date">{stampDate}</p>
            </div>
            <div className="lf b leather cover-b">
              <div className="sheet pg-l inset-l"><span className="spine" /><div className="ep"><p className="ep-script">Our little moments</p><svg className="ep-orn" aria-hidden="true"><use href="#orn" /></svg><p className="ep-line">a few pages from our story, before the next chapter begins</p></div></div>
            </div>
          </div>
          {leaves}
        </div>
      </div>
      <div className="deck-ctrl">
        <button className="btn ghost alb-prev" id="albPrev" type="button" aria-label="Previous page" disabled><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 5 8 12l7 7"/></svg></button>
        <span className="deck-count" id="albCount" aria-live="polite" />
        <button className="btn ghost" id="albNext" type="button">Open album</button>
      </div>
    </section>
  );
}

function Band() {
  return (
    <section className="band" id="uphill" aria-label="Hand in hand">
      <div className="band-media" id="bandMedia">
        <img data-img="band" src={hero} alt="Hand in hand" draggable="false" />
        <span className="band-sun" id="bandSun" />
      </div>
      <p className="band-top wipe" data-reveal-wipe>Hand in hand,</p>
      <p className="band-bottom wipe" data-reveal-wipe style={{ "--d": ".6s" }}>through every climb and every sunrise.</p>
    </section>
  );
}

function EventIcon({ kind }) {
  if (kind === "haldi" || kind === "dinner")
    return (
      <svg className="ev-icon" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <g className="steam"><path d="M33 26q-4-4 0-8t0-8"/><path d="M47 26q-4-4 0-8t0-8"/></g>
        <g className="lid"><path d="M16 54a24 24 0 0 1 48 0Z" style={{ fill: "var(--surface)" }}/><circle cx="40" cy="27" r="2.6" style={{ fill: "var(--surface)" }}/><path d="M25 46q4-9 12-11" strokeWidth="1"/></g>
        <path d="M9 58h62"/><path d="M14 58q26 9 52 0"/>
      </svg>
    );
  if (kind === "sangeet" || kind === "mehendi" || kind === "baraat")
    return (
      <svg className="ev-icon" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <g className="stick-b"><path d="M26 34 12 16"/><circle cx="11" cy="14.6" r="1.8"/></g>
        <g className="stick-a"><path d="M56 34Q63 22 71 15"/></g>
        <ellipse cx="22" cy="51" rx="7.5" ry="15"/>
        <path d="M22 36Q40 32.5 58 36M22 66Q40 69.5 58 66M58 36a7.5 15 0 0 1 0 30"/>
        <path d="M25 37.5 33 64.5 41 36 49 64.5 56 38" strokeWidth="1"/>
      </svg>
    );
  return (
    <svg className="ev-icon" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="40" cy="44" r="17"/><circle cx="40" cy="44" r="10"/>
      <path d="M40 12v9M35 16l10 0"/><path d="M29 23q11-9 22 0" strokeWidth="1"/>
    </svg>
  );
}

function Events() {
  return (
    <section className="sec alt arcade" id="events">
      <h2 className="sec-title" data-reveal>The celebration</h2>
      <p className="sec-sub" data-reveal style={{ "--d": ".1s" }}>{WEDDING.dateLong}</p>
      <div className="events-grid">
        {WEDDING.events.map((ev, i) => {
          const rawTime = ev.when.split(" · ").pop().trim();
          const [start, end] = rawTime.split(/\s+-\s+/);
          const startParts = start.split(" ");
          const clock = startParts[0];
          const meridiem = end
            ? `${startParts.slice(1).join(" ")} – ${end}`
            : startParts.slice(1).join(" ");
          const kind = /mehendi/i.test(ev.name) ? "mehendi"
            : /haldi/i.test(ev.name) ? "haldi"
            : /sangeet/i.test(ev.name) ? "sangeet" : "wedding";
          return (
            <article className="ev" data-reveal key={ev.name} style={{ "--d": `${i * 0.05}s` }}>
              {i > 0 && <span className="ev-join" aria-hidden="true" />}
              <EventIcon kind={kind} />
              <p className="ev-time">{clock}<small>{meridiem}</small></p>
              <h3>{ev.name}</h3>
              <p>{ev.note} · {ev.where}</p>
            </article>
          );
        })}
      </div>
      <p className="ev-where" data-reveal>At {venueLabel}</p>
    </section>
  );
}

function Venue() {
  return (
    <section className="sec" id="venue">
      <h2 className="sec-title" data-reveal>Find the venue</h2>
      <a className="map" id="mapCard" href={mapsUrl} target="_blank" rel="noopener" aria-label={`Open ${venueLabel} in Google Maps`} data-reveal style={{ "--d": ".1s" }}>
        <svg viewBox="0 0 400 260" aria-hidden="true">
          <rect width="400" height="260" style={{ fill: "var(--map-bg)" }} />
          <path d="M-10 214C50 196 92 238 160 222S262 180 304 198 380 244 410 232V270H-10Z" style={{ fill: "var(--map-water)" }} />
          <path d="M298 22q42-10 62 20 10 30-20 42-42 8-52-22-6-28 10-40Z" style={{ fill: "var(--map-park)" }} />
          <path d="M34 30q32-12 52 8 12 22-14 32-32 6-42-12-6-18 4-28Z" style={{ fill: "var(--map-park)" }} />
          <g style={{ fill: "var(--map-block)" }}>
            <rect x="20" y="86" width="44" height="34" rx="4"/><rect x="72" y="84" width="34" height="40" rx="4"/><rect x="160" y="74" width="40" height="30" rx="4"/><rect x="206" y="70" width="34" height="34" rx="4"/>
            <rect x="18" y="160" width="40" height="30" rx="4"/><rect x="64" y="156" width="44" height="34" rx="4"/><rect x="160" y="136" width="30" height="44" rx="4"/><rect x="212" y="134" width="36" height="40" rx="4"/>
            <rect x="280" y="112" width="40" height="40" rx="4"/><rect x="340" y="100" width="44" height="46" rx="4"/><rect x="290" y="160" width="34" height="22" rx="4"/><rect x="160" y="18" width="70" height="36" rx="4"/>
          </g>
          <g fill="none" strokeLinecap="round">
            <path d="M-10 152C90 142 160 122 230 120S350 102 410 82" stroke="#C9A15B" strokeOpacity=".45" strokeWidth="17" />
            <g style={{ stroke: "var(--map-road)" }}>
              <path d="M-10 152C90 142 160 122 230 120S350 102 410 82" strokeWidth="13" />
              <path d="M126-10 146 270" strokeWidth="8" />
              <path d="M256-10C259 60 263 120 270 270" strokeWidth="8" />
              <path d="M-10 68 410 58" strokeWidth="6" />
              <path d="M196 120 206 270" strokeWidth="5" />
              <path d="M332 92 356 270" strokeWidth="5" />
            </g>
          </g>
          <defs><mask id="routeMask"><path className="route-reveal" pathLength="1" d="M30 150C90 141 160 122 230 120L258 119" fill="none" stroke="#fff" strokeWidth="8" /></mask></defs>
          <path d="M30 150C90 141 160 122 230 120L258 119" fill="none" stroke="#6E1630" strokeWidth="3" strokeDasharray="1 7" strokeLinecap="round" mask="url(#routeMask)" />
          <circle cx="30" cy="150" r="5" fill="#6E1630" stroke="#fff" strokeWidth="2" />
          <g transform="translate(36 40)" style={{ color: "var(--map-label-ink)" }} opacity=".55"><circle r="12" fill="none" stroke="currentColor" strokeWidth=".8"/><path d="M0-9 3 0 0 9-3 0Z" fill="currentColor"/><text y="-16" textAnchor="middle" fontSize="9" fontFamily="Cormorant Garamond, Georgia, serif" fill="currentColor">N</text></g>
          <g transform="translate(262 118)">
            <ellipse className="pin-pulse" cx="0" cy="0" rx="9" ry="4" fill="#6E1630" opacity=".5" />
            <g className="pin">
              <ellipse cx="0" cy="0" rx="7" ry="2.6" fill="#000" opacity=".2" />
              <path d="M0 0C-9-11-16-19-16-30A16 16 0 1 1 16-30C16-19 9-11 0 0Z" fill="#6E1630" stroke="#fff" strokeWidth="1.5" />
              <circle cx="0" cy="-30" r="8.5" fill="#F3DFB0" />
              <path d="M0-26.5c-3.4-2.2-5.4-3.8-5.4-6a2.6 2.6 0 0 1 5.4-.9 2.6 2.6 0 0 1 5.4.9c0 2.2-2 3.8-5.4 6Z" fill="#6E1630" />
            </g>
            <g className="map-label">
              <rect x="-66" y="10" width="132" height="26" rx="13" style={{ fill: "var(--map-label-bg)" }} stroke="#C9A15B" strokeOpacity=".7" />
              <text x="0" y="27.5" textAnchor="middle" fontSize={venueLabel.length > 20 ? 8.5 : 12} fontWeight="600" fontFamily="Cormorant Garamond, Georgia, serif" style={{ fill: "var(--map-label-ink)" }}>{venueLabel}</text>
            </g>
          </g>
        </svg>
        <span className="map-chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>Open in Google Maps</span>
      </a>
      <div className="venue-info" data-reveal>
        <h3>{venueLabel}</h3>
        <p>{WEDDING.venue.addressLines.join(" ")}</p>
        <div className="venue-btns">
          <a className="btn" id="mapBtn" href={mapsUrl} target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>Open in Google Maps</a>
          <a className="btn ghost" id="dirBtn" href={dirUrl} target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 11 21 3l-8 18-2-8-8-2Z"/></svg>Get directions</a>
        </div>
      </div>
    </section>
  );
}

function Finale() {
  const ringText = `${WEDDING.groom.toUpperCase()} ✦ ${WEDDING.bride.toUpperCase()} ✦ ${ringDate} ✦ `.repeat(2);
  return (
    <section className="sec alt jaali arcade finale" id="finale">
      <div className="ring" data-reveal>
        <svg className="ring-text" viewBox="0 0 300 300" aria-hidden="true">
          <defs><path id="circ" d="M150 150m-130 0a130 130 0 1 1 260 0a130 130 0 1 1-260 0" /></defs>
          <text><textPath href="#circ" textLength="808" lengthAdjust="spacing">{ringText}</textPath></text>
        </svg>
        <div className="ring-photo"><img data-img="final" src={hero} alt={`${names} together`} draggable="false" /></div>
      </div>
      <h2 data-reveal>We can’t wait to celebrate with you</h2>
      <p className="finale-sub" data-reveal style={{ "--d": ".1s" }}>Your presence is the only blessing we wish for.</p>
      <div className="family">
        <div data-reveal><p className="fam-label">Invited with love by</p><p className="fam-name">our families</p></div>
        <div className="fam-sep" aria-hidden="true"><svg viewBox="0 0 120 16" width="120" height="16"><use href="#orn" /></svg></div>
        <div data-reveal style={{ "--d": ".15s" }}><p className="fam-label">With blessings from</p><p className="fam-name">family &amp; friends</p></div>
      </div>
      <footer className="foot">
        <p className="foot-mono">{names}</p>
        <small>{WEDDING.dateLong} · {venueLabel}</small>
      </footer>
    </section>
  );
}

export default function App() {
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    document.documentElement.classList.add("locked");
    document.title = `${names} — Wedding Invitation`;
    initDemo(demoConfig);

    const on = (id, event, label) =>
      document.getElementById(id)?.addEventListener(event, () => track(label));
    on("env", "click", "invite_opened");
    on("enterBtn", "click", "invite_entered");
    on("calBtn", "click", "calendar_click");
    on("mapBtn", "click", "maps_click");
  }, []);

  return (
    <>
      <Defs />
      <Intro />
      <main id="site" inert="" aria-hidden="true">
        <Hero />
        <Invite />
        <DateSection />
        <Story />
        <Moments />
        <Band />
        <Events />
        <Venue />
        <Finale />
      </main>
      <div className="dock" id="dock" hidden>
        <button className="sound" id="soundBtn" type="button" aria-pressed="true" aria-label="Pause music"><span className="bars" aria-hidden="true"><i /><i /><i /><i /></span></button>
      </div>
      <audio id="bgm" preload="auto" loop src={asset("music.mp3")} />
    </>
  );
}
