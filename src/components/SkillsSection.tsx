"use client";

import { useRef, useCallback } from "react";
import { useReveal } from "@/hooks/useReveal";

// ── Skill categories ──────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: "languages",
    label: "Languages",
    skills: ["Python", "TypeScript", "JavaScript", "C", "C++", "Java", "HTML", "CSS"],
  },
  {
    id: "frameworks",
    label: "Frameworks",
    skills: ["React", "Next.js", "Flask", "Express.js"],
  },
  {
    id: "ml",
    label: "ML & Data",
    skills: ["PyTorch", "TensorFlow", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "NLTK"],
  },
  {
    id: "tools",
    label: "Dev Tools",
    skills: ["Git", "Docker", "Selenium", "REST APIs", "Whisper", "Visual Studio", "IntelliJ"],
  },
  {
    id: "productivity",
    label: "Productivity Suites",
    skills: [
      "Microsoft Excel", "Microsoft Word", "Microsoft PowerPoint",
      "Google Sheets", "Google Docs", "Google Slides", "Google Forms", "Google Calendar API",
    ],
  },
  {
    id: "finance",
    label: "Financial Skills",
    skills: [
      "DCF Modeling", "LBO Analysis", "Comparable Company Analysis",
      "Financial Forecasting", "Valuation", "Corporate Finance",
      "Econometrics", "Investment Analysis",
    ],
  },
  {
    id: "concepts",
    label: "CS Concepts",
    skills: [
      "Machine Learning", "Deep Learning", "Distributed Systems",
      "Applied Cryptography", "Reinforcement Learning", "Computer Vision",
      "NLP", "Systems Programming", "Full Stack Dev", "Data Engineering",
    ],
  },
] as const;

// ── Pre-computed coordinates (avoids SSR/client float precision mismatch) ─────

const CYMBAL_ROD_HOLES = [
  { cx: 382, cy: 200 },
  { cx: 368.1461, cy: 269.6484 },
  { cx: 328.6934, cy: 328.6934 },
  { cx: 269.6484, cy: 368.1461 },
  { cx: 200, cy: 382 },
  { cx: 130.3516, cy: 368.1461 },
  { cx: 71.3066, cy: 328.6934 },
  { cx: 31.8539, cy: 269.6484 },
  { cx: 18, cy: 200 },
  { cx: 31.8539, cy: 130.3516 },
  { cx: 71.3066, cy: 71.3066 },
  { cx: 130.3516, cy: 31.8539 },
  { cx: 200, cy: 18 },
  { cx: 269.6484, cy: 31.8539 },
  { cx: 328.6934, cy: 71.3066 },
  { cx: 368.1461, cy: 130.3516 },
];

const CYMBAL_RADIAL_LINES = [
  { x1: 232, y1: 200, x2: 378, y2: 200 },
  { x1: 230.9096, y1: 208.2822, x2: 371.9348, y2: 246.0698 },
  { x1: 227.7128, y1: 216, x2: 354.1525, y2: 289 },
  { x1: 222.6274, y1: 222.6274, x2: 325.865, y2: 325.865 },
  { x1: 216, y1: 227.7128, x2: 289, y2: 354.1525 },
  { x1: 208.2822, y1: 230.9096, x2: 246.0698, y2: 371.9348 },
  { x1: 200, y1: 232, x2: 200, y2: 378 },
  { x1: 191.7178, y1: 230.9096, x2: 153.9302, y2: 371.9348 },
  { x1: 184, y1: 227.7128, x2: 111, y2: 354.1525 },
  { x1: 177.3726, y1: 222.6274, x2: 74.135, y2: 325.865 },
  { x1: 172.2872, y1: 216, x2: 45.8475, y2: 289 },
  { x1: 169.0904, y1: 208.2822, x2: 28.0652, y2: 246.0698 },
  { x1: 168, y1: 200, x2: 22, y2: 200 },
  { x1: 169.0904, y1: 191.7178, x2: 28.0652, y2: 153.9302 },
  { x1: 172.2872, y1: 184, x2: 45.8475, y2: 111 },
  { x1: 177.3726, y1: 177.3726, x2: 74.135, y2: 74.135 },
  { x1: 184, y1: 172.2872, x2: 111, y2: 45.8475 },
  { x1: 191.7178, y1: 169.0904, x2: 153.9302, y2: 28.0652 },
  { x1: 200, y1: 168, x2: 200, y2: 22 },
  { x1: 208.2822, y1: 169.0904, x2: 246.0698, y2: 28.0652 },
  { x1: 216, y1: 172.2872, x2: 289, y2: 45.8475 },
  { x1: 222.6274, y1: 177.3726, x2: 325.865, y2: 74.135 },
  { x1: 227.7128, y1: 184, x2: 354.1525, y2: 111 },
  { x1: 230.9096, y1: 191.7178, x2: 371.9348, y2: 153.9302 },
];

