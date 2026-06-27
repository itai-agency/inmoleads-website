import { Reveal } from "@/components/motion/Motion";

/**
 * Editorial section label. Pass `index` ONLY when the section is a real
 * sequence (e.g. Proceso); otherwise it shows a surveyor's marker.
 */
const SectionLabel = ({
  index,
  title,
  onDark = false,
  className = "",
}: {
  index?: string;
  title: string;
  onDark?: boolean;
  className?: string;
}) => {
  const ink = onDark ? "text-white/55" : "text-[#16181D]/55";
  const rule = onDark ? "bg-white/25" : "bg-[#16181D]/20";
  return (
    <Reveal
      className={`flex items-center gap-3 label-mono text-[11px] ${ink} ${className}`}
    >
      {index ? (
        <span className="text-[#E85C03]">{index}</span>
      ) : (
        <span className="h-2 w-2 bg-[#E85C03]" />
      )}
      <span className={`h-px w-8 ${rule}`} />
      <span>{title}</span>
    </Reveal>
  );
};

export default SectionLabel;
