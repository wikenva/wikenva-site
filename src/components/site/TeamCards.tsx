/** @jsxImportSource @/lib/tx */
import { team } from "@/config/site";
import { Container } from "./Section";

/** Section « L'équipe » affichée sur l'accueil, juste après les comptes à rebours. */
export function TeamSection() {
  return (
    <section className="py-16 sm:py-24" aria-labelledby="team-title">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="team-title"
            className="text-[1.6rem] font-semibold leading-[1.15] tracking-[-0.01em] text-foreground sm:text-[2.5rem]"
          >
            Les visages derrière WIKENVA.
          </h2>
          <p className="mx-auto mt-4 max-w-[30ch] text-[0.98rem] leading-[1.65] text-muted-foreground sm:mt-5 sm:max-w-[38ch] sm:text-lg">
            Ils bâtissent WIKENVA au quotidien. Le prochain visage pourrait être le vôtre.
          </p>
        </div>
        <div className="mt-10 sm:mt-14">
          <TeamCards />
        </div>
      </Container>
    </section>
  );
}

/** Cartes profils : photo pleine largeur en haut, fond blanc, bordure gris clair, nom puis fonction. */
export function TeamCards() {
  return (
    <ul className="mx-auto flex flex-col items-center gap-4 md:flex-row md:flex-wrap md:items-stretch md:justify-center md:gap-6 lg:gap-8">
      {team.map((p) => (
        <li
          key={p.lastName}
          className="w-[10.25rem] overflow-hidden rounded-[1.1rem] border border-profile-card-border bg-profile-card shadow-profile sm:w-[13rem] md:rounded-[1.4rem] lg:w-[15.5rem]"
        >
          <div className="aspect-[362/355] w-full overflow-hidden bg-muted">
            <img
              src={p.photo}
              alt={`${p.firstName} ${p.lastName}`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-[50%_12%]"
            />
          </div>
          <div className="px-5 pb-6 pt-6 md:px-6 md:pb-7 md:pt-7">
            <h3 className="font-sans text-[1.08rem] font-bold leading-[1.3] tracking-[-0.01em] text-profile-card-foreground md:text-[1.2rem]">
              {p.firstName} {p.lastName}
            </h3>
            <div className="mt-2">
              {p.roles.map((r) => (
                <p key={r} className="text-[0.94rem] font-normal leading-[1.65] text-profile-card-muted md:text-base">
                  {r}
                </p>
              ))}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
