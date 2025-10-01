import { Button } from "@/components/ui/button";
import { MapPin, Building } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background image layer */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})`, backgroundPositionY: "100%" }}
      />

      {/* Geometric triangle decorations */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-20 right-1/4 w-96 h-96 border-l-[100px] border-l-transparent border-r-[100px] border-r-transparent border-b-[150px] border-b-primary-foreground/30 rotate-45" />
        <div className="absolute bottom-40 right-1/3 w-64 h-64 border-l-[80px] border-l-transparent border-r-[80px] border-r-transparent border-b-[120px] border-b-primary-foreground/20 -rotate-12" />
        <div className="absolute top-1/3 right-20 w-48 h-48 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-b-[90px] border-b-primary-foreground/25 rotate-[30deg]" />
        <div className="absolute top-1/2 right-1/2 w-72 h-72 border-l-[90px] border-l-transparent border-r-[90px] border-r-transparent border-b-[130px] border-b-primary-foreground/15 -rotate-6" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex justify-end">
          {/* Content */}
          <div className="pt-20 text-primary-foreground space-y-8 text-right max-w-2xl">
            <h1 className="text-5xl lg:text-5xl font-bold leading-tight animate-fade-in text-white">
              Aliados estratégicos en el flipping inmobiliario
            </h1>
            <p className="text-xl text-primary-foreground/95 ml-auto max-w-xl">
              Generamos leads calificados, maximizamos tus inversiones y convertimos cada oportunidad en rentabilidad.
            </p>
            
            {/* Stats section */}
            <div className="flex flex-col items-center gap-4 pt-10 pl-[39%]">
              <div className="text-lg text-primary-foreground/90 font-semibold uppercase tracking-wider text-center">
                CON PRESENCIA EN
              </div>
              
              <div className="bg-background rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-primary">14</div>
                    <div className="text-foreground font-medium mt-1">Ciudades</div>
                  </div>
                  
                  <div className="w-px h-16 bg-border" />
                  
                  <div className="text-center">
                    <div className="text-5xl font-bold text-primary">13</div>
                    <div className="text-foreground font-medium mt-1">Estados</div>
                  </div>
                </div>
              </div>
              
              <div className="text-lg text-primary-foreground/90 font-semibold uppercase tracking-wider text-center">
                DE MÉXICO
              </div>
            </div>

            {/* Button below DE MÉXICO, aligned left */}
            <div className="flex justify-start mt-6">
              <Button size="lg" className="bg-white text-primary hover:bg-primary hover:text-white rounded-full px-14">
                Contactanos
              </Button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
