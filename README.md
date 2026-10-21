# 💛 Rushikesh & Ankita — Wedding Invitation (React + Vite)

A full-fledged React app: envelope opening, parallax names, curtain photo
reveals, a scratchable golden date card with party-popper confetti, venue,
countdown, RSVP, and full click/UTM tracking.

Older single-file version kept for reference in `legacy-static/`.

---

## Run it

```bash
npm install     # once
npm run dev     # dev server → http://localhost:5173
```

```bash
npm run build   # production build → dist/
npm run preview # serve the built version
```

Deploy `dist/` anywhere static (Netlify Drop, Vercel, GitHub Pages).

---

## Project structure

```
index.html                    ← Vite entry (fonts + meta)
vite.config.js
src/
  main.jsx                    ← React bootstrap
  App.jsx                     ← page assembly + envelope state
  weddingConfig.js            ← ✏️ ALL names/dates/venue/story/text here
  styles/global.css           ← full design system
  lib/
    confetti.js               ← party poppers + gold rain
    tracking.js               ← UTM/guest capture + history (edit CONFIG)
    useSectionView.js         ← auto section-view analytics
  components/
    EnvelopeScreen.jsx        ← gold envelope intro
    Hero.jsx                  ← parallax names, toran, lanterns
    Gallery.jsx               ← curtain-reveal photos + scroll drift
    Story.jsx                 ← timeline
    Events.jsx                ← Mehendi/Haldi/Sangeet/Wedding cards
    ScratchSection.jsx        ← canvas scratch card + popper button
    Venue.jsx                 ← venue card + direction link
    Info.jsx                  ← dress code / gifts / feast
    CountdownRsvp.jsx         ← live countdown + WhatsApp RSVP
    FxLayer.jsx               ← petals, fireflies, sparkle cursor trail
    ScrollProgress.jsx        ← gold reading bar
    MusicToggle.jsx           ← floating ♪ button (public/assets/music.mp3)
    AdminPanel.jsx            ← ?_admin=1 click-history overlay
    Reveal.jsx                ← shared viewport-reveal wrapper
public/
  assets/                     ← photos + music.mp3 (drop yours here)
  link-builder.html           ← per-guest UTM link generator
```

## Personalize

1. `src/weddingConfig.js` — names, date, venue, story, events, WhatsApp number
2. Replace `public/assets/photo1–3.svg` with real photos (any jpg/png — update `photos.src`)
3. Drop `public/assets/music.mp3` for the music button
4. `src/lib/tracking.js` → `TRACKING_CONFIG` for GA4 / Google-Sheets logging

## Tracking & personal links

- `?guest=Rahul+Family&utm_source=whatsapp` → personalized envelope + tracked events
- `?_admin=1` → live click-history panel, CSV export
- `link-builder.html` → generate/bulk-create personalized links
- Full setup (Google Sheets webhook + GA4): see `tracking-setup.md`
