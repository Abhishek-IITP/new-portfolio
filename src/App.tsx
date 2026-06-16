
import { BreifDetail } from "./components/BreifDetail";
import { AboutSection } from "./components/About-Sectioon";
import { GithubStreak } from "./components/GithubStreak";
import { ProjectSection } from "./components/ProjectsSection";
import { TechStack } from "./components/TechStack";
import { TopInfo } from "./components/Top-Info";
import { TopVideo } from "./components/TopVideo";


export function App() {
  return (
    <div className="mx-auto max-w-200 border-2 text-pink-500">
     <TopVideo/>
     <TopInfo/>
     <BreifDetail/>
     <AboutSection/>
     <GithubStreak/>
     <TechStack/>
     <ProjectSection/>
    </div>
  );
}

export default App;
