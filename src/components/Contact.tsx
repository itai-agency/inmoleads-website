import { useEffect, useRef, useState } from "react";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import mapa from "@/assets/mapa.png";
import logoBg from "@/assets/Logo.png";
import { Reveal } from "@/components/motion/Motion";
import SectionLabel from "@/components/SectionLabel";
import type { ReactNode } from "react";

const inputCls =
  "w-full border-b border-[#16181D]/20 bg-transparent py-2.5 text-[15px] text-[#16181D] outline-none transition-colors placeholder:text-[#16181D]/30 focus:border-[#E85C03]";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="label-mono text-[10px] text-[#16181D]/45">{label}</span>
      <div className="relative mt-1.5">{children}</div>
    </label>
  );
}

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
        className={`w-full border-b border-[#16181D]/20 bg-transparent py-3 pr-8 text-left text-[15px] transition-colors focus:border-[#E85C03] ${
          value ? "text-[#16181D]" : "text-[#16181D]/40"
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selectedLabel}
        <ChevronDown
          className={`absolute right-1 top-1/2 h-5 w-5 -translate-y-1/2 text-[#16181D]/50 transition-transform ${
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
      className="relative overflow-hidden bg-[#ECEDE9] py-20 font-montserrat text-[#16181D] md:py-28"
    >
      <div className="bg-blueprint pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto w-full max-w-[1200px] px-4 sm:px-6">
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          <SectionLabel title="Contacto" />
          <Reveal delay={0.15}>
            <p className="font-serif text-2xl italic leading-tight text-[#16181D]/65 md:text-3xl">
              Estamos a un mensaje de distancia.
            </p>
          </Reveal>
        </div>
        <div className="grid gap-12 items-start lg:grid-cols-2">
          {/* Izquierda: mapa + leyendas */}
          <Reveal className="w-full">
            <h3 className="text-display text-center font-bold text-[#16181D] leading-tight mb-6 text-[26px] sm:text-[30px] md:text-[34px]">
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
          </Reveal>

          {/* Derecha: formulario */}
          <Reveal delay={0.15} className="w-full rounded-[24px] border border-[#16181D]/10 bg-white p-7 shadow-[0_24px_60px_rgba(40,50,65,0.10)] sm:p-10">
            <p className="label-mono text-[10px] text-[#E85C03]">Cotización</p>
            <h2 className="text-display mt-3 text-[28px] font-bold text-[#16181D] sm:text-4xl">
              Conecta con nosotros
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-[#16181D]/55">
              Cuéntanos de tu proyecto y te respondemos a la brevedad.
            </p>

            <form className="mt-8 space-y-7" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                <Field label="Nombre">
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Tu nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                    className={inputCls}
                  />
                </Field>
                <Field label="Apellido">
                  <input
                    type="text"
                    name="apellido"
                    placeholder="Tu apellido"
                    value={form.apellido}
                    onChange={handleChange}
                    required
                    className={inputCls}
                  />
                </Field>
              </div>

              <Field label="Correo electrónico">
                <input
                  type="email"
                  name="email"
                  placeholder="tucorreo@ejemplo.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className={inputCls}
                />
              </Field>

              <Field label="Teléfono">
                <input
                  type="tel"
                  name="telefono"
                  placeholder="55 0000 0000"
                  value={form.telefono}
                  onChange={handleChange}
                  required
                  className={inputCls}
                />
              </Field>

              <Field label="¿Eres inmobiliaria o emprendedor?">
                <FancySelect
                  placeholder="Selecciona una opción"
                  options={[
                    { value: "inmobiliaria", label: "Inmobiliaria" },
                    { value: "emprendedor", label: "Emprendedor" },
                    { value: "otro", label: "Otro" },
                  ]}
                  value={tipoCliente}
                  onChange={setTipoCliente}
                />
              </Field>

              <Field label="Mensaje">
                <textarea
                  name="mensaje"
                  placeholder="Cuéntanos cómo podríamos ayudarte…"
                  rows={3}
                  value={form.mensaje}
                  onChange={handleChange}
                  required
                  className={`${inputCls} resize-none`}
                />
              </Field>

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
              {ok && (
                <p className="text-sm text-green-700">
                  Se abrió tu correo con el mensaje listo. ¡Revísalo y envíalo!
                </p>
              )}

              <button
                type="submit"
                className="group inline-flex w-full items-center justify-between gap-3 rounded-full bg-[#16181D] py-2 pl-7 pr-2 text-white transition-colors duration-300 hover:bg-[#E85C03]"
              >
                <span className="label-mono text-[11px]">Enviar mensaje</span>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#16181D]">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
