import Reveal from "./Reveal";
import { WEDDING } from "../weddingConfig";

export default function Footer() {
  return (
    <footer className="footer">
      <span className="orn">❋ ❋ ❋</span>
      <Reveal as="p" className="footer-names">
        {WEDDING.groom} <em>&</em> {WEDDING.bride}
      </Reveal>
      <p className="footer-hashtag">{WEDDING.hashtag} — share your joy 📸</p>
      <p className="footer-love">with love, our families &amp; us</p>
    </footer>
  );
}
