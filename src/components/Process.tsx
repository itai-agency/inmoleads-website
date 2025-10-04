import procesoUno from "@/assets/PROCESO_1.png";
import procesoDos from "@/assets/PROCESO_2.png";
import procesoTres from "@/assets/PROCESO_3.png";

const steps = [
  {
    image: procesoUno,
    alt: "Atracción precisa",
    description: "Generamos leads calificados que realmente quieren invertir."
  },
  {
    image: procesoDos,
    alt: "Filtrado inteligente",
    description: "Seleccionamos prospectos listos para cerrar, sin perder tiempo."
  },
  {
    image: procesoTres,
    alt: "Conversión efectiva",
    description: "Se organizan contactos, se agendan citas y se entregan prospectos para cerrar ventas."
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
              <div className="w-full overflow-hidden rounded-[36px] border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                <img src={step.image} alt={step.alt} className="h-full w-full object-cover" />
              </div>
              <p className="mt-6 text-base text-white/85 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
