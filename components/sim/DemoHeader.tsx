export function DemoHeader({
  label,
  tagline,
  expanded,
  onToggle,
}: {
  label: string;
  tagline?: string;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between text-xs text-muted">
      <div className="flex items-baseline gap-3 min-w-0">
        <span className="font-mono uppercase tracking-wider shrink-0">
          {label}
        </span>
        {tagline && (
          <span className="hidden sm:inline text-[11px] truncate">
            {tagline}
          </span>
        )}
      </div>
      <button
        onClick={onToggle}
        className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 hover:bg-foreground/5 hover:text-foreground transition shrink-0"
        aria-label={expanded ? "Exit fullscreen (Esc)" : "Enter fullscreen (F)"}
      >
        {expanded ? <ExitFullscreenIcon /> : <FullscreenIcon />}
        <span>{expanded ? "Exit (Esc)" : "Fullscreen"}</span>
      </button>
    </div>
  );
}

function FullscreenIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExitFullscreenIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M6 2v4H2M10 2v4h4M6 14v-4H2M10 14v-4h4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
