import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import mapa from "@/assets/mapa.png";
import logoBg from "@/assets/Logo.png";

const ORANGE = "#E85C03";

/** Dropdown pastilla (sin librerías) */
type Option = { value: string; label: string };
interface FancySelectProps {
  placeholder?: string;
  options: Option[];
  value: string;
  onChange: (v: string) => void;
}

function FancySelect({
  placeholder = "¿Eres de una inmobiliaria o emprendedor?",
  options = [],
  value,
  onChange,
}: FancySelectProps) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
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

      {open && (
        <div
          ref={menuRef}
          role="listbox"
          className="absolute z-30 mt-2 w-full bg-white rounded-xl border border-black/10 shadow-lg overflow-hidden max-h-60 overflow-y-auto"
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
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    mensaje: "",
  });
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone: string) =>
    /^[0-9+\-\s()]{7,15}$/.test(phone);

  const openGmailCompose = (to: string, subject: string, body: string) => {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`;
    const w = window.open(gmailUrl, "_blank");
    if (!w) {
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setOk(false);

    if (
      !form.nombre ||
      !form.apellido ||
      !form.email ||
      !form.telefono ||
      !form.mensaje
    ) {
      setError("Por favor completa todos los campos.");
      return;
    }
    if (!validateEmail(form.email)) {
      setError("Por favor ingresa un correo válido.");
      return;
    }
    if (!validatePhone(form.telefono)) {
      setError("Por favor ingresa un teléfono válido (7–15 dígitos).");
      return;
    }

    const subject = encodeURIComponent("Nuevo mensaje de contacto");
    const body = encodeURIComponent(
      `Nombre: ${form.nombre} ${form.apellido}\n` +
        `Email: ${form.email}\n` +
        `Teléfono: ${form.telefono}\n` +
        `Tipo de Cliente: ${tipoCliente || "(no especificado)"}\n\n` +
        `Mensaje:\n${form.mensaje}`
    );

    openGmailCompose("inmoleads@expertizdigital.com", subject, body);
    setOk(true);
    setForm({ nombre: "", apellido: "", email: "", telefono: "", mensaje: "" });
    setTipoCliente("");
  };

  return (
    <section
      id="contacto"
      className="py-10 sm:py-14 md:py-20 bg-[#F4F5F9] font-montserrat"
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
        <div className="grid gap-10 items-start lg:grid-cols-2">
          {/* Izquierda: mapa + leyendas */}
          <div className="w-full">
            <h3 className="text-center font-bold text-black leading-tight mb-4 sm:mb-6 text-[22px] sm:text-[26px] md:text-[28px]">
              Cada vez <br /> más cerca de ti
            </h3>

            {/* Contenedor responsivo del mapa */}
            <div className="relative inline-block w-full max-w-[640px]">
              {/* Decoración PNG detrás del mapa */}
              <img
                src={logoBg}
                alt="Decoración detrás del mapa"
                className="
                  absolute select-none pointer-events-none
                  -left-2 -top-2 w-[104%]
                  sm:-left-4 sm:-top-4 sm:w-[106%]
                  md:-left-6 md:-top-6 md:w-[108%]
                "
              />

              {/* Mapa */}
              <img
                src={mapa}
                alt="Mapa de cobertura"
                className="relative block w-full h-auto z-10"
                style={{ filter: "drop-shadow(0 14px 22px rgba(0,0,0,0.22))" }}
              />

              {/* Estados sobre el mapa */}
              <div className="pointer-events-none absolute inset-0 z-20">
                {/* Arriba-derecha */}
                <div
                  className="
                    absolute text-[#E85C03] font-bold text-right space-y-0.5
                    top-[6%] right-[3%]
                    sm:top-[7%] sm:right-[5%]
                    md:top-[8%] md:right-[7%]
                    text-[11px] leading-4
                    sm:text-[13px] sm:leading-5
                    md:text-[16px]
                  "
                >
                  <div className="drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
                    Baja California
                  </div>
                  <div className="drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
                    Sonora
                  </div>
                  <div className="drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
                    Chihuahua
                  </div>
                  <div className="drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
                    Coahuila
                  </div>
                  <div className="drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
                    Nuevo León
                  </div>
                  <div className="drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
                    Sinaloa
                  </div>
                  <div className="drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
                    Aguascalientes
                  </div>
                  <div className="drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
                    San Luis Potosí
                  </div>
                  <div className="drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
                    Zacatecas
                  </div>
                </div>

                {/* Abajo-izquierda */}
                <div
                  className="
                    absolute text-[#E85C03] font-bold space-y-0.5
                    left-[2%] bottom-[6%]
                    sm:left-[3%] sm:bottom-[7%]
                    md:left-[3%] md:bottom-[8%]
                    text-[11px] leading-4
                    sm:text-[13px] sm:leading-5
                    md:text-[16px]
                  "
                >
                  <div className="drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
                    Guanajuato
                  </div>
                  <div className="drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
                    Querétaro
                  </div>
                  <div className="drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
                    Estado de México
                  </div>
                  <div className="drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
                    Ciudad de México
                  </div>
                  <div className="drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
                    Puebla
                  </div>
                  <div className="drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
                    Tlaxcala
                  </div>
                  <div className="drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
                    Guerrero
                  </div>
                  <div className="drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
                    Oaxaca
                  </div>
                  <div className="drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
                    Chiapas
                  </div>
                  <div className="drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
                    Yucatán
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Derecha: formulario */}
          <div className="w-full">
            <h2 className="text-center font-bold text-black mb-5 sm:mb-6 text-[26px] sm:text-3xl md:text-4xl">
              Conecta con nosotros
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Nombre / Apellido */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  className="w-full rounded-full border-2 bg-white px-5 py-3 outline-none placeholder:text-black/50"
                  style={{ borderColor: ORANGE }}
                />
                <input
                  type="text"
                  name="apellido"
                  placeholder="Apellido"
                  value={form.apellido}
                  onChange={handleChange}
                  required
                  className="w-full rounded-full border-2 bg-white px-5 py-3 outline-none placeholder:text-black/50"
                  style={{ borderColor: ORANGE }}
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-full border-2 bg-white px-5 py-3 outline-none placeholder:text-black/50"
                style={{ borderColor: ORANGE }}
              />

              <input
                type="tel"
                name="telefono"
                placeholder="Teléfono"
                value={form.telefono}
                onChange={handleChange}
                required
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
                name="mensaje"
                placeholder="Cuéntanos como podríamos ayudarte..."
                rows={4}
                value={form.mensaje}
                onChange={handleChange}
                required
                className="w-full rounded-[32px] border-2 bg-white px-5 py-4 outline-none resize-none placeholder:text-black/50"
                style={{ borderColor: ORANGE }}
              />

              {error && (
                <p className="text-red-600 text-center text-sm sm:text-base">
                  {error}
                </p>
              )}
              {ok && (
                <p className="text-green-600 text-center text-sm sm:text-base">
                  Se abrió tu correo con el mensaje listo. ¡Revísalo y envíalo!
                </p>
              )}

              <div className="pt-1 sm:pt-2 flex">
                <button
                  type="submit"
                  className="w-full sm:w-auto sm:px-8 inline-flex items-center justify-center rounded-full px-6 py-3 font-bold text-white shadow-[0_6px_0_rgba(0,0,0,0.25)] active:translate-y-[2px] active:shadow-[0_4px_0_rgba(0,0,0,0.25)]"
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
