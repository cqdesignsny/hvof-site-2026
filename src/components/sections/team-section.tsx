import Image from "next/image";
import { FadeIn } from "@/components/motion/fade-in";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  /** Tailwind object-position to keep their face in frame at aspect ratio */
  position?: string;
}

const TEAM: TeamMember[] = [
  {
    name: "John",
    role: "Owner",
    image: "/team/john-1.png",
    position: "object-[center_25%]",
  },
  {
    name: "Dan",
    role: "Owner",
    image: "/team/dan-1.png",
    position: "object-[center_30%]",
  },
  {
    name: "Mark",
    role: "Owner",
    image: "/team/mark-1.png",
    position: "object-[center_top]",
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
            When you call HVOF, you talk to one of these three. Same names, same numbers, year after year.
          </p>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {TEAM.map((member, i) => (
            <FadeIn key={member.name} delay={i * 0.06}>
              <div className="card-image-outline group relative aspect-[4/5] overflow-hidden bg-muted">
                <Image
                  src={member.image}
                  alt={`${member.name}, ${member.role} at HVOF`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className={`image-zoom object-cover ${member.position ?? ""}`}
                  quality={85}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent p-6 md:p-8">
                  <p
                    className="font-mono text-[11px] uppercase tracking-[0.22em]"
                    style={{ color: "var(--brand-yellow)" }}
                  >
                    {member.role}
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
                    {member.name}
                  </h3>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
