import { useEffect, useState } from "react";

import { isPast } from "@/lib/countdown";

/** Met à jour l'état ouvert/clos même si la page reste ouverte à l'échéance. */
export function useIsPast(targetIso: string): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const target = new Date(targetIso).getTime();
    const update = () => setPast(isPast(targetIso));
    update();
    const remaining = target - Date.now();
    if (remaining <= 0) return;

    // Les échéances très lointaines sont replanifiées avant la limite des minuteurs navigateur.
    const timer = window.setTimeout(
      () => {
        update();
      },
      Math.min(remaining + 50, 2_147_483_647),
    );
    return () => window.clearTimeout(timer);
  }, [targetIso]);

  return past;
}
