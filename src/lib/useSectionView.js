import { useEffect } from "react";
import { track } from "./tracking";

/** Fires one `section_view` event when the section scrolls 30% into view. */
export function useSectionView(id) {
  useEffect(() => {
    const el = document.getElementById(id);
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          track("section_view", { section: id });
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [id]);
}
