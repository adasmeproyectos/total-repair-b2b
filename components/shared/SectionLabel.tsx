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
      <div className="w-6 h-[2px] bg-[#FF5000]" aria-hidden="true" />
      <span
        className={`text-xs font-mono uppercase tracking-[0.2em] font-semibold ${
          dark ? "text-zinc-300" : "text-zinc-500"
        }`}
      >
        {content}
      </span>
    </div>
  );
}

export default SectionLabel;
