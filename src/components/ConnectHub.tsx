import { useState, useEffect } from "react";
import type { ReactElement, SVGProps } from "react";
import { motion } from "framer-motion";
import {
     BadgeCheck,
     Clock3,
     Code2,
     Globe2,
     Mail,
     MapPin,
     Phone,
     FileText,
     ArrowUpRight,
     Copy,
     Check,
     Link2,
} from "lucide-react";
import { playClickSound } from "../lib/utils";

// ─── Brand SVG Icons ────────────────────────────────────────────

const GithubIcon = (props: SVGProps<SVGSVGElement>) => (
     <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
     </svg>
);

const LinkedinIcon = (props: SVGProps<SVGSVGElement>) => (
     <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
     </svg>
);

const LeetcodeIcon = (props: SVGProps<SVGSVGElement>) => (
     <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path d="M16.102 17.93l-2.697 2.607c-.466.451-1.211.451-1.677 0L6.752 15.658c-.466-.451-.466-1.173 0-1.624L11.728 9.07c.466-.45 1.211-.45 1.677 0l2.697 2.606c.466.451.466 1.174 0 1.625l-2.697 2.607a1.144 1.144 0 0 1-1.677 0 1.21 1.21 0 0 1 0-1.625l1.86-1.796-1.01-.976-1.86 1.796c-.932.901-.932 2.347 0 3.248.932.901 2.422.901 3.354 0l1.86-1.797 1.01.977-1.86 1.797zM22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" />
     </svg>
);

const CodechefIcon = (props: SVGProps<SVGSVGElement>) => (
     <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path d="M21 10.5c0-1.38-1.12-2.5-2.5-2.5h-13C4.12 8 3 9.12 3 10.5c0 1.2.85 2.19 2 2.42v5.58c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-5.58c1.15-.23 2-1.22 2-2.42zm-4 7.5H7v-5h10v5zM12 2C8.69 2 6 4.69 6 8h12c0-3.31-2.69-6-6-6z" />
     </svg>
);

const CodeforcesIcon = (props: SVGProps<SVGSVGElement>) => <Code2 {...props} />;

// ─── Data ───────────────────────────────────────────────────────

const details = {
     currentStatus: "Django Developer at Deccan Ai",
     location: "Jamshedpur, India",
     email: "abhishekmohanty7325@gmail.com",
     phone: "+91 9304659521",
     timezone: "GMT+5:30",
     platform: "https://abhiitp.tech/",
     pronoun: "He/Him",
};

const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(details.location)}`;

type Profile = {
     name: string;
     username: string;
     href: string;
     Icon: (props: SVGProps<SVGSVGElement>) => ReactElement;
};

const profiles: Profile[] = [
     { name: "GitHub", username: "Abhishek-IITP", href: "https://github.com/Abhishek-IITP", Icon: GithubIcon },
     { name: "LinkedIn", username: "abhishekiitp891", href: "https://www.linkedin.com/in/abhishekiitp891/", Icon: LinkedinIcon },
     { name: "LeetCode", username: "Abhishek-IITP", href: "https://leetcode.com/u/Abhishek-IITP/", Icon: LeetcodeIcon },
     { name: "Codeforces", username: "abhishekmohanty7325", href: "https://codeforces.com/profile/abhishekmohanty7325", Icon: CodeforcesIcon },
     { name: "CodeChef", username: "abhishek_iitp1", href: "https://www.codechef.com/users/abhishek_iitp1", Icon: CodechefIcon },
];

const resumeHref = "/Abhires.pdf";

// ─── Animations ─────────────────────────────────────────────────

const stagger = {
     hidden: {},
     show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const cardReveal = {
     hidden: { opacity: 0, y: 20, scale: 0.97 },
     show: {
          opacity: 1, y: 0, scale: 1,
          transition: { type: "spring" as const, stiffness: 280, damping: 24 },
     },
};

// ─── Live Clock ─────────────────────────────────────────────────

function useLiveClock() {
     const [time, setTime] = useState(() => {
          const now = new Date();
          const utc = now.getTime() + now.getTimezoneOffset() * 60000;
          return new Date(utc + 5.5 * 3600000);
     });

     useEffect(() => {
          const id = setInterval(() => {
               const now = new Date();
               const utc = now.getTime() + now.getTimezoneOffset() * 60000;
               setTime(new Date(utc + 5.5 * 3600000));
          }, 1000);
          return () => clearInterval(id);
     }, []);

     return time;
}

// ─── Audio Helper ────────────────────────────────────────────────

function playCopySound() {
     playClickSound();
}

// ─── Copy button ────────────────────────────────────────────────

function CopyBtn({ text, className = "" }: { text: string; className?: string }) {
     const [copied, setCopied] = useState(false);
     const go = async () => {
          try {
               await navigator.clipboard.writeText(text);
               setCopied(true);
               setTimeout(() => setCopied(false), 1400);
          } catch {}
          playCopySound();
     };
     return (
          <button onClick={go} className={`p-1.5 rounded-lg transition-all duration-200 cursor-pointer ${copied ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30" : "text-zinc-300 dark:text-zinc-700 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"} ${className}`} aria-label={`Copy ${text}`}>
               {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
     );
}

