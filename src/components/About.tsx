import { useState } from "react";
import gallery1 from "@/assets/galeria_1.png";
import gallery2 from "@/assets/galeria_2.png";
import gallery3 from "@/assets/galeria_3.png";
import gallery4 from "@/assets/galeria_4.png";

const About = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const highlights = [
    {
      image: gallery1,
      alt: "Equipo de trabajo colaborando en una reunión",
    },
    {
      image: gallery2,
      alt: "Profesionales analizando estrategias en conjunto",
    },
    {
      image: gallery3,
      alt: "Equipo revisando métricas en una tablet",
    },
    {
      image: gallery4,
      alt: "Grupo celebrando un logro empresarial",
    },
  ];

  return (
    <section id="nosotros" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-start">Quiénes somos</h2>
        </div>

        <div className="mx-auto flex flex-col gap-4 md:flex-row md:gap-6 max-w-6xl">
          {highlights.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={item.alt}
                className={`relative overflow-hidden rounded-[48px] cursor-pointer shadow-none md:transition-[flex] md:duration-500 md:ease-out ${
                  isActive ? "md:flex-[1.35]" : "md:flex-[0.7]"
                }`}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="h-full w-full object-cover"
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
