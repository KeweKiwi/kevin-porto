type SegmentedNameProps = {
  name: string;
};

export function SegmentedName({ name }: SegmentedNameProps) {
  const lines = name.toUpperCase().split(" ");

  return (
    <h1 aria-label={name} className="kinetic-hero-name">
      <span aria-hidden="true" className="block">
        {lines.map((line, index) => (
          <span className="hero-name-line block overflow-hidden" data-hero-name-line key={line}>
            <span className="hero-name-mask block" data-hero-name-mask>
              <span className="hero-stencil-line" data-line-index={index}>
                <span className="hero-stencil-measure">{line}</span>
                <span className="hero-stencil-layer hero-stencil-top">{line}</span>
                <span className="hero-stencil-layer hero-stencil-middle" data-hero-stencil-middle>
                  {line}
                </span>
                <span className="hero-stencil-layer hero-stencil-bottom">{line}</span>
              </span>
            </span>
          </span>
        ))}
      </span>
    </h1>
  );
}
