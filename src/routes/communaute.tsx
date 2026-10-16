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
        </div>
      </section>
    </SiteShell>
  );
}