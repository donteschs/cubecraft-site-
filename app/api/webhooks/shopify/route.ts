import { createHmac } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET!;
const TIKTOK_TOKEN = process.env.TIKTOK_ACCESS_TOKEN!;
const TIKTOK_PIXEL = process.env.TIKTOK_PIXEL_ID!;
const PINTEREST_TOKEN = process.env.PINTEREST_ACCESS_TOKEN!;

function verifyHmac(body: string, hmacHeader: string): boolean {
  const digest = createHmac("sha256", WEBHOOK_SECRET)
    .update(body, "utf8")
    .digest("base64");
  return digest === hmacHeader;
}

async function sendTikTokPurchase(order: Record<string, unknown>) {
  const lines = (order.line_items as Record<string, unknown>[]) ?? [];
  await fetch("https://business-api.tiktok.com/open_api/v1.3/event/track/", {
    method: "POST",
    headers: { "Access-Token": TIKTOK_TOKEN, "Content-Type": "application/json" },
    body: JSON.stringify({
      pixel_code: TIKTOK_PIXEL,
      event: "Purchase",
      event_id: `order-${order.id}`,
      timestamp: new Date().toISOString(),
      context: { page: { url: "https://cubecrafte.com/commander" } },
      properties: {
        currency: order.currency ?? "EUR",
        value: Number(order.total_price ?? 0),
        contents: lines.map((l) => ({
          content_id: String(l.variant_id ?? l.product_id),
          content_type: "product",
          content_name: String(l.name ?? ""),
        })),
      },
    }),
  });
}

async function sendPinterestPurchase(order: Record<string, unknown>) {
  const lines = (order.line_items as Record<string, unknown>[]) ?? [];
  await fetch(
    "https://api.pinterest.com/v5/ad_accounts/549770272622/events",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PINTEREST_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [
          {
            event_name: "checkout",
            action_source: "web",
            event_time: Math.floor(Date.now() / 1000),
            event_id: `order-${order.id}`,
            event_source_url: "https://cubecrafte.com/commander",
            user_data: {},
            custom_data: {
              currency: order.currency ?? "EUR",
              value: Number(order.total_price ?? 0),
              order_quantity: lines.reduce((s: number, l: Record<string, unknown>) => s + Number(l.quantity ?? 1), 0),
              line_items: lines.map((l) => ({
                product_name: String(l.name ?? ""),
                product_id: String(l.variant_id ?? l.product_id),
                product_price: Number(l.price ?? 0),
                product_quantity: Number(l.quantity ?? 1),
              })),
            },
          },
        ],
      }),
    }
  );
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const hmac = req.headers.get("x-shopify-hmac-sha256") ?? "";
  const topic = req.headers.get("x-shopify-topic") ?? "";

  if (!verifyHmac(body, hmac)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (topic === "orders/paid") {
    const order = JSON.parse(body) as Record<string, unknown>;
    await Promise.allSettled([
      sendTikTokPurchase(order),
      sendPinterestPurchase(order),
    ]);
  }

  return NextResponse.json({ ok: true });
}
