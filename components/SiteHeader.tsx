import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-border/60">
      <div className="mx-auto max-w-3xl px-6 py-4 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-baseline gap-1 tracking-tight transition-opacity hover:opacity-80"
          aria-label="Hello, Server — home"
        >
          <span className="text-sm font-medium text-primary">Hello,</span>
          <span className="text-sm font-bold text-foreground">Server</span>
          <span className="text-sm font-medium text-muted">.</span>
        </Link>
        <div className="hidden sm:block text-xs text-muted">
          learn how the internet talks
        </div>
      </div>
    </header>
  );
}
