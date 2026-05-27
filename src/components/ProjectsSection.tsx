"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Project {
  id: string;
  trackNum: string;
  title: string;
  artist: string;
  year: string;
  description: string;
  stat?: { value: string; label: string };
  tags: string[];
  github?: string;
  live?: string;
  paper?: string;
  imageType: "photo" | "svg";
  photoSrc?: string;
  svgEl: React.ReactNode;
}

// ── SVG art ───────────────────────────────────────────────────────────────────

const SVGs: Record<string, React.ReactNode> = {
  spotify: (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {[20,38,56,74,92,110].map((r,i) => (
        <circle key={i} cx="100" cy="130" r={r} fill="none" stroke="#C9882A" strokeWidth="1.5" opacity={0.15 + i*0.12} />
      ))}
      <path d="M 40 130 Q 100 40 160 130" fill="none" stroke="#C9882A" strokeWidth="2.5" opacity="0.9"/>
      <circle cx="100" cy="130" r="6" fill="#C9882A"/>
    </svg>
  ),
  skin: (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {[14,30,50,72,96].map((r,i) => (
        <circle key={i} cx="100" cy="100" r={r} fill="none" stroke="#C9882A" strokeWidth={i===0?3:1} opacity={i===0?1:0.25+i*0.1}/>
      ))}
      <line x1="100" y1="4" x2="100" y2="196" stroke="#C9882A" strokeWidth="0.5" opacity="0.15"/>
      <line x1="4" y1="100" x2="196" y2="100" stroke="#C9882A" strokeWidth="0.5" opacity="0.15"/>
      <circle cx="100" cy="100" r="6" fill="#C9882A"/>
    </svg>
  ),
  medical: (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="85" y="30" width="30" height="140" rx="4" fill="#C9882A" opacity="0.85"/>
      <rect x="30" y="85" width="140" height="30" rx="4" fill="#C9882A" opacity="0.85"/>
      <circle cx="100" cy="100" r="90" fill="none" stroke="#C9882A" strokeWidth="1" opacity="0.15"/>
    </svg>
  ),
  goai: (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {[40,70,100,130,160].map(x => (<line key={x} x1={x} y1="40" x2={x} y2="160" stroke="#C9882A" strokeWidth="1" opacity="0.35"/>))}
      {[40,70,100,130,160].map(y => (<line key={y} x1="40" y1={y} x2="160" y2={y} stroke="#C9882A" strokeWidth="1" opacity="0.35"/>))}
      <circle cx="100" cy="100" r="14" fill="#C9882A"/>
      <circle cx="70" cy="70" r="10" fill="none" stroke="#C9882A" strokeWidth="1.5" opacity="0.7"/>
      <circle cx="130" cy="70" r="10" fill="#C9882A" opacity="0.4"/>
      <circle cx="70" cy="130" r="10" fill="#C9882A" opacity="0.4"/>
      <circle cx="130" cy="130" r="10" fill="none" stroke="#C9882A" strokeWidth="1.5" opacity="0.7"/>
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {[[20,80],[35,120],[50,60],[65,140],[80,90],[95,160],[110,70],[125,130],[140,50],[155,110],[170,85]].map(([x,h],i) => (
        <rect key={i} x={x} y={200-Number(h)-20} width="10" height={h} rx="3" fill="#C9882A" opacity={0.3+(i%3)*0.2}/>
      ))}
    </svg>
  ),
  voting: (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M100 20 L160 50 L160 110 Q160 160 100 180 Q40 160 40 110 L40 50 Z" fill="none" stroke="#C9882A" strokeWidth="2" opacity="0.8"/>
      <rect x="78" y="95" width="44" height="36" rx="4" fill="#C9882A" opacity="0.85"/>
      <path d="M85 95 Q85 68 100 68 Q115 68 115 95" fill="none" stroke="#C9882A" strokeWidth="3" strokeLinecap="round" opacity="0.85"/>
      <circle cx="100" cy="113" r="5" fill="#0A0A0A"/>
    </svg>
  ),
  kvstore: (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {[[100,40,40,120],[100,40,160,120],[40,120,100,170],[160,120,100,170],[40,120,160,120]].map(([x1,y1,x2,y2],i)=>(
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C9882A" strokeWidth="1.5" opacity="0.4"/>
      ))}
      {[[100,40],[40,120],[160,120],[100,170]].map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r="12" fill={i===0?"#C9882A":"none"} stroke="#C9882A" strokeWidth="2" opacity={i===0?1:0.75}/>
      ))}
    </svg>
  ),
  marchmadness: (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <line x1="20" y1="170" x2="180" y2="170" stroke="#C9882A" strokeWidth="1.5" opacity="0.4"/>
      <path d="M 60 170 A 60 60 0 0 1 140 170" fill="none" stroke="#C9882A" strokeWidth="2" opacity="0.8"/>
      <circle cx="100" cy="170" r="8" fill="none" stroke="#C9882A" strokeWidth="1.5" opacity="0.6"/>
      <rect x="75" y="110" width="50" height="60" rx="2" fill="none" stroke="#C9882A" strokeWidth="1.5" opacity="0.4"/>
      <circle cx="100" cy="70" r="28" fill="none" stroke="#C9882A" strokeWidth="1.5" opacity="0.3"/>
      <circle cx="100" cy="70" r="10" fill="#C9882A" opacity="0.7"/>
    </svg>
  ),
  fintech: (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="20" y="35" width="160" height="130" rx="6" fill="none" stroke="#C9882A" strokeWidth="2" opacity="0.7"/>
      <line x1="20" y1="60" x2="180" y2="60" stroke="#C9882A" strokeWidth="1.5" opacity="0.5"/>
      {[34,46,58].map((cx,i)=>(<circle key={i} cx={cx} cy="48" r="5" fill="none" stroke="#C9882A" strokeWidth="1.2" opacity="0.6"/>))}
      {[[35,80,120,8],[35,98,90,8],[35,116,110,8],[35,134,75,8],[35,152,100,8]].map(([x,y,w,h],i)=>(
        <rect key={i} x={x} y={y} width={w} height={h} rx="2" fill="#C9882A" opacity={0.1+i*0.04}/>
      ))}
    </svg>
  ),
  tetris: (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="50" y="50" width="30" height="30" rx="2" fill="#C9882A" opacity="0.85"/>
      <rect x="50" y="80" width="30" height="30" rx="2" fill="#C9882A" opacity="0.85"/>
      <rect x="50" y="110" width="30" height="30" rx="2" fill="#C9882A" opacity="0.85"/>
      <rect x="80" y="110" width="30" height="30" rx="2" fill="#C9882A" opacity="0.85"/>
      <rect x="110" y="80" width="28" height="28" rx="2" fill="#C9882A" opacity="0.4"/>
      <rect x="138" y="80" width="28" height="28" rx="2" fill="#C9882A" opacity="0.4"/>
      <rect x="82" y="108" width="28" height="28" rx="2" fill="#C9882A" opacity="0.4"/>
      <rect x="110" y="108" width="28" height="28" rx="2" fill="#C9882A" opacity="0.4"/>
    </svg>
  ),
  fileio: (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {[[20,60,160,60],[20,80,140,80],[20,100,180,100],[20,120,130,120],[20,140,155,140]].map(([x1,y1,x2,y2],i)=>(
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C9882A" strokeWidth={i===2?2.5:1.5} opacity={i===2?0.9:0.3} strokeLinecap="round"/>
      ))}
      <polygon points="170,100 148,88 148,112" fill="#C9882A" opacity="0.9"/>
    </svg>
  ),
};

