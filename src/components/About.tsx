import { useState } from "react";
import gallery1 from "@/assets/galeria_1.png";
import gallery2 from "@/assets/galeria_2.png";
import gallery3 from "@/assets/galeria_3.png";
import gallery4 from "@/assets/galeria_4.png";

const About = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0); // Start with first image hovered

  // Unique images
  const highlights = [gallery1, gallery2, gallery3, gallery4].filter(
    (image, index, self) => index === self.findIndex((i) => i === image)
  );

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
            <div key={index} className="w-full">
              <img
                src={image}
                alt=""
                className="w-full h-auto rounded-[28px] object-contain"
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                sizes="(max-width: 768px) 100vw"
              />
            </div>
          ))}
        </div>

        {/* ====== ESCRITORIO (tu versión intacta) ====== */}
        <div className="hidden md:flex w-full max-w-6xl mx-auto h-[500px] gap-2 md:gap-3">
          {highlights.map((image, index) => (
            <div
              key={index}
              className={`relative rounded-[28px] overflow-hidden transition-all duration-500 ease-in-out flex items-center justify-center ${
                hoveredIndex === index ? "w-1/2 md:w-2/3" : "w-1/8 md:w-1/9"
              }`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={image}
                alt=""
                className="h-full w-auto max-w-none transition-transform duration-500 ease-out hover:scale-105"
                style={{
                  objectFit: "contain",
                  maxHeight: "100%",
                  width: "auto",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
