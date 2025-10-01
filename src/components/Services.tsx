import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const Services = () => {
  return (
    <section id="servicios" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-start">Nuestros servicios</h2>
          <p className="text-xl text-black mx-auto text-start">
            Explora cómo podemos ayudarte a escalar tu negocio de <b><i>flipping inmobiliario</i></b>.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="p-10 md:p-12 bg-[#F26120] text-white rounded-[36px] border-0 shadow-xl space-y-8">
            <h3 className="text-3xl font-bold text-center pt-4 text-white">Gestión de Leads</h3>

            <ul className="space-y-8 text-lg leading-relaxed">
              <li className="flex items-start gap-4">
                <span className="mt-1 flex h-8 w-8 min-w-8 items-center justify-center rounded-full bg-white text-[#F26120]">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <span>Recibimos y respondemos mensajes de clientes interesados.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-1 flex h-8 w-8 min-w-8 items-center justify-center rounded-full bg-white text-[#F26120]">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <span>Seleccionamos los mejores prospectos para ti.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-1 flex h-8 w-8 min-w-8 items-center justify-center rounded-full bg-white text-[#F26120]">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <span>Coordinamos citas y te entregamos contactos listos para cerrar ventas.</span>
              </li>
            </ul>
          </Card>

          <Card className="p-10 md:p-12 bg-[#232833] text-white rounded-[36px] border-0 shadow-xl space-y-8">
            <h3 className="text-3xl font-bold text-center text-white">Marketing digital para flipping inmobiliario</h3>

            <ul className="space-y-5 text-lg leading-relaxed">
              <li className="flex items-start gap-4">
                <span className="mt-1 flex h-8 w-8 min-w-8 items-center justify-center rounded-full bg-white text-[#F26120]">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <span>Atraemos clientes potenciales con campañas bien diseñadas.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-1 flex h-8 w-8 min-w-8 items-center justify-center rounded-full bg-white text-[#F26120]">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <span>Reducimos tus costos y aumentamos tu alcance.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-1 flex h-8 w-8 min-w-8 items-center justify-center rounded-full bg-white text-[#F26120]">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <span>Creamos contenido mensual para que tu página de Facebook genere confianza.</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Services;
