import { Facebook, Instagram } from "lucide-react";
import tiktokIcon from "@/assets/tiktok.png";
import { Reveal, Stagger, StaggerItem, SpotlightCursor } from "@/components/motion/Motion";

const ORANGE = "#E85C03";
const WHATSAPP_URL =
  "https://wa.me/526643745275?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20sus%20servicios.";
const GMAIL_COMPOSE_URL =
  "https://mail.google.com/mail/?view=cm&fs=1&to=inmoleads@expertizdigital.com&su=Consulta&body=Hola%2C%20me%20gustar%C3%ADa%20informaci%C3%B3n.";

const socialBtn =
  "w-12 h-12 rounded-full bg-white flex items-center justify-center transition-all duration-300 group hover:bg-[#E85C03] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E85C03] focus:ring-offset-[#1A1A1A]";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#16181D] py-12 font-montserrat text-white">
      {/* blueprint grid + cursor spotlight */}
      <div className="bg-blueprint-ink pointer-events-none absolute inset-0 opacity-70" />
      <SpotlightCursor color="rgba(232,92,3,0.16)" size={420} />
      {/* brand glow */}
      <div className="animate-aurora pointer-events-none absolute -top-24 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-[#E85C03]/15 blur-3xl" />
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#E85C03] to-transparent" />

      <div className="container relative mx-auto px-6 pt-12 text-center">
        <Reveal>
          <h3
            className="text-display"
            style={{
              color: "#ffffff",
              fontWeight: 400,
              fontSize: "clamp(24px, 4vw, 44px)",
            }}
          >
            Queremos saber de ti
          </h3>
          <h2
            className="text-display mb-10 text-3xl font-bold md:text-5xl"
            style={{ color: ORANGE }}
          >
            ¡COMUNÍCATE CON NOSOTROS!
          </h2>
        </Reveal>

        <Stagger className="mb-12 grid gap-12 md:grid-cols-3" stagger={0.12}>
          {/* Servicios */}
          <StaggerItem>
            <h4 className="mb-4 text-lg font-bold text-white">Servicios</h4>
            <ul className="space-y-2 text-lg font-normal leading-relaxed text-white">
              <li>Marketing Digital para Flipping</li>
              <li>Business Development Center</li>
            </ul>
          </StaggerItem>

          {/* Síguenos */}
          <StaggerItem>
            <h4 className="mb-4 text-lg font-bold text-white">Síguenos</h4>
            <div className="flex justify-center gap-6">
              <a
                href="https://www.facebook.com/profile.php?id=100088710601367"
                target="_blank"
                rel="noopener noreferrer"
                className={socialBtn}
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6 text-black transition-colors group-hover:text-white" />
              </a>
              <a
                href="https://www.instagram.com/inmoleads.mkt/"
                target="_blank"
                rel="noopener noreferrer"
                className={socialBtn}
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6 text-black transition-colors group-hover:text-white" />
              </a>
              <a
                href="https://www.tiktok.com/@inmoleads"
                target="_blank"
                rel="noopener noreferrer"
                className={socialBtn}
                aria-label="TikTok"
              >
                <img
                  src={tiktokIcon}
                  alt="TikTok"
                  className="h-6 w-6 object-contain transition-all group-hover:brightness-0 group-hover:invert"
                />
              </a>
            </div>
          </StaggerItem>

          {/* Contáctanos */}
          <StaggerItem>
            <h4 className="mb-4 text-lg font-bold text-white">Contáctanos</h4>
            <ul className="space-y-3 text-lg font-normal leading-relaxed text-white">
              <li>
                <strong>Teléfono:</strong>{" "}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-white/40 underline-offset-4 hover:decoration-white"
                  aria-label="Escríbenos por WhatsApp"
                >
                  +52 (664) 374-5275
                </a>
              </li>
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href={GMAIL_COMPOSE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-white/40 underline-offset-4 hover:decoration-white"
                  aria-label="Escríbenos por Gmail"
                >
                  inmoleads@expertizdigital.com
                </a>
              </li>
            </ul>
          </StaggerItem>
        </Stagger>
      </div>
    </footer>
  );
};

export default Footer;
