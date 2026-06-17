import { useState } from "react";
import { ChevronDown, ChevronUp, Link2, ArrowUpRight, ChevronLeft, Sun } from "lucide-react";

import deccanLogo from "../public/ai_deccan_logo.jpg";
import dhruvLogo from "../public/dhruv.jpeg";
import iiitaLogo from "../public/IIITA.png";
import iitpLogo from "../public/IITP.png";
import nspsLogo from "../public/NSPS.png";

const timelineData = [
  {
    id: "deccan-ai",
    type: "experience",
    company: "Deccan AI Experts",
    role: "Django Contributor",
    employmentType: "Contributor Program",
    location: "Remote",
    duration: "Jun 2026 - Present",
    logo: deccanLogo,
    technologies: ["Python", "Django", "Git"],
    bullets: [
      "Cleared Deccan AI's Django Assessment and was selected for the priority contributor pool.",
      "Onboarded to project workflows, collaboration channels, and task pipelines.",
      "Participating in AI and Django-related project activities and evaluations.",
      "Available for client-facing development projects based on expertise and availability."
    ]
  },

  {
    id: "code-with-dhruv",
    type: "experience",
    company: "Code With Dhruv",
    role: "Full Stack Developer Intern",
    employmentType: "Internship",
    location: "Remote",
    duration: "Jul 2025 - Oct 2025",
    logo: dhruvLogo,
    technologies: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS"
    ],
    bullets: [
      "Built features for a Next.js and Supabase admin platform including paginated tables and advanced filtering.",
      "Implemented CSV export functionality and optimized API routes with server-side pagination.",
      "Developed reusable UI components with dark mode support and robust media validation.",
      "Delivered a complete Promotion Management workflow with CRUD APIs and automated updates."
    ]
  },

  {
    id: "iiit-agartala",
    type: "experience",
    company: "IIIT Agartala",
    role: "Research Intern",
    employmentType: "Research Internship",
    location: "Tripura, India",
    duration: "May 2025 - Sep 2025",
    logo: iiitaLogo,
    technologies: [
      "Python",
      "Machine Learning",
      "GWO",
      "ELM",
      "Decision Tree",
      "Random Forest"
    ],
    bullets: [
      "Conducted research on Brain Tumor Detection under Dr. Parijata Majumdar.",
      "Integrated Grey Wolf Optimizer (GWO) with Extreme Learning Machine (ELM) for feature selection and classification.",
      "Evaluated Decision Tree and Random Forest models for performance optimization.",
      "Contributed toward a potential SCI/IEEE research publication."
    ]
  },

  {
    id: "capstone",
    type: "experience",
    company: "Indian Institute of Technology Patna",
    role: "Capstone Project Leader",
    employmentType: "Academic Project",
    location: "Patna, India",
    duration: "Mar 2024 - Jun 2024",
    logo: iitpLogo,
    technologies: [
      "Leadership",
      "Project Management",
      "Team Collaboration"
    ],
    bullets: [
      "Led a team of 5 students to successfully deliver a capstone project.",
      "Managed project planning, task allocation, and team coordination.",
      "Presented the final solution before faculty from IIT Patna and IIIT Allahabad.",
      "Demonstrated innovation and problem-solving through project execution."
    ]
  },

  {
    id: "iit-patna",
    type: "education",
    company: "Indian Institute of Technology Patna",
    role: "B.Sc. Computer Science & Data Analytics",
    location: "Patna, India",
    duration: "2023 - 2027",
    logo: iitpLogo,
    technologies: ["Computer Science", "Data Analytics"],
    bullets: [
      "Current CPI: 8.68"
    ]
  },

  {
    id: "nsps",
    type: "education",
    company: "Netaji Subhash Public School",
    role: "Senior Secondary (PCM)",
    location: "Jamshedpur, India",
    duration: "2020 - 2022",
    logo: nspsLogo,
    technologies: ["Physics", "Chemistry", "Mathematics"],
    bullets: [
      "Graduated with 91% marks."
    ]
  }
];

