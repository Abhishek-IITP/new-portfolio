import { Eye, ArrowUpRight, ChevronLeft } from "lucide-react";
import { projects } from "./ProjectsSection";
import ThemeToggle from "./ThemeToggle";

const logoMapping: Record<string, string> = {
  "node.js": "nodedotjs",
  "express.js": "express",
  "mongodb": "mongodb",
  "react": "react",
  "react 19": "react",
  "firebase": "firebase",
  "redux": "redux",
  "redux toolkit": "redux",
  "framer motion": "framer",
  "editor.js": "editorjs",
  "cloudinary": "cloudinary",
  "daisyui": "daisyui",
  "tanstack query": "reactquery",
  "socket.io": "socketdotio",
  "next.js": "nextdotjs",
  "tailwind css": "tailwindcss",
  "prisma": "prisma",
  "supabase": "supabase",
  "auth.js": "authjs",
  "zod": "zod",
  "vercel": "vercel",
  "nylas": "nylas",
  "flask": "flask",
  "langchain": "langchain",
  "groq": "groq",
  "typescript": "typescript",
  "python": "python",
  "docker": "docker",
  "postgresql": "postgresql",
  "bun": "bun",
  "webrtc": "webrtc",
  "aws": "amazonaws",
  "github actions": "githubactions",
  "turborepo": "turborepo",
};


function getTechLogoUrl(tech: string): string {
  const key = tech.toLowerCase().trim();
  const slug = logoMapping[key] || key.replace(/[^a-z0-9]/g, "");
  return `https://cdn.simpleicons.org/${slug}/000000`;
}

// Inline GitHub SVG since lucide-react doesn't ship Github icon in this version
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

type ProjectDetailProps = {
  slug: string;
};

export function ProjectDetail({ slug }: ProjectDetailProps) {
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-[60vh] text-zinc-500 gap-4">
        <p className="text-2xl font-bold">Project not found</p>
        <a
          href="#/"
          className="text-sm font-semibold underline hover:text-zinc-900 transition-colors"
        >
          ← Back to home
        </a>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 pb-16">
      {/* Page Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 px-6 sm:px-8 py-3 flex justify-between items-center sticky top-0 z-20 backdrop-blur-sm">
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="#/"
            className="h-8 w-8 rounded-lg bg-zinc-950 flex items-center justify-center hover:bg-zinc-800 transition-all cursor-pointer text-white hover:scale-[1.05]"
            aria-label="Back to home"
          >
            <ChevronLeft className="h-5 w-5" />
          </a>
          <h1 className="text-[1.1rem] sm:text-[1.35rem] font-bold text-zinc-950 dark:text-zinc-100 leading-tight truncate">
            {project.title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`#/projects-all`}
            className="hidden sm:flex px-3 py-1.5 text-[0.8rem] font-semibold text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer items-center justify-center tracking-wide"
          >
            All Projects
          </a>
          <ThemeToggle />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 sm:px-8 mt-6 space-y-6">
        {/* Hero Image */}
        <div className="relative w-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="w-full h-auto max-h-[520px] object-cover object-top"
          />
        </div>

        {/* Action & Meta Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-2">
          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 px-4 py-2 text-[0.85rem] font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <ArrowUpRight className="h-4 w-4" />
              View Live
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-300 px-4 py-2 text-[0.85rem] font-bold text-zinc-900 dark:text-zinc-100 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <GithubIcon className="h-4 w-4" />
              View Source
            </a>
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-[0.8rem] text-zinc-500 flex-wrap">
            <span className="font-medium">{project.dateRange}</span>
            {project.badge && (
              <span className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-[0.72rem] font-semibold text-zinc-600 uppercase tracking-wide">
                {project.badge}
              </span>
            )}
            {project.views !== undefined && (
              <span className="inline-flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5" />
                {project.views} views
              </span>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-100" />

        {/* About Section */}
        <div className="space-y-5">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-zinc-400 mb-2">
              About this project
            </p>
            <p className="text-[1.05rem] font-semibold text-zinc-900 leading-snug">
              {project.summary}
            </p>
          </div>

          <ul className="space-y-3">
            {project.features.map((feature, idx) => (
              <li key={idx} className="flex gap-3 text-[0.92rem] leading-6 text-zinc-600">
                <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
                <span className="font-sans tracking-tight">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-5">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-zinc-400 mb-4">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-1.5 text-[0.82rem] font-semibold text-zinc-800 dark:text-zinc-200 transition-colors hover:border-zinc-300 dark:hover:border-zinc-600"
              >
                <img
                  src={getTechLogoUrl(tech)}
                  alt={`${tech} logo`}
                  className="h-4 w-4 shrink-0 object-contain tech-logo"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
