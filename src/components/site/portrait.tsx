import { useTr } from "@/lib/locale";

export function Portrait({
  src,
  alt,
  name,
  role,
}: {
  src: string;
  alt: string;
  name: string;
  role: string;
}) {
  const tr = useTr();
  return (
    <figure className="w-full max-w-[12.5rem]">
      <img
        src={src}
        alt={tr(alt)}
        width={800}
        height={1000}
        decoding="async"
        className="aspect-[4/5] w-full rounded-[1.4rem] object-cover object-[center_18%] ring-1 ring-gold/50"
      />
      <figcaption className="mt-3 font-display text-xl font-semibold">{tr(name)}</figcaption>
      <p className="mt-1 text-sm text-gold">{tr(role)}</p>
    </figure>
  );
}
