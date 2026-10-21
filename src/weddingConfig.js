/* ============================================================
   WEDDING CONFIG — edit everything here, no other file needed
   ============================================================ */

export const WEDDING = {
  groom: "Aarav",
  bride: "Diya",
  hashtag: "#AaravWedsDiya",

  // countdown + calendar target
  dateISO: "2027-02-14T10:30:00+05:30",
  dateLong: "Sunday, 14 February 2027",
  dateDay: "Sunday",
  dateMain: "14 February 2027",
  timeLong: "10:30 in the morning",

  venue: {
    name: "The Grand Utsav Palace",
    addressLines: ["Lotus Gardens, Heritage Road,", "Jaipur, Rajasthan — 302001"],
    mapsQuery: "The+Grand+Utsav+Palace+Jaipur",
  },

  // RSVP — country code + number, no "+"
  whatsapp: "919999999999",
  rsvpDeadline: "10 January 2027",

  // story timeline
  timeline: [
    { date: "Summer 2021", title: "First Hello", text: "A chance meeting at a friend’s wedding — a borrowed umbrella, a shared laugh, and a conversation that never quite ended." },
    { date: "Spring 2023", title: "The Promise", text: "At sunrise on Marine Drive, over metro chai, the question was asked — and joyfully answered with a yes." },
    { date: "14 February 2027", title: "Forever Begins", text: "With the blessings of our families, we begin a lifetime together — and we would love for you to be there." },
  ],

  // celebration events
  events: [
    { icon: "🌿", name: "Mehendi", when: "Fri · 12 February · 4:00 PM", where: "The Palace Courtyard", note: "Henna, folk songs & chai" },
    { icon: "🌼", name: "Haldi", when: "Sat · 13 February · 10:00 AM", where: "Garden of Marigolds", note: "Wear what turmeric won't ruin!" },
    { icon: "🎶", name: "Sangeet", when: "Sat · 13 February · 7:00 PM", where: "Jashn Hall", note: "Dance like no one is filming" },
    { icon: "💍", name: "The Wedding", when: "Sun · 14 February · 10:30 AM", where: "Vivah Mandap", note: "Varmala at 11:30 · lunch after" },
  ],

  info: [
    { icon: "👘", title: "Dress Code", text: "Traditional Indian — sarees, kurtas & jewel tones welcome. Gold accents encouraged, comfort guaranteed." },
    { icon: "💌", title: "Gifts", text: "Your blessings are the only gift we seek. Your presence completes our celebration." },
    { icon: "🍛", title: "The Feast", text: "Satvik lunch right after the pheras — paneer, puran poli, and enough chutney for everyone." },
  ],

  photos: [
    { src: "assets/photo1.svg", caption: "where it all began", tilt: "left" },
    { src: "assets/photo2.svg", caption: "the yes that mattered", tilt: "right" },
    { src: "assets/photo3.svg", caption: "family & forever", tilt: "left" },
  ],
};

export const mapsUrl = `https://maps.google.com/?q=${WEDDING.venue.mapsQuery}`;

export const rsvpUrl =
  `https://wa.me/${WEDDING.whatsapp}?text=` +
  encodeURIComponent(`Yay! Count me in for ${WEDDING.groom} & ${WEDDING.bride}'s wedding! 💛`);
