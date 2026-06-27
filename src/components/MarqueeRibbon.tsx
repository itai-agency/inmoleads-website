import { Marquee } from "@/components/motion/Motion";

const TOP = ["Flipping inmobiliario", "Leads calificados", "Rentabilidad"];
const BOTTOM = ["Inversiones", "Marketing digital", "InmoLeads"];

const Word = ({ children }: { children: string }) => (
  <span className="text-display mx-6 inline-flex items-center gap-6 whitespace-nowrap text-[clamp(2.5rem,9vw,6.5rem)] font-bold uppercase leading-none tracking-tight">
    {children}
    <span className="text-[#F26120]">/</span>
  </span>
);

const MarqueeRibbon = () => {
  return (
    <section
      aria-hidden
      className="relative overflow-hidden border-y border-[#16181D]/10 bg-[#E4E4DE] py-12 text-[#16181D] md:py-16"
    >
      <Marquee speed={34} className="relative">
        {TOP.map((w, i) => (
          <Word key={i}>{w}</Word>
        ))}
      </Marquee>

      <Marquee speed={40} reverse className="relative mt-2">
        {BOTTOM.map((w, i) => (
          <span
            key={i}
            className="text-display mx-6 inline-flex items-center gap-6 whitespace-nowrap text-[clamp(2.5rem,9vw,6.5rem)] font-bold uppercase leading-none tracking-tight text-[#16181D]/20"
          >
            {w}
            <span className="text-[#E85C03]">/</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
};

export default MarqueeRibbon;
