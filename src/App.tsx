import "./App.css";
import { AboutCard } from "./components/AboutCard";
import { LinksCard } from "./components/LinksCard";
import { ParticleBackground } from "./components/ParticleBackground";
import { ProfileCard } from "./components/ProfileCard";
import { SkillsCard } from "./components/SkillsCard";

function App() {
  return (
    <>
      <ParticleBackground />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <ProfileCard />
        <AboutCard />
        <SkillsCard />
        <LinksCard />
      </div>
    </>
  );
}

export default App;
