import { Button } from "@/components/ui/button";
import { MapPin, Building } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background image layer */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})`, backgroundPositionY: "100%" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex md:justify-end">
          {/* Content */}
          <div
            className="
              pt-0 md:pt-20   /* sin padding en móvil, con padding en desktop */
              text-primary-foreground space-y-8
              text-center md:text-right
              flex flex-col items-center md:items-end
              max-w-2xl mx-auto md:mx-0
            "
          >
            <h1 className="text-4xl md:text-5xl font-bold leading-tight animate-fade-in text-white">
              Aliados estratégicos en el flipping inmobiliario
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/95 max-w-xl">
              Generamos leads calificados, maximizamos tus inversiones y convertimos cada oportunidad en rentabilidad.
            </p>

            {/* Stats section */}
            <div className="flex flex-col items-center gap-4 pt-10 md:pl-[39%]">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
