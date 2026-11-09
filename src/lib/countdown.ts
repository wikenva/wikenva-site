export type Remaining = {
  ended: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

/** Temps restant jusqu'à `targetIso` à l'instant `now` (ms). Jamais négatif. */
export function getRemaining(targetIso: string, now: number): Remaining {
  const diff = new Date(targetIso).getTime() - now;
  if (!(diff > 0)) return { ended: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  const total = Math.floor(diff / 1000);
  return {
    ended: false,
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

export function isPast(targetIso: string, now: number = Date.now()): boolean {
  return new Date(targetIso).getTime() <= now;
}
