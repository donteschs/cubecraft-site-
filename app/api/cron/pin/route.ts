import { NextRequest, NextResponse } from "next/server";
import { getPinForSlot } from "lib/pinterest-autopins";

const ZERNIO_TOKEN = process.env.ZERNIO_API_KEY!;
const ZERNIO_ACCOUNT_ID = "69d799a27dea335c2bcc4d82";
const PINTEREST_BOARD_ID = "1027031958713855085";

function getCurrentSlot(): number {
  const now = Date.now();
  const daysSinceEpoch = Math.floor(now / (1000 * 60 * 60 * 24));
  const hourSlot = Math.floor(
    (now % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60 * 24 / 7)
  );
  return daysSinceEpoch * 7 + hourSlot;
}

export async function GET(req: NextRequest) {
  // Vercel sends Authorization: Bearer {CRON_SECRET} for cron jobs
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const slot = getCurrentSlot();
  const pin = await getPinForSlot(slot);

  const res = await fetch("https://zernio.com/api/v1/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ZERNIO_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: pin.content,
      publishNow: true,
      mediaItems: [pin.mediaItem],
      platforms: [
        {
          platform: "pinterest",
          accountId: ZERNIO_ACCOUNT_ID,
          platformSpecificData: {
            title: pin.title,
            link: "https://cubecrafte.com/commander",
            boardId: PINTEREST_BOARD_ID,
          },
        },
      ],
    }),
  });

  const data = await res.json();
  const status = data?.post?.platforms?.[0]?.status ?? "unknown";
  const pinUrl = data?.post?.platforms?.[0]?.platformPostUrl ?? null;

  return NextResponse.json({
    slot,
    title: pin.title,
    status,
    pinUrl,
    mediaType: pin.mediaItem.type,
    mediaUrl: pin.mediaItem.url,
  });
}
