import { ChevronDown } from "lucide-react";

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
  return (
    <section id="preguntas-frecuentes" className="py-24 bg-[#2F3641] font-montserrat">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 
        style={{ color: "#fff" }}
        className="text-3xl lg:text-4xl font-bold mb-12">
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
                  px-8 py-3
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
                  text-[#000000]
                  text-sm md:text-base
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
