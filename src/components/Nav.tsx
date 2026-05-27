"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "About",      href: "#about"      },
  { label: "Experience", href: "#experience"  },
  { label: "Projects",   href: "#projects"    },
  { label: "Skills",     href: "#skills"      },
  { label: "More",       href: "#more"        },
];

export default function Nav() {
  const [open,      setOpen]      = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const [active,    setActive]    = useState("");

  /* darken nav background once user scrolls past hero */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* highlight active section in nav */
  useEffect(() => {
    const sections = NAV_LINKS.map(l =>
      document.querySelector(l.href) as HTMLElement | null
    );
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive("#" + entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(s => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleClick = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-boise-night/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">

        {/* Logo / name */}
        <button
          onClick={() => handleClick("#hero")}
          className="font-display text-boise-smoke text-lg font-bold tracking-tight hover:text-boise-amber transition-colors duration-200"
        >
          MB
        </button>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => handleClick(href)}
              className={`font-body text-sm tracking-wide transition-colors duration-200 ${
                active === href
                  ? "text-boise-amber"
                  : "text-stone-400 hover:text-boise-smoke"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Hamburger — mobile only */}
        <button
          onClick={() => setOpen(o => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden flex flex-col gap-1.5 p-2 group"
        >
          <span className={`block w-6 h-px bg-boise-smoke transition-all duration-300 ${open ? "rotate-45 translate-y-2.5" : ""}`} />
          <span className={`block w-6 h-px bg-boise-smoke transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-boise-smoke transition-all duration-300 ${open ? "-rotate-45 -translate-y-2.5" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        } bg-boise-night/95 backdrop-blur-md border-t border-white/5`}
      >
        <nav className="flex flex-col px-6 py-4 gap-1" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => handleClick(href)}
              className={`font-body text-sm py-3 text-left border-b border-white/5 last:border-0 transition-colors duration-200 ${
                active === href
                  ? "text-boise-amber"
                  : "text-stone-400 hover:text-boise-smoke"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
