import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import houseImg from "@/assets/hero-house.webp";

const WHATSAPP_CTA =
  "https://wa.me/525649871454?text=Hola,%20me%20gustaría%20agendar%20una%20reunión";

const EASE = [0.22, 1, 0.36, 1] as const;

const Hero = () => {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const houseY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -180]); // title rises
  const leftX = useTransform(scrollYProgress, [0, 0.85], [0, -260]); // left → off left
  const rightX = useTransform(scrollYProgress, [0, 0.85], [0, 260]); // right → off right
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const S = (v: unknown) => (reduce ? undefined : (v as never));
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative flex flex-col overflow-hidden bg-[#edebe5] pt-24 lg:min-h-screen"
    >
      {/* studio light + grading */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,#f6f4ef,transparent_60%)]" />
      <div className="bg-blueprint pointer-events-none absolute inset-0 opacity-60" />
      {/* breathing pedestal glow */}
      <motion.div
        aria-hidden
        animate={reduce ? undefined : { opacity: [0.6, 1, 0.6], scale: [1, 1.04, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[62%] origin-bottom bg-[radial-gradient(ellipse_48%_55%_at_50%_94%,rgba(232,92,3,0.12),transparent_70%)]"
      />
      {/* ground vignette */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(120,130,145,0.16),transparent_70%)]" />
      {/* left edge architectural ruler */}
      <div className="ruler-ticks-v pointer-events-none absolute bottom-0 left-6 top-28 z-0 hidden w-2 opacity-50 lg:block" />

      {/* ===================== DESKTOP ===================== */}
      {/* top instrument row */}
      <div className="absolute inset-x-0 top-[12%] z-20 hidden px-10 lg:block">
        <motion.div
          style={{ opacity: S(fade) }}
          initial={reduce ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: EASE }}
          className="ruler-ticks h-2 w-full origin-left opacity-40"
        />
        <div className="mt-3 flex items-start justify-between">
          <motion.div style={{ x: S(leftX), opacity: S(fade) }}>
            <motion.div {...rise(0.3)}>
              <p className="label-mono text-[11px] text-[#16181D]/60">
                Flipping inmobiliario — México
              </p>
              <p className="mt-2 font-serif text-[clamp(1.25rem,2.2vw,2.1rem)] italic leading-tight text-[#16181D]/85">
                Aliados estratégicos en bienes raíces.
              </p>
            </motion.div>
          </motion.div>
          <motion.div style={{ x: S(rightX), opacity: S(fade) }}>
            <motion.p
              {...rise(0.4)}
              className="label-mono hidden text-right text-[10px] leading-relaxed text-[#16181D]/45 lg:block"
            >
              Cobertura
              <br />
              19°N · 99°W
              <br />
              MX · 14/13
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Colossal wordmark — curtain reveal, sits high */}
      <motion.div
        style={{ y: S(titleY), opacity: S(fade) }}
        className="pointer-events-none absolute inset-x-0 top-[26%] z-0 hidden lg:block"
      >
        <h1 className="text-display select-none whitespace-nowrap text-center font-bold leading-none tracking-[-0.045em] text-[#16181D]">
          <span className="inline-block overflow-hidden pb-[0.14em] align-bottom">
            <motion.span
              initial={reduce ? false : { y: "115%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.15, delay: 0.45, ease: EASE }}
              className="inline-block text-[clamp(3.5rem,15.5vw,13.5rem)]"
            >
              INMOLEADS
            </motion.span>
          </span>
        </h1>
      </motion.div>

      {/* House cutout — contact shadow + pedestal, slow showcase sway */}
      <motion.div
        style={{ y: S(houseY) }}
        className="absolute inset-x-0 bottom-0 z-10 hidden items-end justify-center lg:flex"
      >
        <div className="relative flex items-end justify-center">
          {/* soft contact shadow */}
          <div className="pointer-events-none absolute bottom-[6%] left-1/2 h-10 w-[62%] -translate-x-1/2 rounded-[50%] bg-[#16181D]/25 blur-2xl" />
          <motion.div
            animate={reduce ? undefined : { rotateY: [-1.8, 1.8, -1.8] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformPerspective: 1600, transformOrigin: "50% 100%" }}
            className="will-change-transform"
          >
            <motion.img
              src={houseImg}
              alt="Casa — inversión inmobiliaria"
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.55, ease: EASE }}
              className="w-[min(46vw,720px)] origin-bottom drop-shadow-[0_40px_50px_rgba(40,50,65,0.22)]"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom-left ficha técnica (entrance nested so scroll-opacity
          doesn't cancel the appear animation) */}
      <motion.div
        style={{ x: S(leftX), opacity: S(fade) }}
        className="absolute bottom-10 left-10 z-20 hidden max-w-xs lg:block"
      >
        <motion.div {...rise(0.85)}>
          <div className="mb-4 space-y-1.5 border-l border-[#16181D]/15 pl-4">
            <Row k="Ref" v="INML · 2025" />
            <Row k="Enfoque" v="Leads · Flipping" />
          </div>
          <p className="text-[15.5px] leading-relaxed text-[#16181D]/80">
            Generamos leads calificados, maximizamos tus inversiones y
            convertimos cada oportunidad en rentabilidad.
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom-right data + CTA */}
      <motion.div
        style={{ x: S(rightX), opacity: S(fade) }}
        className="absolute bottom-10 right-10 z-20 hidden lg:block"
      >
        <motion.div {...rise(1)} className="flex items-end gap-6">
          <div className="text-right">
            <div className="label-mono text-[10px] text-[#16181D]/45">
              Con presencia en México
            </div>
            <div className="mt-2 flex items-end justify-end gap-5">
              <Stat n="14" l="Ciudades" delay={1.05} />
              <span className="mb-1 h-8 w-px bg-[#16181D]/15" />
              <Stat n="13" l="Estados" delay={1.15} />
            </div>
          </div>
          <motion.a
            initial={reduce ? false : { opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.25, ease: EASE }}
            href={WHATSAPP_CTA}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Agendar un meet"
            className="group flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#16181D] text-white transition-colors duration-300 hover:bg-[#E85C03]"
          >
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* film grain */}
      <div className="bg-grain pointer-events-none absolute inset-0 z-30 opacity-[0.07] mix-blend-multiply" />

      {/* ===================== MOBILE ===================== */}
      <div className="relative z-10 mx-auto flex w-full max-w-xl flex-1 flex-col px-5 pb-10 lg:hidden">
        <p className="label-mono text-[10px] text-[#16181D]/60">
          Flipping inmobiliario — México
        </p>
        <p className="mt-2 font-serif text-2xl italic leading-tight text-[#16181D]/85">
          Aliados estratégicos en bienes raíces.
        </p>
        <h1 className="text-display mt-3 text-center text-[clamp(2.6rem,16vw,5rem)] font-bold leading-none tracking-[-0.03em] text-[#16181D]">
          INMOLEADS
        </h1>
        <motion.img
          src={houseImg}
          alt="Casa — inversión inmobiliaria"
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mx-auto mt-2 w-[90%] drop-shadow-[0_26px_40px_rgba(40,50,65,0.22)]"
        />
        <p className="mt-3 text-[15px] leading-relaxed text-[#16181D]/80">
          Generamos leads calificados, maximizamos tus inversiones y convertimos
          cada oportunidad en rentabilidad.
        </p>
        <div className="mt-5 flex items-end justify-between">
          <div className="flex items-end gap-4">
            <Stat n="14" l="Ciudades" />
            <Stat n="13" l="Estados" />
          </div>
          <a
            href={WHATSAPP_CTA}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Agendar un meet"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#16181D] text-white"
          >
            <ArrowUpRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-6">
      <span className="label-mono text-[9px] text-[#16181D]/40">{k}</span>
      <span className="label-mono text-[10px] text-[#16181D]/70">{v}</span>
    </div>
  );
}

function Stat({ n, l, delay = 0 }: { n: string; l: string; delay?: number }) {
  const reduce = useReducedMotion();
  const target = parseInt(n, 10);
  const [val, setVal] = useState(reduce ? target : 0);

  useEffect(() => {
    if (reduce) return;
    const controls = animate(0, target, {
      duration: 1.3,
      delay,
      ease: EASE,
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [reduce, target, delay]);

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      <div className="text-display text-3xl font-bold leading-none text-[#16181D]">
        {val}
      </div>
      <div className="label-mono mt-1 text-[9px] text-[#16181D]/50">{l}</div>
    </motion.div>
  );
}

export default Hero;
