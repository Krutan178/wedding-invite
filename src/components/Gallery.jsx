import { useEffect, useRef } from "react";
import Reveal from "./Reveal";
import { useSectionView } from "../lib/useSectionView";
import { WEDDING } from "../weddingConfig";

export default function Gallery() {
  useSectionView("moments");

  return (
    <section id="moments" className="section gallery">
      <div className="section-head">
        <Reveal as="span" className="kicker">Cherished</Reveal>
        <Reveal as="h2" className="title">Moments</Reveal>
        <Reveal as="span" className="divider">✦‿✦</Reveal>
      </div>

      <div className="photo-strip">
        {WEDDING.photos.map((photo, i) => (
          <Reveal
            as="figure"
            className={`photo-wrap cur-${photo.tilt} ${photo.polaroid ? "polaroid" : ""}`}
            key={i}
          >
            <ClipRevealImg src={photo.src} i={i} />
            <figcaption>{photo.caption}</figcaption>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/** Photo with a scroll-linked "curtain" clip reveal + gentle scroll drift */
function ClipRevealImg({ src, i }) {
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    const wrap = img.closest(".photo-wrap");
    let raf = null;

    /* reveal */
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          img.classList.add("big");
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(img);

    /* drift while scrolling over the photo */
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const r = wrap.getBoundingClientRect();
        const vh = window.innerHeight;
        const over = (vh - r.top) / (vh + r.height);
        if (over > -0.2 && over < 1.2) {
          wrap.style.translate = `0 ${(over - 0.5) * 34}px`;
        }
        raf = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <img ref={imgRef} className="clip-reveal" src={src} alt={`Couple photo ${i + 1}`} loading="lazy" />;
}
