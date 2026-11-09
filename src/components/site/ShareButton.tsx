/** @jsxImportSource @/lib/tx */
import { translate } from "@/lib/tx/core";
import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { brand, links } from "@/config/site";

export function ShareButton({ className }: { className?: string }) {
  async function share() {
    const url = typeof window !== "undefined" ? window.location.origin : links.officialSite;
    const data = { title: `${brand.name} — ${brand.project}`, text: brand.slogan, url };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(url);
      toast.success(translate("Lien du site copié dans le presse-papiers.", document.documentElement.lang));
    } catch (e) {
      if ((e as Error)?.name !== "AbortError") toast.error(translate("Impossible de partager le lien.", document.documentElement.lang));
    }
  }
  return (
    <Button type="button" variant="glass" size="xl" onClick={share} className={className}>
      <Share2 /> Partager le site
    </Button>
  );
}
