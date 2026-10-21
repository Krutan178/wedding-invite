/* ============================================================
   APP — the invite flows as one scroll story
   ============================================================ */
import { useEffect, useState } from "react";

import EnvelopeScreen from "./components/EnvelopeScreen";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Story from "./components/Story";
import Events from "./components/Events";
import ScratchSection from "./components/ScratchSection";
import Venue from "./components/Venue";
import Info from "./components/Info";
import CountdownRsvp from "./components/CountdownRsvp";
import Footer from "./components/Footer";
import FxLayer from "./components/FxLayer";
import ScrollProgress from "./components/ScrollProgress";
import MusicToggle from "./components/MusicToggle";
import AdminPanel from "./components/AdminPanel";

import { celebrationBurst } from "./lib/confetti";

export default function App() {
  const [opened, setOpened] = useState(false);

  /* lock scroll while the envelope is closed */
  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
  }, [opened]);

  const isAdmin = new URLSearchParams(window.location.search).get("_admin") === "1";

  const handleOpen = () => {
    setOpened(true);
    celebrationBurst();
  };

  return (
    <>
      <ScrollProgress />
      <FxLayer />
      <MusicToggle />
      {isAdmin && <AdminPanel />}

      <EnvelopeScreen opened={opened} onOpen={handleOpen} />

      <main>
        <Hero />
        <Gallery />
        <Story />
        <ScratchSection />
        <Events />
        <Venue />
        <Info />
        <CountdownRsvp />
      </main>

      <Footer />
    </>
  );
}
