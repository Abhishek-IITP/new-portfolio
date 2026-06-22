import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import {
     Search,
     Home,
     FileText,
     Briefcase,
     LayoutGrid,
     GitBranch,
     Code2,
     GraduationCap,
     ArrowRight,
     Command,
     CornerDownLeft,
} from "lucide-react";
import { useTheme } from "../context/ThemeProvider";
import { projects } from "./ProjectsSection";

// ── Searchable items ──────────────────────────────────────────────────

type SearchItem = {
     id: string;
     label: string;
     description?: string;
     category: "section" | "project" | "experience" | "education";
     icon: typeof Home;
     action: () => void;
};

const experienceEntries = [
     { id: "deccan-ai", company: "Deccan AI Experts", role: "Django Contributor", keywords: ["django", "python", "ai", "deccan"] },
     { id: "code-with-dhruv", company: "Code With Dhruv", role: "Full Stack Developer Intern", keywords: ["next.js", "supabase", "fullstack", "intern", "dhruv"] },
     { id: "iiit-agartala", company: "IIIT Agartala", role: "Research Intern", keywords: ["research", "machine learning", "brain tumor", "iiit", "agartala"] },
     { id: "capstone", company: "IIT Patna", role: "Capstone Project Leader", keywords: ["capstone", "leadership", "iit", "patna"] },
];

const educationEntries = [
     { id: "iit-patna", company: "IIT Patna", role: "BTech CSE", keywords: ["iit", "patna", "cs", "btech", "computer science"] },
     { id: "nsps", company: "Netaji Subhash Public School", role: "Senior Secondary (PCM)", keywords: ["school", "nsps", "pcm", "12th"] },
];

const sectionItems: Omit<SearchItem, "action">[] = [
     { id: "home", label: "Home", description: "Go to top", category: "section", icon: Home },
     { id: "about", label: "About & Tech Stack", description: "About me and technologies", category: "section", icon: FileText },
     { id: "experience", label: "Experience", description: "Work experience & education", category: "section", icon: Briefcase },
     { id: "projects", label: "Projects", description: "All projects", category: "section", icon: LayoutGrid },
     { id: "github", label: "GitHub Streak", description: "Contribution graph", category: "section", icon: GitBranch },
];

// ── Fuzzy match helper ────────────────────────────────────────────────

function fuzzyMatch(text: string, query: string): boolean {
     if (!query.trim()) return true;
     const lowerText = text.toLowerCase();
     const queryWords = query.toLowerCase().trim().split(/\s+/);
     
     // Every word in the query must be present somewhere in the text
     return queryWords.every((word) => lowerText.includes(word));
}

// ── Component ─────────────────────────────────────────────────────────

