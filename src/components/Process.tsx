import procesoUno from "@/assets/1.png";
import procesoDos from "@/assets/2.png";
import procesoTres from "@/assets/3.png";

const steps = [
  {
    image: procesoUno,
    alt: "Atracción precisa",
  },
  {
    image: procesoDos,
    alt: "Filtrado inteligente",
  },
  {
    image: procesoTres,
    alt: "Conversión efectiva",
  }
];

const Process = () => {
  return (
    <section id="proceso" className="py-24 bg-[#212733] text-white">
      <div className="container mx-auto px-6">
        <div className="mb-16 max-w-4xl">
          <h2               
              style={{ color: "#fff" }}
              className="font-bold leading-[1.1] text-[clamp(2.25rem,8vw,3rem)] md:text-5xl"
            >
            Un proceso inteligente <br></br>para resultados reales
          </h2>
          <p className="mt-4 text-lg text-white/90 leading-relaxed">
            Conecta con inversores listos. Reducimos tus tiempos de cierre y te ayudamos a escalar tu negocio inmobiliario con estrategias digitales que realmente funcionan.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.alt}
              className={`flex flex-col items-start ${index === 1 ? "md:translate-y-12" : ""}`}
            >
              <div className="w-full overflow-hidden rounded-xl">
                <img src={step.image} alt={step.alt} className="h-full w-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
