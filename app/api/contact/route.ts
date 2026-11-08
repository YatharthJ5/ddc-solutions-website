// Sends via Resend only when RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL are set. Otherwise returns 503 — never a fake success.
export async function POST(req: Request) {
  const { RESEND_API_KEY: key, CONTACT_TO_EMAIL: to, CONTACT_FROM_EMAIL: from } = process.env;
  if (!key || !to || !from) return Response.json({ error: "not_configured" }, { status: 503 });
  const b = await req.json().catch(() => null);
  if (!b || !b.name || !/^\S+@\S+\.\S+$/.test(b.email ?? "") || !b.message || String(b.message).length > 5000) return Response.json({ error: "invalid" }, { status: 400 });
  if (b.website) return Response.json({ ok: true });
  const r = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], reply_to: b.email, subject: `Website enquiry from ${String(b.name).slice(0, 80)}`, text: `Name: ${b.name}\nEmail: ${b.email}\n\n${b.message}` }) });
  return r.ok ? Response.json({ ok: true }) : Response.json({ error: "send_failed" }, { status: 502 });
}
