"use client";

import { useState, useEffect } from "react";
import { useReveal } from "@/hooks/useReveal";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Entry {
  id: string;
  role: string;
  org: string;
  period: string;
  tagline: string;
  photo: string;
  link?: string;
  linkLabel?: string;
  youtubeId?: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────
// HOW TO ADD YOUR PHOTOS:
// Copy your images into public/images/extras/ with these names:
//   drums.jpg   hsf.jpg   fintech.jpg   camp.jpg
// They will appear automatically once the files exist.

const ENTRIES: Entry[] = [
  {
    id: "drums",
    role: "Drummer",
    org: "Brown Jazz Band · Boise Philharmonic · BHS Jazz Band",
    period: "2015 – Present",
    tagline: "Performed for 8,000+ people across jazz clubs, arenas, and concert halls.",
    photo: "/images/extras/drums.png",
    youtubeId: "vrAhRgB5y74",
    linkLabel: "Watch live ↗",
  },
  {
    id: "hsf",
    role: "National Hispanic Scholar & Mentor",
    org: "Hispanic Scholarship Fund",
    period: "2023 – Present",
    tagline: "Selected from 120,000+ applicants. Guided 5 students to Harvard, Yale, USC, and Amherst.",
    photo: "/images/extras/hsf.jpg",
    link: "https://www.hsf.net/youth-leadership-institute",
    linkLabel: "About HSF ↗",
  },
  {
    id: "fintech",
    role: "Treasurer & Web Developer",
    org: "FinTech@Brown",
    period: "Jun 2025 – Present",
    tagline: "Built the club website, manage finances, and established partnerships with fintech companies across Providence and Boston.",
    photo: "/images/extras/fintech.png",
    link: "https://fintech-at-brown-website.vercel.app/",
    linkLabel: "Visit site ↗",
  },
  {
    id: "camp",
    role: "Camp Counselor",
    org: "Treasure Valley YMCA",
    period: "Summers 2020 – 2024",
    tagline: "Five summers leading outdoor activities and supervising campers at Camp Horsethief Reservoir.",
    photo: "/images/extras/camp.jpg",
    link: "https://ymcatvidaho.org/ymca-camp-horsethief-reservoir/y-camps/summer-camps/",
    linkLabel: "Camp Horsethief ↗",
  },
];

// ── YouTube modal ─────────────────────────────────────────────────────────────

function VideoModal({ videoId, onClose }: { videoId: string; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", h);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12"
      style={{ background: "rgba(0,0,0,0.96)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full"
        style={{ maxWidth: "900px" }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-10 right-0 font-mono text-sm text-stone-500 hover:text-white transition-colors"
        >
          ✕ close
        </button>
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full rounded-sm"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&start=1543`}
            title="Matias Bronner — Live Performance"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="font-mono text-xs text-stone-600 mt-3 text-center tracking-widest uppercase">
          Brown University Jazz Band · Live Performance
        </p>
      </div>
    </div>
  );
}

// ── Photo card ────────────────────────────────────────────────────────────────

function Card({
  entry,
  delay = 0,
  onPlay,
}: {
  entry: Entry;
  delay?: number;
  onPlay?: (id: string) => void;
}) {
  const { ref, isVisible } = useReveal({ delay, threshold: 0.08 });
  const [hovered, setHovered] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const handleAction = () => {
    if (entry.youtubeId && onPlay) onPlay(entry.youtubeId);
    else if (entry.link) window.open(entry.link, "_blank", "noopener noreferrer");
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div
        className="relative overflow-hidden rounded-sm cursor-pointer"
        style={{
          aspectRatio: "4/3",
          boxShadow: hovered
            ? "0 16px 48px rgba(0,0,0,0.75), 0 0 0 1px rgba(201,136,42,0.3)"
            : "0 4px 20px rgba(0,0,0,0.5)",
          transition: "box-shadow 0.3s ease",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleAction}
        role="button"
        tabIndex={0}
        onKeyDown={e => { if (e.key === "Enter") handleAction(); }}
        aria-label={`${entry.role} — ${entry.org}`}
      >
        {/* photo — falls back to gradient if missing */}
        {!imgFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={entry.photo}
            alt={entry.role}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
            style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, #142920 0%, #0D1F1A 100%)" }}
          />
        )}

        {/* green-tinted gradient overlay */}
        <div
          className="absolute inset-0 transition-all duration-300"
          style={{
            background: hovered
              ? "linear-gradient(to top, rgba(13,31,26,0.97) 0%, rgba(13,31,26,0.6) 45%, rgba(13,31,26,0.12) 100%)"
              : "linear-gradient(to top, rgba(13,31,26,0.93) 0%, rgba(13,31,26,0.5) 45%, rgba(13,31,26,0.08) 100%)",
          }}
        />

        {/* edge vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 120% 120% at 50% 50%, transparent 50%, rgba(13,31,26,0.55) 100%)",
          }}
        />

        {/* play button overlay — drums only */}
        {entry.youtubeId && (
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
            style={{ opacity: hovered ? 1 : 0 }}
          >
            <div
              className="flex items-center justify-center rounded-full border-2"
              style={{
                width: "64px",
                height: "64px",
                borderColor: "rgba(201,136,42,0.85)",
                background: "rgba(13,31,26,0.65)",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#C9882A">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
          </div>
        )}

        {/* card content */}
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">

          {/* period badge */}
          <div
            className="inline-block font-mono px-2 py-0.5 rounded-sm mb-3"
            style={{
              background: "rgba(201,136,42,0.15)",
              border: "1px solid rgba(201,136,42,0.3)",
              color: "#C9882A",
              fontSize: "0.58rem",
              letterSpacing: "0.12em",
            }}
          >
            {entry.period}
          </div>

          {/* role */}
          <h3
            className="font-display font-black leading-tight"
            style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: "#E8F0EB" }}
          >
            {entry.role}
          </h3>

          {/* org */}
          <p
            className="font-mono mt-1"
            style={{ color: "rgba(201,136,42,0.6)", fontSize: "0.6rem", letterSpacing: "0.1em" }}
          >
            {entry.org.toUpperCase()}
          </p>

          {/* tagline — revealed on hover */}
          <p
            className="font-body text-sm leading-relaxed mt-2 transition-all duration-300"
            style={{
              color: "rgba(232,240,235,0.65)",
              maxHeight: hovered ? "80px" : "0px",
              opacity: hovered ? 1 : 0,
              overflow: "hidden",
            }}
          >
            {entry.tagline}
          </p>

          {/* action hint */}
          {(entry.link || entry.youtubeId) && (
            <p
              className="font-mono mt-3 transition-all duration-300"
              style={{
                color: "#C9882A",
                opacity: hovered ? 1 : 0,
                fontSize: "0.68rem",
                letterSpacing: "0.1em",
              }}
            >
              {entry.youtubeId ? "▶ Watch live" : entry.linkLabel}
            </p>
          )}
        </div>
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
      <div className="h-px w-8 flex-shrink-0" style={{ background: "#C9882A" }} />
      <span className="font-body text-xs tracking-[0.22em] uppercase" style={{ color: "#C9882A" }}>
        {text}
      </span>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function MoreSection() {
  const headingRef = useReveal({ threshold: 0.05 });
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <section id="more" className="relative overflow-hidden" style={{ background: "#0D1F1A" }}>

      {/* forest glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 0% 0%,    rgba(44,74,62,0.45)   0%, transparent 60%)," +
            "radial-gradient(ellipse 55% 45% at 100% 100%, rgba(20,41,32,0.6)    0%, transparent 55%)," +
            "radial-gradient(ellipse 40% 30% at 80% 15%,   rgba(201,136,42,0.07) 0%, transparent 50%)",
        }}
      />

      {/* top rule */}
      <div className="h-px w-full"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,136,42,0.5), transparent)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">

        {/* heading */}
        <div
          ref={headingRef.ref}
          className={`mb-16 md:mb-20 transition-all duration-700 ${
            headingRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <Label text="More" />
          <div
            className="mt-6 pb-8 border-b flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
            style={{ borderColor: "rgba(61,107,90,0.35)" }}
          >
            <h2
              className="font-display font-black leading-none tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 8vw, 5.5rem)", color: "#E8F0EB" }}
            >
              Beyond the
              <br />
              <span style={{ color: "#C9882A", fontStyle: "italic" }}>resume.</span>
            </h2>
            <p
              className="font-body text-sm sm:text-right"
              style={{ color: "rgba(232,240,235,0.35)" }}
            >
            
            </p>
          </div>
        </div>

        {/* ── EVEN 2×2 GRID — all cards identical aspect ratio ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {ENTRIES.map((entry, i) => (
            <Card
              key={entry.id}
              entry={entry}
              delay={i * 80}
              onPlay={setPlayingId}
            />
          ))}
        </div>

        {/* footer sign-off */}
        <div
          className="mt-20 md:mt-28 border-t pt-12"
          style={{ borderColor: "rgba(61,107,90,0.3)" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <p
                className="font-display font-black text-3xl md:text-4xl leading-tight"
                style={{ color: "#E8F0EB" }}
              >
                Matias Bronner
              </p>
              <p
                className="font-mono text-xs mt-2 tracking-widest uppercase"
                style={{ color: "rgba(61,107,90,0.7)" }}
              >
                Brown University · Class of 2027
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "matias_bronner@brown.edu", href: "mailto:matias_bronner@brown.edu" },
                { label: "LinkedIn ↗", href: "https://linkedin.com/in/matias-bronner", external: true },
              ].map(({ label, href, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="font-mono text-xs px-4 py-2.5 rounded-sm transition-all duration-200"
                  style={{ border: "1px solid rgba(61,107,90,0.4)", color: "rgba(232,240,235,0.5)" }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(201,136,42,0.6)";
                    el.style.color = "#C9882A";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(61,107,90,0.4)";
                    el.style.color = "rgba(232,240,235,0.5)";
                  }}
                >
                  {label}
                </a>
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                className="font-mono text-xs px-4 py-2.5 rounded-sm transition-all duration-200"
                style={{
                  background: "rgba(201,136,42,0.12)",
                  border: "1px solid rgba(201,136,42,0.35)",
                  color: "#C9882A",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(201,136,42,0.22)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(201,136,42,0.12)"; }}
              >
                Résumé ↗
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* bottom rule */}
      <div className="h-px w-full"
        style={{ background: "linear-gradient(to right, transparent, rgba(61,107,90,0.4), transparent)" }} />

      {playingId && (
        <VideoModal videoId={playingId} onClose={() => setPlayingId(null)} />
      )}
    </section>
  );
}
