import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Reveal, AnimatedWords } from "@/components/motion/Motion";
import SectionLabel from "@/components/SectionLabel";

const INK = "#16181D";
const ORANGE = "#E85C03";

const steps = [
  {
    no: "01",
    name: "Atracción precisa",
    lead: "Llegamos al inversionista correcto con campañas que sí convierten.",
  },
  {
    no: "02",
    name: "Filtrado inteligente",
    lead: "Separamos los prospectos serios de los curiosos, sin perder tu tiempo.",
  },
  {
    no: "03",
    name: "Conversión efectiva",
    lead: "Te entregamos citas y contactos listos para cerrar la venta.",
  },
];

const Process = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="proceso" className="relative bg-[#E4E4DE] py-28 text-[#16181D]">
      <div className="bg-blueprint pointer-events-none absolute inset-0 opacity-70" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          {/* sticky left rail */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionLabel title="Proceso" className="mb-6" />
              <h2 className="text-display text-4xl font-bold leading-[0.95] md:text-6xl">
                <AnimatedWords
                  text="Un proceso inteligente"
                  highlight={[2]}
                  highlightClassName="text-[#E85C03]"
                />
                <br />
                <AnimatedWords text="para resultados reales" />
              </h2>
              <Reveal delay={0.15}>
                <p className="mt-5 font-serif text-2xl italic leading-tight text-[#16181D]/65 md:text-3xl">
                  Del primer clic al cierre.
                </p>
              </Reveal>

              <ol className="mt-10 hidden space-y-1 border-l border-[#16181D]/15 lg:block">
                {steps.map((s, i) => (
                  <li key={s.no}>
                    <button
                      onClick={() =>
                        document
                          .getElementById(`paso-${s.no}`)
                          ?.scrollIntoView({ behavior: "smooth", block: "center" })
                      }
                      className={`flex items-center gap-4 py-2 pl-5 text-left transition-all duration-300 ${
                        active === i
                          ? "-ml-px border-l-2 border-[#E85C03] text-[#16181D]"
                          : "text-[#16181D]/40 hover:text-[#16181D]/70"
                      }`}
                    >
                      <span className="label-mono text-[11px]">{s.no}</span>
                      <span className="text-display text-lg font-semibold">
                        {s.name}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* scrolling steps */}
          <div className="mt-14 space-y-20 lg:col-span-7 lg:mt-0 lg:space-y-28">
            {steps.map((s, i) => (
              <Step key={s.no} step={s} index={i} setActive={setActive} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

function Step({
  step,
  index,
  setActive,
}: {
  step: (typeof steps)[number];
  index: number;
  setActive: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.6, margin: "-20% 0px -20% 0px" });

  useEffect(() => {
    if (inView) setActive(index);
  }, [inView, index, setActive]);

  return (
    <motion.div
      ref={ref}
      id={`paso-${step.no}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="scroll-mt-28"
    >
      <div className="mb-5 flex items-baseline gap-4 lg:hidden">
        <span className="text-display text-5xl font-bold leading-none text-[#E85C03]">
          {step.no}
        </span>
        <span className="text-display text-2xl font-semibold">{step.name}</span>
      </div>

      {/* designed visual (replaceable placeholder) */}
      <StepVisual no={step.no} name={step.name} index={index} inView={inView} />

      <p className="mt-5 max-w-md font-serif text-xl italic leading-snug text-[#16181D]/60">
        {step.lead}
      </p>
    </motion.div>
  );
}

/* ---- Designed step figures (swap for real renders later) ---- */
function StepVisual({
  no,
  name,
  index,
  inView,
}: {
  no: string;
  name: string;
  index: number;
  inView: boolean;
}) {
  return (
    <div className="group relative aspect-[16/10] overflow-hidden rounded-[20px] border border-[#16181D]/12 bg-gradient-to-br from-white/75 to-[#dedcd5] shadow-[0_30px_60px_rgba(40,50,65,0.12)]">
      <div className="bg-blueprint absolute inset-0 opacity-50" />
      {/* ghost number */}
      <span className="text-display pointer-events-none absolute right-6 top-2 text-[7rem] font-bold leading-none text-[#16181D]/[0.06]">
        {no}
      </span>
      {/* corner ticks */}
      <span className="ruler-ticks absolute inset-x-6 top-6 h-1.5 opacity-30" />

      <div className="absolute inset-0 grid place-items-center p-6">
        <svg viewBox="0 0 400 230" className="h-full w-full">
          {index === 0 && <RadarFig inView={inView} />}
          {index === 1 && <FunnelFig inView={inView} />}
          {index === 2 && <GrowthFig inView={inView} />}
        </svg>
      </div>

      <span className="label-mono absolute bottom-4 left-6 text-[9px] text-[#16181D]/45">
        Fig. {no} — {name}
      </span>
    </div>
  );
}

/* 01 — Atracción: radar/target attracting signals */
function RadarFig({ inView }: { inView: boolean }) {
  const cx = 200;
  const cy = 115;
  return (
    <g fill="none" stroke={INK} strokeOpacity={0.22}>
      {[40, 75, 110].map((r, i) => (
        <circle key={r} cx={cx} cy={cy} r={r} strokeDasharray={i === 2 ? "3 5" : ""} />
      ))}
      <line x1={cx - 120} y1={cy} x2={cx + 120} y2={cy} />
      <line x1={cx} y1={cy - 95} x2={cx} y2={cy + 95} />
      {/* incoming signals */}
      {[
        [60, 40],
        [340, 55],
        [70, 190],
        [330, 185],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={4} fill={INK} fillOpacity={0.35} stroke="none" />
          <motion.line
            x1={x}
            y1={y}
            x2={cx}
            y2={cy}
            stroke={INK}
            strokeOpacity={0.15}
            strokeDasharray="2 4"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2 + i * 0.12 }}
          />
        </g>
      ))}
      {/* center marker */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={9}
        fill={ORANGE}
        stroke="none"
        animate={{ opacity: [1, 0.55, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx={cx} cy={cy} r={18} stroke={ORANGE} strokeOpacity={0.5} />
    </g>
  );
}

/* 02 — Filtrado: many prospects → funnel → few qualified */
function FunnelFig({ inView }: { inView: boolean }) {
  const top = [70, 120, 170, 220, 270, 320];
  return (
    <g fill="none" stroke={INK}>
      {/* input dots */}
      {top.map((x, i) => (
        <circle key={i} cx={x} cy={30} r={5} fill={INK} fillOpacity={0.3} stroke="none" />
      ))}
      {/* funnel */}
      <motion.path
        d="M60 60 H330 L225 150 V185 H165 V150 Z"
        stroke={INK}
        strokeOpacity={0.4}
        strokeWidth={1.5}
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <line x1={110} y1={92} x2={280} y2={92} stroke={INK} strokeOpacity={0.18} strokeDasharray="3 5" />
      <line x1={150} y1={122} x2={240} y2={122} stroke={INK} strokeOpacity={0.18} strokeDasharray="3 5" />
      {/* output (qualified) */}
      <motion.circle
        cx={195}
        cy={210}
        r={8}
        fill={ORANGE}
        stroke="none"
        initial={{ opacity: 0, y: -10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.9, duration: 0.5 }}
      />
    </g>
  );
}

/* 03 — Conversión: growth line up to a closed deal */
function GrowthFig({ inView }: { inView: boolean }) {
  return (
    <g fill="none">
      {/* axes */}
      <line x1={50} y1={30} x2={50} y2={195} stroke={INK} strokeOpacity={0.2} />
      <line x1={50} y1={195} x2={360} y2={195} stroke={INK} strokeOpacity={0.2} />
      {/* baseline grid */}
      {[150, 100, 60].map((y) => (
        <line key={y} x1={50} y1={y} x2={360} y2={y} stroke={INK} strokeOpacity={0.08} strokeDasharray="2 5" />
      ))}
      {/* growth line */}
      <motion.polyline
        points="60,180 130,150 200,160 270,95 340,45"
        stroke={ORANGE}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
      {/* end node = closed */}
      <motion.g
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.1, duration: 0.4 }}
        style={{ transformOrigin: "340px 45px" }}
      >
        <circle cx={340} cy={45} r={14} fill={ORANGE} />
        <path
          d="M333 45 l5 5 l9 -10"
          stroke="#fff"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </motion.g>
    </g>
  );
}

export default Process;
