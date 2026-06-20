import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command } from "lucide-react";
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

     useEffect(() => {
          const intervalId = window.setInterval(() => {
               setRoleIndex(currentIndex => (currentIndex + 1) % roles.length);
          }, 2500);

          return () => {
               window.clearInterval(intervalId);
          };
     }, []);

     return (
          <div className="relative z-20 px-6 sm:px-8 -mt-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 w-full">
               <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 text-center sm:text-left">
                    <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white dark:border-zinc-900 shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-zinc-100 flex-shrink-0 transition-transform duration-300 hover:scale-105">
                         <img className="w-full h-full object-cover" src={meImage} alt="Abhishek Image" />
                    </div>
                    
                    <div className="flex-1 min-w-0 sm:mb-2">
                         <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
                              Abhishek Mohanty
                         </h1>
                         <div className="mt-2 h-7 text-lg font-medium relative w-full overflow-hidden">
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
                    </div>
               </div>

               <div className="sm:mb-2 self-center sm:self-end flex items-center gap-2">
                    {/* ⌘K Search Button */}
                    <button
                         onClick={onOpenSearch}
                         className="inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 h-14 text-sm font-medium text-zinc-600 dark:text-zinc-300 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:bg-zinc-50 dark:hover:bg-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 active:scale-95 cursor-pointer"
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

