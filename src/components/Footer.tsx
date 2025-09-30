import { Facebook, Instagram } from "lucide-react";

const TikTokIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M12 2c1.2 1.3 2.8 2.1 4.6 2.2v3.5c-1.7-.1-3.2-.8-4.6-1.9v7.3c0 3.5-2.8 6.3-6.3 6.3-1.3 0-2.5-.4-3.5-1.1.9.1 1.9-.2 2.7-.8a3.6 3.6 0 0 0 1.4-2.8V8.3h3.1v3.5c1.3.9 2.9 1.5 4.6 1.5V22h-2V2z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-[#5E5E5E] text-white py-12 font-montserrat">
      <div className="container mx-auto px-6 text-center">
        {/* Mensaje principal */}
        <h3 className="text-lg mb-2 font-bold">Queremos saber de ti</h3>
        <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-10">
          ¡COMUNÍCATE CON NOSOTROS!
        </h2>

        {/* Secciones */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Servicios */}
          <div>
            <h4 className="font-bold text-lg mb-4">Servicios</h4>
            <ul className="space-y-2 text-base font-normal text-gray-200">
              <li>Marketing Digital para Flipping</li>
              <li>Business Development Center</li>
            </ul>
          </div>

          {/* Síguenos */}
          <div>
            <h4 className="font-bold text-lg mb-4">Síguenos</h4>
            <div className="flex justify-center gap-6">
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                <Facebook className="w-6 h-6 text-black" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                <Instagram className="w-6 h-6 text-black" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                <TikTokIcon className="w-6 h-6 text-black" />
              </a>
            </div>
          </div>

          {/* Contáctanos */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contáctanos</h4>
            <ul className="space-y-2 text-xl font-normal text-white">
              <li>
                <strong>Teléfono:</strong> +52 (664) 374-5275
              </li>
              <li>
                <strong>Email:</strong> hola@expertizdigital.com
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
