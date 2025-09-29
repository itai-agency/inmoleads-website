import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">IL</span>
              </div>
              <span className="text-xl font-bold">INMO LEADS</span>
            </div>
            <p className="text-sm text-secondary-foreground/70">
              Aliados estratégicos en el flipping inmobiliario
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li>Gestión de Leads</li>
              <li>Marketing Digital</li>
              <li>Análisis de Mercado</li>
              <li>Consultoría</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Compañía</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li>Sobre Nosotros</li>
              <li>Contacto</li>
              <li>Blog</li>
              <li>Carreras</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li>contacto@inmoleads.com</li>
              <li>+52 (55) 1234-5678</li>
              <li>Presencia en 13 Estados</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-secondary-foreground/70">
            © 2024 INMO LEADS. Todos los derechos reservados.
          </div>

          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
