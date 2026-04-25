import { baseUrl } from "lib/utils";

export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Anthropic-AI", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
      { userAgent: "meta-externalagent", allow: "/" },
      { userAgent: "Amazonbot", allow: "/" },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
