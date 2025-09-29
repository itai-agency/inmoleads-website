import { Card } from "@/components/ui/card";
import { Search, BarChart3, TrendingUp } from "lucide-react";

const Process = () => {
  const processes = [
    {
      icon: Search,
      title: "Captación Inteligente",
      description: "Identificamos y calificamos los mejores leads del mercado inmobiliario utilizando tecnología avanzada"
    },
    {
      icon: BarChart3,
      title: "Análisis Detallado",
      description: "Realizamos un análisis profundo del mercado y oportunidades para maximizar tu retorno de inversión"
    },
    {
      icon: TrendingUp,
      title: "Conversión Efectiva",
      description: "Transformamos los prospectos en clientes reales mediante estrategias probadas y efectivas"
    }
  ];

  return (
    <section id="proceso" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Un proceso inteligente para resultados reales
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Contamos con metodologías claras, mediciones, y un sistema de juego que garantizan el éxito
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {processes.map((process, index) => (
            <Card 
              key={index} 
              className="p-8 hover:shadow-xl transition-all duration-300 group border-2 hover:border-primary"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <process.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{process.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {process.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
