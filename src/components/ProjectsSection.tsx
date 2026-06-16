import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Link2 } from "lucide-react";
import blogSphereImage from "../public/BlogSphere.png";
import pingMeImage from "../public/PingMe.png";
import oceanImage from "../public/ocean.png";
import mediScanImage from "../public/mediScan.png";

type Project = {
     title: string;
     dateRange: string;
     summary: string;
     features: string[];
     techStack: string[];
     liveUrl: string;
     githubUrl: string;
     image: string;
};

const projects: Project[] = [
     {
          title: "BlogSphere",
          dateRange: "04.2025 – 04-2025",
          summary:
               "Full-featured blogging platform with OAuth, a rich editor, and social engagement built for scalable publishing.",
          features: [
               "Google OAuth and JWT auth with email verification and Cloudinary-backed user profiles",
               "EditorJS-powered blog editor with media uploads and a responsive reading experience",
               "Likes, comments, and follower system for community-driven content discovery",
               "MVC-structured Express backend with a Redux-powered React frontend",
          ],
          techStack: ["Node.js", "Express.js", "MongoDB", "React", "Firebase", "Redux"],
          liveUrl: "https://blog-sphere-zx96.vercel.app/",
          githubUrl: "https://github.com/Abhishek-IITP/BlogSphere",
          image: blogSphereImage,
     },
     {
          title: "PingMe",
          dateRange: "05.2025 – 05.2025",
          summary:
               "Production-grade real-time social app with messaging, video calls, and a polished multi-theme UI.",
          features: [
               "Real-time chat and WebRTC video calling with a friend request system",
               "Secure JWT authentication, protected routes, and a smooth onboarding flow",
               "32 customizable themes with responsive layouts across devices",
               "Optimized API layer with TanStack Query for reliable real-time sync",
          ],
          techStack: ["Node.js", "Express.js", "MongoDB", "React", "TanStack Query", "Socket.io"],
          liveUrl: "https://pingme-1-r94w.onrender.com/",
          githubUrl: "https://github.com/Abhishek-IITP/PingMe",
          image: pingMeImage,
     },
     {
          title: "Ocean",
          dateRange: "06.2025 – 07.2025",
          summary:
               "Full-stack scheduling platform with calendar sync, OAuth sign-in, and dynamic booking workflows.",
          features: [
               "Real-time calendar and meeting management powered by the Nylas API",
               "Google and GitHub OAuth via NextAuth with a Supabase Postgres backend",
               "Dynamic booking forms with live availability checks and Zod + Conform validation",
               "Responsive landing page and dashboard UI using Tailwind CSS and shadcn/ui",
          ],
          techStack: ["Next.js", "Nylas", "Tailwind CSS", "Prisma", "Supabase", "Auth.js", "Zod", "Vercel"],
          liveUrl: "https://github.com/Abhishek-IITP/ocean",
          githubUrl: "https://github.com/Abhishek-IITP/ocean",
          image: oceanImage,
     },
     {
          title: "Medical Report Analyzer",
          dateRange: "06.2025 – 06.2025",
          summary:
               "AI-powered tool that reads medical PDFs and generates structured diagnostic summaries for quick review.",
          features: [
               "PDF upload and parsing pipeline using LLAMA through the Groq API",
               "LangChain workflow for turning unstructured reports into readable summaries",
               "Responsive UI focused on fast report upload, review, and interaction",
               "Lightweight Flask backend with EJS templates for simple deployment",
          ],
          techStack: ["Flask", "EJS", "LangChain", "Groq", "GenAI"],
          liveUrl: "https://github.com/Abhishek-IITP/Medical-Report-Analyzer",
          githubUrl: "https://github.com/Abhishek-IITP/Medical-Report-Analyzer",
          image: mediScanImage,
     },
];

const INITIAL_VISIBLE = 3;

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

