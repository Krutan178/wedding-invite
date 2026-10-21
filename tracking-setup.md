# 📊 Click Tracking & UTM Setup Guide

Track **who opened your invite, when, from where**, and what they did — without paying anything.

---

## What gets tracked automatically

| Event | Meaning |
|---|---|
| `visit` | Someone loaded the invite (this answers "who clicked") |
| `invite_opened` | They clicked the envelope |
| `section_view` | Scrolled to a section (`moments`, `story`, `events`, `date`, `venue`, `rsvp`…) |
| `date_revealed` | Scratched the date card (with how many seconds it took) |
| `party_popper` | Pressed the popper button |
| `rsvp_click` | Tapped RSVP on WhatsApp |
| `directions_click` | Tapped Get Directions |
| `music_toggle` | Toggled background music |

Every event carries: **timestamp, guest name, utm_source / medium / campaign, device, screen size, referrer, and a browser "visitor id"**.

---

## Option A — No setup at all (works right now)

All visits/clicks are already saved in the visitor's own browser (`localStorage`).

**To see the history yourself:**

1. Open your site with this suffix: `?_admin=1`
   e.g. `index.html?_admin=1`
2. A panel appears with every event: time, name, source, campaign, device.
3. `⬇ CSV` downloads it, `🗑` clears it, `✕` closes it.

⚠️ Limitation: it only shows **your own browser's** visits — it can't collect data from other phones. For that, use Option B.

---

## Option B — Google Sheets history (recommended, ~5 minutes, free)

Every guest's clicks get appended as rows in **your** Google Sheet.

### 1. Create the sheet
- Go to [sheets.new](https://sheets.new)
- Name it `Wedding Invitation Clicks`

### 2. Add the script
- In the sheet: **Extensions → Apps Script**
- Delete anything there and paste:

```javascript
function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName("Clicks") || ss.insertSheet("Clicks");
  if (sh.getLastRow() === 0) {
    sh.appendRow(["Time", "Event", "Guest", "utm_source", "utm_campaign",
                  "utm_medium", "Visitor ID", "Referrer", "Device", "Screen", "Extra"]);
  }
  try {
    const d = JSON.parse(e.postData.contents);
    sh.appendRow([new Date(), d.event, d.guest, d.utm_source, d.utm_campaign,
                  d.utm_medium, d.visitorId, d.referrer, d.device, d.screen,
                  JSON.stringify(d, null, 0)]);
  } catch (err) {
    sh.appendRow([new Date(), "parse_error", "", "", "", "", "", String(err)]);
  }
  return ContentService.createTextOutput("ok");
}
```

### 3. Deploy it
- Click **Deploy → New deployment**
- Type: **Web app**
- **Execute as:** Me
- **Who has access:** Anyone  ← important!
- Click **Deploy**, authorize, and copy the **Web App URL**
  (looks like `https://script.google.com/macros/s/AKfy…/exec`)

### 4. Connect the site
Open `src/lib/tracking.js` and paste the URL:

```js
const CONFIG = {
  GA_ID: "",
  SHEET_WEBHOOK_URL: "https://script.google.com/macros/s/AKfy…/exec",
};
```

**Done.** From then on every click on any guest's phone becomes a row in your sheet. Refresh the sheet to watch it live. You can then filter/sort in Sheets, or add a pivot table for a tidy dashboard.

---

## Option C — Google Analytics 4 (deep funnel reports, free)

1. Go to analytics.google.com → create a **GA4 property** → web data stream
2. Copy the Measurement ID (`G-XXXXXXXXXX`)
3. Paste it in `js/tracking.js`:

```js
GA_ID: "G-XXXXXXXXXX",
```

GA4 automatically records your UTM campaign reports (Reports → Acquisition → Traffic acquisition), plus all the custom events above. You can see it in **Reports → Engagements → Events**.

You can use B and C together — no conflict.

---

## Making the links with UTM + guest names

Open **`link-builder.html`** (in this folder, next to `index.html`):

- Type your hosted site address — e.g. after moving to Netlify: `https://your-site.netlify.app`
- Type a guest/family name — keeps the envelope personal: **"For The Sharma Family,"**
- Source / campaign lets you split reporting — e.g.
  - `utm_source=whatsapp` vs `utm_source=instagram`
  - `utm_campaign=diya-family` vs `utm_campaign=aarav-family`
- **Build link → Copy** and paste it in that family's WhatsApp chat
- **Bulk mode**: paste names of many families, one per line, get all the links at once

### Link anatomy

```
https://your-site.com/index.html
   ?guest=Sharma+Family        ← name on the envelope
   &utm_source=whatsapp        ← channel it was sent from
   &utm_medium=invite
   &utm_campaign=diya-family   ← group of invitees
```

---

## Testing checklist

1. `index.html?guest=Chhote+Papa&utm_source=test` → envelope should say *For Chhote Papa,*
2. Press F12 → Console → watch the `[wedding-track]` lines as you click around
3. Check your Sheet/`?_admin=1` — test events should appear
4. Remember: `file://` (opening from disk) works, but for guests you should host it:
   - **Netlify Drop** (drag the folder at netlify.com/drop) or
   - **GitHub Pages** — that's when the real history starts collecting.

---

## One privacy note

The invite doesn't collect names emails or locations — only the **link parameters** (guest/UTM) and click events you asked for, all from the guest's browser. Since it's a fun personal invitation and not a commercial site, that's fine; just keep it discriminator-free: never make the personal link feel like surveillance to a relative — the admin panel and spreadsheets are for you.
