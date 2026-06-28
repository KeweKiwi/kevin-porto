import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <section className="min-h-[70svh] pt-32">
      <Container>
        <p className="technical-label mb-5 text-ink-muted">404</p>
        <h1 className="max-w-3xl text-5xl font-semibold leading-none text-ink-primary tablet:text-7xl">
          This case file does not exist.
        </h1>
        <Link
          className="mt-8 inline-flex rounded-[4px] border border-graphite-strong px-4 py-3 text-sm font-medium text-ink-primary transition hover:text-signal"
          href="/"
        >
          Return home
        </Link>
      </Container>
    </section>
  );
}
