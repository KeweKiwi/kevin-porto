import { CapabilityMatrix } from "@/components/capability-matrix";
import { ContactClosing } from "@/components/contact-closing";
import { EvidenceAbout } from "@/components/evidence-about";
import { EvidenceCounterStrip } from "@/components/evidence-counter-strip";
import { HeroDossier } from "@/components/hero-dossier";
import { SelectedWorkShowcase } from "@/components/selected-work-showcase";
import { TechnicalSkillsSystem } from "@/components/technical-skills-system";

export default function HomePage() {
  return (
    <>
      <HeroDossier />
      <EvidenceCounterStrip />
      <CapabilityMatrix />
      <SelectedWorkShowcase />
      <TechnicalSkillsSystem />
      <EvidenceAbout />
      <ContactClosing />
    </>
  );
}
