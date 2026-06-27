import { ArrowUpRight, Check } from "lucide-react";
import { Reveal, AnimatedWords } from "@/components/motion/Motion";
import SectionLabel from "@/components/SectionLabel";

const services = [
  {
    no: "01",
    title: "Gestión de Leads",
    lead: "Convertimos interés en citas listas para cerrar.",
    items: [
      "Recibimos y respondemos mensajes de clientes interesados.",
      "Seleccionamos los mejores prospectos para ti.",
      "Coordinamos citas y te entregamos contactos listos para cerrar ventas.",
    ],
  },
  {
    no: "02",
    title: "Marketing digital para flipping inmobiliario",
    lead: "Atraemos al inversionista correcto, al costo correcto.",
    items: [
      "Atraemos clientes potenciales con campañas bien diseñadas.",
      "Reducimos tus costos y aumentamos tu alcance.",
      "Creamos contenido mensual para que tu página de Facebook genere confianza.",
    ],
  },
];

const Services = () => {
  return (
    <section
      id="servicios"
      className="relative overflow-hidden bg-[#ECEDE9] py-28 text-[#16181D]"
    >
      <div className="container mx-auto px-6">
        <div className="mb-20 max-w-3xl">
          <SectionLabel title="Servicios" className="mb-6" />
          <h2 className="text-display text-4xl font-bold leading-[0.95] md:text-6xl">
            <AnimatedWords
              text="Nuestros servicios"
              highlight={[1]}
              highlightClassName="text-[#E85C03]"
            />
          </h2>
          <Reveal delay={0.12}>
            <p className="mt-5 font-serif text-2xl italic leading-tight text-[#16181D]/65 md:text-3xl">
              Dos formas de hacer crecer tu negocio.
            </p>
          </Reveal>
        </div>

        {/* editorial index */}
        <div className="border-t border-[#16181D]/15">
          {services.map((s) => (
            <Reveal key={s.no}>
              <article className="group relative grid grid-cols-1 gap-y-8 border-b border-[#16181D]/15 py-12 transition-colors duration-500 lg:grid-cols-12 lg:gap-x-10 lg:py-16">
                {/* orange wipe on hover */}
                <span className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-[#16181D] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />

                {/* number */}
                <div className="relative lg:col-span-2">
                  <span className="text-display text-6xl font-bold leading-none text-[#16181D]/15 transition-colors duration-500 group-hover:text-[#E85C03] md:text-7xl">
                    {s.no}
                  </span>
                </div>

                {/* title + lead */}
                <div className="relative lg:col-span-5">
                  <h3 className="text-display text-3xl font-bold leading-tight transition-colors duration-500 group-hover:text-white md:text-[2.6rem]">
                    {s.title}
                  </h3>
                  <p className="mt-4 font-serif text-xl italic text-[#16181D]/60 transition-colors duration-500 group-hover:text-white/70 md:text-2xl">
                    {s.lead}
                  </p>
                  <span className="mt-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#16181D]/20 text-[#16181D] transition-colors duration-500 group-hover:border-[#E85C03] group-hover:bg-[#E85C03] group-hover:text-white">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>

                {/* items */}
                <ul className="relative space-y-4 lg:col-span-5">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-4 border-b border-[#16181D]/10 pb-4 text-[15px] leading-relaxed text-[#16181D]/80 transition-colors duration-500 last:border-0 group-hover:border-white/15 group-hover:text-white/85"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#E85C03]"
                        strokeWidth={3}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
