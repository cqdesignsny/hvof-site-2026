import Image from "next/image";
import { FadeIn } from "@/components/motion/fade-in";
import { IMG } from "@/lib/images";

interface TeamPanel {
  title: string;
  body: string;
  image: string;
}

/**
 * The team page panel. Less about Dan/John/Mark as individuals,
 * more about the working business: install crews, the showroom, the everyday.
 */
const PANELS: TeamPanel[] = [
  {
    title: "The crew that installs is the crew you met.",
    body: "Same team for the showroom tour, the field measurement, and the day-of install. No subcontractors, no hand-offs.",
    image: IMG.marshallSterling.gallery[1],
  },
  {
    title: "Floor plans, finishes, and the punch list.",
    body: "Project leads walk every job from kickoff through the punch list. Same names answering the phone, year after year.",
    image: IMG.marist.lobby,
  },
  {
    title: "Three generations on Route 9.",
    body: "Family-owned since 1986. Local hires, local crews, local relationships. We are forty minutes from your office, not an 800 number.",
    image: IMG.marshallSterling.gallery[3],
  },
];

export function TeamSection() {
  return (
    <section className="bg-background section-y">
      <div className="container-wide">
        <FadeIn className="max-w-3xl">
          <p className="eyebrow text-muted-foreground">The team</p>
          <h2 className="mt-5 font-display text-5xl font-semibold leading-[0.92] tracking-[-0.03em] md:text-6xl lg:text-7xl">
            Real people,<br />
            <span className="text-muted-foreground">working real jobs.</span>
          </h2>
          <p className="mt-8 max-w-xl text-xl leading-[1.5] text-muted-foreground md:text-2xl">
            Three generations of the same Hudson Valley family, plus an in-house crew of installers, designers, and project leads. Same numbers, year after year.
          </p>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {PANELS.map((panel, i) => (
            <FadeIn key={panel.title} delay={i * 0.06}>
              <div className="card-image-outline group relative aspect-[4/5] overflow-hidden bg-muted">
                <Image
                  src={panel.image}
                  alt={panel.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="image-zoom object-cover"
                  quality={85}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-6 md:p-8">
                  <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight text-white md:text-3xl">
                    {panel.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-white/80 md:text-lg">
                    {panel.body}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
