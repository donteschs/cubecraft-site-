import { createHash } from "crypto";

const CLOUD = "druvbvnob";
const API_KEY = process.env.CLOUDINARY_API_KEY!;
const API_SECRET = process.env.CLOUDINARY_API_SECRET!;

function sign(params: Record<string, string>): string {
  const sorted = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return createHash("sha1")
    .update(sorted + API_SECRET)
    .digest("hex");
}

export async function uploadFromUrl(
  imageUrl: string,
  publicId: string
): Promise<string> {
  const timestamp = String(Math.floor(Date.now() / 1000));
  const folder = "autopins";

  const params: Record<string, string> = {
    folder,
    public_id: publicId,
    timestamp,
  };

  const signature = sign(params);

  const form = new FormData();
  form.append("file", imageUrl);
  form.append("api_key", API_KEY);
  form.append("timestamp", timestamp);
  form.append("signature", signature);
  form.append("folder", folder);
  form.append("public_id", publicId);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`,
    { method: "POST", body: form }
  );

  const data = (await res.json()) as { secure_url?: string; error?: { message: string } };

  if (!data.secure_url) {
    throw new Error(data.error?.message ?? "Cloudinary upload failed");
  }

  return data.secure_url;
}
