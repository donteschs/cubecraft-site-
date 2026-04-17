import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const TOKEN = process.env.TIKTOK_ACCESS_TOKEN!;
const PIXEL_ID = process.env.TIKTOK_PIXEL_ID!;
const API_URL = "https://business-api.tiktok.com/open_api/v1.3/event/track/";

function sha256(value: string) {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event, event_id, properties = {}, user = {} } = body;

    if (!event) {
      return NextResponse.json({ error: "event required" }, { status: 400 });
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      undefined;

    const context: Record<string, unknown> = {
      page: { url: properties.url ?? "https://cubecrafte.com/" },
      ip,
      user_agent: req.headers.get("user-agent") || undefined,
    };

    const userObj: Record<string, unknown> = {};
    if (user.email) userObj["sha256_email"] = sha256(user.email);
    if (user.phone) userObj["sha256_phone_number"] = sha256(user.phone);

    const payload = {
      pixel_code: PIXEL_ID,
      event,
      event_id: event_id ?? `${event}-${Date.now()}`,
      timestamp: new Date().toISOString(),
      context,
      user: userObj,
      properties: {
        currency: properties.currency ?? "EUR",
        value: properties.value ?? 0,
        contents: properties.contents ?? [],
      },
    };

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Access-Token": TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("[tiktok/events]", err);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
