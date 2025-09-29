import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Roberto Torres",
      role: "Inversor Inmobiliario",
      content: "Excelente servicio! Gracias a su equipo logramos cerrar 5 propiedades en los últimos 3 meses. Su sistema de leads es increíble.",
      rating: 5
    },
    {
      name: "María González",
      role: "Flipper Profesional",
      content: "Los leads son de alta calidad y el seguimiento es impecable. Han transformado completamente mi negocio de flipping.",
      rating: 5
    },
    {
      name: "Carlos Ramírez",
      role: "Desarrollador",
      content: "Muy profesionales. Me ayudaron a expandir mi negocio a 3 nuevas ciudades. Los recomiendo ampliamente.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Lo que Nuestros Clientes dicen sobre nosotros
          </h2>
          <p className="text-xl text-muted-foreground">
            Testimonios reales de inversores satisfechos
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              
              <p className="text-foreground/80 mb-6 italic">
                "{testimonial.content}"
              </p>
              
              <div className="border-t pt-4">
                <div className="font-bold text-lg">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
