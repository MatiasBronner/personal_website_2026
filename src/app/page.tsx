import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import MoreSection from "@/components/MoreSection";




export default function Home() {
  return (
    <main>
      <Nav />
      <HeroSection />
      <AboutSection />
      <ExperienceSection/>
      <ProjectsSection/>
      <SkillsSection/>
      <MoreSection/>
    </main>
  );
}
