import { NextRequest, NextResponse } from "next/server";
import { getPromptForSlot } from "lib/dalle-prompts";
import { uploadFromUrl } from "lib/cloudinary-upload";

const OPENAI_KEY = process.env.OPENAI_API_KEY!;
const ZERNIO_TOKEN = process.env.ZERNIO_API_KEY!;
const ZERNIO_ACCOUNT_ID = "69d799a27dea335c2bcc4d82";
const PINTEREST_BOARD_ID = "1027031958713855085";

function getCurrentSlot(): number {
  const now = Date.now();
  const daysSinceEpoch = Math.floor(now / (1000 * 60 * 60 * 24));
  const slotInDay = Math.floor(
    (now % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60 * 24 / 10)
  );
  return daysSinceEpoch * 10 + slotInDay;
}

async function generateImage(prompt: string): Promise<string> {
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt: `${prompt}. High quality, professional marketing photography. No text in image.`,
      n: 1,
      size: "1024x1792",
      quality: "standard",
    }),
  });
  const data = await res.json() as { data?: { url: string }[]; error?: { message: string } };
  if (!data.data?.[0]?.url) throw new Error(data.error?.message ?? "DALL-E failed");
  return data.data[0].url;
}

async function postToZernio(imageUrl: string, title: string, content: string) {
  const res = await fetch("https://zernio.com/api/v1/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ZERNIO_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
      publishNow: true,
      mediaItems: [{ type: "image", url: imageUrl }],
      platforms: [
        {
          platform: "pinterest",
          accountId: ZERNIO_ACCOUNT_ID,
          platformSpecificData: {
            title,
            link: "https://cubecrafte.com/commander",
            boardId: PINTEREST_BOARD_ID,
          },
        },
      ],
    }),
  });
  return res.json();
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const slot = getCurrentSlot();
  const { imagePrompt, title, content } = getPromptForSlot(slot);

  // 1. Generate image with DALL-E 3
  const dalleUrl = await generateImage(imagePrompt);

  // 2. Upload to Cloudinary (permanent storage)
  const publicId = `pin_${slot}_${Date.now()}`;
  const cloudinaryUrl = await uploadFromUrl(dalleUrl, publicId);

  // 3. Post to Pinterest via Zernio
  const result = await postToZernio(cloudinaryUrl, title, content);

  const status = result?.post?.platforms?.[0]?.status ?? "unknown";
  const pinUrl = result?.post?.platforms?.[0]?.platformPostUrl ?? null;

  return NextResponse.json({ slot, title, status, pinUrl, cloudinaryUrl });
}