export function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
     const [query, setQuery] = useState("");
     const [selectedIndex, setSelectedIndex] = useState(0);
     const inputRef = useRef<HTMLInputElement>(null);
     const listRef = useRef<HTMLDivElement>(null);
     const { theme } = useTheme();
     const isDark = theme === "dark";

     // Build all searchable items
     const allItems = useMemo<SearchItem[]>(() => {
          const scrollTo = (id: string) => {
               const currentHash = window.location.hash || "#/";
               const isOnLandingPage =
                    currentHash === "#/" ||
                    currentHash === "#" ||
                    currentHash === "" ||
                    currentHash === "#home" ||
                    currentHash === "#about" ||
                    currentHash === "#experience" ||
                    currentHash === "#projects" ||
                    currentHash === "#github";

               if (!isOnLandingPage) {
                    // Navigate back to the landing page first
                    window.location.hash = "#/";
                    
                    // Wait for React routing and DOM mounting to complete
                    setTimeout(() => {
                         const el = document.getElementById(id);
                         if (el) {
                              const targetY = el.getBoundingClientRect().top + window.scrollY;
                              animate(window.scrollY, targetY, {
                                   type: "tween",
                                   ease: [0.25, 1, 0.5, 1],
                                   duration: 0.8,
                                   onUpdate: (v) => window.scrollTo(0, v),
                              });
                         }
                    }, 250);
               } else {
                    const el = document.getElementById(id);
                    if (el) {
                         const targetY = el.getBoundingClientRect().top + window.scrollY;
                         animate(window.scrollY, targetY, {
                              type: "tween",
                              ease: [0.25, 1, 0.5, 1],
                              duration: 0.8,
                              onUpdate: (v) => window.scrollTo(0, v),
                         });
                    }
               }
          };

          const sections: SearchItem[] = sectionItems.map((s) => ({
               ...s,
               action: () => scrollTo(s.id),
          }));

          const projectItems: SearchItem[] = projects.map((p) => ({
               id: `project-${p.slug}`,
               label: p.title,
               description: p.summary.slice(0, 60) + "…",
               category: "project",
               icon: Code2,
               action: () => {
                    window.location.hash = `#/project/${p.slug}`;
               },
          }));

          const expItems: SearchItem[] = experienceEntries.map((e) => ({
               id: `exp-${e.id}`,
               label: e.company,
               description: e.role,
               category: "experience",
               icon: Briefcase,
               action: () => {
                    // Navigate to experience section, then scroll to specific entry
                    scrollTo("experience");
                    setTimeout(() => {
                         const el = document.getElementById(e.id);
                         if (el) {
                              const targetY = el.getBoundingClientRect().top + window.scrollY - 100;
                              animate(window.scrollY, targetY, {
                                   type: "tween",
                                   ease: [0.25, 1, 0.5, 1],
                                   duration: 0.6,
                                   onUpdate: (v) => window.scrollTo(0, v),
                              });
                         }
                    }, 400);
               },
          }));

          const eduItems: SearchItem[] = educationEntries.map((e) => ({
               id: `edu-${e.id}`,
               label: e.company,
               description: e.role,
               category: "education",
               icon: GraduationCap,
               action: () => {
                    scrollTo("experience");
                    setTimeout(() => {
                         const el = document.getElementById(e.id);
                         if (el) {
                              const targetY = el.getBoundingClientRect().top + window.scrollY - 100;
                              animate(window.scrollY, targetY, {
                                   type: "tween",
                                   ease: [0.25, 1, 0.5, 1],
                                   duration: 0.6,
                                   onUpdate: (v) => window.scrollTo(0, v),
                              });
                         }
                    }, 400);
               },
          }));

          return [...sections, ...projectItems, ...expItems, ...eduItems];
     }, []);

     // Filter items
     const filtered = useMemo(() => {
          if (!query.trim()) return allItems;
          return allItems.filter((item) => {
               const searchText = `${item.label} ${item.description || ""} ${item.category}`;

               // Also match project tech stack
               if (item.category === "project") {
                    const slug = item.id.replace("project-", "");
                    const proj = projects.find((p) => p.slug === slug);
                    if (proj) {
                         const techStr = proj.techStack.join(" ");
                         return fuzzyMatch(`${searchText} ${techStr} ${proj.summary}`, query);
                    }
               }

               // Match experience keywords
               if (item.category === "experience") {
                    const eid = item.id.replace("exp-", "");
                    const entry = experienceEntries.find((e) => e.id === eid);
                    if (entry) {
                         return fuzzyMatch(`${searchText} ${entry.keywords.join(" ")}`, query);
                    }
               }

               if (item.category === "education") {
                    const eid = item.id.replace("edu-", "");
                    const entry = educationEntries.find((e) => e.id === eid);
                    if (entry) {
                         return fuzzyMatch(`${searchText} ${entry.keywords.join(" ")}`, query);
                    }
               }

               return fuzzyMatch(searchText, query);
          });
     }, [query, allItems]);

     // Group filtered items by category
     const grouped = useMemo(() => {
          const groups: Record<string, { label: string; items: SearchItem[] }> = {};
          const order = ["section", "project", "experience", "education"];
          const labels: Record<string, string> = {
               section: "Sections",
               project: "Projects",
               experience: "Experience",
               education: "Education",
          };

          for (const item of filtered) {
               let group = groups[item.category];
               if (!group) {
                    group = { label: labels[item.category] || item.category, items: [] };
                    groups[item.category] = group;
               }
               group.items.push(item);
          }

          return order
               .map((k) => groups[k])
               .filter((g): g is { label: string; items: SearchItem[] } => g !== undefined);
     }, [filtered]);

     // Flat list for keyboard nav
     const flatItems = useMemo(() => grouped.flatMap((g) => g.items), [grouped]);

     // Precompute flat index for each item id (avoids mutable counter in render)
     const flatIndexMap = useMemo(() => {
          const map = new Map<string, number>();
          flatItems.forEach((item, i) => map.set(item.id, i));
          return map;
     }, [flatItems]);

     // Reset selection when query changes
     useEffect(() => {
          setSelectedIndex(0);
     }, [query]);

     // Focus input on open
     useEffect(() => {
          if (isOpen) {
               setQuery("");
               setSelectedIndex(0);
               setTimeout(() => inputRef.current?.focus(), 50);
          }
     }, [isOpen]);

     // Scroll selected item into view
     useEffect(() => {
          if (!listRef.current) return;
          const selected = listRef.current.querySelector("[data-selected='true']");
          if (selected) {
               selected.scrollIntoView({ block: "nearest" });
          }
     }, [selectedIndex]);

     const handleSelect = useCallback(
          (item: SearchItem) => {
               onClose();
               setTimeout(() => item.action(), 150);
          },
          [onClose]
     );

     const handleKeyDown = useCallback(
          (e: React.KeyboardEvent) => {
               if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setSelectedIndex((i) => Math.min(i + 1, flatItems.length - 1));
               } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setSelectedIndex((i) => Math.max(i - 1, 0));
               } else if (e.key === "Enter") {
                    e.preventDefault();
                    if (flatItems[selectedIndex]) {
                         handleSelect(flatItems[selectedIndex]);
                    }
               } else if (e.key === "Escape") {
                    onClose();
               }
          },
          [flatItems, selectedIndex, handleSelect, onClose]
     );

     // Theme-aware colors
     const overlayBg = isDark ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0.3)";
     const panelBg = isDark ? "rgba(15, 15, 18, 0.95)" : "rgba(255, 255, 255, 0.96)";
     const panelBorder = isDark ? "rgba(63, 63, 70, 0.4)" : "rgba(212, 212, 216, 0.6)";
     const inputBg = isDark ? "rgba(39, 39, 42, 0.5)" : "rgba(244, 244, 245, 0.8)";
     const inputText = isDark ? "#f4f4f5" : "#18181b";
     const inputPlaceholder = isDark ? "#71717a" : "#a1a1aa";
     const categoryText = isDark ? "#71717a" : "#a1a1aa";
     const itemText = isDark ? "#e4e4e7" : "#27272a";
     const itemDesc = isDark ? "#71717a" : "#a1a1aa";
     const selectedBg = isDark ? "rgba(63, 63, 70, 0.4)" : "rgba(244, 244, 245, 0.9)";
     const footerBg = isDark ? "rgba(24, 24, 27, 0.8)" : "rgba(244, 244, 245, 0.6)";
     const kbdBg = isDark ? "#27272a" : "#e4e4e7";
     const kbdText = isDark ? "#a1a1aa" : "#52525b";

     let itemCounter = -1;

     return (
          <AnimatePresence>
               {isOpen && (
                    <motion.div
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         exit={{ opacity: 0 }}
                         transition={{ duration: 0.12 }}
                         data-cmd-palette
                         className="fixed inset-0 z-[100] flex items-start justify-center pt-[18vh]"
                         style={{ backgroundColor: overlayBg }}
                         onClick={(e) => {
                              if (e.target === e.currentTarget) onClose();
                         }}
                    >
                         <motion.div
                              initial={{ opacity: 0, scale: 0.97, y: -6 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.97, y: -6 }}
                              transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
                              className="w-full max-w-[540px] mx-4 rounded-xl overflow-hidden"
                              style={{
                                   background: panelBg,
                                   border: `1px solid ${panelBorder}`,
                                   boxShadow: isDark
                                        ? "0 25px 50px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.05) inset"
                                        : "0 25px 50px rgba(0,0,0,0.12), 0 0 0 0.5px rgba(255,255,255,0.8) inset",
                                   backdropFilter: "blur(24px) saturate(1.5)",
                              }}
                              onKeyDown={handleKeyDown}
                         >
                              {/* Search input */}
                              <div
                                   className="flex items-center gap-3 px-4 py-3.5"
                                   style={{ borderBottom: `1px solid ${panelBorder}` }}
                              >
                                   <Search className="h-[18px] w-[18px] shrink-0" style={{ color: categoryText }} />
                                   <input
                                        ref={inputRef}
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Type a command or search…"
                                        className="flex-1 bg-transparent text-[0.95rem] font-medium outline-none placeholder:font-normal"
                                        style={{ color: inputText }}
                                        autoComplete="off"
                                        spellCheck={false}
                                   />
                                   <kbd
                                        className="hidden sm:inline-flex items-center rounded-md px-1.5 py-0.5 text-[0.7rem] font-medium"
                                        style={{ backgroundColor: kbdBg, color: kbdText }}
                                   >
                                        ESC
                                   </kbd>
                              </div>

                              {/* Results */}
                              <div
                                   ref={listRef}
                                   className="max-h-[360px] overflow-y-auto px-2 py-2"
                                   style={{ scrollbarWidth: "thin" }}
                              >
                                   {flatItems.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center py-12 gap-2">
                                             <Search className="h-8 w-8" style={{ color: categoryText, opacity: 0.4 }} />
                                             <p className="text-sm font-medium" style={{ color: categoryText }}>
                                                  No results found
                                             </p>
                                        </div>
                                   ) : (
                                        grouped.map((group) => (
                                             <div key={group.label} className="mb-2">
                                                  <div
                                                       className="px-2 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.1em]"
                                                       style={{ color: categoryText }}
                                                  >
                                                       {group.label}
                                                  </div>
                                                  {group.items.map((item) => {
                                                       const idx = flatIndexMap.get(item.id) ?? 0;
                                                       const isSelected = idx === selectedIndex;
                                                       return (
                                                            <button
                                                                 key={item.id}
                                                                 data-selected={isSelected}
                                                                 onClick={() => handleSelect(item)}
                                                                 onMouseEnter={() => setSelectedIndex(idx)}
                                                                 className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left cursor-pointer"
                                                                 style={{
                                                                      backgroundColor: isSelected ? selectedBg : "transparent",
                                                                 }}
                                                            >
                                                                 <item.icon
                                                                      className="h-4 w-4 shrink-0"
                                                                      style={{ color: isSelected ? itemText : categoryText }}
                                                                 />
                                                                 <div className="flex-1 min-w-0">
                                                                      <span
                                                                           className="block text-[0.88rem] font-medium truncate"
                                                                           style={{ color: itemText }}
                                                                      >
                                                                           {item.label}
                                                                      </span>
                                                                      {item.description && (
                                                                           <span
                                                                                className="block text-[0.75rem] truncate mt-0.5"
                                                                                style={{ color: itemDesc }}
                                                                           >
                                                                                {item.description}
                                                                           </span>
                                                                      )}
                                                                 </div>
                                                                 {isSelected && (
                                                                      <ArrowRight
                                                                           className="h-3.5 w-3.5 shrink-0"
                                                                           style={{ color: categoryText }}
                                                                      />
                                                                 )}
                                                            </button>
                                                       );
                                                  })}
                                             </div>
                                        ))
                                   )}
                              </div>

                              {/* Footer */}
                              <div
                                   className="flex items-center justify-between px-4 py-2.5 text-[0.7rem]"
                                   style={{
                                        borderTop: `1px solid ${panelBorder}`,
                                        backgroundColor: footerBg,
                                        color: categoryText,
                                   }}
                              >
                                   <div className="flex items-center gap-3">
                                        <span className="flex items-center gap-1">
                                             <kbd
                                                  className="inline-flex items-center justify-center rounded px-1 py-0.5 text-[0.65rem] font-medium"
                                                  style={{ backgroundColor: kbdBg, color: kbdText }}
                                             >
                                                  ↑
                                             </kbd>
                                             <kbd
                                                  className="inline-flex items-center justify-center rounded px-1 py-0.5 text-[0.65rem] font-medium"
                                                  style={{ backgroundColor: kbdBg, color: kbdText }}
                                             >
                                                  ↓
                                             </kbd>
                                             <span className="ml-0.5">Navigate</span>
                                        </span>
                                        <span className="flex items-center gap-1">
                                             <kbd
                                                  className="inline-flex items-center justify-center rounded px-1 py-0.5 text-[0.65rem] font-medium"
                                                  style={{ backgroundColor: kbdBg, color: kbdText }}
                                             >
                                                  <CornerDownLeft className="h-2.5 w-2.5" />
                                             </kbd>
                                             <span className="ml-0.5">Select</span>
                                        </span>
                                   </div>
                                   <span className="flex items-center gap-1">
                                        <kbd
                                             className="inline-flex items-center justify-center rounded px-1 py-0.5 text-[0.65rem] font-medium"
                                             style={{ backgroundColor: kbdBg, color: kbdText }}
                                        >
                                             ESC
                                        </kbd>
                                        <span className="ml-0.5">Close</span>
                                   </span>
                              </div>
                         </motion.div>
                    </motion.div>
               )}
          </AnimatePresence>
     );
}

// ── Hook for global ⌘K shortcut ───────────────────────────────────────

export function useCommandPalette() {
     const [isOpen, setIsOpen] = useState(false);

     useEffect(() => {
          const handler = (e: KeyboardEvent) => {
               if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                    e.preventDefault();
                    setIsOpen((prev) => !prev);
               }
          };
          window.addEventListener("keydown", handler);
          return () => window.removeEventListener("keydown", handler);
     }, []);

     return { isOpen, setIsOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) };
}
