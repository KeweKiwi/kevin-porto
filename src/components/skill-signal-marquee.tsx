const primarySkills = [
  "Swift",
  "SwiftUI",
  "GameKit",
  "Core Motion",
  "SpriteKit",
  "App Intents",
  "SwiftData",
  "Laravel",
  "Filament",
  "MySQL",
] as const;

const deliverySkills = [
  "Technical Leadership",
  "Multiplayer Engineering",
  "Full-Stack Delivery",
  "State-Machine Architecture",
  "Client Delivery",
  "Production Deployment",
  "Responsive Web",
  "Feature Integration",
] as const;

export function SkillSignalMarquee() {
  return (
    <section
      aria-label="Technical focus areas"
      className="relative overflow-hidden border-b border-graphite-border bg-graphite-page"
    >
      <MarqueeRow items={primarySkills} tone="dark" />
      <MarqueeRow items={deliverySkills} direction="right" tone="signal" />
    </section>
  );
}

function MarqueeRow({
  direction = "left",
  items,
  tone,
}: {
  direction?: "left" | "right";
  items: readonly string[];
  tone: "dark" | "signal";
}) {
  return (
    <div className={`skill-marquee-row skill-marquee-row-${tone}`}>
      <div className="skill-marquee-track" data-direction={direction}>
        <SkillGroup items={items} />
        <SkillGroup ariaHidden items={items} />
      </div>
    </div>
  );
}

function SkillGroup({ ariaHidden, items }: { ariaHidden?: boolean; items: readonly string[] }) {
  return (
    <div aria-hidden={ariaHidden} className="skill-marquee-group">
      {items.map((item) => (
        <span key={item} className="skill-marquee-item">
          {item}
        </span>
      ))}
    </div>
  );
}
