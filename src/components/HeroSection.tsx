"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

function TopoLines() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.04]"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1200 800"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" stroke="#D97706" strokeWidth="1">
        <path d="M-100,650 Q200,580 500,620 Q800,660 1100,590 Q1250,560 1350,570" />
        <path d="M-100,600 Q200,520 500,565 Q800,610 1100,535 Q1250,505 1350,515" />
        <path d="M-100,545 Q200,455 500,505 Q800,555 1100,475 Q1250,445 1350,455" />
        <path d="M-100,480 Q200,380 500,440 Q800,495 1100,410 Q1250,375 1350,390" />
        <path d="M-100,405 Q200,295 500,365 Q800,425 1100,335 Q1250,295 1350,315" />
        <path d="M-100,315 Q200,200 500,275 Q800,345 1100,252 Q1250,210 1350,230" />
        <path d="M-100,215 Q200,95  500,175 Q800,255 1100,162 Q1250,118 1350,140" />
        <path d="M-100,110 Q200,-15 500,72  Q800,155 1100,62  Q1250,16  1350,40" />
      </g>
    </svg>
  );
}

function ScrollPrompt() {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
      <span className="font-body text-xs tracking-[0.25em] uppercase text-stone-400 animate-pulse-slow">
        scroll
      </span>
      <div className="flex flex-col items-center gap-1 animate-bounce-subtle">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-boise-amber/50" />
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          className="text-boise-amber/50"
        >
          <path
            d="M1 1L5 5L9 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen overflow-hidden bg-boise-night flex items-center justify-center py-24 md:py-0"
    >
      {/* ── BACKGROUND PHOTO & OVERLAYS ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/boise-header.png"
          alt="Boise, Idaho skyline"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-70"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 100% 70% at 20% 80%, rgba(139,107,82,0.2) 0%, transparent 65%)," +
              "radial-gradient(ellipse 60% 50% at 85% 15%, rgba(74,103,65,0.15) 0%, transparent 60%)",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-boise-night/60 via-boise-night/30 to-boise-night/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-boise-night/85 via-boise-night/40 to-boise-night/70" />
      </div>

      <TopoLines />

      {/* ── MAIN LAYOUT CONTAINER ── */}
      {/* Fixed: Confidently handles column rules via col-span modifications below */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
        
        {/* ── LEFT COLUMN: GROUNDED PORTRAIT ── */}
        <div
          className={`col-span-1 md:col-span-5 flex justify-center md:justify-start order-2 md:order-1 transition-all duration-1000 ${
            loaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          {/* Grandparent sets the relative aspect ratio context */}
          <div className="relative group max-w-[280px] md:max-w-full w-full aspect-[3/4] md:w-[85%] lg:w-[75%]">
            
            {/* Elegant, offset golden structural border line */}
            <div className="absolute inset-0 border border-boise-amber/50 translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4 rounded transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1 md:group-hover:translate-x-2 md:group-hover:translate-y-2" />
            
            {/* Solid backdrop card */}
            <div className="absolute inset-0 bg-stone-900/40 rounded backdrop-blur-xs" />

            {/* FIXED: Changed 'relative w-full h-full' to 'absolute inset-0' */}
            <div className="absolute inset-0 rounded overflow-hidden border border-stone-800 shadow-2xl">
              <Image
                src="/images/portrait.png"
                alt="Matias Bronner"
                fill
                sizes="(max-width: 768px) 280px, 350px"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                priority
              />
              
              {/* Internal framing vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-boise-night/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
            </div>
          </div>
</div>

        {/* ── RIGHT COLUMN: TYPOGRAPHY & CONTENT ── */}
        {/* Fixed: col-span-12 changed to col-span-1 */}
        <div className="col-span-1 md:col-span-7 flex flex-col justify-center order-1 md:order-2 text-center md:text-left min-w-0 w-full px-2 md:px-0">          
          {/* Location Tag */}
          <div
            className={`flex items-center justify-center md:justify-start gap-3 mb-6 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <div className="hidden md:block h-px w-8 bg-boise-amber" />
            {/* Fixed: Softened letter-spacing tracking on mobile layouts */}
            <span className="font-body text-xs tracking-[0.15em] md:tracking-[0.25em] uppercase text-boise-amber font-semibold">
              Boise, Idaho <span className="text-stone-400 font-normal">→</span> Providence, RI
            </span>
          </div>

          {/* Name Header */}
          <h1
            className={`font-display font-black leading-none tracking-tight text-white mb-6 transition-all duration-1000 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{
              /* Fixed: Reduced min clamp size to prevent breaking small viewports */
              fontSize: "clamp(2rem, 8vw, 5.5rem)",
              transitionDelay: "200ms",
            }}
          >
            Matias
            {/* Fixed: Allowed line break to process on mobile natively */}
            <br />{" "}
            <span className="italic font-serif font-normal text-stone-200 md:ml-2">Bronner.</span>
          </h1>

          {/* Tagline */}
          <p
            className={`font-body text-base md:text-lg text-stone-300 max-w-md mx-auto md:mx-0 leading-relaxed mb-8 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            CS & Economics at Brown. I build things with code, play drums too
            loud, and grew up biking around {" "}
            <span className="text-white font-medium underline decoration-boise-amber/40 underline-offset-4">Boise, Idaho</span>.
          </p>

          {/* Action Buttons */}
          <div
            className={`flex flex-wrap justify-center md:justify-start gap-4 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <button
              onClick={() =>
                document
                  .querySelector("#about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="font-body text-xs tracking-wider uppercase px-5 py-3.5 bg-boise-amber text-boise-night font-bold rounded hover:bg-white transition-colors duration-200 shadow-lg shadow-boise-amber/10"
            >
              Learn more
            </button>

            <button
              onClick={() =>
                document
                  .querySelector("#experience")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="font-body text-xs tracking-wider uppercase px-5 py-3.5 border border-stone-500 text-stone-200 bg-boise-night/40 backdrop-blur-xs rounded hover:border-boise-amber hover:text-boise-amber hover:bg-boise-night/80 transition-all duration-200"
            >
              See my work
            </button>
          </div>

          {/* Social Links Panel */}
          {/* Fixed: Added flex-wrap and responsive gaps to avoid clipping on tiny phones */}
          <div
            className={`flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 mt-12 transition-all duration-700 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            <a
              href="https://github.com/MatiasBronner"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-stone-400 hover:text-white transition-colors duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

            <a
              href="https://linkedin.com/in/matias-bronner"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-stone-400 hover:text-white transition-colors duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            <a
              href="mailto:matias_bronner@brown.edu"
              aria-label="Email"
              className="text-stone-400 hover:text-white transition-colors duration-200"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>

            <div className="h-px w-8 bg-stone-700" />

            <a
              href="/resume.pdf"
              target="_blank"
              className="font-body text-xs tracking-widest uppercase text-stone-400 hover:text-boise-amber transition-colors duration-200"
            >
              Résumé ↗
            </a>
          </div>
        </div>

      </div>

      <ScrollPrompt />
    </section>
  );
}