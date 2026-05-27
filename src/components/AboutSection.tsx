"use client";

import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";

// ── tiny shared primitives ────────────────────────────────────────────────────

function Label({ text }: { text: string }) {
  const { ref, isVisible } = useReveal();
  return (
    <div
      ref={ref}
      className={`flex items-center gap-3 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
      }`}
    >
      <div className="h-px w-8 bg-boise-amber flex-shrink-0" />
      <span className="font-body text-xs tracking-[0.22em] uppercase text-boise-amber">
        {text}
      </span>
    </div>
  );
}

function Hi({ children }: { children: React.ReactNode }) {
  return <span className="text-boise-smoke font-medium">{children}</span>;
}

function Para({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const { ref, isVisible } = useReveal({ delay });
  return (
    <p
      ref={ref}
      className={`font-body text-base md:text-lg text-stone-400 leading-relaxed transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {children}
    </p>
  );
}

// ── stat card ─────────────────────────────────────────────────────────────────

function Stat({
  value,
  label,
  delay = 0,
}: {
  value: string;
  label: string;
  delay?: number;
}) {
  const { ref, isVisible } = useReveal({ delay });
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <p className="font-display text-4xl md:text-5xl font-black text-boise-amber leading-none">
        {value}
      </p>
      <p className="font-body text-sm text-stone-500 mt-2 leading-snug max-w-[150px]">
        {label}
      </p>
    </div>
  );
}

// ── place card ────────────────────────────────────────────────────────────────

function PlaceCard({
  name,
  description,
  delay = 0,
}: {
  name: string;
  description: string;
  delay?: number;
}) {
  const { ref, isVisible } = useReveal({ delay });
  return (
    <div
      ref={ref}
      className={`border border-stone-800/60 rounded-lg p-5 group
        hover:border-boise-amber/30 hover:bg-white/[0.02]
        transition-all duration-400 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1 h-1 rounded-full bg-boise-amber/50 group-hover:bg-boise-amber transition-colors duration-300" />
        <h4 className="font-body text-sm font-medium text-stone-300">
          {name}
        </h4>
      </div>
      <p className="font-body text-sm text-stone-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

// ── portrait with amber corner accents ───────────────────────────────────────

function Portrait() {
  const { ref, isVisible } = useReveal({ threshold: 0.2 });
  return (
    <div
      ref={ref}
      className={`relative transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* corner accents */}
      <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-boise-amber z-10" />
      <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-boise-amber z-10" />

      {/* photo */}
      <div className="relative aspect-[3/4] w-full rounded overflow-hidden bg-stone-800">
        {/*
          HOW TO ADD YOUR PORTRAIT:
          1. Drop your photo into:  public/images/portrait.jpg
          2. The <Image> below will show it automatically.
          Tip: a natural photo — not a headshot — works best here.
               You on a trail, at Brown, anywhere you look like yourself.
        */}
        <Image
          src="/images/my_portrait.png"
          alt="Matias Bronner"
          fill
          className="object-cover object-top"
        />

        {/* subtle gradient at the bottom so it blends into the section */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-boise-night/60 to-transparent" />
      </div>
    </div>
  );
}

// ── section divider line ──────────────────────────────────────────────────────

function Divider() {
  const { ref, isVisible } = useReveal({ threshold: 0.4 });
  return (
    <div
      ref={ref}
      className={`h-px bg-gradient-to-r from-transparent via-stone-700 to-transparent
        transition-all duration-1000 origin-center ${
          isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
        }`}
    />
  );
}

// ── main component ────────────────────────────────────────────────────────────

export default function AboutSection() {
  const headingRef = useReveal({ threshold: 0.1 });

  return (
    <section id="about" className="relative bg-boise-night overflow-hidden">
      {/* same subtle warm glow as the hero, keeps continuity */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 5% 20%, rgba(139,107,82,0.10) 0%, transparent 65%)," +
            "radial-gradient(ellipse 50% 40% at 95% 80%, rgba(74,103,65,0.07) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32 space-y-20 md:space-y-28">
        {/* ── HEADING ── */}
        <div
          ref={headingRef.ref}
          className={`transition-all duration-700 ${
            headingRef.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <Label text="Who Am I?" />
          <h2 className="font-display text-5xl md:text-7xl font-black leading-none tracking-tight text-boise-smoke mt-5">
            &nbsp;&nbsp;About&nbsp;
           
           
            <span className="text-boise-amber/80">Me</span>

          </h2>
        </div>

        {/* ── PORTRAIT + STORY ── */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <Portrait />

          <div className="space-y-6 md:pt-4">
            <Label text="The story" />

          <Para delay={0}>
            I&apos;m a <Hi>Computer Science and Economics</Hi> student at{" "}
            <Hi>Brown University </Hi> from Boise, Idaho. I&apos;m drawn to software engineering 
            because it lets me do what I enjoy most: being creative, solving tough problems, 
            and constantly learning new things.
          </Para>

          <Para delay={150}>
            My work spans a variety of domains: I&apos;ve taught Foundations of AI to 100+
            students as a Teaching Assistant at Brown, built transformer-based recommendation models, tackled
            healthcare data problems, and now explore agentic AI for SSD testing and
            reliability at <Hi>Micron</Hi>.
          </Para>

          <Para delay={300}>
            I value both the technical and human sides of engineering. I love building and 
            debugging just as much as explaining and mentoring. Outside of work, you can find 
            me playing music, riding bikes, and staying connected to the community that shaped me.
          </Para>
          </div>
        </div>
        {/* ── NEXT SECTION HINT ── */}
        <div className="flex items-center gap-4 pt-4">
          <div className="h-px flex-1 bg-gradient-to-r from-stone-800 to-transparent" />
          <span className="font-body text-xs tracking-[0.2em] uppercase text-stone-600">
            next: experience
          </span>
        </div>
      </div>
    </section>
  );
}