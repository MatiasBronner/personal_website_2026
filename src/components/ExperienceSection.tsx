"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useReveal } from "@/hooks/useReveal";

// ── Section label ─────────────────────────────────────────────────────────────

function Label({ text }: { text: string }) {
  const { ref, isVisible } = useReveal();

  return (
    <div
      ref={ref}
      className={`flex items-center gap-3 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
      }`}
    >
      <div className="h-px w-8 bg-bike-trail flex-shrink-0" />
      <span className="font-body text-xs tracking-[0.22em] uppercase text-bike-trail">
        {text}
      </span>
    </div>
  );
}

// ── Tag pill ──────────────────────────────────────────────────────────────────

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-stone-400 hover:border-bike-trail/40 hover:text-stone-300 transition-all duration-150 cursor-default">
      {children}
    </span>
  );
}

// ── Animated bike icon ────────────────────────────────────────────────────────

function BikeIcon({ progress }: { progress: MotionValue<number> }) {
  const wheelRotate = useTransform(progress, [0, 1], [0, 1440]);

  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="text-bike-trail drop-shadow-[0_0_14px_rgba(212,130,74,0.35)]"
    >
      {/* rear wheel */}
      <motion.g style={{ rotate: wheelRotate, transformOrigin: "14px 44px" }}>
        <circle cx="14" cy="44" r="11" stroke="currentColor" strokeWidth="2.5" />
        <line x1="14" y1="33" x2="14" y2="55" stroke="currentColor" strokeWidth="1" strokeOpacity="0.45" />
        <line x1="3" y1="44" x2="25" y2="44" stroke="currentColor" strokeWidth="1" strokeOpacity="0.45" />
        <line x1="6.2" y1="36.2" x2="21.8" y2="51.8" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
        <line x1="21.8" y1="36.2" x2="6.2" y2="51.8" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
      </motion.g>

      {/* front wheel */}
      <motion.g style={{ rotate: wheelRotate, transformOrigin: "50px 44px" }}>
        <circle cx="50" cy="44" r="11" stroke="currentColor" strokeWidth="2.5" />
        <line x1="50" y1="33" x2="50" y2="55" stroke="currentColor" strokeWidth="1" strokeOpacity="0.45" />
        <line x1="39" y1="44" x2="61" y2="44" stroke="currentColor" strokeWidth="1" strokeOpacity="0.45" />
        <line x1="42.2" y1="36.2" x2="57.8" y2="51.8" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
        <line x1="57.8" y1="36.2" x2="42.2" y2="51.8" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
      </motion.g>

      <circle cx="14" cy="44" r="2.5" fill="currentColor" />
      <circle cx="50" cy="44" r="2.5" fill="currentColor" />

      {/* bike frame */}
      <line x1="14" y1="44" x2="32" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="32" y1="22" x2="30" y2="38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="14" y1="44" x2="30" y2="38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="32" y1="22" x2="44" y2="26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="44" y1="26" x2="50" y2="44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

      {/* handlebar / seat */}
      <line x1="44" y1="26" x2="44" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="40" y1="20" x2="49" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="30" y1="38" x2="28" y2="30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="30" x2="33" y2="30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

      {/* rider */}
      <line x1="28" y1="30" x2="42" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="44" cy="19" r="3.5" fill="currentColor" />
      <line x1="42" y1="22" x2="44" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ── Scroll-linked trail + moving bike ─────────────────────────────────────────

function BikeTrail({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const bikeY = useTransform(progress, [0, 1], ["0%", "calc(100% - 72px)"]);
  const trailFill = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div className="hidden lg:block relative w-24 flex-shrink-0">
      {/* full dashed trail */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
        style={{
          background:
            "repeating-linear-gradient(to bottom, rgba(212,130,74,0.28) 0px, rgba(212,130,74,0.28) 18px, transparent 18px, transparent 30px)",
        }}
      />

      {/* filled trail progress */}
      <motion.div
        aria-hidden="true"
        style={{ height: trailFill }}
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[3px] rounded-full bg-bike-trail/70 shadow-[0_0_16px_rgba(212,130,74,0.35)]"
      />

      {/* moving bike */}
      <motion.div
        style={{ y: bikeY }}
        className="absolute left-1/2 -translate-x-1/2 top-0 z-20"
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-bike-trail/10 blur-xl scale-125" />
          <BikeIcon progress={progress} />

          {/* motion lines */}
          <div className="absolute left-2 -bottom-2 flex flex-col gap-1 opacity-70">
            <div className="w-8 h-px bg-bike-trail" />
            <div className="w-5 h-px bg-bike-trail ml-2" />
            <div className="w-3 h-px bg-bike-trail ml-4" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── Waypoint marker ───────────────────────────────────────────────────────────

function Waypoint({ label, delay = 0 }: { label: string; delay?: number }) {
  const { ref, isVisible } = useReveal({ delay });

  return (
    <div
      ref={ref}
      className={`hidden lg:flex items-center gap-3 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
      }`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        <div className="absolute w-4 h-4 rounded-full border border-bike-trail/50 bg-bike-dark" />
        <div className="w-1.5 h-1.5 rounded-full bg-bike-trail shadow-[0_0_10px_rgba(212,130,74,0.7)]" />
      </div>
      <span className="font-mono text-xs text-bike-trail/60 tracking-widest uppercase">
        {label}
      </span>
    </div>
  );
}

// ── Single experience card ────────────────────────────────────────────────────

interface ExpCardProps {
  period: string;
  isCurrent?: boolean;
  role: string;
  company: string;
  location: string;
  link?: string;
  logoSrc?: string;
  logoAlt?: string;
  focus: string;
  bullets: string[];
  tags: string[];
  delay?: number;
}

function ExpCard({
  period,
  isCurrent,
  role,
  company,
  location,
  link,
  logoSrc,
  logoAlt,
  focus,
  bullets,
  tags,
  delay = 0,
}: ExpCardProps) {
  const { ref, isVisible } = useReveal({ delay });

  return (
    <article
      ref={ref}
      className={`group relative overflow-hidden border border-white/8 rounded-2xl p-6 md:p-8
        bg-white/[0.025] hover:bg-white/[0.045] hover:border-bike-trail/35
        transition-all duration-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
    >
      {/* subtle trail-card glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 w-48 h-48 rounded-full bg-bike-trail/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* left accent */}
      <div className="absolute left-0 top-6 bottom-6 w-0.5 bg-bike-trail rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* header row */}
      <div className="relative flex items-start justify-between gap-5 mb-5">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <p className="font-mono text-xs text-bike-trail tracking-widest">
              {period}
            </p>

            {isCurrent && (
              <span className="font-mono text-xs text-bike-trail/80 border border-bike-trail/30 bg-bike-trail/10 px-2 py-0.5 rounded">
                current
              </span>
            )}
          </div>

          <p className="font-mono text-xs uppercase tracking-[0.18em] text-stone-600 mb-2">
            {focus}
          </p>

          <h3 className="font-display font-bold text-xl md:text-2xl text-stone-100 leading-tight">
            {role}
          </h3>

          <p className="font-body text-sm text-stone-500 mt-1">
            {company} · {location}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {logoSrc && (
            <div className="relative hidden sm:block h-10 w-24 shrink-0 opacity-60 group-hover:opacity-90 transition-opacity duration-300">
              <Image
                src={logoSrc}
                alt={logoAlt ?? `${company} logo`}
                fill
                sizes="96px"

                className="object-contain object-right grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>
          )}

          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${company}`}
              className="hidden sm:inline-flex text-stone-600 hover:text-bike-trail transition-colors duration-200"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 7h10v10M7 17 17 7" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* bullets */}
      <ul className="relative space-y-2.5 mb-6">
        {bullets.map((b, i) => (
          <li
            key={i}
            className="flex gap-3 text-sm text-stone-400 leading-relaxed"
          >
            <span className="text-bike-trail shrink-0 mt-0.5 text-xs">▸</span>
            <span dangerouslySetInnerHTML={{ __html: b }} />
          </li>
        ))}
      </ul>

      {/* tags */}
      <div className="relative flex flex-wrap gap-2">
        {tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
    </article>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ExperienceSection() {
  const headingRef = useReveal({ threshold: 0.1 });
  const trailRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: trailRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.35,
  });

  return (
    <section id="experience" className="relative bg-bike-dark overflow-hidden">


      {/* atmospheric glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 80% 20%, rgba(44,74,62,0.22) 0%, transparent 60%)," +
            "radial-gradient(ellipse 60% 40% at 10% 80%, rgba(212,130,74,0.11) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
        {/* heading */}
        <div
          ref={headingRef.ref}
          className={`mb-16 md:mb-20 transition-all duration-700 ${
            headingRef.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <Label text="Experience" />

          <h2 className="font-display text-5xl md:text-7xl font-black leading-none tracking-tight text-stone-100 mt-5">
            Experience
            <br />
            <span className="italic text-bike-trail">in motion.</span>
          </h2>

          <p className="font-body text-stone-500 text-base mt-5 max-w-lg leading-relaxed">
          </p>
        </div>

        {/* trail + cards */}
        <div ref={trailRef} className="relative flex gap-6 md:gap-10">
          <BikeTrail progress={smoothProgress} />

          <div className="flex-1 min-w-0 space-y-8">
            {/* Micron */}
            <Waypoint label="current stop" delay={0} />
            <ExpCard
              period="May 2026 — Aug 2026"
              isCurrent
              role="AI/ML Engineer Intern, SSD"
              company="Micron Technology"
              location="Boise, ID"
              focus="Agentic AI + firmware reliability"
              logoSrc="/images/logos/micron.png"
              logoAlt="Micron Technology logo"
              delay={100}
              bullets={[
                "Building an <strong>agentic AI system</strong> that performs automated <strong>root-cause analysis</strong> of new firmware bugs, improving diagnostic accuracy by <strong>15%+</strong> over the existing baseline.",
                "Developed an <strong>LLM-powered</strong> tool that turns natural-language requests into firmware telemetry plots, letting engineers explore and visualize data without manual scripting.",
              ]}
              tags={[
                "Python",
                "Agentic AI",
                "LLMs",
                "Root-Cause Analysis",
                "Machine Learning",
              ]}
            />

            {/* Brown TA */}
            <Waypoint label="teaching climb" delay={50} />
            <ExpCard
              period="Sep 2025 — Present"
              role="Teaching Assistant — Foundations of AI"
              company="Brown University"
              location="Providence, RI"
              link="https://browncsci410.github.io/ai-website-s26/"
              focus="AI fundamentals + communication"
              logoSrc="/images/logos/brown.png"
              logoAlt="Brown University logo"
              delay={100}
              bullets={[
              "Supported instruction for <strong>100+ students</strong> across core AI concepts, including reinforcement learning, adversarial search, and Q-learning.",
              "Hosted weekly office hours and managed the online discussion board to translate complex theoretical concepts into approachable solutions.",
              "Developed and maintained the official course website while rigorously testing and debugging programming assignments prior to release. Linked above."
            ]}
              tags={[
                "PyTorch",
                "TensorFlow",
                "NumPy",
                "Reinforcement Learning",
                "Adversarial Search",
              ]}
            />

            {/* St. Luke's */}
            <Waypoint label="healthcare trail" delay={50} />
            <ExpCard
              period="May 2025 — Aug 2025"
              role="Full Stack Intern"
              company="St. Luke's Health System"
              location="Boise, ID"
              link="https://github.com/MatiasBronner/st-lukes-repo"
              focus="Healthcare data + internal tooling"
              logoSrc="/images/logos/st_lukes.png"
              logoAlt="St. Luke's Health System logo"
              delay={100}
              bullets={[
                "Built a full-stack web app to generate standardized product descriptions, streamlining item creation in the hospital supply chain database.",
                "Extracted and organized data on <strong>40,000+ medical products</strong> using Python, Flask, Selenium, BeautifulSoup4, OpenAI API, and Google APIs.",
                "Collaborated with supply chain teams and surveyed nursing staff to make sure the tool matched how people actually worked.",
              ]}
              tags={[
                "Python",
                "Flask",
                "Selenium",
                "OpenAI API",
                "BeautifulSoup4",
                "Google APIs",
                "JavaScript",
              ]}
            />
          </div>
        </div>

        {/* bottom transition */}
        <div className="flex items-center gap-4 mt-20 md:mt-28">
          <div className="h-px flex-1 bg-gradient-to-r from-stone-800 to-transparent" />
          <span className="font-body text-xs tracking-[0.2em] uppercase text-stone-600">
            next: projects
          </span>
        </div>
      </div>
    </section>
  );
}