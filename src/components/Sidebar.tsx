import { useEffect, useState } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import { Home, FileText, Cpu, Briefcase, LayoutGrid, GitBranch, Sun, Moon, Search } from "lucide-react";
import { useTheme } from "../context/ThemeProvider";

type Section = {
     id: string;
     label: string;
     Icon: typeof Home;
};

const sections: Section[] = [
     { id: "home", label: "Home", Icon: Home },
     { id: "about", label: "Hola & Connect", Icon: FileText },
     { id: "tech", label: "Tech Stack", Icon: Cpu },
     { id: "experience", label: "Experience", Icon: Briefcase },
     { id: "projects", label: "Projects", Icon: LayoutGrid },
     { id: "github", label: "GitHub Streak", Icon: GitBranch },
];

export function Sidebar({ onOpenSearch }: { onOpenSearch?: () => void }) {
     const [isVisible, setIsVisible] = useState(false);
     const [activeSection, setActiveSection] = useState("home");
     const { theme, toggleTheme } = useTheme();

     const isDark = theme === "dark";

     useEffect(() => {
          const toggleVisibility = () => {
               if (window.scrollY > 120) {
                    setIsVisible(true);
               } else {
                    setIsVisible(false);
               }
          };

          window.addEventListener("scroll", toggleVisibility);
          toggleVisibility();

          return () => window.removeEventListener("scroll", toggleVisibility);
     }, []);

     useEffect(() => {
          const handleScrollSpy = () => {
               const windowHeight = window.innerHeight;
               let currentActive = "home";

               for (const section of sections) {
                    const element = document.getElementById(section.id);
                    if (element) {
                         const rect = element.getBoundingClientRect();
                         if (rect.top <= windowHeight / 3) {
                              currentActive = section.id;
                         }
                    }
               }
               setActiveSection(currentActive);
          };

          window.addEventListener("scroll", handleScrollSpy);
          handleScrollSpy();

          return () => window.removeEventListener("scroll", handleScrollSpy);
     }, []);

     const scrollToSection = (id: string) => {
          const element = document.getElementById(id);
          if (element) {
               const targetY = element.getBoundingClientRect().top + window.scrollY;

               animate(window.scrollY, targetY, {
                    type: "tween",
                    ease: [0.25, 1, 0.5, 1],
                    duration: 0.8,
                    onUpdate: (latest) => window.scrollTo(0, latest),
               });
          }
     };

     // Theme-aware styles
     const containerBg = isDark
          ? "rgba(15, 15, 18, 0.85)"
          : "rgba(255, 255, 255, 0.78)";
     const containerBorder = isDark
          ? "1px solid rgba(63, 63, 70, 0.45)"
          : "1px solid rgba(212, 212, 216, 0.7)";
     const containerShadow = isDark
          ? "0 8px 32px rgba(0, 0, 0, 0.45), 0 0 0 0.5px rgba(255,255,255,0.06) inset"
          : "0 8px 32px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0,0,0,0.04), 0 0 0 0.5px rgba(255,255,255,0.8) inset";

     const iconDefault = isDark ? "#a1a1aa" : "#71717a";
     const iconHover = isDark ? "#e4e4e7" : "#3f3f46";
     const iconActive = isDark ? "#18181b" : "#fafafa";

     const activeBg = isDark ? "#fafafa" : "#18181b";
     const activeGlow = isDark
          ? "0 0 12px rgba(250, 250, 250, 0.2)"
          : "0 0 12px rgba(24, 24, 27, 0.15)";

     const separatorColor = isDark ? "rgba(63, 63, 70, 0.5)" : "rgba(212, 212, 216, 0.6)";

     const tooltipBg = isDark ? "#18181b" : "#fafafa";
     const tooltipText = isDark ? "#e4e4e7" : "#27272a";
     const tooltipBorder = isDark ? "rgba(63, 63, 70, 0.6)" : "rgba(212, 212, 216, 0.8)";

     return (
          <AnimatePresence>
               {isVisible && (
                    <motion.nav
                         initial={{ opacity: 0, x: 20, y: "-50%" }}
                         animate={{ opacity: 1, x: 0, y: "-50%" }}
                         exit={{ opacity: 0, x: 20, y: "-50%" }}
                         transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                         className="fixed right-6 xl:right-auto xl:left-[calc(50%+536px)] top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-1 p-1.5 rounded-full"
                         style={{
                              background: containerBg,
                              border: containerBorder,
                              boxShadow: containerShadow,
                              backdropFilter: "blur(20px) saturate(1.6)",
                              WebkitBackdropFilter: "blur(20px) saturate(1.6)",
                         }}
                         aria-label="Page navigation"
                    >
                         {sections.map((section) => {
                              const isActive = activeSection === section.id;
                              return (
                                   <button
                                        key={section.id}
                                        onClick={() => scrollToSection(section.id)}
                                        className="group relative p-2.5 rounded-full z-10 focus:outline-hidden cursor-pointer"
                                        style={{
                                             transition: "background-color 0.2s ease",
                                        }}
                                        onMouseEnter={(e) => {
                                             if (!isActive) {
                                                  e.currentTarget.style.backgroundColor = isDark
                                                       ? "rgba(63, 63, 70, 0.35)"
                                                       : "rgba(0, 0, 0, 0.05)";
                                             }
                                        }}
                                        onMouseLeave={(e) => {
                                             e.currentTarget.style.backgroundColor = "transparent";
                                        }}
                                        aria-label={`Scroll to ${section.label}`}
                                   >
                                        {isActive && (
                                             <motion.div
                                                  layoutId="active-nav-bg"
                                                  className="absolute inset-0 rounded-full z-0"
                                                  style={{
                                                       backgroundColor: activeBg,
                                                       boxShadow: activeGlow,
                                                  }}
                                                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                             />
                                        )}
                                        <section.Icon
                                             className="h-[18px] w-[18px] relative z-10"
                                             style={{
                                                  color: isActive ? iconActive : iconDefault,
                                                  transition: "color 0.25s ease",
                                             }}
                                             onMouseEnter={(e) => {
                                                  if (!isActive) {
                                                       (e.currentTarget as SVGElement).style.color = iconHover;
                                                  }
                                             }}
                                             onMouseLeave={(e) => {
                                                  if (!isActive) {
                                                       (e.currentTarget as SVGElement).style.color = iconDefault;
                                                  }
                                             }}
                                        />
                                        {/* Tooltip */}
                                        <span
                                             className="absolute right-12 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 rounded-lg px-2.5 py-1.5 text-xs font-medium shadow-lg origin-right whitespace-nowrap pointer-events-none z-50"
                                             style={{
                                                  backgroundColor: tooltipBg,
                                                  color: tooltipText,
                                                  border: `1px solid ${tooltipBorder}`,
                                                  transition: "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.15s ease",
                                                  backdropFilter: "blur(12px)",
                                             }}
                                        >
                                             {section.label}
                                        </span>
                                   </button>
                              );
                         })}

                         {/* Separator */}
                         <div
                              className="w-5 my-0.5 rounded-full"
                              style={{
                                   height: "1px",
                                   backgroundColor: separatorColor,
                              }}
                         />

                         {/* Search (⌘K) Button */}
                         <button
                              onClick={onOpenSearch}
                              className="group relative p-2.5 rounded-full z-10 focus:outline-hidden cursor-pointer"
                              style={{
                                   transition: "background-color 0.2s ease",
                              }}
                              onMouseEnter={(e) => {
                                   e.currentTarget.style.backgroundColor = isDark
                                        ? "rgba(63, 63, 70, 0.35)"
                                        : "rgba(0, 0, 0, 0.05)";
                              }}
                              onMouseLeave={(e) => {
                                   e.currentTarget.style.backgroundColor = "transparent";
                              }}
                              aria-label="Open search (Ctrl+K)"
                         >
                              <Search
                                   className="h-[18px] w-[18px] relative z-10"
                                   style={{
                                        color: iconDefault,
                                        transition: "color 0.25s ease",
                                   }}
                                   onMouseEnter={(e) => {
                                        (e.currentTarget as SVGElement).style.color = iconHover;
                                   }}
                                   onMouseLeave={(e) => {
                                        (e.currentTarget as SVGElement).style.color = iconDefault;
                                   }}
                              />
                              {/* Tooltip */}
                              <span
                                   className="absolute right-12 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 rounded-lg px-2.5 py-1.5 text-xs font-medium shadow-lg origin-right whitespace-nowrap pointer-events-none z-50"
                                   style={{
                                        backgroundColor: tooltipBg,
                                        color: tooltipText,
                                        border: `1px solid ${tooltipBorder}`,
                                        transition: "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.15s ease",
                                        backdropFilter: "blur(12px)",
                                   }}
                              >
                                   Search ⌘K
                              </span>
                         </button>

                         {/* Theme Toggle */}
                         <button
                              onClick={toggleTheme}
                              className="group relative p-2.5 rounded-full z-10 focus:outline-hidden cursor-pointer"
                              style={{
                                   transition: "background-color 0.2s ease",
                              }}
                              onMouseEnter={(e) => {
                                   e.currentTarget.style.backgroundColor = isDark
                                        ? "rgba(63, 63, 70, 0.35)"
                                        : "rgba(0, 0, 0, 0.05)";
                              }}
                              onMouseLeave={(e) => {
                                   e.currentTarget.style.backgroundColor = "transparent";
                              }}
                              aria-label="Toggle theme mode"
                         >
                              {isDark ? (
                                   <Sun
                                        className="h-[18px] w-[18px] relative z-10"
                                        style={{
                                             color: iconDefault,
                                             transition: "color 0.25s ease",
                                        }}
                                        onMouseEnter={(e) => {
                                             (e.currentTarget as SVGElement).style.color = "#fbbf24";
                                        }}
                                        onMouseLeave={(e) => {
                                             (e.currentTarget as SVGElement).style.color = iconDefault;
                                        }}
                                   />
                              ) : (
                                   <Moon
                                        className="h-[18px] w-[18px] relative z-10"
                                        style={{
                                             color: iconDefault,
                                             transition: "color 0.25s ease",
                                        }}
                                        onMouseEnter={(e) => {
                                             (e.currentTarget as SVGElement).style.color = "#818cf8";
                                        }}
                                        onMouseLeave={(e) => {
                                             (e.currentTarget as SVGElement).style.color = iconDefault;
                                        }}
                                   />
                              )}
                              {/* Tooltip */}
                              <span
                                   className="absolute right-12 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 rounded-lg px-2.5 py-1.5 text-xs font-medium shadow-lg origin-right whitespace-nowrap pointer-events-none z-50"
                                   style={{
                                        backgroundColor: tooltipBg,
                                        color: tooltipText,
                                        border: `1px solid ${tooltipBorder}`,
                                        transition: "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.15s ease",
                                        backdropFilter: "blur(12px)",
                                   }}
                              >
                                   {isDark ? "Light Mode" : "Dark Mode"}
                              </span>
                         </button>
                    </motion.nav>
               )}
          </AnimatePresence>
     );
}
