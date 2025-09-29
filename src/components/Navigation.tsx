import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">IL</span>
            </div>
            <span className="text-xl font-bold">INMO LEADS</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#inicio" className="text-foreground hover:text-primary transition-colors font-medium">
              Inicio
            </a>
            <a href="#servicios" className="text-foreground hover:text-primary transition-colors font-medium">
              Servicios
            </a>
            <a href="#proceso" className="text-foreground hover:text-primary transition-colors font-medium">
              Proceso
            </a>
            <a href="#nosotros" className="text-foreground hover:text-primary transition-colors font-medium">
              Nosotros
            </a>
            <a href="#contacto" className="text-foreground hover:text-primary transition-colors font-medium">
              Contacto
            </a>
          </div>

          <Button size="lg" className="hidden md:inline-flex">
            Comenzar Ahora
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