function CymbalWatermark() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute"
      style={{
        right: "-18vw",
        top: "50%",
        transform: "translateY(-50%)",
        width: "min(80vw, 700px)",
        aspectRatio: "1",
        opacity: 0.045,
        animation: "cymbal-spin 32s linear infinite",
      }}
    >
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <ellipse cx="200" cy="200" rx="195" ry="195" fill="none" stroke="#C09B5A" strokeWidth="3" />

        {CYMBAL_ROD_HOLES.map((p, i) => (
          <circle key={i} cx={p.cx} cy={p.cy} r="4" fill="#C09B5A" opacity="0.8" />
        ))}

        {[160, 128, 100, 76, 56, 40].map((r, i) => (
          <ellipse key={i} cx="200" cy="200" rx={r} ry={r}
            fill="none" stroke="#C09B5A"
            strokeWidth={i === 5 ? 2.5 : 1}
            opacity={0.3 + i * 0.1} />
        ))}

        <ellipse cx="200" cy="200" rx="28" ry="28" fill="none" stroke="#C09B5A" strokeWidth="3" opacity="0.9" />
        <ellipse cx="200" cy="200" rx="14" ry="14" fill="#C09B5A" opacity="0.6" />
        <circle cx="200" cy="200" r="4" fill="#C09B5A" opacity="1" />

        {CYMBAL_RADIAL_LINES.map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="#C09B5A" strokeWidth="0.5" opacity="0.25" />
        ))}

        <circle cx="200" cy="200" r="8" fill="none" stroke="#C09B5A" strokeWidth="2" opacity="0.5" />
      </svg>
    </div>
  );
}


// ── Mouse glow ────────────────────────────────────────────────────────────────

function MouseGlow({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!glowRef.current || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.left = `${x}px`;
    glowRef.current.style.top = `${y}px`;
    glowRef.current.style.opacity = "1";
  }, [sectionRef]);

  const handleMouseLeave = useCallback(() => {
    if (!glowRef.current) return;
    glowRef.current.style.opacity = "0";
  }, []);

  // attach listeners to the section element
  // we expose handlers to be spread onto the section
  return (
    <>
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "420px",
          height: "420px",
          background: "radial-gradient(circle, rgba(192,155,90,0.11) 0%, rgba(192,155,90,0.04) 40%, transparent 70%)",
          opacity: 0,
          transition: "opacity 0.3s ease",
          zIndex: 1,
        }}
      />
      {/* invisible overlay to capture mouse events across the full section */}
      <div
        className="absolute inset-0 z-0"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
    </>
  );
}

// ── Skill tag ─────────────────────────────────────────────────────────────────

function Tag({ text }: { text: string }) {
  return (
    <span
      className="inline-block font-mono text-sm px-3 py-1.5 rounded-sm border
        transition-all duration-200 cursor-default select-none"
      style={{
        background: "rgba(192,155,90,0.07)",
        borderColor: "rgba(192,155,90,0.2)",
        color: "rgba(250,247,242,0.7)",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "rgba(192,155,90,0.18)";
        el.style.borderColor = "rgba(192,155,90,0.55)";
        el.style.color = "#FAF7F2";
        el.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "rgba(192,155,90,0.07)";
        el.style.borderColor = "rgba(192,155,90,0.2)";
        el.style.color = "rgba(250,247,242,0.7)";
        el.style.transform = "translateY(0)";
      }}
    >
      {text}
    </span>
  );
}

// ── Single skill cluster ──────────────────────────────────────────────────────

function Cluster({
  category,
  delay = 0,
}: {
  category: typeof CATEGORIES[number];
  delay?: number;
}) {
  const { ref, isVisible } = useReveal({ delay, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      {/* category title — plain left-aligned, no number */}
      <h3
        className="font-display font-black leading-none mb-5"
        style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)", color: "#FAF7F2" }}
      >
        {category.label}
      </h3>

      {/* thin gold rule under title */}
      <div
        className="h-px mb-5"
        style={{ background: "rgba(192,155,90,0.2)" }}
      />

      {/* tags */}
      <div className="flex flex-wrap gap-2">
        {category.skills.map(s => (
          <Tag key={s} text={s} />
        ))}
      </div>
    </div>
  );
}

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
      <div className="h-px w-8 flex-shrink-0 bg-brown-gold" />
      <span className="font-body text-xs tracking-[0.22em] uppercase text-brown-gold">
        {text}
      </span>
    </div>
  );
}

// ── Transcript footer ─────────────────────────────────────────────────────────

