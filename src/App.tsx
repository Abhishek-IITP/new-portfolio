
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BreifDetail } from "./components/BreifDetail";
import { ConnectHub } from "./components/ConnectHub";
import { AboutSection } from "./components/About-Sectioon";
import { GithubStreak } from "./components/GithubStreak";
import { ProjectSection } from "./components/ProjectsSection";
import { TechStack } from "./components/TechStack";
import { TopInfo } from "./components/Top-Info";
import { TopVideo } from "./components/TopVideo";
import { Experience } from "./components/Experience";
import { ProjectDetail } from "./components/ProjectDetail";
import { QuoteSection } from "./components/QuoteSection";
import { Footer } from "./components/Footer";
import { Sidebar } from "./components/Sidebar";
import { CommandPalette, useCommandPalette } from "./components/CommandPalette";

export function App() {
  const [currentRoute, setCurrentRoute] = useState("/");
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const cmdPalette = useCommandPalette();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || "/";
      setCurrentRoute(hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    // Fast visual progress increment for the loader
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 12) + 6;
        return Math.min(prev + step, 100);
      });
    }, 70);

    const handleLoad = () => {
      setTimeout(() => {
        setLoading(false);
      }, 700);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => {
        clearInterval(interval);
        window.removeEventListener("load", handleLoad);
      };
    }
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    if (currentRoute === "#/experience-all") {
      return (
        <div className="mx-auto max-w-5xl min-h-screen bg-white dark:bg-zinc-950">
          <TopVideo />
          <Experience isFullPage={true} />
        </div>
      );
    }

    if (currentRoute === "#/projects-all") {
      return (
        <div className="mx-auto max-w-5xl min-h-screen bg-white dark:bg-zinc-950">
          <TopVideo />
          <ProjectSection isFullPage={true} />
        </div>
      );
    }

    // Dynamic project detail pages: #/project/:slug
    if (currentRoute.startsWith("#/project/")) {
      const slug = currentRoute.replace("#/project/", "");
      return (
        <div className="mx-auto max-w-5xl min-h-screen bg-white dark:bg-zinc-950">
          <TopVideo />
          <ProjectDetail slug={slug} />
        </div>
      );
    }

    return (
      <div className="mx-auto max-w-5xl bg-white dark:bg-zinc-950">
        <div id="home">
          <TopVideo />
          <TopInfo onOpenSearch={cmdPalette.open} />
          {/* <BreifDetail /> */}
        </div>
        <div id="about">
          <AboutSection />
          <ConnectHub />
        </div>
        <div id="tech">
          <TechStack />
        </div>
        <div id="experience">
          <Experience />
        </div>
        <div id="projects">
          <ProjectSection />
        </div>
        <div id="github">
          <GithubStreak />
        </div>
        <QuoteSection/>
        <Footer />
        <Sidebar onOpenSearch={cmdPalette.open} />
      </div>
    );
  };

  return (
    <div className="min-h-screen text-black dark:text-white transition-colors duration-300">
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-[#0c0c0e] select-none"
          >
            <div className="flex flex-col items-center max-w-xs w-full px-6">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="text-lg font-bold tracking-[0.25em] text-zinc-950 dark:text-zinc-50 font-mono uppercase mb-6"
              >
                ABHISHEK MOHANTY
              </motion.div>
              
              <div className="w-full h-[2px] bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-zinc-950 dark:bg-zinc-50 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeInOut" }}
                />
              </div>

              <div className="flex justify-between w-full mt-3 text-[0.62rem] font-mono tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
                <span>Initializing</span>
                <span>{progress}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {renderContent()}
      <CommandPalette isOpen={cmdPalette.isOpen} onClose={cmdPalette.close} />
    </div>
  );
}

export default App;