// ─── Section heading ────────────────────────────────────────────

function SectionHeading() {
     const [copied, setCopied] = useState(false);
     const go = async () => {
          try {
               await navigator.clipboard.writeText(`${window.location.origin}/#connect`);
               setCopied(true);
               setTimeout(() => setCopied(false), 1200);
          } catch {}
          playCopySound();
     };
     return (
          <div className="relative border-y border-zinc-200 dark:border-zinc-800 py-1.5 mb-8">
               <button id="connect" type="button" onClick={go} className="group inline-flex items-center gap-3 text-left cursor-pointer" aria-label="Copy connect section link">
                    <h2 className="text-[2.5rem] font-semibold leading-none tracking-tight text-zinc-950 dark:text-zinc-50">Connect</h2>
                    <Link2 className="h-5 w-5 text-zinc-400 dark:text-zinc-600 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:text-zinc-700 dark:group-hover:text-zinc-300" />
                    <span className="text-[0.7rem] font-medium uppercase tracking-[0.24em] text-zinc-400 dark:text-zinc-500">{copied ? "Copied" : "\u00A0"}</span>
               </button>
          </div>
     );
}

// ─── Shared card styles ─────────────────────────────────────────

const cardBase = "rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]";

// ─── Component ──────────────────────────────────────────────────

