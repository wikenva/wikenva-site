import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "WIKENVA — Site officiel" },
      {
        name: "description",
        content:
          "WIKENVA, marketplace digitale d'ebooks dans l'écosystème SidraChain. Site officiel et WIKENVA TOKEN.",
      },
      { name: "theme-color", content: "#07101c" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@500;600;700&family=Source+Sans+3:ital,wght@0,400;0,600;0,700;1,400&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="fr" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
        <style
          dangerouslySetInnerHTML={{
            __html: `#boot{position:fixed;inset:0;z-index:80;display:grid;place-items:center;background:#07101c}html.is-ready #boot{opacity:0;visibility:hidden;pointer-events:none}#boot{transition:opacity .35s ease,visibility .35s ease}.boot-mark{width:min(16rem,70vw);height:auto}.boot-spin{width:2.25rem;height:2.25rem;margin:1.25rem auto 0;border:2px solid #2a3d5c;border-top-color:#e8b23a;border-radius:999px;animation:boot-spin .7s linear infinite}.boot-label{margin:.75rem 0 0;color:#b7c6da;font:600 .875rem/1.4 ui-sans-serif,system-ui,sans-serif;letter-spacing:.08em;text-align:center;text-transform:uppercase}@keyframes boot-spin{to{transform:rotate(360deg)}}@media (prefers-reduced-motion:reduce){.boot-spin{animation:none;border-color:#e8b23a}}`,
          }}
        />
      </head>
      <body>
        <div id="boot" role="status" aria-live="polite">
          <div>
            <img className="boot-mark" src="/media/logo-mark-ui.webp" alt="WIKENVA" width={480} height={266} decoding="async" />
            <div className="boot-spin" aria-hidden />
            <p id="boot-label" className="boot-label">Chargement</p>
          </div>
        </div>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem("wikenva-lang")==="en"){var n=document.getElementById("boot-label");if(n)n.textContent="Loading"}}catch(e){}var wait=Math.max(0,450-performance.now());setTimeout(function(){document.documentElement.classList.add("is-ready")},wait);setTimeout(function(){document.documentElement.classList.add("is-ready")},8000)})();`,
          }}
        />
        <Scripts />
      </body>
    </html>
  ),
});
