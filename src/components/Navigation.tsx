import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Menu } from "lucide-react";
import logoImage from "@/assets/Logotipo.png";

type NavLink = {
  href: string;
  label: string;
  isExternal?: boolean;
};

const leftLinks: NavLink[] = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#proceso", label: "Proceso" },
];

const rightLinks: NavLink[] = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
  { 
    href: "https://wa.me/525649871454?text=Hola,%20me%20gustaría%20agendar%20una%20reunión", 
    label: "Agendar un meet",
    isExternal: true 
  },
];

const allLinks = [...leftLinks, ...rightLinks];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  return (
    <nav className="fixed top-4 left-0 right-0 z-50">
      <div className="container mx-auto px-3 md:px-6">
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between gap-6 rounded-full border border-border/40 bg-background/95 px-14 py-2 shadow-lg shadow-primary/10 backdrop-blur">
          <div className="hidden flex-1 items-center justify-between text-sm font-semibold tracking-wide text-primary md:flex">
            {leftLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex-1 px-4 text-center transition-colors hover:text-orange-500 hover:font-semibold"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex shrink-0 items-center justify-center">
            <img
              src={logoImage}
              alt="Inmo Leads"
              className="h-10 w-auto md:h-12"
            />
          </div>

          <div className="hidden flex-1 items-center justify-between text-sm font-semibold tracking-wide text-primary md:flex">
            {rightLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex-1 px-4 text-center transition-colors hover:text-orange-500 hover:font-semibold"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-1 justify-end md:hidden">
            <Button 
              size="sm" 
              className="rounded-full"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {isMenuOpen ? 'Cerrar' : 'Menú'}
            </Button>
          </div>

          {/* Mobile Menu */}
          <div 
            className={`fixed inset-0 z-40 bg-transparent transition-opacity duration-300 md:hidden ${
              isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
            onClick={closeMenu}
          >
            <div 
              className={`fixed right-4 top-20 z-50 w-[calc(100%-2rem)] rounded-2xl border border-border/40 bg-background p-6 shadow-lg transition-all duration-300 ${
                isMenuOpen ? 'translate-y-0' : '-translate-y-4'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col space-y-4">
                {allLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="block rounded-lg px-4 py-3 text-center font-medium transition-colors hover:bg-orange-500 hover:text-white"
                    target={link.isExternal ? "_blank" : "_self"}
                    rel={link.isExternal ? "noopener noreferrer" : ""}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
