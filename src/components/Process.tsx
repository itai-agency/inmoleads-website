import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import procesoUno from "@/assets/1.png";
import procesoDos from "@/assets/2.png";
import procesoTres from "@/assets/3.png";
import { Reveal, AnimatedWords } from "@/components/motion/Motion";
import SectionLabel from "@/components/SectionLabel";

const steps = [
  {
    no: "01",
    image: procesoUno,
    name: "Atracción precisa",
    lead: "Llegamos al inversionista correcto con campañas que sí convierten.",
  },
  {
    no: "02",
    image: procesoDos,
    name: "Filtrado inteligente",
    lead: "Separamos los prospectos serios de los curiosos, sin perder tu tiempo.",
  },
  {
    no: "03",
    image: procesoTres,
    name: "Conversión efectiva",
    lead: "Te entregamos citas y contactos listos para cerrar la venta.",
  },
];

const Process = () => {
  const [active, setActive] = useState(0);

  return (
    <section
      id="proceso"
      className="relative bg-[#E4E4DE] py-28 text-[#16181D]"
    >
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

              {/* step index with active highlight */}
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
      <div className="group overflow-hidden rounded-[20px] border border-[#16181D]/10 bg-white/40 shadow-[0_30px_60px_rgba(40,50,65,0.12)]">
        <img
          src={step.image}
          alt={step.name}
          className="w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
          loading="lazy"
          decoding="async"
        />
      </div>
      <p className="mt-5 max-w-md font-serif text-xl italic leading-snug text-[#16181D]/60">
        {step.lead}
      </p>
    </motion.div>
  );
}

export default Process;