const PROJECTS: Project[] = [
  // ── PAPERS FIRST ──────────────────────────────────────────────
  { id:"spotify", trackNum:"01", title:"Spotify Transformer", artist:"Machine Learning · Deep Learning", year:"2025",
  description:"Built a title-conditioned set transformer for playlist continuation — trained on 994k Spotify playlists with tabular audio features. Uses Pooling by Multi-Head Attention to encode variable-length playlists as sets (no positional encodings), plus a custom WARP reconstruction loss designed for ranking rather than classification. Trained on Brown's OSCAR HPC cluster across 40 epochs on ~37M playlist-track pairs.",
  paper:"/papers/Set_Transformers.pdf", github:"#", tags:["Python","TensorFlow","Pandas","Transformers","TFRecords"], imageType:"photo", photoSrc:"spotify.webp", svgEl:SVGs.spotify },

{ id:"skin", trackNum:"02", title:"Skin Lesion Classifier", artist:"Machine Learning · Computer Vision", year:"2025",
  description:"Multimodal intermediate fusion model for dermoscopic skin lesion classification across 7 categories. Fine-tuned a ConvNeXt-Base backbone on 3,500 labeled samples using LP-FT staging, fused with a tabular MLP encoding age, sex, and anatomical site. Achieved macro-F1 of 0.679 on held-out test set, beating image-only (0.65) and tabular-only (0.17) baselines. Gradient attribution analysis confirmed the model learned clinically relevant features — lesion boundaries over hair artifacts — and that biological sex drives Melanocytic Nevus predictions consistent with dermatological literature.",
  paper:"/papers/Skin_Lesion.pdf", github:"#", tags:["Python","PyTorch","ConvNeXt","Computer Vision","Deep Learning"], imageType:"photo", photoSrc:"mole.png", svgEl:SVGs.skin },
  // ── REAL-WORLD DEPLOYMENT ──────────────────────────────────────
  { id:"medical", trackNum:"03", title:"Medical Description Generator", artist:"Full Stack · NLP", year:"2025",
  description:"Full-stack Flask app deployed at St. Luke's Health System to automate standardization of medical supply-chain descriptions. Ingests an Excel item master, spins up a background thread to pipeline scraping (Selenium + Google Custom Search API) and GPT-4 description generation in parallel — processing 40,000+ products while the UI stays live. Reviewers can inspect, edit, and confirm AI-generated descriptions one-by-one in the browser, then export the finalized batch as a formatted Excel file. Built with thread-safe state management (Lock-guarded shared DataFrames) and a session-driven queue to handle multi-user workflows without data races.",
  stat:{ value:"40k+", label:"products processed" }, github:"https://github.com/MatiasBronner/st-lukes-repo",
  tags:["Python","Flask","Selenium","OpenAI API","Pandas","Google CSE","Threading"], imageType:"photo", photoSrc:"dame.png", svgEl:SVGs.medical },
  // ── COMPETITION WIN ────────────────────────────────────────────
  { id:"goai", trackNum:"04", title:"Go AI Agent", artist:"Artificial Intelligence", year:"2024",
    description:"Built with a partner using Monte Carlo Tree Search and Iterative Deepening Search with custom heuristics. Won the class-wide Brown Go AI competition, outperforming 70 competing bots.",
    stat:{ value:"#1", label:"of 70 bots · Brown Go AI Competition" }, github:"#",
    tags:["Python","PyTorch","MCTS","Iterative Deepening"], imageType:"photo", photoSrc:"go.webp", svgEl:SVGs.goai },

  // ── TECHNICAL DEPTH ────────────────────────────────────────────
  { id:"kvstore", trackNum:"05", title:"Distributed Key-Value Store", artist:"Distributed Systems", year:"2024",
    description:"Sharded distributed KV store in C++ with a dynamic Shardmaster for server coordination. Concurrency control via mutexes and readers-writer locks ensures scalability and consistency.",
    tags:["C++","Docker","Distributed Systems","Concurrency"], imageType:"photo", photoSrc:"key.jpg", svgEl:SVGs.kvstore },
  { id:"voting", trackNum:"06", title:"Anonymous Voting System", artist:"Applied Cryptography", year:"2026",
    description:"Cryptographically secure anonymous voting system built for Brown's Applied Cryptography course (CSCI 1515). Implements zero-knowledge proofs, ElGamal threshold encryption, and RSA blind signatures.",
    tags:["C++","CryptoPP","Zero-Knowledge Proofs","ElGamal"], imageType:"photo", photoSrc:"vote.jpg", svgEl:SVGs.voting },
  { id:"fileio", trackNum:"07", title:"File I/O Cache", artist:"Systems Programming", year:"2023",
    description:"Software-based file I/O cache in C. Reduced disk access frequency and achieved performance close to the standard library's buffered I/O while managing memory efficiently.",
    tags:["C","Systems Programming","Performance Optimization"], imageType:"photo", photoSrc:"write.png", svgEl:SVGs.fileio },

  // ── DATA & NLP ─────────────────────────────────────────────────
  { id:"tiktok", trackNum:"08", title:"TikTok Speech Analyzer", artist:"NLP · Data Engineering", year:"2024",
    description:"Pipeline designed to run daily that tracks emerging speech trends across the top TikTok creators. Fetches recent videos via TikTok's API (using session token extraction to bypass bot detection), downloads audio with yt-dlp, and transcribes with Whisper. Computes per-word 'weirdness' scores by comparing TikTok word probabilities against English baseline frequencies — filtering single-occurrence spikes and non-English content — then runs statistical significance tests to surface genuinely overrepresented words. A second pass fits per-word linear trends and rolling averages across dated CSV snapshots to identify vocabulary trending up or down over time.",
    github:"https://github.com/MatiasBronner/trending_words", tags:["Python","Whisper","yt-dlp","Pandas","scikit-learn","NLP","langdetect"], imageType:"photo", photoSrc:"tiktok.png", svgEl:SVGs.tiktok },
  // ── FUN / EARLY WORK ───────────────────────────────────────────
  { id:"tetris", trackNum:"09", title:"Tetris", artist:"Game Dev · Object-Oriented Design", year:"2023",
    description:"Fully functional Tetris in Java with JavaFX. Smooth piece animation, keyboard controls, accessible color design, modular architecture, and event-driven game state management.",
    tags:["Java","JavaFX","OOP","Event-Driven Programming"], imageType:"photo", photoSrc:"tetris.png", svgEl:SVGs.tetris },
];

