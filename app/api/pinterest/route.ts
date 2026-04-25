import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const TOKEN = process.env.PINTEREST_ACCESS_TOKEN!;
const AD_ACCOUNT_ID = "549770272622";
const API_URL = `https://api.pinterest.com/v5/ad_accounts/${AD_ACCOUNT_ID}/events`;

function sha256(value: string) {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event_name, event_id, user_data = {}, custom_data = {} } = body;

    if (!event_name) {
      return NextResponse.json({ error: "event_name required" }, { status: 400 });
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      undefined;

    const userData: Record<string, unknown> = {
      client_ip_address: ip,
      client_user_agent: req.headers.get("user-agent") || undefined,
    };

    if (user_data.em) {
      const hashed = sha256(user_data.em);
      userData["em"] = [hashed];
      userData["hashed_maids"] = [hashed];
    }

    const payload = {
      data: [
        {
          event_name,
          action_source: "web",
          event_time: Math.floor(Date.now() / 1000),
          event_id: event_id ?? `${event_name}-${Date.now()}`,
          event_source_url: user_data.url ?? "https://cubecrafte.com/",
          user_data: userData,
          custom_data: {
            ...custom_data,
            // Pinterest exige value en string
            value: custom_data.value != null ? String(custom_data.value) : undefined,
            currency: custom_data.currency ?? "EUR",
            num_items: custom_data.order_quantity ?? undefined,
            order_id: custom_data.order_id ?? event_id ?? undefined,
            content_ids: custom_data.line_items?.map((l: { product_id: string }) => l.product_id) ?? undefined,
          },
        },
      ],
    };

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("[pinterest/events]", err);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