function playPageTurnSound() {
     const AudioContextClass =
          window.AudioContext ||
          (window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
     const audioContext = AudioContextClass ? new AudioContextClass() : null;

     if (!audioContext) return;

     if (audioContext.state === "suspended") {
          void audioContext.resume();
     }

     const now = audioContext.currentTime;
     const masterGain = audioContext.createGain();
     masterGain.gain.setValueAtTime(0.72, now);
     masterGain.connect(audioContext.destination);

     const connectLayer = (gainNode: GainNode) => {
          gainNode.connect(masterGain);
     };

     // Soft airy sweep — clean premium whoosh.
     const sweepDuration = 0.32;
     const sweepBufferSize = Math.floor(audioContext.sampleRate * sweepDuration);
     const sweepBuffer = audioContext.createBuffer(1, sweepBufferSize, audioContext.sampleRate);
     const sweepData = sweepBuffer.getChannelData(0);

     for (let i = 0; i < sweepBufferSize; i += 1) {
          const progress = i / sweepBufferSize;
          const envelope = Math.pow(1 - progress, 2.2);
          sweepData[i] = (Math.random() * 2 - 1) * envelope * 0.42;
     }

     const sweepSource = audioContext.createBufferSource();
     sweepSource.buffer = sweepBuffer;

     const sweepFilter = audioContext.createBiquadFilter();
     sweepFilter.type = "lowpass";
     sweepFilter.frequency.setValueAtTime(5200, now);
     sweepFilter.frequency.exponentialRampToValueAtTime(980, now + sweepDuration);
     sweepFilter.Q.setValueAtTime(0.55, now);

     const sweepGain = audioContext.createGain();
     sweepGain.gain.setValueAtTime(0.0001, now);
     sweepGain.gain.exponentialRampToValueAtTime(0.09, now + 0.018);
     sweepGain.gain.exponentialRampToValueAtTime(0.0001, now + sweepDuration);

     sweepSource.connect(sweepFilter);
     sweepFilter.connect(sweepGain);
     connectLayer(sweepGain);

     // Warm tonal lift — subtle depth on expand.
     const bodyOscillator = audioContext.createOscillator();
     bodyOscillator.type = "sine";
     bodyOscillator.frequency.setValueAtTime(220, now);
     bodyOscillator.frequency.exponentialRampToValueAtTime(360, now + 0.09);
     bodyOscillator.frequency.exponentialRampToValueAtTime(260, now + 0.24);

     const bodyGain = audioContext.createGain();
     bodyGain.gain.setValueAtTime(0.0001, now);
     bodyGain.gain.exponentialRampToValueAtTime(0.045, now + 0.025);
     bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

     bodyOscillator.connect(bodyGain);
     connectLayer(bodyGain);

     // Glass accent — short high shimmer for a luxe finish.
     const shimmerOscillator = audioContext.createOscillator();
     shimmerOscillator.type = "sine";
     shimmerOscillator.frequency.setValueAtTime(1320, now + 0.03);
     shimmerOscillator.frequency.exponentialRampToValueAtTime(980, now + 0.14);

     const shimmerGain = audioContext.createGain();
     shimmerGain.gain.setValueAtTime(0.0001, now + 0.03);
     shimmerGain.gain.exponentialRampToValueAtTime(0.018, now + 0.05);
     shimmerGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

     shimmerOscillator.connect(shimmerGain);
     connectLayer(shimmerGain);

     // Gentle body tap — barely-there thump for weight.
     const tapOscillator = audioContext.createOscillator();
     tapOscillator.type = "sine";
     tapOscillator.frequency.setValueAtTime(92, now);
     tapOscillator.frequency.exponentialRampToValueAtTime(68, now + 0.08);

     const tapGain = audioContext.createGain();
     tapGain.gain.setValueAtTime(0.0001, now);
     tapGain.gain.exponentialRampToValueAtTime(0.028, now + 0.012);
     tapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

     tapOscillator.connect(tapGain);
     connectLayer(tapGain);

     sweepSource.start(now);
     sweepSource.stop(now + sweepDuration);
     bodyOscillator.start(now);
     bodyOscillator.stop(now + 0.3);
     shimmerOscillator.start(now + 0.03);
     shimmerOscillator.stop(now + 0.18);
     tapOscillator.start(now);
     tapOscillator.stop(now + 0.12);
}

type ProjectItemProps = {
     project: Project;
     isOpen: boolean;
     onToggle: () => void;
     onImageClick: () => void;
};

function ProjectItem({ project, isOpen, onToggle, onImageClick }: ProjectItemProps) {
     return (
          <div className="border-b border-zinc-200 last:border-b-0">
               <button
                    type="button"
                    onClick={onToggle}
                    className="block w-full py-4 text-left transition-colors hover:bg-zinc-50/80"
                    aria-expanded={isOpen}
               >
                    <div className="flex w-full items-start gap-7">
                         <img
                              src={project.image}
                              alt={`${project.title} preview`}
                              onClick={event => {
                                   event.stopPropagation();
                                   onImageClick();
                              }}
                              className="mt-0.5 h-12 w-12 shrink-0 cursor-zoom-in rounded-md border border-zinc-200 bg-white object-cover transition-transform hover:scale-[1.03]"
                         />

                         <div className="flex min-w-0 flex-1 items-start justify-between gap-4">
                              <div>
                                   <h3 className="text-[1.35rem] font-semibold leading-tight tracking-tight text-zinc-950">
                                        {project.title}
                                   </h3>
                                   <p className="mt-1 text-[0.88rem] text-zinc-500">{project.dateRange}</p>
                              </div>

                              <div className="flex shrink-0 items-center gap-3 pt-0.5">
                                   <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={event => event.stopPropagation()}
                                        className="text-zinc-400 transition-colors hover:text-zinc-700"
                                        aria-label={`Open ${project.title}`}
                                   >
                                        <Link2 className="h-4 w-4" />
                                   </a>
                                   {isOpen ? (
                                        <ChevronUp className="h-4 w-4 text-zinc-400" />
                                   ) : (
                                        <ChevronDown className="h-4 w-4 text-zinc-400" />
                                   )}
                              </div>
                         </div>
                    </div>

                    {isOpen ? (
                         <div className="mt-4 w-full space-y-4">
                              <button
                                   type="button"
                                   onClick={event => {
                                        event.stopPropagation();
                                        onImageClick();
                                   }}
                                   className="group block w-full overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 text-left"
                              >
                                   <img
                                        src={project.image}
                                        alt={`${project.title} screenshot`}
                                        className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] md:h-72"
                                   />
                                   <div className="border-t border-zinc-200 px-3 py-2 text-[0.78rem] font-medium uppercase tracking-[0.15em] text-zinc-500">
                                        Click to expand image
                                   </div>
                              </button>

                              <p className="w-full text-[0.95rem] leading-6 text-zinc-900">{project.summary}</p>

                              <ul className="w-full space-y-2.5">
                                   {project.features.map(feature => (
                                        <li key={feature} className="flex gap-3 text-[0.92rem] leading-6 text-zinc-800">
                                             <span className="mt-[0.72rem] h-1 w-1 shrink-0 rounded-full bg-zinc-700" />
                                             <span>{feature}</span>
                                        </li>
                                   ))}
                              </ul>

                              <div className="flex w-full flex-wrap gap-2 pt-1">
                                   {project.techStack.map(tag => (
                                        <span
                                             key={tag}
                                             className="inline-flex items-center rounded-md border border-zinc-400 bg-zinc-50 px-2.5 py-1 text-[0.8rem] font-medium text-zinc-700"
                                        >
                                             {tag}
                                        </span>
                                   ))}
                              </div>
                         </div>
                    ) : null}
               </button>
          </div>
     );
}