// ── Cover image ───────────────────────────────────────────────────────────────

function CoverImage({ project, filterStyle }: { project: Project; filterStyle: string; sizes?: string }) {
  const [failed, setFailed] = useState(false);
  if (project.imageType === "photo" && project.photoSrc && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`/images/projects/${project.photoSrc}`}
        alt={project.title}
        className="w-full h-full object-cover"
        style={{ filter: filterStyle }}
        onError={() => setFailed(true)}
      />
    );
  }
  return <div className="w-full h-full flex items-center justify-center p-8">{project.svgEl}</div>;
}

// ── Record modal ──────────────────────────────────────────────────────────────

interface ModalProps {
  project: Project | null;
  originRect: DOMRect | null;
  onClose: () => void;
}
function RecordModal({ project, originRect, onClose }: ModalProps) {
  const controls = useAnimationControls();
  const [insertInFront, setInsertInFront] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const vw = typeof window !== "undefined" ? window.innerWidth : 800;
  const vh = typeof window !== "undefined" ? window.innerHeight : 600;

  const originX = originRect ? originRect.left + originRect.width / 2 : vw / 2;
  const originY = originRect ? originRect.top + originRect.height / 2 : vh / 2;

  const offsetX = originX - vw / 2;
  const offsetY = originY - vh / 2;

  const sleeveSize = "min(460px, 92vw)";

  const nextFrame = () =>
    new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

  useEffect(() => {
    if (!project) return;

    let cancelled = false;

    async function runOpenAnimation() {
      setIsClosing(false);

      // Start between the album layers, clipped by the slot mask.
      setInsertInFront(false);

      controls.set({
        y: "58%",
        scale: 0.96,
        opacity: 1,
      });

      // Pull the notes upward while they are still between layers.
      await controls.start({
        y: "-92%",
        scale: 0.98,
        opacity: 1,
        transition: {
          delay: 0.25,
          duration: 0.62,
          ease: "easeInOut",
        },
      });

      if (cancelled) return;

      // Abrupt layer jump only once fully pulled out.
      setInsertInFront(true);
      await nextFrame();

      // Move down into the final readable front position.
      await controls.start({
        y: "-18%",
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.55,
          ease: "easeInOut",
        },
      });
    }

    runOpenAnimation();

    return () => {
      cancelled = true;
    };
  }, [project, controls]);

  const requestClose = async () => {
    if (isClosing) return;

    setIsClosing(true);

    // Move upward while still in front.
    setInsertInFront(true);
    await nextFrame();

    await controls.start({
      y: "-92%",
      scale: 0.98,
      opacity: 1,
      transition: {
        duration: 0.45,
        ease: "easeInOut",
      },
    });

    // Abruptly send the notes back between the sleeve layers.
    setInsertInFront(false);
    await nextFrame();

    // Slide them down into the album slot, clipped so nothing pokes out.
    await controls.start({
      y: "58%",
      scale: 0.96,
      opacity: 1,
      transition: {
        duration: 0.48,
        ease: "easeInOut",
      },
    });

    onClose();
    setIsClosing(false);
  };

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            key="bd"
            className="fixed inset-0 z-50"
            style={{ background: "rgba(0,0,0,0.92)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={requestClose}
          />

          <motion.div
            key="wrap"
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ pointerEvents: "none", perspective: 1200 }}
          >
            <motion.div
              className="relative"
              style={{
                width: sleeveSize,
                height: sleeveSize,
                pointerEvents: "all",
              }}
              initial={{ opacity: 0, scale: 0.22, x: offsetX, y: offsetY }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.22, x: offsetX, y: offsetY }}
              transition={{
                type: "spring",
                stiffness: 310,
                damping: 28,
                mass: 0.65,
              }}
            >
              <div
                className="absolute inset-0 rounded-sm"
                style={{
                  boxShadow:
                    "0 36px 90px rgba(0,0,0,0.85), 0 8px 24px rgba(0,0,0,0.7)",
                }}
              />

              <div className="absolute inset-0 overflow-visible">
                {/* 
                  This slot clips the liner notes while they are between layers.
                  It prevents the card/text from poking out underneath the cover.
                */}
                <div
                  className="absolute inset-x-0 overflow-hidden"
                  style={{
                    top: "-78%",
                    height: "178%",
                    zIndex: insertInFront ? 30 : 10,
                    pointerEvents: insertInFront ? "auto" : "none",
                  }}
                >
                  <motion.div
                    className="absolute left-[4%] right-[4%] rounded-sm"
                    style={{
                      bottom: "3%",
                      height: "52%",
                      background:
                        "linear-gradient(180deg, #181514 0%, #11100F 100%)",
                      border: "1px solid rgba(201,136,42,0.26)",
                      boxShadow:
                        "0 18px 40px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.03) inset",
                      transformOrigin: "bottom center",

                      // Between-layers state: above back cover, below front flap.
                      // Front state: above all sleeve pieces.
                      zIndex: insertInFront ? 30 : 10,
                    }}
                    initial={false}
                    animate={controls}
                  >
                    <div
                      className="absolute -top-3 left-5 right-5 h-3 rounded-t-sm"
                      style={{
                        background:
                          "linear-gradient(180deg, #25211E 0%, #151312 100%)",
                        borderTop: "1px solid rgba(201,136,42,0.36)",
                        borderLeft: "1px solid rgba(201,136,42,0.16)",
                        borderRight: "1px solid rgba(201,136,42,0.16)",
                      }}
                    />

                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(110deg, rgba(255,255,255,0.05), transparent 28%, transparent 70%, rgba(201,136,42,0.04))",
                      }}
                    />

                    <button
                      onClick={requestClose}
                      aria-label="Close"
                      className="absolute top-3 right-4 text-stone-600 hover:text-white transition-colors z-20 text-lg"
                    >
                      ✕
                    </button>

                    <div className="h-full overflow-y-auto">
                      <div className="p-5 md:p-6 pb-8">
                        <div className="flex items-start gap-4 mb-4 pr-7">
                          <div
                            className="relative flex-shrink-0 rounded-sm overflow-hidden"
                            style={{
                              width: "clamp(48px,13vw,68px)",
                              height: "clamp(48px,13vw,68px)",
                              background: "#0A0A0A",
                              border: "1px solid rgba(201,136,42,0.22)",
                              boxShadow:
                                "0 3px 14px rgba(0,0,0,0.65), 0 0 0 1px rgba(201,136,42,0.08)",
                            }}
                          >
                            <CoverImage
                              project={project}
                              filterStyle="grayscale(30%) contrast(1.05) brightness(0.75) sepia(0.08)"
                            />
                            <div className="absolute bottom-0.5 right-1 pointer-events-none">
                              <span
                                className="font-mono font-black"
                                style={{
                                  fontSize: "0.48rem",
                                  color: "rgba(201,136,42,0.45)",
                                }}
                              >
                                {project.trackNum}
                              </span>
                            </div>
                          </div>

                          <div className="min-w-0 pt-0.5">
                            <h3
                              className="font-display font-black leading-tight text-drums-paper"
                              style={{
                                fontSize: "clamp(0.95rem,3vw,1.45rem)",
                              }}
                            >
                              {project.title}
                            </h3>

                            <p
                              className="font-mono text-xs tracking-widest uppercase mt-1"
                              style={{ color: "#C9882A" }}
                            >
                              {project.year}
                            </p>

                            <p
                              className="font-mono mt-0.5"
                              style={{
                                color: "rgba(201,136,42,0.38)",
                                fontSize: "0.58rem",
                                letterSpacing: "0.1em",
                              }}
                            >
                              {project.artist.toUpperCase()}
                            </p>
                          </div>
                        </div>

                        <div
                          className="h-px mb-4"
                          style={{ background: "rgba(201,136,42,0.1)" }}
                        />

                        {project.stat && (
                          <div
                            className="border-l-2 pl-3 mb-4"
                            style={{ borderColor: "#C9882A" }}
                          >
                            <p
                              className="font-display font-black text-2xl"
                              style={{ color: "#C9882A" }}
                            >
                              {project.stat.value}
                            </p>
                            <p className="font-body text-xs text-stone-500 mt-0.5">
                              {project.stat.label}
                            </p>
                          </div>
                        )}

                        <p className="font-body text-sm text-stone-400 leading-relaxed mb-4">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {project.tags.map((t) => (
                            <span
                              key={t}
                              className="font-mono text-xs px-2 py-0.5 rounded-sm bg-white/5 border border-white/10 text-stone-400"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <div
                          className="flex flex-wrap gap-2 pt-3 border-t"
                          style={{ borderColor: "rgba(255,255,255,0.06)" }}
                        >
                          {project.github && project.github !== "#" && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-xs px-3 py-2 border rounded-sm text-stone-400 hover:text-white transition-all duration-200"
                              style={{ borderColor: "rgba(255,255,255,0.12)" }}
                            >
                              GitHub ↗
                            </a>
                          )}

                          {project.live && (
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-xs px-3 py-2 border rounded-sm text-stone-400 hover:text-white transition-all duration-200"
                              style={{ borderColor: "rgba(255,255,255,0.12)" }}
                            >
                              Live ↗
                            </a>
                          )}

                          {project.paper && project.paper !== "#" && (
                            <a
                              href={project.paper}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-xs px-3 py-2 rounded-sm transition-all duration-200"
                              style={{
                                background: "rgba(201,136,42,0.12)",
                                border: "1px solid rgba(201,136,42,0.3)",
                                color: "#C9882A",
                              }}
                            >
                              Paper ↗
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Back/full album cover layer */}
                <div
                  className="absolute inset-0 rounded-sm overflow-hidden"
                  style={{
                    background: "#0A0A0A",
                    zIndex: 5,
                    transform: "translate(0, 0)",
                  }}
                >
                  <CoverImage
                    project={project}
                    filterStyle="grayscale(30%) contrast(1.05) brightness(0.65) sepia(0.08)"

                  />

                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.55))",
                    }}
                  />
                </div>

                {/* Front lower sleeve/flap layer */}
                <div
                  className="absolute inset-x-0 bottom-0 rounded-b-sm overflow-hidden"
                  style={{
                    height: "78%",
                    zIndex: 12,
                    background: "#0A0A0A",
                    boxShadow:
                      "0 -12px 28px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,136,42,0.13) inset",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      transform: "translateY(-22%)",
                      height: "128%",
                    }}
                  >
                    <CoverImage
                      project={project}
                      filterStyle="grayscale(30%) contrast(1.05) brightness(0.8) sepia(0.08)"
                    />
                  </div>

                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(10,10,10,0.12), rgba(10,10,10,0.55))",
                    }}
                  />

                  <div className="absolute top-4 left-4 pointer-events-none">
                    <span
                      className="font-mono font-black leading-none"
                      style={{
                        fontSize: "clamp(2rem,8vw,3.5rem)",
                        color: "rgba(201,136,42,0.13)",
                      }}
                    >
                      {project.trackNum}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 pointer-events-none">
                    <p
                      className="font-mono text-xs tracking-[0.2em] uppercase text-right"
                      style={{ color: "#FAF7F2", textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}

                    >
                      {project.artist}
                    </p>
                  </div>

                  <div
                    className="absolute top-0 inset-x-0 h-px"
                    style={{
                      background:
                        "linear-gradient(to right, transparent, rgba(201,136,42,0.85), transparent)",
                    }}
                  />
                </div>

                {/* Slot shadow/opening */}
                <div
                  className="absolute inset-x-0"
                  style={{
                    top: "21.5%",
                    height: 22,
                    zIndex: 15,
                    pointerEvents: "none",
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.75), rgba(0,0,0,0.22), transparent)",
                  }}
                />

                {/* Slot highlight/opening line */}
                <div
                  className="absolute inset-x-0"
                  style={{
                    top: "22%",
                    height: 1,
                    zIndex: 16,
                    background:
                      "linear-gradient(to right, transparent, rgba(201,136,42,0.65), transparent)",
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function AlbumCard({ project, delay = 0, onOpen }: {
  project: Project;
  delay?: number;
  onOpen: (p: Project, rect: DOMRect) => void;
}) {
  const { ref, isVisible } = useReveal({ delay });
  const [hovered, setHovered] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onOpen(project, e.currentTarget.getBoundingClientRect());
  };

  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <button 
        onClick={handleClick} 
        onMouseEnter={() => setHovered(true)} 
        onMouseLeave={() => setHovered(false)}
        className="w-full text-left group focus:outline-none cursor-pointer" 
        aria-label={`Open ${project.title} liner notes`}
      >
        <div className="relative aspect-square w-full overflow-hidden rounded-sm mb-3"
          style={{
            background: "#0A0A0A",
            boxShadow: hovered ? "0 12px 36px rgba(201,136,42,0.22), 0 4px 14px rgba(0,0,0,0.8)" : "0 4px 16px rgba(0,0,0,0.6)",
            transform: hovered ? "translateY(-6px)" : "translateY(0)",
            transition: "transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s ease",
          }}>
          
          {/* Cover Art with dynamic dimming on hover */}
          <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
            <CoverImage project={project}
              filterStyle={hovered ? "grayscale(10%) contrast(1.1) brightness(0.6)" : "grayscale(30%) contrast(1.05) brightness(0.88) sepia(0.08)"}
            />
          </div>

          {/* Dynamic Track Number Activation */}
          <div className="absolute top-3 left-3 pointer-events-none transition-all duration-300"
               style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}>
            <span className="font-mono text-4xl font-black leading-none transition-colors duration-300" 
                  style={{ color: hovered ? "#C9882A" : "rgba(201,136,42,0.12)" }}>
              {project.trackNum}
            </span>
          </div>

          {project.paper && (
            <div className="absolute top-3 right-3 pointer-events-none z-10">
              <span className="font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-sm"
                style={{ background: "rgba(201,136,42,0.15)", color: "#C9882A", border: "1px solid rgba(201,136,42,0.3)" }}>
                Paper
              </span>
            </div>
          )}

          {/* Artist Bottom Banner */}
          <div className="absolute inset-x-0 bottom-0 p-3 pointer-events-none z-10 transition-opacity duration-300 group-hover:opacity-40"
            style={{ background: "linear-gradient(to top, rgba(10,10,10,0.95) 0%, transparent 100%)" }}>
            <p className="font-mono tracking-widest uppercase"
              style={{ color: "#FAF7F2", fontSize: "0.6rem", textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}>
              {project.artist}
            </p>
          </div>

          {/* Core Affordance: Center "Pull Record" Plate */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className={`font-mono text-[9px] tracking-[0.25em] text-[#C9882A] bg-[#0A0A0A]/95 border border-[#C9882A]/40 px-3 py-2 rounded-sm uppercase shadow-2xl transition-all duration-300 scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100`}
                 style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.9)" }}>
              ▲ Click to See Details
            </div>
          </div>

          {/* Interactive Gold Border Frame */}
          <div className="absolute inset-0 rounded-sm pointer-events-none transition-opacity duration-300 z-20"
            style={{ border: "1px solid rgba(201,136,42,0.6)", opacity: hovered ? 1 : 0 }} />
        </div>

        {/* Title Details Section */}
        <div className="px-0.5">
          <p className="font-display font-black text-sm text-drums-paper leading-tight group-hover:text-[#C9882A] transition-colors duration-200 truncate">
            {project.title}
          </p>
          <p className="font-mono mt-0.5 truncate transition-colors duration-200 group-hover:text-stone-400" style={{ color: "rgba(201,136,42,0.6)", fontSize: "0.6rem", letterSpacing: "0.1em" }}>
            {project.year}
          </p>
        </div>
      </button>
    </div>
  );
}

