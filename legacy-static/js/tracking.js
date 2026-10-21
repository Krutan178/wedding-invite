/* ============================================================
   WEDDING SITE TRACKING — UTM capture + visit history
   ------------------------------------------------------------
   Works with zero setup (local history + admin panel).
   Optional: paste your Google Sheets webhook and/or GA4 id
   below to keep a permanent history.
   ============================================================ */
window.WEDDING_TRACK = (function () {

  /* ================= EDIT ME (optional) ================= */
  const CONFIG = {
    // Google Analytics 4 measurement id, e.g. "G-XXXXXXXXXX" — leave "" to disable
    GA_ID: "",

    // Google Apps Script web-app URL that appends rows to a Sheet
    // (see tracking-setup.md) — leave "" to disable
    SHEET_WEBHOOK_URL: "",
  };
  /* ====================================================== */

  const FIRST_KEY = "wedding_first_touch";   // first UTM dose a visitor ever received
  const LAST_KEY  = "wedding_last_touch";    // most recent UTM dose
  const VISITOR_KEY = "wedding_visitor_id";
  const HISTORY_KEY = "wedding_history";     // local click history (max 300)

  const q = new URLSearchParams(location.search);

  /* ---------- helpers ---------- */
  function lsGet(key, fallback = null) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  }
  function lsSet(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* private mode */ }
  }

  /* ---------- identity ---------- */
  let visitorId = lsGet(VISITOR_KEY);
  if (!visitorId) {
    visitorId = "v-" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
    lsSet(VISITOR_KEY, visitorId);
  }

  /* ---------- UTM + guest capture ---------- */
  const utmKeys = ["source", "medium", "campaign", "content", "term"];
  const urlUtms = {};
  let hasUtms = false;
  utmKeys.forEach((k) => {
    const v = q.get("utm_" + k);
    if (v) { urlUtms[k] = v; hasUtms = true; }
  });

  const guest = q.get("guest") || lsGet("wedding_guest") || "";
  if (q.get("guest")) lsSet("wedding_guest", guest);

  const firstTouch = lsGet(FIRST_KEY);
  if (hasUtms) {
    if (!firstTouch) lsSet(FIRST_KEY, { ...urlUtms, seenAt: new Date().toISOString() });
    lsSet(LAST_KEY, { ...urlUtms, seenAt: new Date().toISOString() });
  }

  const first = lsGet(FIRST_KEY) || {};
  const last  = lsGet(LAST_KEY)  || {};
  const utm = hasUtms ? urlUtms : last;

  /* ---------- device profile ---------- */
  function detectDevice() {
    const ua = navigator.userAgent;
    if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
    if (/mobi/i.test(ua)) return "mobile";
    return "desktop";
  }

  /* ---------- GA4 (injected only when configured) ---------- */
  if (CONFIG.GA_ID) {
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + CONFIG.GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag("js", new Date());
    gtag("config", CONFIG.GA_ID, {
      campaign_source: utm.source,
      campaign_medium: utm.medium,
      campaign_name: utm.campaign,
      campaign_content: utm.content,
      custom_map: { dimension1: "guest" },
    });
  }

  /* ---------- the tracker ---------- */
  function track(event, extra = {}) {
    const payload = {
      event,
      ts: new Date().toISOString(),
      guest: guest || extra.guest || "",
      utm_source: utm.source || "",
      utm_medium: utm.medium || "",
      utm_campaign: utm.campaign || "",
      utm_content: utm.content || "",
      visitorId,
      referrer: document.referrer ? document.referrer.slice(0, 120) : "direct",
      device: detectDevice(),
      screen: window.innerWidth + "x" + window.innerHeight,
      language: navigator.language,
      ...extra,
    };

    /* local history (always on — powers the admin panel) */
    const history = lsGet(HISTORY_KEY, []);
    history.push({ event: payload.event, ts: payload.ts, guest: payload.guest,
                   source: payload.utm_source, campaign: payload.utm_campaign,
                   device: payload.device, extra: JSON.stringify(extra) });
    while (history.length > 300) history.shift();   // keep an upgrade path small
    lsSet(HISTORY_KEY, history);

    /* GA4 */
    if (CONFIG.GA_ID && window.gtag) {
      gtag("event", event, {
        guest: payload.guest,
        utm_source: payload.utm_source,
        utm_campaign: payload.utm_campaign,
        ...extra,
      });
    }

    /* Google Sheets */
    if (CONFIG.SHEET_WEBHOOK_URL) {
      try {
        fetch(CONFIG.SHEET_WEBHOOK_URL, {
          method: "POST",
          mode: "no-cors",           // Apps Script doesn't send CORS headers
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify(payload),
          keepalive: true,
        }).catch(() => {});
      } catch { /* offline — local history still keeps it */ }
    }

    /* let the admin panel listen in */
    window.dispatchEvent(new CustomEvent("wedding-track", { detail: payload }));
    console.info("[wedding-track]", event, payload);
    return payload;
  }

  /* ---------- auto events on page ---------- */
  // page visit (what the user asked for: "who clicked on my website")
  track("visit");

  function onClick(id, event, extraFn) {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", () => {
      track(event, extraFn ? extraFn() : {});
    });
  }
  onClick("open-btn", "invite_opened", () => ({ msSinceLoad: Date.now() - performance.timing?.navigationStart }));
  onClick("popper-btn", "party_popper");
  onClick("rsvp-link", "rsvp_click");
  onClick("maps-link", "directions_click");
  onClick("music-btn", "music_toggle");

  /* section views — one event per section */
  const seen = new Set();
  const pageEls = document.querySelectorAll("section[id], header[id], footer");
  if ("IntersectionObserver" in window && pageEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting && !seen.has(en.target.id)) {
          seen.add(en.target.id);
          track("section_view", { section: en.target.id || "footer" });
        }
      });
    }, { threshold: 0.3 });
    pageEls.forEach((el) => io.observe(el));
  }

  /* ============================================================
     ADMIN PANEL — open index.html?_admin=1  (keep it secret-ish)
     ============================================================ */
  if (q.get("_admin") === "1") buildAdminPanel();

  function buildAdminPanel() {
    const panel = document.createElement("div");
    panel.id = "track-admin";
    panel.setAttribute("style", `
      position: fixed; inset: auto 12px 12px 12px; z-index: 200;
      max-height: 62vh; overflow: auto;
      background: #fffdf6; color: #4a3b24; border: 1px solid #c2a14d;
      border-radius: 14px; box-shadow: 0 18px 44px rgba(0,0,0,.3);
      font: 12px/1.5 Consolas, monospace; padding: 14px;`);

    function render() {
      const rows = lsGet(HISTORY_KEY, []).slice().reverse();
      const summary = {};
      rows.forEach(r => summary[r.event] = (summary[r.event] || 0) + 1);
      panel.innerHTML = `
        <b style="color:#8a3324">🐾 Click history — ${rows.length} events</b>
        <span style="float:right">
          <button data-act="csv" title="Download CSV">⬇ CSV</button>
          <button data-act="clear" title="Delete local history">🗑</button>
          <button data-act="close">✕</button>
        </span>
        <div style="margin:6px 0 8px;color:#a8842c">${Object.entries(summary).map(([k, v]) => k + ": " + v).join(" · ")}</div>
        <table style="width:100%;border-collapse:collapse">
          ${rows.map(r => `
            <tr style="border-top:1px dashed #e5d7b0">
              <td style="padding:3px 6px;white-space:nowrap">${r.ts.replace("T", " ").slice(0, 19)}</td>
              <td style="padding:3px 6px;color:#8a3324"><b>${r.event}</b></td>
              <td style="padding:3px 6px">${r.guest || "—"}</td>
              <td style="padding:3px 6px">${r.source || "—"}/${r.campaign || "—"}</td>
              <td style="padding:3px 6px">${r.device}</td>
            </tr>`).join("")}
        </table>`;
    }

    panel.addEventListener("click", (e) => {
      const act = e.target.dataset?.act;
      if (!act) return;
      if (act === "close") panel.remove();
      if (act === "clear") { lsSet(HISTORY_KEY, []); render(); }
      if (act === "csv") {
        const rows = lsGet(HISTORY_KEY, []);
        const csv = "time,event,guest,utm_source,utm_campaign,device,extra\n" +
          rows.map(r => [r.ts, r.event, r.guest, r.source, r.campaign, r.device, '"' + r.extra.replace(/"/g, "'") + '"'].join(",")).join("\n");
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
        a.download = "wedding-clicks.csv";
        a.click();
      }
    });

    render();
    window.addEventListener("wedding-track", render);
    document.body.appendChild(panel);
  }

  /* ---------- public API ---------- */
  return {
    track,
    guest,
    utm,
    visitorId,
    history: () => lsGet(HISTORY_KEY, []),
  };
})();