export function ProjectSection() {
     const [copied, setCopied] = useState(false);
     const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
     const [showAll, setShowAll] = useState(false);
     const [previewProjectIndex, setPreviewProjectIndex] = useState<number | null>(null);

     const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_VISIBLE);
     const hasHiddenProjects = projects.length > INITIAL_VISIBLE;

     const copySectionLink = async () => {
          const shareUrl = `${window.location.origin}/#projects`;

          try {
               await navigator.clipboard.writeText(shareUrl);
               setCopied(true);
               window.setTimeout(() => setCopied(false), 1200);
          } catch {
               // Ignore clipboard failures in unsupported contexts.
          }

          playCopySound();
     };

     const handleProjectToggle = (index: number) => {
          setExpandedIndex(current => {
               const isExpanding = current !== index;
               if (isExpanding) {
                    playPageTurnSound();
               }
               return current === index ? null : index;
          });
     };

     useEffect(() => {
          if (previewProjectIndex === null) return;

          const onEscape = (event: KeyboardEvent) => {
               if (event.key === "Escape") {
                    setPreviewProjectIndex(null);
               }
          };

          window.addEventListener("keydown", onEscape);
          return () => window.removeEventListener("keydown", onEscape);
     }, [previewProjectIndex]);

     return (
          <section className="relative w-full overflow-hidden border-y border-zinc-200 bg-white px-10 py-3 text-zinc-900">
               <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-size-[100%_100%,100%_100%] opacity-40" />

               <div className="relative border-y border-zinc-200 py-1">
                    <button
                         id="projects"
                         type="button"
                         onClick={copySectionLink}
                         className="group inline-flex items-center gap-3 text-left"
                         aria-label="Copy projects section link"
                    >
                         <h2 className="text-[1.9rem] font-semibold leading-none tracking-tight text-zinc-950">
                              Projects{" "}
                              <span className="text-zinc-400">({projects.length})</span>
                         </h2>
                         <Link2 className="h-5 w-5 text-zinc-500 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:text-zinc-800" />
                         <span className="text-[0.7rem] font-medium uppercase tracking-[0.24em] text-zinc-400 transition-opacity duration-200 group-hover:text-zinc-500">
                              {copied ? "Copied" : " "}
                         </span>
                    </button>
               </div>

               <div className="relative mt-1 w-full">
                    {visibleProjects.map((project, index) => (
                         <ProjectItem
                              key={project.title}
                              project={project}
                              isOpen={expandedIndex === index}
                              onToggle={() => handleProjectToggle(index)}
                              onImageClick={() => setPreviewProjectIndex(index)}
                         />
                    ))}
               </div>

               {hasHiddenProjects && !showAll ? (
                    <div className="relative mt-2 flex justify-center pb-2 pt-4">
                         <button
                              type="button"
                              onClick={() => setShowAll(true)}
                              className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-4 py-2 text-[0.88rem] font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950"
                         >
                              Show More
                              <ChevronDown className="h-4 w-4" />
                         </button>
                    </div>
               ) : null}

               {previewProjectIndex !== null ? (
                    <div
                         className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
                         role="dialog"
                         aria-modal="true"
                         aria-label="Project image preview"
                         onClick={() => setPreviewProjectIndex(null)}
                    >
                         <button
                              type="button"
                              className="absolute right-5 top-5 rounded-md border border-white/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-white hover:bg-white/10"
                              onClick={event => {
                                   event.stopPropagation();
                                   setPreviewProjectIndex(null);
                              }}
                         >
                              Close
                         </button>

                         <img
                              src={visibleProjects[previewProjectIndex]?.image}
                              alt={`${visibleProjects[previewProjectIndex]?.title} full preview`}
                              className="max-h-[88vh] w-full max-w-5xl rounded-lg border border-white/20 bg-zinc-900 object-contain shadow-2xl"
                              onClick={event => event.stopPropagation()}
                         />
                    </div>
               ) : null}
          </section>
     );
}