export function ConnectHub() {
     const clock = useLiveClock();
     const h = clock.getHours();
     const m = clock.getMinutes().toString().padStart(2, "0");
     const s = clock.getSeconds().toString().padStart(2, "0");
     const ampm = h >= 12 ? "PM" : "AM";
     const h12 = h % 12 || 12;

     return (
          <section className="relative overflow-hidden border-y border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-8 sm:px-10 py-6 text-zinc-900 dark:text-zinc-100">
               {/* Grid background */}
               <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.025)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-size-[40px_40px]" />

               <div className="relative">
                    <SectionHeading />

                    <motion.div
                         initial="hidden"
                         whileInView="show"
                         viewport={{ once: true, amount: 0.15 }}
                         variants={stagger}
                         className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-3"
                    >
                         {/* ═══ ROW 1 ═══ */}

                         {/* STATUS — Hero card — always dark bg for contrast */}
                         <motion.div
                              variants={cardReveal}
                              className="col-span-4 sm:col-span-8 lg:col-span-5 relative rounded-2xl bg-zinc-950 dark:bg-zinc-900 p-6 overflow-hidden group transition-all duration-300 border border-zinc-900 dark:border-zinc-700/50 hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
                         >
                              {/* Noise texture overlay */}
                              <div className="connect-noise pointer-events-none absolute inset-0 opacity-[0.035]" />

                              <div className="relative flex items-start justify-between gap-4">
                                   <div className="flex items-start gap-4">
                                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/[0.07] border border-white/8">
                                             <BadgeCheck className="h-6 w-6 text-zinc-200" />
                                        </span>
                                        <div>
                                             <p className="text-[0.56rem] font-bold uppercase tracking-[0.3em] text-zinc-500">
                                                  Current Status
                                             </p>
                                             <p className="text-[1.15rem] font-bold text-white mt-1 leading-snug">
                                                  {details.currentStatus}
                                             </p>
                                             <p className="text-[0.72rem] text-zinc-500 mt-1.5 font-medium">
                                                  {details.pronoun} · {details.location}
                                             </p>
                                        </div>
                                   </div>

                                   <span className="relative flex items-center gap-1.5 rounded-full bg-white/6 border border-white/8 px-3 py-1.5 shrink-0">
                                        <span className="relative flex h-2 w-2">
                                             <span className="animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-50" />
                                             <span className="relative rounded-full h-2 w-2 bg-emerald-400" />
                                        </span>
                                        <span className="text-[0.58rem] font-bold uppercase tracking-wider text-zinc-400">Active</span>
                                   </span>
                              </div>
                         </motion.div>

                         {/* LOCATION */}
                         <motion.a
                              variants={cardReveal}
                              href={googleMapsUrl}
                              target="_blank"
                              rel="noreferrer"
                              className={`col-span-2 sm:col-span-4 lg:col-span-4 ${cardBase} p-5 flex flex-col justify-between group min-h-32`}
                         >
                              <div className="flex items-center justify-between mb-auto">
                                   <MapPin className="h-5 w-5 text-zinc-400 dark:text-zinc-600" />
                                   <ArrowUpRight className="h-3.5 w-3.5 text-zinc-300 dark:text-zinc-700 transition-all duration-200 group-hover:text-zinc-500 dark:group-hover:text-zinc-400 group-hover:translate-x-px group-hover:-translate-y-px" />
                              </div>
                              <div>
                                   <p className="text-[0.55rem] font-bold uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600">Location</p>
                                   <p className="text-[1.05rem] font-bold text-zinc-950 dark:text-zinc-50 mt-1 leading-snug">{details.location}</p>
                              </div>
                         </motion.a>

                         {/* LIVE CLOCK */}
                         <motion.div
                              variants={cardReveal}
                              className={`col-span-2 sm:col-span-4 lg:col-span-3 ${cardBase} p-5 flex flex-col justify-between min-h-32`}
                         >
                              <div className="flex items-center justify-between mb-auto">
                                   <Clock3 className="h-5 w-5 text-zinc-400 dark:text-zinc-600" />
                                   <span className="text-[0.55rem] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600 font-mono">
                                        {details.timezone}
                                   </span>
                              </div>
                              <div>
                                   <p className="text-[0.55rem] font-bold uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600">Local Time</p>
                                   <div className="flex items-baseline gap-0 mt-1">
                                        <span className="font-mono text-[1.65rem] font-bold text-zinc-950 dark:text-zinc-50 leading-none tracking-tighter tabular-nums">
                                             {h12}:{m}
                                        </span>
                                        <span className="font-mono text-[1.2rem] font-bold text-zinc-300 dark:text-zinc-700 leading-none tracking-tighter tabular-nums">
                                             :{s}
                                        </span>
                                        <span className="text-[0.6rem] font-bold text-zinc-400 dark:text-zinc-600 ml-1.5 tracking-wider self-end mb-0.5">{ampm}</span>
                                   </div>
                              </div>
                         </motion.div>

                         {/* ═══ ROW 2 ═══ */}

                         {/* EMAIL */}
                         <motion.div
                              variants={cardReveal}
                              className={`col-span-4 sm:col-span-8 lg:col-span-5 ${cardBase} p-5 group`}
                         >
                              <div className="flex items-center justify-between gap-3">
                                   <div className="flex items-center gap-3.5 min-w-0">
                                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 transition-colors duration-200 group-hover:border-zinc-300 dark:group-hover:border-zinc-700">
                                             <Mail className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                                        </span>
                                        <div className="min-w-0">
                                             <p className="text-[0.55rem] font-bold uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600">Email</p>
                                             <a
                                                  href={`mailto:${details.email}`}
                                                  className="block text-[0.88rem] font-semibold text-zinc-950 dark:text-zinc-50 truncate mt-0.5 hover:underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700"
                                             >
                                                  {details.email}
                                             </a>
                                        </div>
                                   </div>
                                   <CopyBtn text={details.email} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                         </motion.div>

                         {/* PHONE */}
                         <motion.div
                              variants={cardReveal}
                              className={`col-span-2 sm:col-span-4 lg:col-span-4 ${cardBase} p-5 group`}
                         >
                              <div className="flex items-center justify-between gap-3">
                                   <div className="flex items-center gap-3.5 min-w-0">
                                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 transition-colors duration-200 group-hover:border-zinc-300 dark:group-hover:border-zinc-700">
                                             <Phone className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                                        </span>
                                        <div className="min-w-0">
                                             <p className="text-[0.55rem] font-bold uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600">Phone</p>
                                             <a href={`tel:${details.phone.replace(/\s+/g, "")}`} className="block text-[0.88rem] font-semibold text-zinc-950 dark:text-zinc-50 mt-0.5 font-mono tracking-tight hover:underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700">
                                                  {details.phone}
                                             </a>
                                        </div>
                                   </div>
                                   <CopyBtn text={details.phone} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                         </motion.div>

                         {/* WEBSITE */}
                         <motion.a
                              variants={cardReveal}
                              href={details.platform}
                              target="_blank"
                              rel="noreferrer"
                              className={`col-span-2 sm:col-span-4 lg:col-span-3 ${cardBase} p-5 flex items-center justify-between gap-3 group`}
                         >
                              <div className="flex items-center gap-3 min-w-0">
                                   <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 transition-colors duration-200 group-hover:border-zinc-300 dark:group-hover:border-zinc-700">
                                        <Globe2 className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                                   </span>
                                   <div className="min-w-0">
                                        <p className="text-[0.55rem] font-bold uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600">Website</p>
                                        <p className="text-[0.88rem] font-semibold text-zinc-950 dark:text-zinc-50 mt-0.5 truncate">abhiitp.tech</p>
                                   </div>
                              </div>
                              <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-300 dark:text-zinc-700 transition-all duration-200 group-hover:text-zinc-500 dark:group-hover:text-zinc-400 group-hover:translate-x-px group-hover:-translate-y-px" />
                         </motion.a>

                         {/* ═══ ROW 3 — Profiles + Resume ═══ */}
                         <motion.div
                              variants={cardReveal}
                              className={`col-span-4 sm:col-span-8 lg:col-span-12 ${cardBase} px-4 py-3.5`}
                         >
                              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                                   {/* Profile links */}
                                   <div className="flex items-center gap-1.5 flex-wrap">
                                        {profiles.map(({ name, href, Icon, username }) => (
                                             <a
                                                  key={name}
                                                  href={href}
                                                  target="_blank"
                                                  rel="noreferrer"
                                                  title={`${name} — ${username}`}
                                                  className="group/link flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-800/30 pl-2 pr-2.5 py-1.5 transition-all duration-200 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 hover:scale-[1.02] active:scale-[0.98]"
                                             >
                                                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-colors duration-200 group-hover/link:border-zinc-300 dark:group-hover/link:border-zinc-700">
                                                       <Icon className="h-3.5 w-3.5 text-zinc-700 dark:text-zinc-300 transition-colors duration-200 group-hover/link:text-zinc-950 dark:group-hover/link:text-zinc-50" />
                                                  </span>
                                                  <div className="min-w-0 hidden sm:block">
                                                       <p className="text-[0.72rem] font-semibold text-zinc-800 dark:text-zinc-200 leading-tight">{name}</p>
                                                       <p className="text-[0.55rem] font-medium text-zinc-400 dark:text-zinc-600 truncate leading-tight">{username}</p>
                                                  </div>
                                                  <ArrowUpRight className="h-3 w-3 shrink-0 text-zinc-300 dark:text-zinc-700 transition-all duration-200 group-hover/link:text-zinc-500 dark:group-hover/link:text-zinc-400 group-hover/link:translate-x-px group-hover/link:-translate-y-px" />
                                             </a>
                                        ))}
                                   </div>

                                   {/* Resume CTA */}
                                   <a
                                        href={resumeHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group/resume inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-2.5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shrink-0 hover:bg-zinc-50 shadow-sm"
                                   >
                                        <FileText className="h-4 w-4 text-zinc-700" />
                                        <span className="text-[0.78rem] font-bold tracking-wide text-zinc-800">Resume</span>
                                        <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500 transition-transform duration-200 group-hover/resume:translate-x-px group-hover/resume:-translate-y-px" />
                                   </a>
                              </div>
                         </motion.div>

                    </motion.div>
               </div>
          </section>
     );
}
