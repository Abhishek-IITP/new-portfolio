
import { useEffect, useState } from "react";
import { BreifDetail } from "./components/BreifDetail";
import { AboutSection } from "./components/About-Sectioon";
import { GithubStreak } from "./components/GithubStreak";
import { ProjectSection } from "./components/ProjectsSection";
import { TechStack } from "./components/TechStack";
import { TopInfo } from "./components/Top-Info";
import { TopVideo } from "./components/TopVideo";
import { Experience } from "./components/Experience";


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
        <div className="mx-auto max-w-200 min-h-screen bg-white dark:bg-zinc-950">
          <TopVideo />
          <Experience isFullPage={true} />
        </div>
      </div>
    );
  }

  if (currentRoute === "#/projects-all") {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-black dark:text-white transition-colors duration-300">
        <div className="mx-auto max-w-200 min-h-screen bg-white dark:bg-zinc-950">
          <TopVideo />
          <ProjectSection isFullPage={true} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-black dark:text-white transition-colors duration-300">
      <div className="mx-auto max-w-230">
        <TopVideo />
        <TopInfo />
        <BreifDetail />
        <AboutSection />
        <TechStack />
        <Experience />
        <ProjectSection />
        <GithubStreak />
      </div>
    </div>
  );
}

export default App;
