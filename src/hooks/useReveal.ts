"use client";

import { useEffect, useRef, useState } from "react";

interface RevealOptions {
  threshold?: number;
  delay?: number;
  once?: boolean;
}

export function useReveal({
  threshold = 0.15,
  delay = 0,
  once = true,
}: RevealOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay) {
            setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(true);
          }
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, delay, once]);

  return { ref, isVisible };
}