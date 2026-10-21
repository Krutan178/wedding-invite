import { useRef } from "react";
import { track } from "../lib/tracking";

/** Floating music toggle — put any mp3 at public/assets/music.mp3 */
export default function MusicToggle() {
  const audioRef = useRef(null);
  const btnRef = useRef(null);

  const toggle = () => {
    const audio = audioRef.current;
    const btn = btnRef.current;
    if (audio.paused) {
      audio.play()
        .then(() => btn.classList.add("playing"))
        .catch(() => {
          btn.classList.add("missing");
          setTimeout(() => btn.classList.remove("missing"), 3200);
        });
    } else {
      audio.pause();
      btn.classList.remove("playing");
    }
    track("music_toggle", { playing: audio.paused });
  };

  return (
    <>
      <audio id="bg-music" ref={audioRef} loop preload="none" src="assets/music.mp3" />
      <button id="music-btn" ref={btnRef} onClick={toggle} title="Play / pause music" aria-label="Toggle background music">
        ♪
      </button>
    </>
  );
}
