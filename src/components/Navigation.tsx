import { Button } from "@/components/ui/button";
import logoImage from "@/assets/Logotipo.png";

const leftLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#proceso", label: "Proceso" },
];

const rightLinks = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
  { href: "#agenda", label: "Agenda una demo" },
];

const Navigation = () => {
  return (
    <nav className="fixed top-4 left-0 right-0 z-50">
      <div className="container mx-auto px-3 md:px-6">
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between gap-6 rounded-full border border-border/40 bg-background/95 px-14 py-2 shadow-lg shadow-primary/10 backdrop-blur">
          <div className="hidden flex-1 items-center justify-between text-sm font-semibold tracking-wide text-primary md:flex">
            {leftLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex-1 px-4 text-center transition-colors hover:text-primary/70"
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
                className="flex-1 px-4 text-center transition-colors hover:text-primary/70"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-1 justify-end md:hidden">
            <Button size="sm" className="rounded-full">
              Menú
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
