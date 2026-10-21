/* ============================================================
   TRACKING — UTM capture + visit history (React edition)
   Optional extras: set CONFIG below (GA4 id / Sheets webhook)
   ============================================================== */

export const TRACKING_CONFIG = {
  // Google Analytics 4 measurement id, e.g. "G-XXXXXXXXXX" — "" to disable
  GA_ID: "",

  // Google Apps Script web-app URL that appends rows to a Sheet
  // (see tracking-setup.md) — "" to disable
  SHEET_WEBHOOK_URL: "",
};

const FIRST_KEY = "wedding_first_touch";
const LAST_KEY = "wedding_last_touch";
const VISITOR_KEY = "wedding_visitor_id";
const HISTORY_KEY = "wedding_history";

/* ---------- small helpers ---------- */
function lsGet(key, fallback = null) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}
function lsSet(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* private mode */ }
}

/* ---------- identity + utm + guest capture (runs once) ---------- */
const q = new URLSearchParams(window.location.search);

let visitorId = lsGet(VISITOR_KEY);
if (!visitorId) {
  visitorId = "v-" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
  lsSet(VISITOR_KEY, visitorId);
}

const urlUtms = {};
let hasUtms = false;
["source", "medium", "campaign", "content", "term"].forEach((k) => {
  const v = q.get("utm_" + k);
  if (v) { urlUtms[k] = v; hasUtms = true; }
});

export const guest = q.get("guest") || lsGet("wedding_guest") || "";
if (q.get("guest")) lsSet("wedding_guest", guest);

if (hasUtms) {
  if (!lsGet(FIRST_KEY)) lsSet(FIRST_KEY, { ...urlUtms, seenAt: new Date().toISOString() });
  lsSet(LAST_KEY, { ...urlUtms, seenAt: new Date().toISOString() });
}
export const utm = hasUtms ? urlUtms : lsGet(LAST_KEY) || {};

function detectDevice() {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobi/i.test(ua)) return "mobile";
  return "desktop";
}

/* ---------- optional GA4 injection ---------- */
if (TRACKING_CONFIG.GA_ID) {
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + TRACKING_CONFIG.GA_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", TRACKING_CONFIG.GA_ID, {
    campaign_source: utm.source,
    campaign_medium: utm.medium,
    campaign_name: utm.campaign,
  });
}

/* ---------- the tracker ---------- */
export function track(event, extra = {}) {
  const payload = {
    event,
    ts: new Date().toISOString(),
    guest: guest || "",
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

  /* local history (always on, powers the admin panel) */
  const history = lsGet(HISTORY_KEY, []);
  history.push({
    event: payload.event, ts: payload.ts, guest: payload.guest,
    source: payload.utm_source, campaign: payload.utm_campaign,
    device: payload.device, extra: JSON.stringify(extra),
  });
  while (history.length > 300) history.shift();
  lsSet(HISTORY_KEY, history);

  /* GA4 */
  if (TRACKING_CONFIG.GA_ID && window.gtag) {
    window.gtag("event", event, {
      guest: payload.guest,
      utm_source: payload.utm_source,
      utm_campaign: payload.utm_campaign,
      ...extra,
    });
  }

  /* Google Sheets */
  if (TRACKING_CONFIG.SHEET_WEBHOOK_URL) {
    try {
      fetch(TRACKING_CONFIG.SHEET_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    } catch { /* offline — local history keeps it */ }
  }

  window.dispatchEvent(new CustomEvent("wedding-track", { detail: payload }));
  return payload;
}

/* ---------- history access for the admin panel ---------- */
export const history = {
  get: () => lsGet(HISTORY_KEY, []),
  clear: () => lsSet(HISTORY_KEY, []),
};

/* visit event fires once when this module loads */
track("visit");
