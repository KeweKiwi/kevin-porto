import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  body?: string;
  className?: string;
};

export function SectionHeading({ eyebrow, title, body, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-4xl", className)}>
      <p className="technical-label mb-5 text-ink-muted">{eyebrow}</p>
      <h2 className="text-4xl font-semibold leading-none text-ink-primary tablet:text-6xl desktop:text-7xl">
        {title}
      </h2>
      {body ? (
        <p className="mt-6 max-w-2xl text-base leading-[1.55] text-ink-secondary tablet:text-lg">
          {body}
        </p>
      ) : null}
    </div>
  );
}
