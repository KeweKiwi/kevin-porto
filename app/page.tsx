import { ContactClosing } from "@/components/contact-closing";
import { EvidenceAbout } from "@/components/evidence-about";
import { HeroDossier } from "@/components/hero-dossier";
import { HomepageIntro } from "@/components/intro/homepage-intro";
import { PersonalIntroduction } from "@/components/personal-introduction";
import { ProjectArchiveCarousel } from "@/components/project-archive-carousel";
import { SelectedWorkShowcase } from "@/components/selected-work-showcase";
import { TechnicalSkillsSystem } from "@/components/technical-skills-system";

export default function HomePage() {
  return (
    <>
      <HomepageIntro />
      <HeroDossier />
      <PersonalIntroduction />
      <SelectedWorkShowcase />
      <ProjectArchiveCarousel />
      <TechnicalSkillsSystem />
      <EvidenceAbout />
      <ContactClosing />
    </>
  );
}