function Transcript() {
  const { ref, isVisible } = useReveal({ threshold: 0.2 });
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div
        className="border rounded-sm px-6 py-5
          flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
        style={{ borderColor: "rgba(192,155,90,0.18)", background: "rgba(192,155,90,0.04)" }}
      >
        <div>
          <p className="font-mono text-xs tracking-[0.22em] uppercase mb-1"
            style={{ color: "rgba(192,155,90,0.45)" }}>
            Unofficial Transcript
          </p>
          <p className="font-display font-black text-xl" style={{ color: "#FAF7F2" }}>
            Brown University
          </p>
          <p className="font-mono text-xs mt-1"
            style={{ color: "rgba(192,155,90,0.4)", letterSpacing: "0.08em" }}>
            Sc.B. Computer Science &amp; Economics · Class of 2027
          </p>
        </div>

        <div className="hidden sm:block w-px self-stretch"
          style={{ background: "rgba(192,155,90,0.18)" }} />

        <div className="text-center">
          <p className="font-mono text-xs tracking-widest uppercase mb-1"
            style={{ color: "rgba(192,155,90,0.35)", fontSize: "0.6rem" }}>
            Cumulative GPA
          </p>
          <p className="font-display font-black"
            style={{ fontSize: "2.4rem", color: "#C09B5A", lineHeight: 1 }}>
            3.94
          </p>
          <p className="font-mono text-xs mt-0.5"
            style={{ color: "rgba(192,155,90,0.28)", fontSize: "0.6rem" }}>
            / 4.00
          </p>
        </div>

        <div className="hidden sm:block w-px self-stretch"
          style={{ background: "rgba(192,155,90,0.18)" }} />

        <div className="sm:text-right">
          <p className="font-mono text-xs tracking-widest uppercase mb-2"
            style={{ color: "rgba(192,155,90,0.35)", fontSize: "0.6rem" }}>
            Selected Coursework
          </p>
          {[
            "Deep Learning",
            "Applied Cryptography",
            "Computer Systems",
            "Corporate Finance",
            "Investments",
            "Foundations of AI",
            "ML for Health and Bio"
            
          ].map(c => (
            <p key={c} className="font-mono leading-relaxed"
              style={{ color: "rgba(250,247,242,0.45)", fontSize: "0.68rem" }}>
              {c}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function SkillsSection() {
  const headingRef = useReveal({ threshold: 0.05 });
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative overflow-hidden"
      style={{ background: "#1A1208" }}
    >
      <style>{`
        @keyframes cymbal-spin {
          from { transform: translateY(-50%) rotate(0deg); }
          to   { transform: translateY(-50%) rotate(360deg); }
        }
      `}</style>

      {/* atmospheric glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 40% at 10% 15%, rgba(78,26,26,0.3) 0%, transparent 60%)," +
            "radial-gradient(ellipse 55% 45% at 90% 55%, rgba(192,155,90,0.06) 0%, transparent 60%)",
        }}
      />

      {/* mouse glow — must be before content so z-index stacks correctly */}
      <MouseGlow sectionRef={sectionRef} />

      <CymbalWatermark />

      <div className="h-px w-full"
        style={{ background: "linear-gradient(to right, transparent, rgba(192,155,90,0.4), transparent)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">

        {/* heading */}
        <div
          ref={headingRef.ref}
          className={`mb-16 md:mb-20 transition-all duration-700 ${
            headingRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <Label text="Skills" />
          <div
            className="mt-6 pb-8 border-b flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
            style={{ borderColor: "rgba(192,155,90,0.18)" }}
          >
            <h2
              className="font-display font-black leading-none tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 8vw, 5.5rem)", color: "#FAF7F2" }}
            >
              Technical
              <br />
              <span style={{ color: "#C09B5A", fontStyle: "italic" }}>fluency.</span>
            </h2>
            <p
              className="font-body text-sm sm:text-right"
              style={{ color: "rgba(250,247,242,0.3)" }}
            >
            </p>
          </div>
        </div>

        {/* uniform 2-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {CATEGORIES.map((cat, i) => (
            <Cluster key={cat.id} category={cat} delay={i * 60} />
          ))}
        </div>

        {/* transcript */}
        <div className="mt-20 md:mt-28">
          <Transcript />
        </div>

        {/* bottom transition */}
        <div className="flex items-center gap-4 mt-16">
          <div className="h-px flex-1"
            style={{ background: "linear-gradient(to right, rgba(192,155,90,0.12), transparent)" }} />
          <span className="font-body text-xs tracking-[0.2em] uppercase"
            style={{ color: "rgba(192,155,90,0.25)" }}>
            next: more
          </span>
        </div>

      </div>

      <div className="h-px w-full"
        style={{ background: "linear-gradient(to right, transparent, rgba(192,155,90,0.25), transparent)" }} />
    </section>
  );
}
