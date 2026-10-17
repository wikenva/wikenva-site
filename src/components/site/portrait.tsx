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
    <figure className="w-full max-w-[16rem]">
      <img
        src={src}
        alt={tr(alt)}
        width={800}
        height={1000}
        decoding="async"
        className="aspect-[4/5] w-full bg-white object-contain"
      />
      <figcaption className="mt-3 font-display text-xl font-semibold">{tr(name)}</figcaption>
      <p className="mt-1 text-sm text-gold">{tr(role)}</p>
    </figure>
  );
}
