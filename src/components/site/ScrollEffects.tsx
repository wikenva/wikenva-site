/** @jsxImportSource @/lib/tx */
import { useEffect, useRef } from "react";

/** Barre de progression discrète, sans modifier le HTML rendu par React. */
export function ScrollEffects() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.current?.style.setProperty("--scroll", String(max > 0 ? window.scrollY / max : 0));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div ref={bar} className="scroll-progress" aria-hidden="true" />;
}
