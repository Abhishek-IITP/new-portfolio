
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


export function App() {
  const [currentRoute, setCurrentRoute] = useState("/");

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
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-black dark:text-white transition-colors duration-300">
        <div className="mx-auto max-w-5xl min-h-screen bg-white dark:bg-zinc-950">
          <TopVideo />
          <Experience isFullPage={true} />
        </div>
      </div>
    );
  }

  if (currentRoute === "#/projects-all") {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-black dark:text-white transition-colors duration-300">
        <div className="mx-auto max-w-5xl min-h-screen bg-white dark:bg-zinc-950">
          <TopVideo />
          <ProjectSection isFullPage={true} />
        </div>
      </div>
    );
  }

  // Dynamic project detail pages: #/project/:slug
  if (currentRoute.startsWith("#/project/")) {
    const slug = currentRoute.replace("#/project/", "");
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-black dark:text-white transition-colors duration-300">
        <div className="mx-auto max-w-5xl min-h-screen bg-white dark:bg-zinc-950">
          <TopVideo />
          <ProjectDetail slug={slug} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-black dark:text-white transition-colors duration-300">
      <div className="mx-auto max-w-5xl">
        <TopVideo />
        <TopInfo />
        <BreifDetail />
        <AboutSection />
        <TechStack />
        <Experience />
        <ProjectSection />
        <GithubStreak />
        <QuoteSection/>
      </div>
    </div>
  );
}

export default App;
