import { ContactClosing } from "@/components/contact-closing";
import { EvidenceAbout } from "@/components/evidence-about";
import { EvidenceCounterStrip } from "@/components/evidence-counter-strip";
import { HeroDossier } from "@/components/hero-dossier";
import { SystemLoader } from "@/components/intro/SystemLoader";
import { PersonalIntroduction } from "@/components/personal-introduction";
import { SelectedWorkShowcase } from "@/components/selected-work-showcase";
import { SkillSignalMarquee } from "@/components/skill-signal-marquee";
import { TechnicalSkillsSystem } from "@/components/technical-skills-system";

export default function HomePage() {
  return (
      <>
        <SystemLoader />
        <HeroDossier />
        <SkillSignalMarquee />
        <PersonalIntroduction />
        <EvidenceCounterStrip />
        <SelectedWorkShowcase />
        <TechnicalSkillsSystem />
        <EvidenceAbout />
      <ContactClosing />
    </>
  );
}
