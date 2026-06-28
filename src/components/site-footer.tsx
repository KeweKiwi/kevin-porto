import Link from "next/link";
import { Container } from "@/components/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-graphite-border py-8">
      <Container className="flex flex-col gap-5 text-sm text-ink-muted tablet:flex-row tablet:items-center tablet:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink-primary">Kevin William Faith</p>
          <p className="mt-2">iOS Developer & Web Developer</p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-5">
          <Link className="transition hover:text-signal" href="/#work">
            Work
          </Link>
          <Link className="transition hover:text-signal" href="/#about">
            About
          </Link>
          <Link className="transition hover:text-signal" href="/#contact">
            Contact
          </Link>
        </nav>
        <p>© 2026</p>
      </Container>
    </footer>
  );
}
