import { createFileRoute } from "@tanstack/react-router";

// Public pages only; /admin stays out of search engines.
export const SITEMAP_PATHS = [
  "/", "/vision", "/marketplace", "/auteurs", "/lecteurs", "/createurs", "/ethique", "/sidrachain",
  "/partenariat", "/candidature", "/verifier", "/campagne", "/faq", "/contact", "/confidentialite", "/conditions",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        const urls = SITEMAP_PATHS.map((p) => `  <url><loc>${origin}${p === "/" ? "/" : p}</loc></url>`).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
        return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
