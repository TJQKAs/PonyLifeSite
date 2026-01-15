"use server";

import { Resend } from "resend";

export type ContactState =
  | { ok: true }
  | { ok: false; error: string }
  | null;

function stripControls(s: string) {
  // убираем управляющие символы, включая \r \n
  return s.replace(/[\u0000-\u001F\u007F]/g, "");
}

function sanitizeText(raw: FormDataEntryValue | null, maxLen: number) {
  const s = stripControls(String(raw ?? "")).trim();
  // убираем угловые скобки, чтобы HTML/скрипты не “выглядели как HTML”
  const cleaned = s.replace(/[<>]/g, "");
  return cleaned.length > maxLen ? cleaned.slice(0, maxLen) : cleaned;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);
}

export async function sendContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  try {
    // honeypot (боты часто его заполняют)
    const hp = sanitizeText(formData.get("company"), 80);
    if (hp) return { ok: true };

    const name = sanitizeText(formData.get("name"), 80);
    const email = sanitizeText(formData.get("email"), 120);
    const message = sanitizeText(formData.get("message"), 4000);

    if (!name) return { ok: false, error: "Name is required." };
    if (!email) return { ok: false, error: "E-mail is required." };
    if (!isValidEmail(email)) return { ok: false, error: "E-mail looks invalid." };
    if (!message) return { ok: false, error: "Message is required." };

    const resend = new Resend(process.env.RESEND_API_KEY);
    const to = process.env.CONTACT_TO_EMAIL!;
    const from = process.env.CONTACT_FROM_EMAIL!; // например contact@send.ponylife.art 
    await resend.emails.send({
      from,
      to,
      subject: `PonyLife collaboration: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`,
      replyTo: email,
    });

    return { ok: true };
   } catch (e: any) {
    const msg = String(e?.message ?? "");
    // Временно покажем реальную ошибку (без секретов)
    return { ok: false, error: `Send failed: ${msg || "Unknown error"}` };
  }
}
// просто деплой