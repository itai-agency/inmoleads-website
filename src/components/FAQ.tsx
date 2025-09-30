import { ChevronDown } from "lucide-react";

const items = [
  {
    q: "¿Cuál es el proceso del servicio de marketing?",
    a: "Utilizamos una combinación de estrategias digitales avanzadas, incluyendo SEO, publicidad en redes sociales y campañas de Google Ads para captar leads de alta calidad interesados en el mercado inmobiliario.",
  },
  {
    q: "¿Hay contratos de largo plazo involucrados?",
    a: "No, trabajamos con contratos flexibles que se adaptan a tus necesidades. Puedes iniciar con proyectos específicos sin compromisos a largo plazo.",
  },
  {
    q: "¿Cuál es nuestra cobertura geográfica?",
    a: "Tenemos presencia en 14 ciudades principales y 13 estados de México, con capacidad de expandir nuestros servicios según las necesidades de cada cliente.",
  },
  {
    q: "¿Cuándo se pueden esperar resultados concretos?",
    a: "Los primeros leads calificados suelen comenzar a llegar en las primeras 2-3 semanas. Los resultados óptimos y constantes se observan generalmente después del primer mes de operación.",
  },
];

const FAQ = () => {
  return (
    <section className="py-24 bg-[#2F3641] font-montserrat">
  <div className="container mx-auto px-6 max-w-3xl">
    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-12">
      Preguntas frecuentes
    </h2>

        <div className="space-y-4">
          {items.map((it, i) => (
            <div
              key={i}
              className="
                group rounded-xl overflow-hidden transition-colors
                bg-[#E85C03] hover:bg-white
                cursor-pointer
              "
            >
              {/* Pregunta */}
              <div
                className="
                  flex items-center justify-between
                  px-8 py-3   /* REDUCIDA altura */
                  text-white group-hover:text-[#E85C03]
                "
              >
                <span className="font-bold text-lg md:text-xl leading-snug">
                  {it.q}
                </span>

                <span
                  className="
                    shrink-0 w-10 h-10 rounded-full bg-white
                    grid place-items-center
                  "
                >
                  <ChevronDown
                    className="
                      w-6 h-6 text-[#E85C03]
                      transition-transform duration-300
                      group-hover:rotate-180
                    "
                  />
                </span>
              </div>

              {/* Respuesta */}
              <div
                className="
                  px-8 pb-4 pt-0
                  text-[#E85C03]
                  text-sm md:text-base   /* también un poco más compacto */
                  leading-relaxed
                  max-h-0 opacity-0
                  transition-[max-height,opacity] duration-300 ease-in-out
                  group-hover:max-h-80 group-hover:opacity-100
                "
              >
                {it.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
