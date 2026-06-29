import { useEffect, useState } from "react";
import { Link2 } from "lucide-react";
import { playClickSound } from "../lib/utils";

const myInfo = ` Hola 👋

- I'm Abhishek Kumar Mohanty (call me Abhi) — a IIT Patna and Full-Stack Developer student focused on building modern web applications and AI-driven solutions.

- Passionate about turning ideas into real products through thoughtful design, scalable architecture, and clean code.

- Experienced with Next.js, MERN Stack, TypeScript, FastAPI, and AI/LLM technologies, building applications that solve real-world problems.
`
const [headingLine = "## Hello", ...bodyLines] = myInfo.split("\n");

const bullets = bodyLines.filter(line => line.trim().startsWith("- ")).map(line => line.replace(/^-\s*/, ""));

export function AboutSection() {
     const [copied, setCopied] = useState(false);

     const copySectionLink = async () => {
          const shareUrl = `${window.location.origin}/#hello`;

          try {
               await navigator.clipboard.writeText(shareUrl);
               setCopied(true);
               window.setTimeout(() => setCopied(false), 1200);
          } catch {
          }

          playClickSound();
     };

     return (
          <section className="relative overflow-hidden border-y border-zinc-200 bg-white px-10 py-4 text-zinc-900">
               <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-size-[100%_100%,100%_100%] opacity-40" />

               <div className="relative border-y border-zinc-200 py-1.5">
                    <button
                         id="hello"
                         type="button"
                         onClick={copySectionLink}
                         className="group inline-flex items-center gap-3 text-left"
                         aria-label="Copy hello section link"
                    >
                         <h2 className="text-[2.5rem] font-semibold leading-none tracking-tight text-zinc-950">
                              {headingLine.replace(/^##\s*/, "")}
                         </h2>
                         <Link2 className="h-5 w-5 text-zinc-500 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:text-zinc-800" />
                         <span className="text-[0.7rem] font-medium uppercase tracking-[0.24em] text-zinc-400 transition-opacity duration-200 group-hover:text-zinc-500">
                              {copied ? "Copied" : " "}
                         </span>
                    </button>
               </div>


               <ul className="relative mt-8 space-y-5 rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_4px_12px_rgba(24,24,27,0.02)] text-[1.1rem] leading-6 text-zinc-800 transition-all duration-200 hover:border-zinc-300">
                    {bullets.map((bullet, index) => (
                         <li key={index} className="flex gap-3">
                              <span className="mt-[0.72rem] h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
                              <span className="tracking-tight font-sans">{bullet}</span>
                         </li>
                    ))}
               </ul>
          </section>
     );
}