import { Button } from "@/components/ui/button";
import { MapPin, Building } from "lucide-react";
import heroLaptop from "@/assets/hero-laptop.jpg";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-95" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-primary-foreground space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight animate-fade-in">
              Aliados estratégicos en el flipping inmobiliario
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-xl">
              Generamos leads calificados, maximizamos tus inversiones y convertimos cada oportunidad en rentabilidad
            </p>
            
            <div className="flex items-center gap-6 pt-4">
              <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20">
                <div className="flex items-center gap-3">
                  <Building className="w-8 h-8" />
                  <div>
                    <div className="text-3xl font-bold">14</div>
                    <div className="text-sm text-primary-foreground/80">Ciudades</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20">
                <div className="flex items-center gap-3">
                  <MapPin className="w-8 h-8" />
                  <div>
                    <div className="text-3xl font-bold">13</div>
                    <div className="text-sm text-primary-foreground/80">Estados</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button size="lg" variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Comenzar Ahora
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                Conocer Más
              </Button>
            </div>
            
            <div className="text-sm text-primary-foreground/70 uppercase tracking-wider font-semibold">
              CON PRESENCIA EN TODO MÉXICO
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="absolute inset-0 bg-primary-glow/30 blur-3xl rounded-full" />
            <img 
              src={heroLaptop} 
              alt="Dashboard de análisis inmobiliario"
              className="relative rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
