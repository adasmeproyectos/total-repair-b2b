interface SectionLabelProps {
  label?: string;
  text?: string;
  className?: string;
  dark?: boolean;
}

export function SectionLabel({
  label,
  text,
  className = "",
  dark = false,
}: SectionLabelProps) {
  const content = label ?? text ?? "";
  return (
    <div className={`flex items-center gap-3 mb-4 ${className}`}>
      <div
        style={{ backgroundColor: "var(--color-brand-orange, #FF5000)" }}
        className="w-6 h-[2px]"
        aria-hidden="true"
      />
      <span
        style={!dark ? { color: "var(--color-ink-mid, #52525B)" } : undefined}
        className={`text-xs font-mono uppercase tracking-[0.2em] font-semibold ${
          dark ? "text-zinc-300" : ""
        }`}
      >
        {content}
      </span>
    </div>
  );
}

export default SectionLabel;
