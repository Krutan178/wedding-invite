import { useEffect, useState } from "react";
import { history } from "../lib/tracking";

/** Hidden click-history panel — opens with ?_admin=1 */
export default function AdminPanel() {
  const [rows, setRows] = useState(history.get());

  useEffect(() => {
    const onTrack = () => setRows(history.get().slice().reverse());
    window.addEventListener("wedding-track", onTrack);
    return () => window.removeEventListener("wedding-track", onTrack);
  }, []);

  if (!rows.length) {
    return null;
  }

  const summary = {};
  rows.forEach((r) => (summary[r.event] = (summary[r.event] || 0) + 1));

  const downloadCsv = () => {
    const csv =
      "time,event,guest,utm_source,utm_campaign,device,extra\n" +
      rows
        .map((r) =>
          [`${r.ts}`, r.event, r.guest, r.source, r.campaign, r.device,
           `"${(r.extra || "").replace(/"/g, "'")}"`].join(",")
        )
        .join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "wedding-clicks.csv";
    a.click();
  };

  return (
    <div id="track-admin" className="admin-panel">
      <b className="admin-title">🐾 Click history — {rows.length} events</b>
      <span className="admin-actions">
        <button type="button" onClick={downloadCsv} title="Download CSV">⬇ CSV</button>
        <button type="button" onClick={() => { history.clear(); setRows([]); }} title="Delete local history">🗑</button>
        <button type="button" onClick={() => document.getElementById("track-admin").remove()} title="Close">✕</button>
      </span>
      <div className="admin-summary">
        {Object.entries(summary).map(([k, v]) => `${k}: ${v}`).join(" · ")}
      </div>
      <table>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{(r.ts || "").replace("T", " ").slice(0, 19)}</td>
              <td className="admin-event"><b>{r.event}</b></td>
              <td>{r.guest || "—"}</td>
              <td>{r.source || "—"}/{r.campaign || "—"}</td>
              <td>{r.device}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
