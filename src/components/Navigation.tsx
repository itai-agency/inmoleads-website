import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import logoImage from "@/assets/Logotipo.png";

type NavLink = { href: string; label: string };

const navLinks: NavLink[] = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#proceso", label: "Proceso" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
];

const WHATSAPP_CTA =
  "https://wa.me/525649871454?text=Hola,%20me%20gustaría%20agendar%20una%20reunión";

const Navigation = () => {
  const reduce = useReducedMotion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <motion.nav
      initial={reduce ? false : { y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-3 z-50"
    >
      <div className="container mx-auto px-3 md:px-6">
        <div
          className={`mx-auto flex w-full max-w-screen-xl items-center justify-between gap-4 rounded-2xl border px-4 py-2.5 transition-all duration-300 md:px-5 ${
            scrolled
              ? "border-[#16181D]/10 bg-[#efece6]/90 shadow-[0_10px_30px_rgba(40,50,65,0.10)] backdrop-blur-xl"
              : "border-[#16181D]/10 bg-[#efece6]/55 backdrop-blur-md"
          }`}
        >
          {/* Logo + status */}
          <div className="flex shrink-0 items-center gap-4">
            <a href="#inicio" className="flex items-center">
              <img src={logoImage} alt="Inmo Leads" className="h-9 w-auto md:h-10" />
            </a>
            <span className="hidden items-center gap-2 border-l border-[#16181D]/15 pl-4 xl:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E85C03] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#E85C03]" />
              </span>
              <span className="label-mono text-[9px] text-[#16181D]/55">
                Disponible
              </span>
            </span>
          </div>

          {/* Desktop links — mono, uppercase, orange underline on hover */}
          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative label-mono text-[11px] text-[#16181D]/60 transition-colors hover:text-[#16181D]"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-[#E85C03] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href={WHATSAPP_CTA}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden shrink-0 items-center gap-3 rounded-full bg-[#16181D] py-1.5 pl-5 pr-1.5 text-white transition-colors duration-300 hover:bg-[#E85C03] md:inline-flex"
          >
            <span className="label-mono text-[10px]">Agendar un meet</span>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#16181D]">
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>

          {/* Mobile toggle */}
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#16181D] text-white transition-transform active:scale-95 md:hidden"
            onClick={() => setIsMenuOpen((s) => !s)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2 overflow-hidden rounded-2xl border border-[#16181D]/10 bg-[#efece6]/97 p-3 shadow-2xl backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col divide-y divide-[#16181D]/10">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className="flex items-center justify-between px-3 py-3.5 text-[#16181D] transition-colors hover:text-[#E85C03]"
                  >
                    <span className="text-display text-lg font-semibold">
                      {link.label}
                    </span>
                    <span className="label-mono text-[10px] text-[#16181D]/35">
                      0{i + 1}
                    </span>
                  </motion.a>
                ))}
                <a
                  href={WHATSAPP_CTA}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#16181D] px-4 py-3.5 text-white"
                >
                  <span className="label-mono text-[11px]">Agendar un meet</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