function playExpandSound() {
  const AudioContextClass =
    window.AudioContext ||
    (window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  const audioContext = AudioContextClass ? new AudioContextClass() : null;

  if (!audioContext) return;

  if (audioContext.state === "suspended") {
    void audioContext.resume();
  }

  const now = audioContext.currentTime;

  // Master Gain - Louder
  const masterGain = audioContext.createGain();
  masterGain.gain.setValueAtTime(0.85, now);
  masterGain.connect(audioContext.destination);

  // Crisp high pitch click (tactile bounce)
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(1600, now);
  osc.frequency.exponentialRampToValueAtTime(400, now + 0.015);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.38, now + 0.001);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);

  osc.connect(gain);
  gain.connect(masterGain);

  // Transient highpass noise spike for mechanical "snap"
  const bufferSize = Math.floor(audioContext.sampleRate * 0.006);
  const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
  const noiseData = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i += 1) {
    noiseData[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }

  const noiseSource = audioContext.createBufferSource();
  const noiseGain = audioContext.createGain();
  const noiseFilter = audioContext.createBiquadFilter();

  noiseSource.buffer = noiseBuffer;
  noiseFilter.type = "highpass";
  noiseFilter.frequency.setValueAtTime(4500, now);

  noiseGain.gain.setValueAtTime(0.0001, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.22, now + 0.001);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.006);

  noiseSource.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(masterGain);

  osc.start(now);
  osc.stop(now + 0.02);
  noiseSource.start(now);
  noiseSource.stop(now + 0.008);
}

function playCopySound() {
  const AudioContextClass =
    window.AudioContext ||
    (window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  const audioContext = AudioContextClass ? new AudioContextClass() : null;

  if (!audioContext) return;

  if (audioContext.state === "suspended") {
    void audioContext.resume();
  }

  const now = audioContext.currentTime;

  const clickOscillator = audioContext.createOscillator();
  const clickGain = audioContext.createGain();
  const clickFilter = audioContext.createBiquadFilter();

  clickOscillator.type = "square";
  clickOscillator.frequency.setValueAtTime(2400, now);
  clickOscillator.frequency.exponentialRampToValueAtTime(1400, now + 0.012);

  clickFilter.type = "highpass";
  clickFilter.frequency.setValueAtTime(1800, now);

  clickGain.gain.setValueAtTime(0.0001, now);
  clickGain.gain.exponentialRampToValueAtTime(0.14, now + 0.002);
  clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.022);

  clickOscillator.connect(clickFilter);
  clickFilter.connect(clickGain);
  clickGain.connect(audioContext.destination);

  const bufferSize = Math.floor(audioContext.sampleRate * 0.015);
  const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
  const noiseData = noiseBuffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i += 1) {
    noiseData[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }

  const noiseSource = audioContext.createBufferSource();
  const noiseGain = audioContext.createGain();
  const noiseFilter = audioContext.createBiquadFilter();

  noiseSource.buffer = noiseBuffer;
  noiseFilter.type = "highpass";
  noiseFilter.frequency.setValueAtTime(2500, now);
  noiseGain.gain.setValueAtTime(0.0001, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.08, now + 0.001);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);

  noiseSource.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(audioContext.destination);

  clickOscillator.start(now);
  clickOscillator.stop(now + 0.025);
  noiseSource.start(now);
  noiseSource.stop(now + 0.018);
}

type TimelineItem = (typeof timelineData)[number];

type ExperienceItemProps = {
  item: TimelineItem;
  isOpen: boolean;
  onToggle: () => void;
};

