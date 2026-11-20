import { WEDDING } from "../weddingConfig";

/** Scrolling gold band with the names + date (demo-invitation style) */
export default function Marquee() {
  const [y, m, d] = WEDDING.dateISO.slice(0, 10).split("-");
  const dateStamp = `${d}.${m}.${y}`;

  const group = (
    <span className="marquee-group">
      {Array.from({ length: 4 }, (_, i) => (
        <span className="marquee-item" key={i}>
          {WEDDING.groom} <em>✦</em> {WEDDING.bride} <em>✦</em> {dateStamp}
          <em>✦</em>
        </span>
      ))}
    </span>
  );

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {group}
        {group}
      </div>
    </div>
  );
}
