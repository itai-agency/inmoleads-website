import { useState } from "react";
import gallery1 from "@/assets/GALERIA 1.jpg";
import gallery2 from "@/assets/GALERIA 2.jpg";
import gallery3 from "@/assets/GALERIA 3.jpg";
import gallery4 from "@/assets/GALERIA 4.jpg";

const About = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0); // Start with first image hovered

  // Unique images
  const highlights = [gallery1, gallery2, gallery3, gallery4].filter(
    (image, index, self) => index === self.findIndex((i) => i === image)
  );

  // Agrega esto arriba (junto a imageTexts)
  const imageTitles = [
    "Transformamos oportunidades", // 1a (ajústalo si quieres dejarlo vacío)
    "Acompañamiento integral",   // 2a
    "Nuestra misión",            // 3a
    "Nuestra promesa"            // 4a
  ];

  // Colores por tarjeta
  const panelColors = [
    "bg-slate-800/95",   // 1
    "bg-orange-600/95",  // 2
    "bg-gray-500/95",    // 3
    "bg-neutral-900/95", // 4
  ];

  // Text content for each image
  const imageTexts = [
    "Ayudamos a inversionistas y agencias a crecer en México, transformando propiedades en oportunidades y campañas en historias de éxito.",
    "Acompañamos tu crecimiento optimizando cada paso del proceso.",
    "Impulsamos tu negocio con leads precisos, procesos eficientes y acompañamiento completo.",
    "Somos tu aliado estratégico: crecemos contigo y celebramos cada logro como propio."
  ];

  const handleMouseEnter = (index: number) => setHoveredIndex(index);
  const handleMouseLeave = () => setHoveredIndex(0);

  return (
    <section id="nosotros" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-start">
            Quiénes somos
          </h2>
        </div>

        {/* ====== MÓVIL (no afecta escritorio) ====== */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {highlights.map((image, index) => (
            <div key={index} className="relative w-full rounded-2xl overflow-hidden">
              {/* Imagen */}
              <img
                src={image}
                alt=""
                className="w-full h-[360px] object-cover"
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                sizes="(max-width: 768px) 100vw"
              />

              {/* Franja inferior SIEMPRE visible */}
              <div
                className={`
                  absolute inset-x-0 bottom-0
                  ${panelColors[index]} backdrop-blur-sm
                  px-4 py-3
                  opacity-100 translate-y-0
                `}
              >
                {imageTitles[index] && (
                  <h4 className="text-white font-semibold text-base leading-tight mb-1">
                    {imageTitles[index]}
                  </h4>
                )}
                <p className="text-white/95 text-sm leading-relaxed">
                  {imageTexts[index]}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ====== ESCRITORIO (tu versión intacta) ====== */}
        <div className="hidden md:flex w-full max-w-6xl mx-auto h-[500px] gap-3">
          {highlights.map((image, index) => {
            const isHovered = hoveredIndex === index;
            const showPanel = isHovered || (index === 0 && hoveredIndex === 0);

            return (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(0)}
                style={{ flexGrow: isHovered ? 4 : 1, flexBasis: 0, minWidth: 0 }}
              >
                {/* Imagen */}
                <img
                  src={image}
                  alt=""
                  className="h-full w-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />

                {/* Franja inferior con TÍTULO y descripción */}
                <div
                  className={`
                    absolute inset-x-0 bottom-0
                    transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                    ${panelColors[index]} backdrop-blur-sm
                    px-5 py-4
                    ${showPanel ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"}
                  `}
                >
                  {/* Título */}
                  {imageTitles[index] && (
                    <h4 className="text-white font-semibold text-lg tracking-tight mb-1">
                      {imageTitles[index]}
                    </h4>
                  )}
                  {/* Descripción */}
                  <p className="text-white/95 text-base leading-relaxed">
                    {imageTexts[index]}
                  </p>
                </div>

                {/* Sombra superior opcional */}
                <div
                  className={`
                    pointer-events-none absolute inset-x-0 bottom-0 h-6
                    bg-gradient-to-t from-black/30 to-transparent
                    transition-opacity duration-300
                    ${showPanel ? "opacity-100" : "opacity-0"}
                  `}
                  aria-hidden
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
