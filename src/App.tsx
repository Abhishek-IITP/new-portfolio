
import { useEffect, useState } from "react";
import { BreifDetail } from "./components/BreifDetail";
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

  if (currentRoute === "#/experience-all") {
    return (
      <div className="min-h-screen text-black dark:text-white transition-colors duration-300">
        <div className="mx-auto max-w-5xl min-h-screen bg-white dark:bg-zinc-950">
          <TopVideo />
          <Experience isFullPage={true} />
        </div>
        <CommandPalette isOpen={cmdPalette.isOpen} onClose={cmdPalette.close} />
      </div>
    );
  }

  if (currentRoute === "#/projects-all") {
    return (
      <div className="min-h-screen text-black dark:text-white transition-colors duration-300">
        <div className="mx-auto max-w-5xl min-h-screen bg-white dark:bg-zinc-950">
          <TopVideo />
          <ProjectSection isFullPage={true} />
        </div>
        <CommandPalette isOpen={cmdPalette.isOpen} onClose={cmdPalette.close} />
      </div>
    );
  }

  // Dynamic project detail pages: #/project/:slug
  if (currentRoute.startsWith("#/project/")) {
    const slug = currentRoute.replace("#/project/", "");
    return (
      <div className="min-h-screen text-black dark:text-white transition-colors duration-300">
        <div className="mx-auto max-w-5xl min-h-screen bg-white dark:bg-zinc-950">
          <TopVideo />
          <ProjectDetail slug={slug} />
        </div>
        <CommandPalette isOpen={cmdPalette.isOpen} onClose={cmdPalette.close} />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-black dark:text-white transition-colors duration-300">
      <div className="mx-auto max-w-5xl bg-white dark:bg-zinc-950">
        <div id="home">
          <TopVideo />
          <TopInfo onOpenSearch={cmdPalette.open} />
          <BreifDetail />
        </div>
        <div id="about">
          <AboutSection />
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
      <CommandPalette isOpen={cmdPalette.isOpen} onClose={cmdPalette.close} />
    </div>
  );
}

export default App;
