import Atmosphere from "@/components/Atmosphere";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import {
  profile,
  about,
  experience,
  projects,
  publications,
  skills,
  education,
  awards,
} from "@/lib/data";

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-12 flex items-baseline gap-4">
      <span className="mono text-xs text-accent sm:text-sm">{index}</span>
      <h2 className="wipe text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <span className="h-px flex-1 translate-y-[-4px] bg-line" />
    </div>
  );
}

const container = "mx-auto w-full max-w-6xl px-6 sm:px-10";

export default function Home() {
  return (
    <main id="top" className="relative z-10">
      <Atmosphere />
      <Nav />

      {/* HERO */}
      <section
        className={`${container} relative flex min-h-screen flex-col justify-center pt-24`}
      >
        <Reveal>
          <p className="mono mb-7 text-xs uppercase tracking-[0.3em] text-muted sm:text-sm">
            {profile.location} · {profile.status}
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="text-6xl font-bold leading-[0.92] tracking-tight sm:text-8xl md:text-[8.5rem]">
            {profile.name.split(" ")[0]}
            <br />
            <span className="text-muted">{profile.name.split(" ")[1]}</span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mono mt-9 text-sm uppercase tracking-wider text-accent sm:text-base">
            {profile.role}
          </p>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-foreground/85 sm:text-2xl">
            {profile.tagline}
          </p>
        </Reveal>
        <Reveal delay={320}>
          <div className="mt-11 flex flex-wrap items-center gap-3">
            <a
              href="/Mokshit-Surana-Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="mono group inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs uppercase tracking-wider text-background transition-transform hover:-translate-y-0.5"
            >
              Résumé
              <span className="transition-transform duration-300 group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
            <SocialLink href={profile.links.github} label="GitHub" />
            <SocialLink href={profile.links.linkedin} label="LinkedIn" />
            <SocialLink href={profile.links.scholar} label="Scholar" />
            <SocialLink href={profile.links.email} label="Email" />
          </div>
        </Reveal>

        <div className="mono absolute bottom-8 left-6 hidden text-xs tracking-widest text-muted sm:left-10 sm:block">
          SCROLL ↓
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className={`${container} scroll-mt-24 py-28`}>
        <Reveal>
          <SectionLabel index="01" title="About" />
        </Reveal>
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr]">
          <div>
            <Reveal>
              <p className="text-2xl leading-relaxed text-foreground sm:text-3xl sm:leading-snug">
                {about.lead}
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/70">
                {about.body}
              </p>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground/70">
                {about.interests}
              </p>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <dl className="divide-y divide-line border-t border-line">
              {about.facts.map((f) => (
                <div key={f.label} className="grid grid-cols-3 gap-4 py-4">
                  <dt className="mono text-xs uppercase tracking-wider text-muted">
                    {f.label}
                  </dt>
                  <dd className="col-span-2 text-sm text-foreground/85">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="work" className={`${container} scroll-mt-24 py-28`}>
        <Reveal>
          <SectionLabel index="02" title="Experience" />
        </Reveal>
        <div>
          {experience.map((job, i) => (
            <Reveal key={job.org + job.role} delay={i * 60}>
              <article className="group grid gap-4 border-t border-line py-9 transition-colors hover:border-accent/30 md:grid-cols-[200px_1fr]">
                <div>
                  <p className="mono text-xs uppercase tracking-wider text-muted sm:text-sm">
                    {job.period}
                  </p>
                  <p className="mono mt-1 text-xs tracking-wider text-muted/70">
                    {job.location}
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-medium tracking-tight">
                    {job.role}{" "}
                    <span className="text-accent">@ {job.org}</span>
                  </h3>
                  <ul className="mt-5 space-y-3.5">
                    {job.points.map((p, j) => (
                      <li
                        key={j}
                        className="flex gap-3 leading-relaxed text-foreground/75"
                      >
                        <span className="mt-2.5 h-1 w-1 flex-none rounded-full bg-accent/60" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className={`${container} scroll-mt-24 py-28`}>
        <Reveal>
          <SectionLabel index="03" title="Selected Projects" />
        </Reveal>
        <div>
          {projects.map((proj, i) => (
            <Reveal key={proj.title} delay={i * 50}>
              <ProjectRow proj={proj} index={i + 1} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* RESEARCH */}
      <section id="research" className={`${container} scroll-mt-24 py-28`}>
        <Reveal>
          <SectionLabel index="04" title="Research & Publications" />
        </Reveal>
        <div>
          {publications.map((pub, i) => {
            const Row = (
              <article className="group grid gap-2 border-t border-line py-7 transition-colors hover:border-accent/30 md:grid-cols-[1fr_auto] md:items-baseline md:gap-8">
                <div>
                  <h3 className="flex items-start gap-2 text-lg font-medium leading-snug tracking-tight transition-colors group-hover:text-accent sm:text-xl">
                    <span>{pub.title}</span>
                    {pub.url ? (
                      <span className="mono flex-none text-muted transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
                        ↗
                      </span>
                    ) : null}
                  </h3>
                  <p className="mono mt-1.5 text-xs tracking-wide text-muted sm:text-sm">
                    {pub.venue}
                    {pub.note ? (
                      <span className="text-accent"> · {pub.note}</span>
                    ) : null}
                  </p>
                </div>
                <span className="mono text-sm text-accent">{pub.year}</span>
              </article>
            );
            return (
              <Reveal key={pub.title} delay={i * 50}>
                {pub.url ? (
                  <a href={pub.url} target="_blank" rel="noreferrer">
                    {Row}
                  </a>
                ) : (
                  Row
                )}
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* STACK + BACKGROUND */}
      <section id="stack" className={`${container} scroll-mt-24 py-28`}>
        <Reveal>
          <SectionLabel index="05" title="Stack & Background" />
        </Reveal>
        <div className="grid gap-14 md:grid-cols-2">
          <div className="space-y-7">
            {skills.map((group, i) => (
              <Reveal key={group.group} delay={i * 50}>
                <div>
                  <h4 className="mono mb-3.5 text-xs uppercase tracking-wider text-muted sm:text-sm">
                    {group.group}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-line px-3 py-1.5 text-sm text-foreground/80 transition-colors hover:border-accent/40 hover:text-accent"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="space-y-12">
            <div>
              <h4 className="mono mb-6 text-xs uppercase tracking-wider text-muted sm:text-sm">
                Education
              </h4>
              <div className="space-y-7">
                {education.map((ed, i) => (
                  <Reveal key={ed.school} delay={i * 60}>
                    <div className="border-l border-line pl-5">
                      <p className="mono text-xs tracking-wider text-muted">
                        {ed.period}
                      </p>
                      <h5 className="mt-1 text-lg font-medium tracking-tight">
                        {ed.school}
                      </h5>
                      {ed.detail && (
                        <p className="text-sm text-muted">{ed.detail}</p>
                      )}
                      <p className="mt-1 text-sm text-foreground/75">
                        {ed.degree}
                      </p>
                      <p className="mono mt-1 text-xs text-accent">
                        {ed.score}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mono mb-6 text-xs uppercase tracking-wider text-muted sm:text-sm">
                Highlights
              </h4>
              <ul className="space-y-3.5">
                {awards.map((a, i) => (
                  <Reveal key={a} delay={i * 40} as="li">
                    <span className="flex gap-3 leading-relaxed text-foreground/80">
                      <span className="mt-2.5 h-1 w-1 flex-none rounded-full bg-accent/60" />
                      {a}
                    </span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className={`${container} scroll-mt-24 py-32`}>
        <Reveal>
          <p className="mono text-xs uppercase tracking-[0.3em] text-muted sm:text-sm">
            06 / Contact
          </p>
        </Reveal>
        <Reveal delay={80}>
          <a
            href={profile.links.email}
            className="mt-7 inline-block text-5xl font-bold tracking-tight transition-colors hover:text-accent sm:text-7xl md:text-8xl"
          >
            Let&rsquo;s build
            <br />
            something.
          </a>
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <SocialLink href={profile.links.email} label="Email" />
            <SocialLink href={profile.links.linkedin} label="LinkedIn" />
            <SocialLink href={profile.links.github} label="GitHub" />
            <SocialLink href={profile.links.scholar} label="Scholar" />
          </div>
          <p className="mono mt-7 text-sm tracking-wider text-muted">
            {profile.email} · {profile.phone}
          </p>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-line">
        <div
          className={`${container} flex flex-col items-start justify-between gap-2 py-8 sm:flex-row sm:items-center`}
        >
          <p className="mono text-xs tracking-wider text-muted">
            © {profile.name}
          </p>
          <p className="mono text-xs tracking-wider text-muted">
            Built with Next.js + Tailwind
          </p>
        </div>
      </footer>
    </main>
  );
}

function ProjectRow({
  proj,
  index,
}: {
  proj: (typeof projects)[number];
  index: number;
}) {
  const inner = (
    <article className="group grid gap-6 border-t border-line py-10 transition-colors hover:border-accent/30 md:grid-cols-12 md:gap-8">
      <div className="mono text-sm text-accent md:col-span-1">
        {String(index).padStart(2, "0")}
      </div>

      <div className="md:col-span-7">
        <h3 className="flex items-center gap-2 text-2xl font-medium tracking-tight sm:text-3xl">
          {proj.title}
          {proj.href ? (
            <span className="mono text-base text-muted transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
              ↗
            </span>
          ) : null}
        </h3>
        <p className="mt-2 text-base text-muted">{proj.blurb}</p>
        <p className="mt-5 max-w-2xl leading-relaxed text-foreground/70">
          {proj.description}
        </p>
      </div>

      <div className="flex flex-col items-start gap-5 md:col-span-4 md:items-end">
        {proj.status ? (
          <span className="mono whitespace-nowrap rounded-full border border-accent/40 px-2.5 py-1 text-[11px] uppercase tracking-wider text-accent">
            {proj.status}
          </span>
        ) : null}
        <div className="flex flex-wrap gap-2 md:justify-end">
          {proj.stack.map((t) => (
            <span
              key={t}
              className="mono rounded-full border border-line px-2.5 py-1 text-[11px] tracking-wide text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );

  return proj.href ? (
    <a
      href={proj.href}
      target="_blank"
      rel="noreferrer"
      className="block"
    >
      {inner}
    </a>
  ) : (
    inner
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noreferrer"
      className="mono group inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs uppercase tracking-wider text-foreground/80 transition-colors hover:border-accent hover:text-accent"
    >
      {label}
      <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
        ↗
      </span>
    </a>
  );
}
