export type Shortcut = { keys: string; label: string };

export function KeyboardHints({ shortcuts }: { shortcuts: Shortcut[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-muted pt-1">
      <span className="font-mono uppercase tracking-wider text-[10px]">
        Keyboard
      </span>
      {shortcuts.map((s) => (
        <span key={s.keys} className="inline-flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 rounded border border-border bg-surface font-mono text-[10px] shadow-sm text-foreground/80">
            {s.keys}
          </kbd>
          <span>{s.label}</span>
        </span>
      ))}
    </div>
  );
}
