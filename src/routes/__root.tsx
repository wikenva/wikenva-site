import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { LocaleProvider } from "@/lib/locale";
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
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png?v=3" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/favicon-192.png?v=3" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png?v=3" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
        <style
          dangerouslySetInnerHTML={{
            __html: `#boot{position:fixed;inset:0;z-index:80;display:grid;place-items:center;background:#07101c}html.is-ready #boot{opacity:0;visibility:hidden;pointer-events:none}#boot{transition:opacity .35s ease,visibility .35s ease}.boot-mark{width:min(9rem,46vw);height:auto;animation:boot-in .8s cubic-bezier(.22,.8,.24,1) both,boot-float 2.4s ease-in-out .8s infinite}.boot-spin{width:2.25rem;height:2.25rem;margin:1.25rem auto 0;border:2px solid #2a3d5c;border-top-color:#e8b23a;border-radius:999px;animation:boot-spin .7s linear infinite}.boot-label{margin:.75rem 0 0;color:#b7c6da;font:600 .875rem/1.4 ui-sans-serif,system-ui,sans-serif;letter-spacing:.08em;text-align:center;text-transform:uppercase}@keyframes boot-spin{to{transform:rotate(360deg)}}@keyframes boot-in{from{opacity:0;transform:translateY(16px) scale(.86)}to{opacity:1;transform:none}}@keyframes boot-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}@media (prefers-reduced-motion:reduce){.boot-mark,.boot-spin{animation:none}.boot-spin{border-color:#e8b23a}}`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){if(document.getElementById("boot"))return;var label="Loading";try{var saved=localStorage.getItem("wikenva-lang-2");if(saved==="fr")label="Chargement";if(saved==="es")label="Cargando";if(saved==="pt")label="A carregar";if(saved==="ar")label="جار التحميل"}catch(e){}var d=document.createElement("div");d.id="boot";d.setAttribute("role","status");d.innerHTML='<div><img class="boot-mark" src="/media/logo-mark-ui.webp" alt="WIKENVA" width="480" height="266"><div class="boot-spin" aria-hidden="true"></div><p class="boot-label">'+label+"</p></div>";document.documentElement.appendChild(d);function hide(){if(d.parentNode)d.remove()}setTimeout(hide,900);setTimeout(hide,2500)})();`,
          }}
        />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <LocaleProvider>
            <Outlet />
          </LocaleProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
