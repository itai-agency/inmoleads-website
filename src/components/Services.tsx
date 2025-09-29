import { Card } from "@/components/ui/card";
import { Target, TrendingUp, Users, Database } from "lucide-react";

const Services = () => {
  return (
    <section id="servicios" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Nuestros servicios</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explora nuestras soluciones diseñadas para impulsar tu negocio de flipping inmobiliario
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="p-8 bg-primary text-primary-foreground hover:shadow-xl transition-all duration-300">
            <div className="mb-6">
              <div className="bg-primary-foreground/20 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Gestión de Leads</h3>
            </div>
            
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground mt-2" />
                <span>Captación de prospectos calificados para propiedades en flipping</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground mt-2" />
                <span>Seguimiento automatizado con CRM integrado</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground mt-2" />
                <span>Coordinación sobre toda la operación</span>
              </li>
            </ul>
          </Card>

          <Card className="p-8 bg-secondary text-secondary-foreground hover:shadow-xl transition-all duration-300">
            <div className="mb-6">
              <div className="bg-primary/20 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Marketing Digital para Flipping Inmobiliario</h3>
            </div>
            
            <ul className="space-y-3 text-secondary-foreground/90">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                <span>Estrategias de captación en redes sociales</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                <span>Publicidad online en los canales más efectivos</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                <span>Posicionamiento SEO para generar tráfico orgánico</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Services;