// ── Label ─────────────────────────────────────────────────────────────────────

function Label({ text }: { text: string }) {
  const { ref, isVisible } = useReveal();
  return (
    <div ref={ref} className={`flex items-center gap-3 transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
      <div className="h-px w-8 flex-shrink-0" style={{ background: "#C9882A" }} />
      <span className="font-body text-xs tracking-[0.22em] uppercase" style={{ color: "#C9882A" }}>{text}</span>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function ProjectsSection() {
  const [active, setActive]       = useState<Project | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const headingRef = useReveal({ threshold: 0.05 });

  const handleOpen = (p: Project, rect: DOMRect) => {
    setOriginRect(rect);
    setActive(p);
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    setActive(null);
    setOriginRect(null);
    document.body.style.overflow = "";
  };

  return (
    <section id="projects" className="relative bg-drums-black overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ opacity:0.04, backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ background:"radial-gradient(ellipse 55% 28% at 50% 0%, rgba(201,136,42,0.09) 0%, transparent 70%)" }} />
      <div className="h-px w-full" style={{ background:"linear-gradient(to right, transparent, rgba(201,136,42,0.55), transparent)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div ref={headingRef.ref} className={`mb-16 md:mb-20 transition-all duration-700 ${headingRef.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <Label text="Projects" />
          <div className="mt-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 border-b pb-8"
            style={{ borderColor:"rgba(201,136,42,0.2)" }}>
            <div>
              <p className="font-mono text-xs tracking-[0.35em] uppercase mb-3" style={{ color:"rgba(201,136,42,0.5)" }}>
                Matias Bronner · BRN Records
              </p>
              <h2 className="font-display font-black leading-none tracking-tight"
                style={{ fontSize:"clamp(2.5rem,8vw,5.5rem)", color:"#F0EAE0" }}>
                Selected<br /><span style={{ color:"#C9882A", fontStyle:"italic" }}>Works.</span>
              </h2>
            </div>
            <div className="text-right sm:pb-1">
              <p className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color:"rgba(201,136,42,0.4)", fontSize:"0.6rem" }}>Catalog No.</p>
              <p className="font-display font-black text-2xl" style={{ color:"rgba(201,136,42,0.25)" }}>MB–2026</p>
              <p className="font-mono text-xs mt-2" style={{ color:"rgba(201,136,42,0.3)", fontSize:"0.6rem", letterSpacing:"0.15em" }}>BROWN UNIVERSITY · BOISE, IDAHO</p>
              <p className="font-mono text-xs" style={{ color:"rgba(201,136,42,0.3)", fontSize:"0.6rem", letterSpacing:"0.15em" }}>CLICK ANY COVER TO OPEN LINER NOTES</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
          {PROJECTS.map((p,i) => (
            <AlbumCard key={p.id} project={p} delay={Math.min(i*60,400)} onOpen={handleOpen} />
          ))}
        </div>

        <div className="flex items-center gap-4 mt-20 md:mt-28">
          <div className="h-px flex-1" style={{ background:"linear-gradient(to right, rgba(255,255,255,0.06), transparent)" }} />
          <span className="font-body text-xs tracking-[0.2em] uppercase" style={{ color:"rgba(255,255,255,0.2)" }}>next: skills</span>
        </div>
      </div>

      <div className="h-px w-full" style={{ background:"linear-gradient(to right, transparent, rgba(201,136,42,0.25), transparent)" }} />
      <RecordModal project={active} originRect={originRect} onClose={handleClose} />
    </section>
  );
}
