"use client";
import { useState } from "react";
import { contact } from "@/lib/data";
const f = "mt-2 w-full border-0 border-b border-ink bg-transparent px-0 py-3 text-base";
export function ContactForm({ configured }: { configured: boolean }) {
  const [st, setSt] = useState<"idle" | "sending" | "ok" | "err">("idle");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setSt("sending");
    const d = Object.fromEntries(new FormData(e.currentTarget));
    try { const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) }); setSt(r.ok ? "ok" : "err"); } catch { setSt("err"); }
  }
  const fields = (<>
    <label className="block text-sm">Name<input name="name" required autoComplete="name" className={f} /></label>
    <label className="block text-sm">Email<input name="email" type="email" required autoComplete="email" className={f} /></label>
    <label className="block text-sm">Message<textarea name="message" rows={5} required className={f} /></label></>);
  if (!configured) return (
    <form action={`mailto:${contact.email}`} method="post" encType="text/plain" className="space-y-8">
      <p className="text-sm text-mute">Submitting opens your email app addressed to DDC Solutions. Nothing is sent until you press send there.</p>{fields}<button className="btn" type="submit">Compose email</button></form>);
  if (st === "ok") return <p role="status" className="display text-3xl">Thank you — your message has been sent.</p>;
  return (
    <form onSubmit={submit} className="space-y-8">{fields}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px]" />
      <button className="btn" disabled={st === "sending"} type="submit">{st === "sending" ? "Sending…" : "Send message"}</button>
      {st === "err" && <p role="alert" className="text-sm text-red-800">Your message could not be sent. Please email {contact.email} or call {contact.tel}.</p>}</form>);
}
