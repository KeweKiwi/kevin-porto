const tickPositions = [94, 142, 190, 238, 286, 334, 382, 430, 478, 526];

export function TechnicalMeasurements() {
  return (
    <div aria-hidden="true" className="hero-measurements" data-hero-measurements>
      <svg className="hero-measurements-svg" preserveAspectRatio="none" viewBox="0 0 660 760">
        <path data-hero-measure-path d="M90 18H606M90 18V742H606" pathLength="1" />
        <path data-hero-measure-path d="M52 74V604M36 74H68M36 604H68" pathLength="1" />
        <circle cx="52" cy="48" data-hero-measure-path pathLength="1" r="10" />
        <path data-hero-measure-path d="M52 31V65M35 48H69" pathLength="1" />
        {tickPositions.map((position, index) => (
          <path
            d={`M${index % 2 === 0 ? 44 : 47} ${position}H60`}
            data-hero-measure-path
            key={position}
            pathLength="1"
          />
        ))}
        <path data-hero-measure-path d="M586 18V34M606 18V34M586 742V726M606 742V726" pathLength="1" />
      </svg>
      <span className="hero-measurement-label">PROFILE / 01&nbsp;&nbsp; NATIVE APPLE + WEB</span>
      <span className="hero-measurement-node hero-measurement-node-top" />
      <span className="hero-measurement-node hero-measurement-node-bottom" />
    </div>
  );
}
