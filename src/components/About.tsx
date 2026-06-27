import gallery1 from "@/assets/GALERIA 1.jpg";
import gallery2 from "@/assets/GALERIA 2.jpg";
import gallery3 from "@/assets/GALERIA 3.jpg";
import gallery4 from "@/assets/GALERIA 4.jpg";
import {
  Reveal,
  Stagger,
  StaggerItem,
  AnimatedWords,
} from "@/components/motion/Motion";
import SectionLabel from "@/components/SectionLabel";

const cards = [
  {
    no: "01",
    image: gallery1,
    title: "Transformamos oportunidades",
    text: "Convertimos propiedades en oportunidades y campañas en historias de éxito.",
  },
  {
    no: "02",
    image: gallery2,
    title: "Acompañamiento integral",
    text: "Acompañamos tu crecimiento optimizando cada paso del proceso.",
  },
  {
    no: "03",
    image: gallery3,
    title: "Nuestra misión",
    text: "Impulsamos tu negocio con leads precisos y procesos eficientes.",
  },
  {
    no: "04",
    image: gallery4,
    title: "Nuestra promesa",
    text: "Crecemos contigo y celebramos cada logro como propio.",
  },
];

const About = () => {
  return (
    <section
      id="nosotros"
      className="relative overflow-hidden bg-[#ECEDE9] py-28 text-[#16181D]"
    >
      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto mb-20 max-w-4xl text-center">
          <div className="flex justify-center">
            <SectionLabel title="Nosotros" className="mb-8" />
          </div>
          <h2 className="text-display text-[clamp(2rem,4.6vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em]">
            <AnimatedWords text="Más que una agencia," />{" "}
            <AnimatedWords
              text="tu aliado estratégico"
              highlight={[0, 1, 2]}
              highlightClassName="text-[#E85C03]"
            />{" "}
            <AnimatedWords text="en el flipping inmobiliario." />
          </h2>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-7 max-w-2xl font-serif text-xl italic leading-snug text-[#16181D]/60 md:text-2xl">
              Ayudamos a inversionistas y agencias a crecer en México, con leads
              calificados y acompañamiento de principio a fin.
            </p>
          </Reveal>
        </div>

        {/* value cards */}
        <Stagger
          className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 lg:grid-cols-4"
          stagger={0.1}
        >
          {cards.map((c) => (
            <StaggerItem key={c.no} className="group">
              <div className="overflow-hidden rounded-[20px] border border-[#16181D]/10">
                <img
                  src={c.image}
                  alt={c.title}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="mt-5 flex items-center gap-3">
                <span className="label-mono text-[11px] text-[#E85C03]">
                  {c.no}
                </span>
                <span className="h-px flex-1 bg-[#16181D]/15 transition-colors duration-500 group-hover:bg-[#E85C03]/50" />
              </div>
              <h3 className="text-display mt-3 text-xl font-bold leading-tight">
                {c.title}
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-[#16181D]/60">
                {c.text}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default About;
