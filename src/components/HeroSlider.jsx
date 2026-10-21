import { useEffect, useState } from "react";
import { WEDDING } from "../weddingConfig";

/** Slow Ken-Burns crossfade of couple photos behind the hero names,
    under an ivory veil — the plush "editorial" hero from premium invites. */
export default function HeroSlider() {
  const [i, setI] = useState(0);
  const photos = WEDDING.photos;

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % photos.length), 5200);
    return () => clearInterval(t);
  }, [photos.length]);

  return (
    <div className="hero-slider" aria-hidden="true">
      {photos.map((p, idx) => (
        <div key={idx} className={`hero-slide ${idx === i ? "active" : ""}`}>
          <img src={p.src} alt="" loading={idx === 0 ? "eager" : "lazy"} />
        </div>
      ))}
      <div className="hero-veil" />
    </div>
  );
}
