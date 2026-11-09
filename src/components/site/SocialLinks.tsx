/** @jsxImportSource @/lib/tx */
import { social, type SocialKey } from "@/config/site";
import { cn } from "@/lib/utils";

const icons: Record<SocialKey, string> = {
  x: "M17.75 3h3.07l-6.71 7.67L22 21h-6.18l-4.84-6.33L5.44 21H2.36l7.18-8.2L2 3h6.34l4.37 5.78L17.75 3Zm-1.08 16.17h1.7L7.4 4.74H5.58l11.09 14.43Z",
  facebook:
    "M13.5 21v-8.2h2.75l.41-3.2H13.5V7.56c0-.93.26-1.56 1.59-1.56h1.69V3.14A22.6 22.6 0 0 0 14.32 3C11.88 3 10.2 4.49 10.2 7.22V9.6H7.44v3.2h2.76V21h3.3Z",
  whatsapp:
    "M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.17-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.13a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.07.89.9-2.99-.2-.31a8.22 8.22 0 1 1 6.87 3.74Zm4.5-6.15c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.17.25-.64.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.32-2.9c-.25-.43.25-.4.72-1.33.08-.16.04-.3-.02-.43l-.75-1.8c-.2-.47-.4-.4-.55-.41h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.86 2.04 4.77 4.77 0 0 0 1 2.53 10.9 10.9 0 0 0 4.18 3.69c1.55.67 2.16.73 2.94.61.47-.07 1.46-.6 1.66-1.18.2-.58.2-1.07.15-1.18-.06-.1-.22-.16-.47-.29Z",
  youtube:
    "M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.82.42A2.5 2.5 0 0 0 2.42 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .42 4.81 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.42-4.81ZM10 15V9l5.2 3L10 15Z",
  telegram:
    "M21.43 4.3 2.97 11.42c-1.26.5-1.25 1.2-.23 1.52l4.74 1.48 1.83 5.62c.22.62.11.86.76.86.5 0 .72-.23 1-.5l2.37-2.3 4.92 3.63c.9.5 1.56.24 1.78-.84l3.23-15.2c.33-1.32-.5-1.92-1.37-1.52ZM8.94 14.08l9.4-5.93c.47-.28.9-.13.55.18l-8.05 7.27-.31 3.33-1.59-4.85Z",
};

export function SocialIcon({ name, className }: { name: SocialKey; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("h-5 w-5 fill-current", className)}>
      <path d={icons[name]} />
    </svg>
  );
}

/** Affiche uniquement les réseaux dont l'URL officielle est renseignée dans la configuration. */
export function SocialLinks({ className }: { className?: string }) {
  const entries = (Object.keys(social) as SocialKey[]).filter((k) => social[k].url);
  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {entries.map((key) => (
        <li key={key}>
          <a
            href={social[key].url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WIKENVA sur ${social[key].label}`}
            className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card-glass text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
          >
            <SocialIcon name={key} />
          </a>
        </li>
      ))}
    </ul>
  );
}
