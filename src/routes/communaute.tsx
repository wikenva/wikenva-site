import { createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "@/content/site";
import { SocialGrid } from "@/components/site/blocks";
import { SiteShell } from "@/components/site/shell";
import { Eyebrow } from "@/components/site/ui";
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
          <div className="mx-auto mt-8 grid max-w-md gap-3 text-left">
            <a href="mailto:wikenva@gmail.com" className="rounded-2xl border border-line bg-panel px-4 py-3">
              <p className="text-xs font-semibold tracking-wide text-gold uppercase">{tr("Gmail")}</p>
              <p className="mt-1 text-base font-semibold">wikenva@gmail.com</p>
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