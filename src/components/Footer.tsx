import { Facebook, Instagram } from "lucide-react";
import tiktokIcon from "@/assets/tiktok.png";

const ORANGE = "#E85C03";
const WHATSAPP_URL =
  "https://wa.me/526643745275?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20sus%20servicios.";
const GMAIL_COMPOSE_URL =
  "https://mail.google.com/mail/?view=cm&fs=1&to=inmoleads@expertizdigital.com&su=Consulta&body=Hola%2C%20me%20gustar%C3%ADa%20informaci%C3%B3n.";

const socialBtn =
  "w-12 h-12 rounded-full bg-white flex items-center justify-center transition-colors group hover:bg-[#E85C03] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E85C03] focus:ring-offset-[#1A1A1A]";

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white py-12 font-montserrat">
      <div className="container mx-auto px-6 text-center">
        <h3 
        style={{ color: "#ffffff", fontWeight: "7", fontSize: "clamp(24px, 4vw, 40px)" }}
        className="text-3x1 md:text-4xl">Queremos saber de ti</h3>
        <h2
          className="text-3xl md:text-4xl font-bold mb-10"
          style={{ color: ORANGE }}
        >
          ¡COMUNÍCATE CON NOSOTROS!
        </h2>

        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Servicios */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Servicios</h4>
            <ul className="space-y-2 text-lg font-normal text-white leading-relaxed">
              <li>Marketing Digital para Flipping</li>
              <li>Business Development Center</li>
            </ul>
          </div>

          {/* Síguenos */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Síguenos</h4>
            <div className="flex justify-center gap-6">
              <a
                href="https://www.facebook.com/profile.php?id=100088710601367"
                target="_blank"
                rel="noopener noreferrer"
                className={socialBtn}
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6 text-black group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://www.instagram.com/inmoleads.mkt/"
                target="_blank"
                rel="noopener noreferrer"
                className={socialBtn}
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6 text-black group-hover:text-white transition-colors" />
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
                  className="w-6 h-6 object-contain transition-all group-hover:invert group-hover:brightness-0"
                />
              </a>
            </div>
          </div>

          {/* Contáctanos */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Contáctanos</h4>
            <ul className="space-y-3 text-lg font-normal text-white leading-relaxed">
              <li>
                <strong>Teléfono:</strong>{" "}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 decoration-white/40 hover:decoration-white"
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
                  className="underline underline-offset-4 decoration-white/40 hover:decoration-white"
                  aria-label="Escríbenos por Gmail"
                >
                  inmoleads@expertizdigital.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
