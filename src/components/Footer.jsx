import Reveal from "./Reveal";
import { WEDDING } from "../weddingConfig";

export default function Footer() {
  return (
    <footer className="footer">
      <span className="orn">❋ ❋ ❋</span>

      <Reveal as="p" className="footer-invite">
        We can’t wait to celebrate with you
      </Reveal>
      <Reveal as="p" className="footer-blessing">
        Your presence is the only blessing we wish for.
      </Reveal>

      <Reveal as="p" className="footer-names">
        {WEDDING.groom} <em>&amp;</em> {WEDDING.bride}
      </Reveal>
      <p className="footer-when">
        {WEDDING.dateLong} · {WEDDING.venue.name}
      </p>

      <p className="footer-family">
        Invited with love by <strong>our families</strong>
      </p>
      <p className="footer-hashtag">{WEDDING.hashtag} — share your joy 📸</p>
    </footer>
  );
}