function ExperienceItem({ item, isOpen, onToggle }: ExperienceItemProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_4px_12px_rgba(24,24,27,0.02)] transition-all duration-200 hover:border-zinc-300 hover:shadow-[0_8px_24px_rgba(24,24,27,0.04)]">
      <button
        type="button"
        onClick={onToggle}
        className="block w-full text-left focus:outline-hidden"
        aria-expanded={isOpen}
      >
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 w-full">
          {/* Company/School Logo Box */}
          <div className="h-14 w-14 rounded-2xl border border-zinc-200 bg-white flex items-center justify-center p-1.5 shrink-0 shadow-xs">
            <img
              src={item.logo}
              alt={`${item.company} logo`}
              className="h-full w-full object-contain rounded-xl"
            />
          </div>

          {/* Details Column */}
          <div className="flex-1 min-w-0 w-full flex flex-col sm:flex-row justify-between items-start gap-2">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-[1.12rem] font-bold leading-tight tracking-tight text-zinc-950 truncate">
                  {item.company}
                </h3>
                <span className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-[0.72rem] font-semibold text-zinc-500 uppercase tracking-wider">
                  {item.type === "education" ? "Education" : item.employmentType}
                </span>
              </div>
              <p className="mt-1 text-[0.92rem] font-medium text-zinc-500">
                {item.role}
              </p>
            </div>

            {/* Right Side Info: Date & Location */}
            <div className="flex flex-col items-start sm:items-end text-left sm:text-right shrink-0">
              <span className="text-[0.88rem] font-semibold text-zinc-800">
                {item.duration}
              </span>
              <span className="text-[0.82rem] text-zinc-500 font-medium mt-0.5">
                {item.location}
              </span>
            </div>
          </div>
        </div>

        {/* Arrow/Chevron Indicator */}
        <div className="flex justify-end mt-2 sm:-mt-1 text-zinc-400">
          {isOpen ? (
            <ChevronUp className="h-5 w-5 hover:text-zinc-600 transition-colors" />
          ) : (
            <ChevronDown className="h-5 w-5 hover:text-zinc-600 transition-colors" />
          )}
        </div>
      </button>

      {/* Expanded Details Section */}
      {isOpen && (
        <div className="mt-4 pt-4 border-t border-zinc-100 space-y-4">
          {/* Bullets List */}
          <ul className="space-y-3">
            {item.bullets.map((bullet, idx) => (
              <li key={idx} className="flex gap-3 text-[0.92rem] leading-6 text-zinc-600">
                <span className="mt-[0.62rem] h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
                <span className="font-sans text-zinc-700 tracking-tight">{bullet}</span>
              </li>
            ))}
          </ul>

          {/* Technologies Tag Badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            {item.technologies.map(tech => (
              <span
                key={tech}
                className="inline-flex items-center rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1 text-[0.78rem] font-semibold text-zinc-700 hover:border-zinc-300 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const INITIAL_VISIBLE = 3;

type ExperienceProps = {
  isFullPage?: boolean;
};

export function Experience({ isFullPage = false }: ExperienceProps) {
  const [copied, setCopied] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);

  const visibleTimeline = isFullPage ? timelineData : (showAll ? timelineData : timelineData.slice(0, INITIAL_VISIBLE));
  const hasHiddenItems = !isFullPage && timelineData.length > INITIAL_VISIBLE;

  const copySectionLink = async () => {
    const shareUrl = `${window.location.origin}/#experience`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // Ignore clipboard failures in unsupported contexts.
    }

    playCopySound();
  };

  const handleToggle = (index: number) => {
    setExpandedIndex(current => {
      const isExpanding = current !== index;
      if (isExpanding) {
        playExpandSound();
      }
      return current === index ? null : index;
    });
  };

  return (
    <section className={`relative w-full overflow-hidden bg-white text-zinc-900 ${isFullPage ? "pb-10" : "border-y border-zinc-200 px-8 py-3"}`}>
      {/* Decorative Grid Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-size-[100%_100%,100%_100%] opacity-40" />

      {/* Standalone Full-Page Header */}
      {isFullPage && (
        <div className="relative border-b border-zinc-200 bg-white px-8 py-3 flex justify-between items-center text-zinc-900 mb-6">
          <div className="flex items-center gap-4">
            <a
              href="#/"
              className="h-8 w-8 rounded-lg bg-zinc-950 flex items-center justify-center hover:bg-zinc-800 transition-all cursor-pointer text-white hover:scale-[1.05]"
              aria-label="Back to home"
            >
              <ChevronLeft className="h-5 w-5" />
            </a>
            <h2 className="text-[1.35rem] font-bold text-zinc-950 leading-none">
              All Experiences
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="px-3 py-1.5 text-[0.8rem] font-semibold text-white bg-zinc-950 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer flex items-center justify-center tracking-wide"
            >
              ⌘ K
            </button>
            <button
              type="button"
              className="h-8 w-8 rounded-lg bg-zinc-950 flex items-center justify-center hover:bg-zinc-800 transition-colors cursor-pointer text-white"
              aria-label="Toggle theme"
            >
              <Sun className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Home Page Header */}
      {!isFullPage && (
        <div className="relative border-y border-zinc-200 py-1 mb-6">
          <button
            id="experience"
            type="button"
            onClick={copySectionLink}
            className="group inline-flex items-center gap-3 text-left focus:outline-hidden"
            aria-label="Copy experience section link"
          >
            <h2 className="text-[2.5rem] font-semibold leading-none tracking-tight text-zinc-950">
              Experience{" "}
              <span className="text-zinc-400 text-[1.7rem]">({timelineData.length})</span>
            </h2>
            <Link2 className="h-5 w-5 text-zinc-500 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:text-zinc-800" />
            <span className="text-[0.7rem] font-medium uppercase tracking-[0.24em] text-zinc-400 transition-opacity duration-200 group-hover:text-zinc-500">
              {copied ? "Copied" : " "}
            </span>
          </button>
        </div>
      )}

      {/* Timeline Cards Container */}
      <div className={`relative w-full space-y-4 ${isFullPage ? "px-8" : ""}`}>
        {visibleTimeline.map((item, index) => (
          <ExperienceItem
            key={item.id}
            item={item}
            isOpen={expandedIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>

      {/* View All Button styled to match mockup */}
      {hasHiddenItems && !showAll ? (
        <div className="relative mt-8 flex justify-center pb-4">
          <a
            href="#/experience-all"
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 px-6 py-2.5 text-[0.88rem] font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm cursor-pointer"
          >
            View All
            <ArrowUpRight className="h-4 w-4 text-white" />
          </a>
        </div>
      ) : null}
    </section>
  );
}