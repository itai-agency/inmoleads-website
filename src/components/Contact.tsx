import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import mapa from "@/assets/mapa.png";
import logoBg from "@/assets/Logo.png"; // <- PNG decorativo de fondo

const ORANGE = "#E85C03";

/** Dropdown bonito estilo pastilla (sin librerías) */
function FancySelect({
  placeholder = "¿Eres de una inmobiliaria o emprendedor?",
  options = [],
  value,
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  // Cerrar al hacer clic fuera o con Escape
  useEffect(() => {
    const close = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    const esc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, []);

  const selectedLabel =
    options.find((o) => o.value === value)?.label || placeholder;

  return (
    <div className="relative">
      {/* Botón pastilla naranja */}
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="w-full rounded-full px-5 py-3 pr-12 font-bold text-white text-left"
        style={{ backgroundColor: ORANGE }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selectedLabel}
        <ChevronDown
          className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Menú flotante */}
      {open && (
        <div
          ref={menuRef}
          role="listbox"
          className="absolute z-30 mt-2 w-full bg-white rounded-xl border border-black/10 shadow-lg overflow-hidden"
        >
          {options.map((opt) => {
            const active = opt.value === value;
            return (
              <div
                key={opt.value}
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange?.(opt.value);
                  setOpen(false);
                }}
                className={`px-4 py-2 cursor-pointer text-sm md:text-base ${
                  active
                    ? "bg-[#F4F5F9] text-[#E85C03] font-semibold"
                    : "text-black hover:bg-[#F4F5F9] hover:text-[#E85C03]"
                }`}
              >
                {opt.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Contact() {
  const [tipoCliente, setTipoCliente] = useState("");

  return (
    <section
      id="contacto"
      className="py-16 md:py-20 bg-[#F4F5F9] font-montserrat"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Izquierda: mapa + leyendas */}
          <div>
            <h3 className="text-[26px] md:text-[28px] font-bold text-black leading-tight mb-3">
              Cada vez <br /> más cerca de ti
            </h3>

            {/* Contenedor del mapa con PNG de fondo */}
            <div className="inline-block mb-3 relative">
              {/* PNG de fondo (detrás del mapa) */}
              <img
                src={logoBg}
                alt="Decoración detrás del mapa"
                className="absolute -left-6 -top-6 w-[108%] select-none pointer-events-none"
              />

              {/* Mapa principal */}
              <img
                src={mapa}
                alt="Mapa de cobertura"
                className="relative block max-w-full h-auto z-10"
                style={{
                  filter: "drop-shadow(0 14px 22px rgba(0,0,0,0.22))",
                }}
              />

              {/* Overlay de letras / estados */}
              <div className="pointer-events-none absolute inset-0 z-20">
                {/* Arriba-derecha */}
                <div className="absolute right-[6%] top-[10%] text-[12px] md:text-[13px] leading-4 text-[#E85C03] font-bold text-right space-y-0.5">
                  <div>Baja California</div>
                  <div>Sonora</div>
                  <div>Chihuahua</div>
                  <div>Coahuila</div>
                  <div>Nuevo León</div>
                  <div>Sinaloa</div>
                  <div>Aguascalientes</div>
                  <div>San Luis Potosí</div>
                  <div>Zacatecas</div>
                </div>

                {/* Abajo-izquierda */}
                <div className="absolute left-[2%] bottom-[6%] text-[12px] md:text-[13px] leading-4 text-[#E85C03] font-bold space-y-0.5">
                  <div>Guanajuato</div>
                  <div>Querétaro</div>
                  <div>Estado de México</div>
                  <div>Ciudad de México</div>
                  <div>Puebla</div>
                  <div>Tlaxcala</div>
                  <div>Guerrero</div>
                  <div>Oaxaca</div>
                  <div>Chiapas</div>
                  <div>Yucatán</div>
                </div>
              </div>
            </div>
          </div>

          {/* Derecha: formulario */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 text-center">
              Conecta con nosotros
            </h2>

            <form className="space-y-4">
              {/* Nombre / Apellido */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="w-full rounded-full border-2 bg-white px-5 py-3 outline-none placeholder:text-black/50"
                  style={{ borderColor: ORANGE }}
                />
                <input
                  type="text"
                  placeholder="Apellido"
                  className="w-full rounded-full border-2 bg-white px-5 py-3 outline-none placeholder:text-black/50"
                  style={{ borderColor: ORANGE }}
                />
              </div>

              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full rounded-full border-2 bg-white px-5 py-3 outline-none placeholder:text-black/50"
                style={{ borderColor: ORANGE }}
              />

              <input
                type="tel"
                placeholder="Teléfono"
                className="w-full rounded-full border-2 bg-white px-5 py-3 outline-none placeholder:text-black/50"
                style={{ borderColor: ORANGE }}
              />

              {/* Dropdown estilizado */}
              <FancySelect
                options={[
                  { value: "inmobiliaria", label: "Inmobiliaria" },
                  { value: "emprendedor", label: "Emprendedor" },
                  { value: "otro", label: "Otro" },
                ]}
                value={tipoCliente}
                onChange={setTipoCliente}
              />

              <textarea
                placeholder="Cuéntanos como podríamos ayudarte..."
                rows={4}
                className="w-full rounded-[32px] border-2 bg-white px-5 py-4 outline-none resize-none placeholder:text-black/50"
                style={{ borderColor: ORANGE }}
              />

              <div className="pt-2 flex justify-center">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full px-6 py-2.5 font-bold text-white shadow-[0_6px_0_rgba(0,0,0,0.25)] active:translate-y-[2px] active:shadow-[0_4px_0_rgba(0,0,0,0.25)]"
                  style={{ backgroundColor: ORANGE }}
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
