import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command, Eye } from "lucide-react";
import meImage from "../public/me.jpg";
import "./Top-Info.css";
import ThemeToggle from "./ThemeToggle";

const roles = [
     "Software Engineer",
     "Full Stack Developer",
     "Trader",
     "Open Source Contributor",
];

export function TopInfo({ onOpenSearch }: { onOpenSearch?: () => void }) {
     const [roleIndex, setRoleIndex] = useState(0);
     const [views, setViews] = useState<number | null>(null);

     useEffect(() => {
          const intervalId = window.setInterval(() => {
               setRoleIndex(currentIndex => (currentIndex + 1) % roles.length);
          }, 2500);

          return () => {
               window.clearInterval(intervalId);
          };
     }, []);

     useEffect(() => {
          const fetchViews = async () => {
               // Check if this visitor is unique in this browser
               const isUnique = !localStorage.getItem("portfolio_visited");
               if (isUnique) {
                    try {
                         localStorage.setItem("portfolio_visited", "true");
                    } catch (e) {}
               }

               try {
                    // 1. Try local server views API
                    const url = isUnique ? "/api/views?inc=true" : "/api/views";
                    const res = await fetch(url);
                    if (res.ok) {
                         const data = await res.json();
                         if (data && typeof data.views === "number") {
                              setViews(data.views);
                              return;
                         }
                    }
               } catch (err) {
                    // Local server API failed or not running (e.g. Vercel deployment)
                    console.log("Local views API not available, falling back to public CounterAPI.");
               }

               try {
                    // 2. Fallback: Public keyless CounterAPI (namespace 'abhishekiitp', key 'portfolio')
                    const apiUrl = isUnique 
                         ? "https://api.counterapi.dev/v1/abhishekiitp/portfolio/up"
                         : "https://api.counterapi.dev/v1/abhishekiitp/portfolio";
                    const res = await fetch(apiUrl);
                    if (res.ok) {
                         const data = await res.json();
                         if (data && typeof data.value === "number") {
                              setViews(data.value + 479);
                              return;
                         }
                    }
               } catch (err) {
                    console.error("Error fetching from public CounterAPI:", err);
               }

               // 3. Fallback: LocalStorage simulated views counter
               try {
                    const localViews = localStorage.getItem("portfolio_views_fallback");
                    let currentViews = localViews ? parseInt(localViews, 10) : 479;
                    if (isNaN(currentViews)) currentViews = 479;
                    
                    if (isUnique) {
                         currentViews += 1;
                         localStorage.setItem("portfolio_views_fallback", currentViews.toString());
                    }
                    setViews(currentViews);
               } catch (e) {
                    setViews(480);
               }
          };

          fetchViews();
     }, []);

     return (
          <div className="relative z-20 px-6 sm:px-8 -mt-16 sm:-mt-20 flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 w-full">
               <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 text-center sm:text-left flex-1 min-w-0">
                    
                    {/* Squircle Avatar overlapping the banner */}
                    <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-[2rem] overflow-hidden border-4 border-white dark:border-zinc-950 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-zinc-100 flex-shrink-0 transition-transform duration-300 hover:scale-105">
                         <img className="w-full h-full object-cover" src={meImage} alt="Abhishek Image" />
                    </div>
                    
                    {/* Name, Verified Badge, Role, and Views */}
                    <div className="flex-1 min-w-0 sm:mb-2">
                         <div className="flex items-center justify-center sm:justify-start gap-2">
                              <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
                                   Abhishek Mohanty
                              </h1>
                              {/* Verified Blue Badge */}
                              <svg className="h-5 w-5 text-sky-500 fill-current shrink-0" viewBox="0 0 24 24" aria-label="Verified checkmark">
                                   <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.99-3.818-3.99-.48 0-.941.1-1.352.278C14.774 2.525 13.5 1.5 12 1.5s-2.774 1.025-3.422 2.288c-.411-.178-.872-.278-1.352-.278-2.108 0-3.818 1.78-3.818 3.99 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.71 3.99 3.818 3.99.48 0 .941-.1 1.352-.278C9.226 21.475 10.5 22.5 12 22.5s2.774-1.025 3.422-2.288c.411.178.872.278 1.352.278 2.108 0 3.818-1.78 3.818-3.99 0-.495-.084-.965-.238-1.4 1.273-.65 2.148-2.02 2.148-3.6zm-12.72 4.03l-3.53-3.53 1.41-1.41 2.12 2.12 4.95-4.95 1.41 1.41-6.36 6.36z" />
                              </svg>
                         </div>
                         
                         {/* Sliding Role Rotator */}
                         <div className="mt-1 h-7 text-lg font-medium relative w-full overflow-hidden">
                              <AnimatePresence initial={false}>
                                   <motion.div
                                        key={roleIndex}
                                        initial={{ y: "100%", opacity: 0 }}
                                        animate={{ y: "0%", opacity: 1 }}
                                        exit={{ y: "-100%", opacity: 0 }}
                                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                        className="absolute left-0 top-0 w-full text-zinc-600 dark:text-zinc-400 whitespace-nowrap"
                                   >
                                        {roles[roleIndex]}
                                   </motion.div>
                              </AnimatePresence>
                         </div>
                         
                         {/* Views counter */}
                         <div className="mt-2.5 flex items-center justify-center sm:justify-start gap-1.5 text-sm text-zinc-500 dark:text-zinc-500 font-medium select-none">
                              <Eye className="h-4 w-4 shrink-0 text-zinc-400 dark:text-zinc-600" />
                              <span>{views !== null ? views.toLocaleString() : "..."} profile views</span>
                         </div>
                    </div>
               </div>

               {/* Action controls (Squircle style) */}
               <div className="sm:mb-2 self-center sm:self-end flex items-center gap-3">
                    {/* ⌘K Search Button */}
                    <button
                         onClick={onOpenSearch}
                         className="inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 h-14 text-sm font-semibold text-zinc-650 dark:text-zinc-300 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:bg-zinc-50 dark:hover:bg-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 active:scale-95 cursor-pointer"
                         aria-label="Open command palette"
                    >
                         <Command className="h-5 w-5" />
                         <span className="font-bold">K</span>
                    </button>
                    <ThemeToggle />
               </div>
          </div>
     );
}




