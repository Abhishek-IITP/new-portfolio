import { useState } from "react";
import { Link2, ArrowUpRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import blogSphereImage from "../public/BlogSphere.png";
import pingMeImage from "../public/PingMe.png";
import oceanImage from "../public/ocean.png";
import mediScanImage from "../public/mediScan.png";
import mgnregaDashboardImage from "../public/mgnregaDashboardImage.png";
import babuaLmsImage from "../public/babuaLmsImage.png";
import whatsappLandingPageImage from "../public/whatsappLandingPageImage.png";
import layersCloneImage from "../public/layersCloneImage.png";
import secureChatAppImage from "../public/secureChatAppImage.png";
import nexapostImage from "../public/nexapost.png";
import omniMindImage from "../public/omniMindImage.png";

export type Project = {
     slug: string;
     title: string;
     dateRange: string;
     summary: string;
     status: "Live" | "Building" | "Coming Soon" | "Archived";
     badge?: "Featured" | "Coming Soon";
     features: string[];
     techStack: string[];
     liveUrl: string;
     githubUrl: string;
     image: string;
     views?: number;
};

export const projects: Project[] = [
     { //Nexapost
          slug: "nexapost",
          title: "NexaPost",
          dateRange: "06.2026 – Present",
          status: "Live",
          badge: "Featured",
          summary: "AI-powered social media campaign orchestrator with Zernio OAuth, Gemini 2.5 Flash copy generation, and dynamic post scheduling.",
          features: [
               "Multi-channel social integration for Twitter (X), LinkedIn, Facebook, and Instagram via OAuth using Zernio.",
               "AI Composer utilizing Gemini 2.5 Flash for tone-adjusted copy and Pollinations AI for context-matched images stored on Cloudinary.",
               "Automated publication service powered by node-cron background worker running every minute to monitor and dispatch queued posts.",
               "High-fidelity dashboard UI with detailed activity logging built with Tailwind CSS v4 and Framer Motion.",
          ],
          techStack: [
               "React 19",
               "Tailwind CSS v4",
               "Framer Motion",
               "Vite",
               "TypeScript",
               "Node.js",
               "Express.js",
               "MongoDB",
               "Gemini 2.5 Flash",
               "Zernio SDK",
               "Pollinations AI",
               "Cloudinary",
               "Node-Cron",
               "Vercel",
          ],
          liveUrl: "https://nexapost.vercel.app/",
          githubUrl: "https://github.com/Abhishek-IITP/social-media-automation",
          image: nexapostImage,
          views: 0,
     },
     { //blogsphere
          slug: "blogsphere",
          title: "BlogSphere",
          dateRange: "04.2025 – 04.2025",
          status: "Live",
          badge: "Featured",
          summary: "Full-featured blogging platform with OAuth, a rich editor, and social engagement built for scalable publishing.",
          features: [
               "Google OAuth and JWT auth with email verification and Cloudinary-backed user profiles",
               "EditorJS-powered blog editor with media uploads and a responsive reading experience",
               "Likes, comments, and follower system for community-driven content discovery",
               "MVC-structured Express backend with a Redux-powered React frontend",
          ],
          techStack: ["React 19", "Redux Toolkit", "Tailwind CSS", "Framer Motion", "Firebase", "Editor.js", "Node.js", "Express.js", "MongoDB", "Cloudinary"],
          liveUrl: "https://blogsphere-1.vercel.app/",
          githubUrl: "https://github.com/Abhishek-IITP/BlogSphere",
          image: blogSphereImage,
          views: 171,
     },
     { // OmniMind AI
     slug: "omnimind-ai",
     title: "OmniMind AI",
     dateRange: "06.2026 – 06.2026",
     status: "Live",
     badge: "Featured",
     summary: "AI-powered multi-agent recommendation hub that harnesses LangGraph orchestration, Gemini reasoning, and graph-based workflows to deliver intelligent recommendations across movies, books, music, and games.",
     features: [
          "Harnessed LangGraph to orchestrate specialized AI agents through a stateful graph-based execution pipeline",
          "Built an intelligent AI Orchestrator that dynamically routes user intent to domain-specific recommendation agents",
          "Integrated Gemini 2.5 Flash with LangChain for context-aware recommendation generation and structured reasoning",
          "Implemented strict Zod schema validation to guarantee reliable, type-safe AI responses before client delivery", 
          "Developed a real-time execution timeline that visualizes every orchestration stage during agent processing",
          "Enriched recommendations with dynamic watch, stream, download, and purchase links from external platforms"
     ],
     techStack: [
          "React 19",
          "TypeScript",
          "Tailwind CSS",
          "Express.js",
          "LangChain",
          "LangGraph",
          "Zod",
          "Google Generative AI",
     ],
     liveUrl: "https://omnimindhub.vercel.app/",
     githubUrl: "https://github.com/Abhishek-IITP/omniMindHub",
     image: omniMindImage,
     views: 0,
},
    { //ocean
          slug: "ocean",
          title: "Ocean",
          dateRange: "06.2025 – 07.2025",
          status: "Live",
          badge: "Featured",
          summary: "Full-stack scheduling platform with calendar sync, OAuth sign-in, and dynamic booking workflows.",
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
          views: 64,
     },
     { //pingme
          slug: "pingme",
          title: "PingMe",
          dateRange: "05.2025 – 05.2025",
          status: "Live",
          badge: "Featured",
          summary: "Production-grade real-time social app with messaging, video calls, and a polished multi-theme UI.",
          features: [
               "Real-time chat and WebRTC video calling with a friend request system",
               "Secure JWT authentication, protected routes, and a smooth onboarding flow",
               "32 customizable themes with responsive layouts across devices",
               "Optimized API layer with TanStack Query for reliable real-time sync",
          ],
          techStack: ["Node.js", "Express.js", "MongoDB", "React", "TanStack Query", "Socket.io", "Tailwind CSS", "DaisyUI"],
          liveUrl: "https://pingme-1-r94w.onrender.com/",
          githubUrl: "https://github.com/Abhishek-IITP/PingMe",
          image: pingMeImage,
          views: 98,
     },
 
     {
          slug: "secure-chat-app",
          title: "Secure Chat App",
          dateRange: "12.2025 – 01.2026",
          status: "Live",
          badge: "Featured",
          summary:
               "A real-time self-destructing chat platform where users create temporary private rooms, communicate securely, and have all messages and room data automatically deleted after expiration.",
          features: [
               "Built temporary chat rooms with automatic self-destruction using Redis TTL-based expiration and room lifecycle management",
               "Implemented real-time messaging with Upstash Realtime, enabling instant message delivery and room destruction notifications",
               "Designed secure room access using cookie-based authentication tokens with support for a maximum of five participants per room",
               "Integrated room sharing, countdown timers, live message synchronization, and one-click room destruction for privacy-focused communication",
          ],
          techStack: [
               "Next.js 16",
               "React 19",
               "TypeScript",
               "Elysia",
               "Eden Treaty",
               "TanStack Query",
               "Upstash Redis",
               "Upstash Realtime",
               "Tailwind CSS",
               "nanoid",
               "Vercel",
          ],
          liveUrl: "https://secure-chat-app-alpha.vercel.app/",
          githubUrl: "https://github.com/Abhishek-IITP/secure_chat_app",
          image: secureChatAppImage,
          views: 20,
     },

     { //mgnrega dashboard
          slug: "mgnrega-dashboard",
          title: "MGNREGA Analytics Dashboard",
          dateRange: "10.2025 – 10.2025",
          status: "Live",
          badge: "Featured",
          summary:
               "A modern analytics dashboard for MGNREGA employment data featuring real-time government data integration, advanced visualizations, district-level comparisons, and offline-first performance optimizations.",
          features: [
               "Real-time integration with data.gov.in APIs for district-wise MGNREGA employment analytics",
               "Interactive charts, KPI cards, district comparison tools, CSV export, and paginated data exploration",
               "Intelligent caching, data de-duplication, financial-year-aware sorting, and automatic field normalization",
               "PWA-enabled dashboard with offline support, responsive design, location detection, and modern SaaS-inspired UI",
          ],
          techStack: [
               "Next.js 16",
               "React 19",
               "TypeScript",
               "Tailwind CSS v4",
               "Recharts",
               "PWA",
               "Service Workers",
               "REST APIs",
               "data.gov.in API",
               "Vercel",
          ],
          liveUrl: "https://bharatfellowship-mgnrega-dashboard.vercel.app/",
          githubUrl: "https://github.com/Abhishek-IITP/MgNrega-Dashboard",
          image: mgnregaDashboardImage,
          views: 0,
     },
     { //babua-lms
          slug: "babua-lms",
          title: "Babua LMS",
          dateRange: "01.2026 – Present",
          status: "Building",
          badge: "Featured",
          summary:
               "A free-first learning platform designed around structured progress, accountability, and mentorship, ensuring students earn progress through consistency rather than binge-watching content.",
          features: [
               "Google and GitHub authentication with personalized dashboards and course-level progress tracking",
               "Sequential lecture unlocking system that enforces structured learning and prevents content skipping",
               "Daily streak tracking, resume-learning functionality, and lecture completion analytics for habit-based learning",
               "Dedicated mentorship section separated from educational content, keeping learning free while enabling paid guidance",
          ],
          techStack: [
               "Next.js",
               "React",
               "TypeScript",
               "Auth.js",
               "PostgreSQL",
               "Supabase",
               "Prisma ORM",
               "Tailwind CSS",
               "YouTube Embed API",
               "Vercel",
          ],
          liveUrl: "https://github.com/Abhishek-IITP/babua_hackathon_lms",
          githubUrl: "https://github.com/Abhishek-IITP/babua_hackathon_lms",
          image: babuaLmsImage,
          views: 0,
     },
     { //mediscan
          slug: "mediscan",
          title: "Medical Report Analyzer",
          dateRange: "05.2025 – 05.2025",
          status: "Live",
          badge: "Featured",
          summary: "AI-powered tool that reads medical PDFs and generates structured diagnostic summaries for quick review.",
          features: [
               "PDF upload and parsing pipeline using LLAMA through the Groq API",
               "LangChain workflow for turning unstructured reports into readable summaries",
               "Responsive UI focused on fast report upload, review, and interaction",
               "Lightweight Flask backend with EJS templates for simple deployment",
          ],
          techStack: ["Flask", "EJS", "LangChain", "Groq", "GenAI"],
          liveUrl: "https://medical-report-analyzer-production.up.railway.app/",
          githubUrl: "https://github.com/Abhishek-IITP/Medical-Report-Analyzer",
          image: mediScanImage,
          views: 33,
     },
     { //whatsapp
          slug: "whatsapp-landing-page",
          title: "WhatsApp Landing Page Clone",
          dateRange: "06.2024 – 06.2024",
          status: "Live",
          badge: "Featured",
          summary:
               "A high-fidelity WhatsApp landing page clone showcasing advanced GSAP animations, smooth scroll-driven storytelling, and responsive frontend engineering.",
          features: [
               "Recreated WhatsApp's modern landing page with a strong focus on visual accuracy and user experience",
               "Implemented GSAP-powered scroll animations, transitions, and interactive motion effects",
               "Built a fully responsive layout optimized for desktop, tablet, and mobile devices",
               "Focused on performance, smooth rendering, and engaging user interactions using modern web development practices",
          ],
          techStack: [
               "HTML5",
               "CSS3",
               "JavaScript",
               "GSAP",
               "Responsive Design",
               "Vercel",
          ],
          liveUrl: "https://whatsapp-landing-page-6dh1.vercel.app/",
          githubUrl: "https://github.com/Abhishek-IITP/whatsapp-landing-page",
          image: whatsappLandingPageImage,
          views: 0,
     },

     { //layers
          slug: "layers-clone",
          title: "Layers Clone",
          dateRange: "05.2024 – 05.2024",
          status: "Live",
          badge: "Featured",
          summary:
               "A modern e-commerce landing page clone inspired by Layers, featuring premium animations, responsive layouts, and smooth user interactions built with GSAP and modern frontend technologies.",
          features: [
               "Recreated the Layers product showcase experience with a focus on visual fidelity and responsive design",
               "Implemented GSAP-powered animations and scroll interactions to enhance engagement and storytelling",
               "Built using Vite for fast development and optimized performance across modern browsers",
               "Designed fully responsive layouts for desktop, tablet, and mobile devices with Tailwind CSS",
          ],
          techStack: [
               "HTML5",
               "CSS3",
               "JavaScript",
               "Vite",
               "GSAP",
               "Tailwind CSS",
               "Responsive Design",
               "Vercel",
          ],
          liveUrl: "https://layers-clone-git-main-abhishek-iitps-projects.vercel.app/",
          githubUrl: "https://github.com/Abhishek-IITP/layers-clone",
          image: layersCloneImage,
          views: 0,
     }
];

 
function StatusDot({ status }: { status: Project["status"] }) {
     if (status === "Live") {
          return (
               <span className="flex items-center gap-1.5 text-[0.82rem] font-semibold text-emerald-500 ">
                    <span className="relative flex h-2 w-2">
                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                         <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    Live
               </span>
          );
     }
     if (status === "Building") {
          return (
               <span className="flex items-center gap-1.5 text-[0.82rem] font-semibold text-rose-500 shrink-0">
                    <span className="relative flex h-2 w-2">
                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                         <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
                    </span>
                    Building
               </span>
          );
     }
     return (
          <span className="flex items-center gap-1.5 text-[0.82rem] font-semibold text-zinc-400 shrink-0">
               <span className="h-2 w-2 rounded-full bg-zinc-400" />
               {status}
          </span>
     );
}

function ProjectCard({ project }: { project: Project }) {
     return (
          <motion.a
               href={`#/project/${project.slug}`}
               initial="initial"
               whileHover="hover"
               variants={{
                    initial: { y: 0 },
                    hover: { y: -8, transition: { duration: 0.25, ease: "easeOut" } }
               }}
               className="group flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-zinc-200/20 dark:hover:shadow-zinc-900/20 hover:border-zinc-300 dark:hover:border-zinc-700 cursor-pointer"
          >
                
               <div className="relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 aspect-[16/9] border-b border-zinc-100 dark:border-zinc-800/80">
                    {project.badge && (
                         <div className="absolute top-3 left-3 z-10">
                              <span className={`px-2.5 py-1 text-[0.72rem] font-semibold rounded-md ${project.badge === "Featured"
                                   ? "bg-zinc-900/80 text-white backdrop-blur-sm"
                                   : "bg-zinc-800/70 text-zinc-200 backdrop-blur-sm"
                                   }`}>
                                   {project.badge}
                              </span>
                         </div>
                    )}
                    <motion.img
                         src={project.image}
                         alt={`${project.title} preview`}
                         loading="lazy"
                         variants={{
                              initial: { scale: 1 },
                              hover: { scale: 1.04, transition: { duration: 0.25, ease: "easeOut" } }
                         }}
                         className="w-full h-full object-cover"
                    />
               </div>

               {/* Card Body */}
               <div className="flex flex-col flex-1 p-6 gap-4">
                    <div className="flex items-start justify-between gap-3">
                         <div className="min-w-0">
                              <h3 className="text-[1.1rem] font-bold tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight">
                                   {project.title}
                              </h3>
                              <p className="mt-1.5 text-[0.86rem] leading-5 text-zinc-500 line-clamp-2">
                                   {project.summary}
                              </p>
                         </div>
                         <StatusDot status={project.status} />
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-zinc-100 dark:border-zinc-800">
                         <span className="inline-flex items-center gap-1 text-[0.86rem] font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                              View Project
                              {project.status === "Building" || project.badge === "Coming Soon" ? (
                                   <ArrowUpRight className="h-3.5 w-3.5" />
                              ) : (
                                   <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
                              )}
                         </span>
                         <span className="text-[0.75rem] text-zinc-400">{project.dateRange}</span>
                    </div>
               </div>
          </motion.a>
     );
}

const INITIAL_VISIBLE = 4;

type ProjectSectionProps = {
     isFullPage?: boolean;
};

export function ProjectSection({ isFullPage = false }: ProjectSectionProps) {
     const [copied, setCopied] = useState(false);
     const [showAll, setShowAll] = useState(false);

     const visibleProjects = isFullPage
          ? projects
          : showAll
               ? projects
               : projects.slice(0, INITIAL_VISIBLE);

     const hasHiddenProjects = !isFullPage && projects.length > INITIAL_VISIBLE;

     const copySectionLink = async () => {
          const shareUrl = `${window.location.origin}/#projects`;
          try {
               await navigator.clipboard.writeText(shareUrl);
               setCopied(true);
               window.setTimeout(() => setCopied(false), 1200);
          } catch {
               // ignore
          }
     };

     return (
          <>
                
               {isFullPage && (
                    <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 px-6 sm:px-8 py-3 flex justify-between items-center sticky top-0 z-20 backdrop-blur-sm">
                         <div className="flex items-center gap-3 sm:gap-4">
                              <a
                                   href="#/"
                                   className="h-8 w-8 rounded-lg bg-zinc-950 flex items-center justify-center hover:bg-zinc-800 transition-all cursor-pointer text-white hover:scale-[1.05]"
                                   aria-label="Back to home"
                              >
                                   <ChevronLeft className="h-5 w-5" />
                              </a>
                              <h2 className="text-[1.1rem] sm:text-[1.35rem] font-bold text-zinc-950 dark:text-zinc-100 leading-tight">All Projects</h2>
                         </div>

                         <div className="flex items-center gap-2">
                              <a
                                   href="#/"
                                   className="hidden sm:flex px-3 py-1.5 text-[0.8rem] font-semibold text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer items-center justify-center tracking-wide"
                              >
                                   Back to Home
                              </a>
                              <ThemeToggle />
                         </div>
                    </div>
               )}

               <section
                    className={`relative w-full overflow-hidden bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 ${isFullPage ? "pb-12" : "border-y border-zinc-200 dark:border-zinc-800"}`}
               >
                    
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-size-[100%_100%,100%_100%] opacity-40" />

                   
                    {!isFullPage && (
                         <div className="relative border-y border-zinc-200 dark:border-zinc-800 px-6 py-2 mb-0">
                              <button
                                   id="projects"
                                   type="button"
                                   onClick={copySectionLink}
                                   className="group inline-flex items-center gap-3 text-left"
                                   aria-label="Copy projects section link"
                              >
                                   <h2 className="text-[2.5rem] font-semibold leading-tight tracking-tight text-zinc-950 dark:text-zinc-50">
                                        Projects{" "}
                                        <span className="text-zinc-400 text-[1.7rem]">({projects.length})</span>
                                   </h2>
                                   <Link2 className="h-5 w-5 text-zinc-500 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:text-zinc-800 dark:group-hover:text-zinc-200" />
                                   <span className="text-[0.7rem] font-medium uppercase tracking-[0.24em] text-zinc-400 transition-opacity duration-200 group-hover:text-zinc-500">
                                        {copied ? "Copied" : " "}
                                   </span>
                              </button>
                         </div>
                    )}

                    
                    <div className={`relative grid grid-cols-1 md:grid-cols-2 gap-6 p-6 ${isFullPage ? "md:px-8 max-w-5xl mx-auto" : "md:px-8"}`}>
                         {visibleProjects.map((project) => (
                              <ProjectCard key={project.slug} project={project} />
                         ))}
                    </div>
 
                    {hasHiddenProjects && !showAll && (
                         <div className="relative flex justify-center pb-6 px-4">
                              <a
                                   href="#/projects-all"
                                   className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 px-6 py-2.5 text-[0.88rem] font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm cursor-pointer"
                              >
                                   View All
                                   <ArrowUpRight className="h-4 w-4 text-white" />
                              </a>
                         </div>
                    )}
               </section>
          </>
     );
}
