export function SkipLink() {
  return (
    <a
      className="screen-reader-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[4px] focus:bg-signal focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-graphite-page"
      href="#main-content"
    >
      Skip to content
    </a>
  );
}
