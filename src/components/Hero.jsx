import { useEffect, useRef } from "react";
import Reveal from "./Reveal";
import { WEDDING } from "../weddingConfig";

/** Hero with scroll-linked parallax: names slide toward each other. */
export default function Hero() {
  const name1 = useRef(null);
  const name3 = useRef(null);
  const amp = useRef(null);
  const hint = useRef(null);

  useEffect(() => {
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const vh = window.innerHeight;
        const capped = Math.min(y, vh);

        /* drift layers at different speeds for depth */
        if (hint.current) hint.current.style.transform = `translateY(${-capped * 0.5}px)`;
        if (amp.current) amp.current.style.transform = `translateY(${y * 0.12}px)`;

        /* names glide toward each other as you start scrolling */
        const slide = Math.min(y / (vh * 0.55), 1) * 70;
        if (name1.current) name1.current.style.transform =
          `translateX(${-slide}px) translateY(${y * 0.25}px)`;
        if (name3.current) name3.current.style.transform =
          `translateX(${slide}px) translateY(${y * 0.25}px)`;
        raf = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header id="home" className="hero">
      <div className="mandala mandala--big" aria-hidden="true" />
      <div className="mandala mandala--small" aria-hidden="true" />

      {/* hanging marigold toran */}
      <div className="toran" aria-hidden="true">
        {Array.from({ length: 14 }, (_, i) => <i key={i} />)}
      </div>
      {/* hanging lanterns */}
      <div className="lantern lantern--left" aria-hidden="true"><i /><b /><u /></div>
      <div className="lantern lantern--right" aria-hidden="true"><i /><b /><u /></div>

      <div className="hero-inner">
        <Reveal as="p" className="hero-ganesh">✦ श्री गणेशाय नमः ✦</Reveal>
        <Reveal as="p" className="hero-together" delay={120}>
          Together with our families, we invite you to celebrate
        </Reveal>
        <h1 className="hero-names" aria-label={`${WEDDING.groom} and ${WEDDING.bride}`}>
          <span className="name" ref={name1}>{WEDDING.groom}</span>
          <span className="amp" ref={amp}>&amp;</span>
          <span className="name" ref={name3}>{WEDDING.bride}</span>
        </h1>
        <Reveal as="p" className="hero-line" delay={160}>
          <span className="rule" /> Save the date <span className="rule" />
        </Reveal>
        <p className="hero-hint" ref={hint}>
          scroll to our story <span className="chev">⌄</span><span className="chev">⌄</span>
        </p>
      </div>
    </header>
  );
}
