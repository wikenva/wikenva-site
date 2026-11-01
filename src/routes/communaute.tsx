import { createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "@/content/site";
import { SocialGrid } from "@/components/site/blocks";
import { SiteShell } from "@/components/site/shell";
import { Eyebrow, GmailMark } from "@/components/site/ui";
import { useTr } from "@/lib/locale";

export const Route = createFileRoute("/communaute")({
  head: () =>
    pageMeta(
      "Communauté — WIKENVA",
      "Suivez la communauté officielle de WIKENVA.",
    ),
  component: CommunityPage,
});

function CommunityPage() {
  const tr = useTr();
  return (
    <SiteShell>
      <section className="border-b border-line bg-ink py-8 md:py-10">
        <div className="mx-auto w-full max-w-6xl px-5 text-center md:px-8">
          <div className="flex justify-center">
            <Eyebrow>Communauté</Eyebrow>
          </div>
          <p className="text-lg font-light tracking-wide text-fg md:text-xl">{tr("Suivez notre communauté")}</p>
          <div className="mt-6">
            <SocialGrid />
          </div>
          <a
            href="https://chat.whatsapp.com/F4uZIGgqIYzDTP4PnInAIa?s=cl&p=a&iam=2"
            target="_top"
            className="mx-auto mt-5 flex min-h-14 w-full max-w-sm items-center justify-center rounded-full bg-[#25D366] px-6 text-base font-semibold text-[#06210f]"
          >
            {tr("Groupe WhatsApp")}
          </a>
          <div className="mx-auto mt-8 grid max-w-md gap-3 text-left">
            <a href="mailto:contact.wikenva@gmail.com" className="flex items-center gap-3 rounded-2xl border border-line bg-panel px-4 py-3">
              <GmailMark />
              <span>
                <span className="block text-xs font-semibold tracking-wide text-gold uppercase">{tr("Gmail")}</span>
                <span className="mt-1 block text-base font-semibold">contact.wikenva@gmail.com</span>
              </span>
            </a>
            <a href="tel:+2290196412117" className="rounded-2xl border border-line bg-panel px-4 py-3">
              <p className="text-xs font-semibold tracking-wide text-gold uppercase">{tr("Numéro")}</p>
              <p className="mt-1 text-base font-semibold">+229 01 96 41 21 17</p>
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}