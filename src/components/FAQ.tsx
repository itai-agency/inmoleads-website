import { useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, Stagger, StaggerItem, AnimatedWords } from "@/components/motion/Motion";
import SectionLabel from "@/components/SectionLabel";

const items = [
  {
    q: "¿Cómo funciona el servicio de marketing de forma continua?",
    a: "Nuestro servicio opera con una suscripción mensual, donde cada mes adaptamos y desarrollamos la estrategia de marketing según tus objetivos y metas actuales.",
  },
  {
    q: "¿Hay contratos de largo plazo involucrados?",
    a: "Siguiendo nuestra política en INMOLEADS, no imponemos contratos, ya que nuestra prioridad es garantizar los resultados que necesitas en cada mes de colaboración.",
  },
  {
    q: "¿Ofrecemos garantía en relación a los resultados acordados?",
    a: "Sí, en InmoLeads ofrecemos una garantía: si en un plazo de 3 meses no obtienes los resultados esperados, trabajaremos de manera gratuita hasta cumplir con los objetivos establecidos.",
  },
  {
    q: "¿Cómo se formaliza la colaboración si no empleamos contratos?",
    a: "Utilizamos un acuerdo de prestación de servicios detallado, donde especificamos tareas y responsabilidades tanto de nuestra agencia como del cliente.",
  },
  {
    q: "¿Cuándo se pueden esperar resultados concretos?",
    a: "Como en toda estrategia de marketing, los resultados pueden variar. Sugerimos considerar un período de aprendizaje de 90 días para evaluar resultados significativos de forma realista.",
  },
  {
    q: "¿Quién posee los diseños, videos y material visual: INMOLEADS o los clientes?",
    a: "Todos los diseños, videos y contenido visual son propiedad exclusiva de nuestros clientes. Respetamos y garantizamos su plena titularidad sobre el material generado.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="preguntas-frecuentes"
      className="relative overflow-hidden bg-[#E4E4DE] py-28 font-montserrat text-[#16181D]"
    >
      <div className="bg-blueprint pointer-events-none absolute inset-0 opacity-60" />
      <div className="container relative z-10 mx-auto max-w-3xl px-6">
        <div className="mb-14">
          <SectionLabel title="FAQ" className="mb-6" />
          <h2 className="text-display text-4xl font-bold leading-[0.95] md:text-6xl">
            <AnimatedWords
              text="Preguntas frecuentes"
              highlight={[1]}
              highlightClassName="text-[#E85C03]"
            />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-5 font-serif text-2xl italic leading-tight text-[#16181D]/65 md:text-3xl">
              Todo lo que necesitas saber.
            </p>
          </Reveal>
        </div>

        <Stagger className="space-y-3" stagger={0.07}>
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <StaggerItem key={i}>
                <div
                  className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                    isOpen
                      ? "border-[#E85C03]/50 bg-white"
                      : "border-[#16181D]/10 bg-white/60 hover:border-[#16181D]/25"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left md:px-8"
                  >
                    <span
                      className={`text-display text-lg font-semibold leading-snug transition-colors md:text-xl ${
                        isOpen ? "text-[#E85C03]" : "text-[#16181D]"
                      }`}
                    >
                      {it.q}
                    </span>
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors ${
                        isOpen ? "bg-[#E85C03] text-white" : "bg-[#16181D]/8 text-[#16181D]"
                      }`}
                    >
                      <Plus
                        className={`h-5 w-5 transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-6 pb-6 pt-0 text-sm leading-relaxed text-[#16181D]/70 md:px-8 md:text-base">
                          {it.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
};

export default FAQ;
