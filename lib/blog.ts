import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
};

function parseDateOnly(date: string) {
  const [year, month, day] = date.split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  // Use noon UTC to avoid timezone edge cases around midnight.
  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
}

function parseDate(date: string): Date | null {
  // Full ISO timestamp (e.g. "2026-04-22T14:30:00Z" or "2026-04-22T14:30:00+02:00")
  if (date.includes("T")) {
    const d = new Date(date);
    return isNaN(d.getTime()) ? null : d;
  }
  // Date-only (e.g. "2026-04-22")
  return parseDateOnly(date);
}

export function formatPostDate(date: string): string {
  const publishedAt = parseDate(date);
  if (!publishedAt) return date;

  const now = Date.now();
  const elapsedMs = now - publishedAt.getTime();
  const hasTime = date.includes("T");

  // Relative display only when we have an exact timestamp
  if (hasTime && elapsedMs >= 0 && elapsedMs < 24 * 60 * 60 * 1000) {
    const minutes = Math.floor(elapsedMs / 60_000);
    const hours = Math.floor(elapsedMs / 3_600_000);
    if (hours >= 1) return `Il y a ${hours}h`;
    if (minutes >= 1) return `Il y a ${minutes} min`;
    return "À l'instant";
  }

  // For date-only: show "Aujourd'hui" or "Hier" when relevant
  if (!hasTime) {
    const todayUTC = new Date();
    const todayStr = `${todayUTC.getUTCFullYear()}-${String(todayUTC.getUTCMonth() + 1).padStart(2, "0")}-${String(todayUTC.getUTCDate()).padStart(2, "0")}`;
    const [dateOnly] = date.split("T");
    if (dateOnly === todayStr) return "Aujourd'hui";

    const yesterdayUTC = new Date(Date.now() - 86_400_000);
    const yesterdayStr = `${yesterdayUTC.getUTCFullYear()}-${String(yesterdayUTC.getUTCMonth() + 1).padStart(2, "0")}-${String(yesterdayUTC.getUTCDate()).padStart(2, "0")}`;
    if (dateOnly === yesterdayStr) return "Hier";
  }

  return publishedAt.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug: data.slug ?? file.replace(".mdx", ""),
        title: data.title ?? "",
        description: data.description ?? "",
        date: data.date ?? "",
        content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getLatestPosts(limit: number = 3): BlogPost[] {
  return getAllPosts().slice(0, limit);
}

export function isNewPost(date: string, days: number = 2): boolean {
  const publishedAt = parseDateOnly(date);

  if (!publishedAt) {
    return false;
  }

  const elapsedMs = Date.now() - publishedAt.getTime();
  const maxAgeMs = days * 24 * 60 * 60 * 1000;

  return elapsedMs >= 0 && elapsedMs < maxAgeMs;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ?? "",
    content,
  };
}
