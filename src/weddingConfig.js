/* ============================================================
   WEDDING CONFIG — edit everything here, no other file needed
   ============================================================ */

export const WEDDING = {
  groom: "Rushikesh",
  bride: "Ankita",
  hashtag: "#RushikeshWedsAnkita",

  // countdown + calendar target — Saturday, 5 December 2026
  dateISO: "2026-12-05T10:30:00+05:30",
  dateLong: "Saturday, 5 December 2026",
  dateDay: "Saturday",
  dateMain: "5 December 2026",
  timeLong: "10:30 in the morning",

  venue: {
    name: "Sakhubai Bhaskar Mangal Karyalay",
    addressLines: ["Naigaon, Vasai-Virar,", "Maharashtra — India"],
    mapsQuery: "Sakhubai+Bhaskar+Mangal+Karyalay",
    coords: { lat: 19.4414638, lng: 72.823973 },
  },

  // RSVP — country code + number, no "+"
  whatsapp: "919999999999",
  rsvpDeadline: "20 November 2026",

  // story timeline
  timeline: [
    { date: "Summer 2021", title: "First Hello", text: "A chance meeting at a friend’s wedding — a borrowed umbrella, a shared laugh, and a conversation that never quite ended." },
    { date: "Spring 2024", title: "The Promise", text: "At sunrise by the riverside, over cutting chai, the question was asked — and joyfully answered with a yes." },
    { date: "5 December 2026", title: "Forever Begins", text: "With the blessings of our families, we begin a lifetime together — and we would love for you to be there." },
  ],

  // celebration events
  events: [
    { icon: "🌿", name: "Mehendi", when: "Thu · 3 December · 4:00 PM", where: "The Palace Courtyard", note: "Henna, folk songs & chai" },
    { icon: "🌼", name: "Haldi", when: "Fri · 4 December · 10:00 AM", where: "Garden of Marigolds", note: "Wear what turmeric won't ruin!" },
    { icon: "🎶", name: "Sangeet", when: "Fri · 4 December · 7:00 PM", where: "Jashn Hall", note: "Dance like no one is filming" },
    { icon: "💍", name: "The Wedding", when: "Sat · 5 December · 10:30 AM", where: "Vivah Mandap", note: "Varmala at 11:30 · lunch after" },
  ],

  info: [
    { icon: "👘", title: "Dress Code", text: "Traditional Indian — sarees, kurtas & jewel tones welcome. Gold accents encouraged, comfort guaranteed." },
    { icon: "💌", title: "Gifts", text: "Your blessings are the only gift we seek. Your presence completes our celebration." },
    { icon: "🍛", title: "The Feast", text: "Satvik lunch right after the pheras — paneer, puran poli, and enough chutney for everyone." },
  ],

  photos: [
    { src: "assets/couple.jpg", caption: "A new chapter began — 16·08·2026", tilt: "left", polaroid: true },
    { src: "assets/photo2.svg", caption: "the yes that mattered", tilt: "right" },
    { src: "assets/photo3.svg", caption: "family & forever", tilt: "left" },
    { src: "assets/photo4.svg", caption: "every festival, together", tilt: "right" },
    { src: "assets/photo5.svg", caption: "sunsets & chai", tilt: "left" },
    { src: "assets/photo6.svg", caption: "many more to come", tilt: "right" },
  ],
};

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${WEDDING.venue.mapsQuery}`;

export const rsvpUrl =
  `https://wa.me/${WEDDING.whatsapp}?text=` +
  encodeURIComponent(`Yay! Count me in for ${WEDDING.groom} & ${WEDDING.bride}'s wedding! 💛`);
