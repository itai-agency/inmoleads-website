import { Card } from "@/components/ui/card";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";

const About = () => {
  return (
    <section id="nosotros" className="py-24 bg-muted/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Quiénes somos</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Somos expertos en transformar oportunidades inmobiliarias en inversiones exitosas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="aspect-video overflow-hidden">
              <img 
                src={team1} 
                alt="Equipo colaborando"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Experiencia Comprobada</h3>
              <p className="text-muted-foreground">
                Contamos con profesionales capacitados y sistemas de calidad para garantizar los mejores resultados
              </p>
            </div>
          </Card>

          <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="aspect-video overflow-hidden">
              <img 
                src={team2} 
                alt="Análisis de datos"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Tecnología Avanzada</h3>
              <p className="text-muted-foreground">
                Utilizamos herramientas de análisis de mercado para identificar las mejores oportunidades
              </p>
            </div>
          </Card>

          <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="aspect-video overflow-hidden">
              <img 
                src={team3} 
                alt="Consultoría profesional"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Resultados Garantizados</h3>
              <p className="text-muted-foreground">
                Nuestro compromiso es maximizar el retorno de inversión en cada proyecto inmobiliario
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
