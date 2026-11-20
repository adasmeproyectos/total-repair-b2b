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
    <div className={`flex items-center gap-3 mb-3 ${className}`}>
      <span
        style={{ backgroundColor: "var(--color-brand-orange, #E8490F)" }}
        className="w-5 h-[2px] inline-block shrink-0"
        aria-hidden="true"
      />
      <span
        style={!dark ? { color: "var(--color-ink-mid, #57534E)" } : undefined}
        className={`text-xs font-mono uppercase tracking-[0.14em] ${
          dark ? "text-zinc-300" : ""
        }`}
      >
        {content}
      </span>
    </div>
  );
}

export default SectionLabel;
