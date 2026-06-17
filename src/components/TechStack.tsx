import { Link2 } from "lucide-react";
import { useState } from "react";

type TechItem = {
     label: string;
     href: string;
};

type TechSection = {
     index: string;
     title: string;
     items: TechItem[];
};

const techSections: TechSection[] = [
     {
          index: "01",
          title: "Languages",
          items: [
               { label: "TypeScript", href: "https://www.typescriptlang.org/docs/" },
               { label: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
               { label: "Python", href: "https://docs.python.org/3/" },
               { label: "C/C++", href: "https://en.cppreference.com/w/cpp" },
               { label: "HTML/CSS", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
          ],
     },
     {
          index: "02",
          title: "Frontend",
          items: [
               { label: "React", href: "https://react.dev/" },
               { label: "Next.js", href: "https://nextjs.org/docs" },
               { label: "Tailwind CSS", href: "https://tailwindcss.com/docs" },
               { label: "shadcn/ui", href: "https://ui.shadcn.com/docs" },
               { label: "Radix UI", href: "https://www.radix-ui.com/primitives/docs/overview/introduction" },
               { label: "Motion", href: "https://motion.dev/" },
               { label: "TanStack Query", href: "https://tanstack.com/query/latest" },
               { label: "Redux", href: "https://redux.js.org/" },
          ],
     },
     {
          index: "03",
          title: "Backend & Database",
          items: [
               { label: "Node.js", href: "https://nodejs.org/en/docs" },
               { label: "Bun", href: "https://bun.sh/docs" },
               { label: "Express.js", href: "https://expressjs.com/" },
               { label: "Django", href: "https://docs.djangoproject.com/en/stable/" },
               { label: "FastAPI", href: "https://fastapi.tiangolo.com/" },
               { label: "PostgreSQL", href: "https://www.postgresql.org/docs/" },
               { label: "MongoDB", href: "https://www.mongodb.com/docs/" },
               { label: "MySQL", href: "https://dev.mysql.com/doc/" },
               { label: "Supabase", href: "https://supabase.com/docs" },
               { label: "Redis", href: "https://redis.io/docs/latest/" },
          ],
     },
     {
          index: "04",
          title: "Dev Tools & AI",
          items: [
               { label: "Git", href: "https://git-scm.com/doc" },
               { label: "Docker", href: "https://docs.docker.com/" },
               { label: "Kubernetes (Basics)", href: "https://kubernetes.io/docs/home/" },
               { label: "AWS EC2", href: "https://docs.aws.amazon.com/ec2/" },
               { label: "Jenkins (CI/CD Pipelines)", href: "https://www.jenkins.io/doc/" },
               { label: "Prisma", href: "https://www.prisma.io/docs" },
               { label: "Socket.io", href: "https://socket.io/docs/v4/" },
               { label: "VS Code", href: "https://code.visualstudio.com/docs" },
               { label: "PyCharm", href: "https://www.jetbrains.com/pycharm/documentation/" },
               { label: "Cursor", href: "https://cursor.com/" },
          ],
     },
     {
          index: "05",
          title: "Data Science",
          items: [
               { label: "pandas", href: "https://pandas.pydata.org/docs/" },
               { label: "NumPy", href: "https://numpy.org/doc/stable/" },
               { label: "Matplotlib", href: "https://matplotlib.org/stable/" },
          ],
     },
];

const logoMapping: Record<string, string> = {
     "typescript": "typescript",
     "javascript": "javascript",
     "python": "python",
     "c/c++": "cplusplus",
     "html/css": "html5",
     "react": "react",
     "next.js": "nextdotjs",
     "tailwind css": "tailwindcss",
     "shadcn/ui": "shadcnui",
     "radix ui": "radixui",
     "motion": "framer",
     "tanstack query": "reactquery",
     "redux": "redux",
     "node.js": "nodedotjs",
     "bun": "bun",
     "express.js": "express",
     "django": "django",
     "fastapi": "fastapi",
     "postgresql": "postgresql",
     "mongodb": "mongodb",
     "mysql": "mysql",
     "supabase": "supabase",
     "redis": "redis",
     "git": "git",
     "docker": "docker",
     "kubernetes (basics)": "kubernetes",
     "aws ec2": "amazonec2",
     "jenkins (ci/cd pipelines)": "jenkins",
     "prisma": "prisma",
     "socket.io": "socketdotio",
     "vs code": "visualstudiocode",
     "pycharm": "pycharm",
     "cursor": "cursor",
     "pandas": "pandas",
     "numpy": "numpy",
     "matplotlib": "matplotlib",
};

function getLogoUrl(label: string): string {
     const cleanLabel = label.toLowerCase().trim();
     switch (cleanLabel) {
          case "vs code":
               return "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/visualstudiocode.svg";
          case "aws ec2":
               return "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/amazonwebservices.svg";
          case "matplotlib":
               return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg";
          default:
               const slug = logoMapping[cleanLabel] || cleanLabel.replace(/[^a-z0-9]/g, "");
               return `https://cdn.simpleicons.org/${slug}/000000`;
     }
}

export function TechStack() {
     const [copied, setCopied] = useState(false);

     const copySectionLink = async () => {
          const shareUrl = `${window.location.origin}/#techstack`;

          try {
               await navigator.clipboard.writeText(shareUrl);
               setCopied(true);
               window.setTimeout(() => setCopied(false), 1200);
          } catch {
               // Ignore clipboard failures in unsupported contexts.
          }

          const AudioContextClass = window.AudioContext || (window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
          const audioContext = AudioContextClass ? new AudioContextClass() : null;

          if (!audioContext) return;

          if (audioContext.state === "suspended") {
               await audioContext.resume();
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
     };
     return (
          <section className="relative overflow-hidden border-y border-zinc-200 bg-white px-8 py-3 text-zinc-900">
               <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-size-[100%_100%,100%_100%] opacity-40" />

               <div className="relative border-y border-zinc-200 py-1">
                    <div className="inline-flex items-center gap-3">
    <button
                     id="techstack"
                     type="button"
                     onClick={copySectionLink}
                     className="group inline-flex items-center gap-3 text-left"
                     aria-label="Copy hello section link"
                     >
    <h2 className="text-[2.5rem] font-semibold leading-none tracking-tight text-zinc-950">
                              Stack
                          </h2>
                          <Link2 className="h-5 w-5 text-zinc-500 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:text-zinc-800" />
                          <span className="text-[0.7rem] font-medium uppercase tracking-[0.24em] text-zinc-400 transition-opacity duration-200 group-hover:text-zinc-500">
                               {copied ? "Copied" : " "}
                          </span>
    </button>
                    </div>
               </div>

               <div className="relative mt-6 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-[0_4px_12px_rgba(24,24,27,0.02)] divide-y divide-zinc-200">
                    {techSections.map(section => (
                         <div key={section.index} className="grid gap-3 py-3 md:grid-cols-[190px_1fr] md:gap-4">
                              <div className="text-[0.92rem] font-medium text-zinc-500 md:pt-1">
                                   <span className="mr-2 text-zinc-300">{section.index}</span>
                                   {section.title}
                              </div>
                              <div className="flex flex-wrap gap-2">
                                   {section.items.map(item => (
                                        <a
                                             key={item.label}
                                             href={item.href}
                                             target="_blank"
                                             rel="noreferrer"
                                             className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[0.82rem] font-medium text-zinc-900 shadow-[0_1px_0_rgba(0,0,0,0.02)] transition-colors duration-150 hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-950"
                                        >
                                             <img
                                                  src={getLogoUrl(item.label)}
                                                  alt={`${item.label} logo`}
                                                  className="h-5 w-5 shrink-0 object-contain tech-logo"
                                             />
                                             <span>{item.label}</span>
                                        </a>
                                   ))}
                              </div>
                         </div>
                    ))}
               </div>
          </section>
     );
}
