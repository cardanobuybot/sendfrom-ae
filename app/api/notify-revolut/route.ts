import { NextResponse, type NextRequest } from "next/server";

/**
 * Simple email capture endpoint for the /revolut launch notification form.
 *
 * Storage: NOT WIRED UP. When you decide on an ESP (Mailchimp, Loops,
 * Resend, Buttondown, Postmark, etc.), replace the body of this handler
 * with a POST to their API. We deliberately do NOT log the email to
 * server console — that would count as personal data in a log store.
 */
export async function POST(req: NextRequest) {
  let email: string | undefined;
  try {
    const body = await req.json();
    email = typeof body?.email === "string" ? body.email : undefined;
  } catch { /* noop */ }
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "invalid email" }, { status: 400 });
  }
  // TODO: replace with real ESP call:
  //   await fetch(process.env.ESP_ENDPOINT!, { method: "POST", body: ... });
  return NextResponse.json({ ok: true }, { status: 202 });
}
