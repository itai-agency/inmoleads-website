import { useState } from "react";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import captura1 from "@/assets/captura11.jpeg";
import captura2 from "@/assets/captura2.jpg";
import testimonio1 from "@/assets/testimonio1.jpg";
import { Reveal, AnimatedWords, EASE_OUT } from "@/components/motion/Motion";
import SectionLabel from "@/components/SectionLabel";

type Slide = {
  id: number;
  name: string;
  role: string;
  location: string;
  quote: string;
  mediaSrc: string;
};

const SLIDES: Slide[] = [
  {
    id: 1,
    name: "Axel Serrano",
    role: "Bhaz Inmobiliaria",
    location: "México, Tijuana",
    quote:
      "Nos encantó el servicio y los resultados que está teniendo… No nos vamos a dar abasto.",
    mediaSrc: captura1,
  },
  {
    id: 2,
    name: "Alonso",
    role: "KV Flip",
    location: "Edo. México",
    quote: "Empiezo a conocer los pro y contras de este negocio.",
    mediaSrc: captura2,
  },
  {
    id: 3,
    name: "Daniel Rodriguez",
    role: "RoRo Inmobiliaria",
    location: "Edo. México",
    quote: "El acompañamiento fue excelente y los resultados llegaron rápido.",
    mediaSrc: testimonio1,
  },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const s = SLIDES[i];

  const go = (d: number) => {
    setDir(d);
    setI((p) => (p + d + SLIDES.length) % SLIDES.length);
  };

  return (
    <section className="relative overflow-hidden bg-[#ECEDE9] py-28 text-[#16181D]">
      <div className="bg-blueprint pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative container mx-auto max-w-[1150px] px-6">
        <div className="mb-14">
          <SectionLabel title="Testimonios" className="mb-6" />
          <h2 className="text-display text-4xl font-bold leading-[0.95] md:text-6xl">
            <AnimatedWords text="Lo que nuestros" />
            <br />
            <AnimatedWords
              text="clientes dicen"
              highlight={[0]}
              highlightClassName="text-[#E85C03]"
            />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-5 font-serif text-2xl italic leading-tight text-[#16181D]/65 md:text-3xl">
              Historias reales, resultados reales.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 items-center gap-10 border-t border-[#16181D]/15 pt-14 lg:grid-cols-12 lg:gap-14">
          {/* quote */}
          <div className="lg:col-span-7">
            <span className="text-display block text-7xl leading-none text-[#E85C03]">
              “
            </span>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.blockquote
                key={s.id}
                custom={dir}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
                className="-mt-6"
              >
                <p className="font-serif text-[clamp(1.8rem,3.6vw,3.1rem)] italic leading-[1.18] text-[#16181D]">
                  {s.quote}
                </p>
                <footer className="mt-8 flex items-center gap-4">
                  <div className="text-display text-xl font-bold text-[#16181D]">
                    {s.name}
                  </div>
                  <span className="h-4 w-px bg-[#16181D]/25" />
                  <div className="label-mono text-[10px] text-[#16181D]/55">
                    {s.role}
                  </div>
                </footer>
                <div className="mt-2 flex items-center gap-2 text-sm text-[#16181D]/55">
                  <MapPin className="h-4 w-4 text-[#E85C03]" />
                  {s.location}
                </div>
              </motion.blockquote>
            </AnimatePresence>

            {/* controls */}
            <div className="mt-10 flex items-center gap-5">
              <button
                onClick={() => go(-1)}
                aria-label="Anterior"
                className="grid h-12 w-12 place-items-center rounded-full border border-[#16181D]/20 transition hover:border-[#E85C03] hover:bg-[#E85C03] hover:text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Siguiente"
                className="grid h-12 w-12 place-items-center rounded-full border border-[#16181D]/20 transition hover:border-[#E85C03] hover:bg-[#E85C03] hover:text-white"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
              <span className="label-mono ml-2 text-[11px] text-[#16181D]/45">
                {String(i + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* evidence (chat screenshot) */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={s.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
                className="overflow-hidden rounded-[20px] border border-[#16181D]/10 bg-white shadow-[0_30px_60px_rgba(40,50,65,0.14)]"
              >
                <img
                  src={s.mediaSrc}
                  alt={`Conversación con ${s.name}`}
                  className="max-h-[440px] w-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
