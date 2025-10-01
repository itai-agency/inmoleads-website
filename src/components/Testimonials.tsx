import { useRef } from "react";
import { ChevronLeft, ChevronRight, MapPin, Quote } from "lucide-react";
import degradado from "@/assets/degradado.png";

// Imágenes
import captura1 from "@/assets/captura11.jpeg";
import testimonio1 from "@/assets/testimonio1.jpg";
import captura2 from "@/assets/captura2.jpg";

type MediaType = "image" | "video";

type Slide = {
  id: number;
  mediaType: MediaType;
  mediaSrc: string;
  mediaAlt: string;
  name: string;
  role: string;
  location: string;
  lines: string[];
  mediaSide: "left" | "right";
};

const SLIDES: Slide[] = [
  {
    id: 1,
    mediaType: "image",
    mediaSrc: captura1,
    mediaAlt: "Conversación de WhatsApp",
    name: "Axel Serrano",
    role: "Bhaz Inmobiliaria",
    location: "México, Tijuana",
    lines: [
      "Nos encantó el servicio y los resultados que está teniendo…",
      "No nos vamos a dar abasto",
    ],
    mediaSide: "left",
  },
  {
    id: 2,
    mediaType: "image",
    mediaSrc: testimonio1,
    mediaAlt: "Foto de Daniel",
    name: "Daniel Rodriguez",
    role: "RoRo Inmobiliaria",
    location: "Edo. México",
    lines: ["El acompañamiento fue excelente y los resultados llegaron rápido."],
    mediaSide: "right",
  },
  {
    id: 3,
    mediaType: "image",
    mediaSrc: captura2,
    mediaAlt: "Captura de conversación",
    name: "Alonso",
    role: "KV FLIP",
    location: "Edo. México",
    lines: [
      "Empiezo a conocer pro y contras de este negocio.",
      "El feedback que recibí fue positivo.",
    ],
    mediaSide: "right",
  },
];

const ORANGE = "#E85C03";

export default function TestimonialsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBySlide = (dir: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-slide="true"]');
    const gap = 24;
    const delta = card ? card.clientWidth + gap : el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "next" ? delta : -delta, behavior: "smooth" });
  };

  // Topes por defecto (todos los slides)
  const DEFAULT_IMG_MAXH =
    "max-h-[78vh] md:max-h-[70vh] lg:max-h-[64vh] xl:max-h-[58vh]";
  const DEFAULT_TEXT_MAXH =
    "md:max-h-[70vh] lg:max-h-[64vh] xl:max-h-[58vh]";

  // Topes especiales para Alonso (id:3) -> más altos en móvil y desktop
  const ALONSO_IMG_MAXH =
    "max-h-[90vh] md:max-h-[82vh] lg:max-h-[76vh] xl:max-h-[72vh]";
  const ALONSO_TEXT_MAXH =
    "md:max-h-[82vh] lg:max-h-[76vh] xl:max-h-[72vh]";

  const imgMaxH = (s: Slide) => (s.id === 3 ? ALONSO_IMG_MAXH : DEFAULT_IMG_MAXH);
  const textMaxH = (s: Slide) => (s.id === 3 ? ALONSO_TEXT_MAXH : DEFAULT_TEXT_MAXH);

  const mediaImgBase = "w-full h-auto object-contain";

  return (
    <section className="relative py-12 sm:py-14 md:py-16 lg:py-20 overflow-hidden font-montserrat">
      {/* Fondo degradado */}
      <img
        src={degradado as unknown as string}
        alt=""
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      <div className="relative container mx-auto px-4 sm:px-5 md:px-6 max-w-6xl">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-[40px] leading-tight text-[#2F3641] mb-6 md:mb-8">
          Lo que <span className="font-extrabold">Nuestros Clientes</span>
          <br className="hidden md:block" /> dicen sobre nosotros
        </h2>

        {/* Flechas (ocultas en xs) */}
        <button
          onClick={() => scrollBySlide("prev")}
          className="hidden sm:flex absolute left-2 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/60 hover:bg-white shadow-sm items-center justify-center transition"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-7 h-7 md:w-8 md:h-8 text-[#2F3641]" />
        </button>
        <button
          onClick={() => scrollBySlide("next")}
          className="hidden sm:flex absolute right-2 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/60 hover:bg-white shadow-sm items-center justify-center transition"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-7 h-7 md:w-8 md:h-8 text-[#2F3641]" />
        </button>

        {/* Track */}
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ scrollBehavior: "smooth" }}
        >
          <style>{`[data-carousel]::-webkit-scrollbar{display:none}`}</style>

          <div data-carousel className="contents">
            {SLIDES.map((s) => {
              const mediaLeft = s.mediaSide === "left";
              return (
                <div
                  key={s.id}
                  data-slide="true"
                  className="
                    snap-center shrink-0
                    w-[88vw] sm:w-[80vw] md:w-[600px] lg:w-[660px] xl:w-[700px]
                    h-auto
                    rounded-[24px] md:rounded-[28px] overflow-hidden
                    bg-white/55 backdrop-blur-md
                    shadow-[0_18px_50px_rgba(0,0,0,0.14)]
                    ring-1 ring-white/60
                  "
                >
                  {/* Layout: la ALTURA la fija la columna de media */}
                  <div
                    className={`
                      grid items-stretch
                      grid-rows-[auto_1fr] md:grid-rows-1
                      ${mediaLeft ? "md:grid-cols-[44%_56%]" : "md:grid-cols-[56%_44%]"}
                    `}
                  >
                    {/* Media (define altura total) */}
                    <div
                      className={`
                        ${mediaLeft ? "" : "md:order-last"}
                        relative flex items-center justify-center bg-white
                      `}
                    >
                      {s.mediaType === "image" ? (
                        <img
                          src={s.mediaSrc}
                          alt={s.mediaAlt || s.name}
                          className={`${mediaImgBase} ${imgMaxH(s)}`}
                        />
                      ) : (
                        <video
                          src={s.mediaSrc}
                          className={`${mediaImgBase} ${imgMaxH(s)}`}
                          controls
                          preload="metadata"
                        />
                      )}
                      <div className="absolute inset-0 pointer-events-none ring-1 ring-white/40" />
                    </div>

                    {/* Texto (no estira la tarjeta; scrollea si excede) */}
                    <div
                      className={`
                        relative p-4 sm:p-5 md:p-7
                        flex flex-col gap-3
                        bg-gradient-to-b from-white/70 to-[#f7e7de]/60
                        min-h-0 overflow-hidden md:overflow-auto
                        ${textMaxH(s)}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="inline-block w-4 h-4 md:w-5 md:h-5 rounded-full"
                          style={{ backgroundColor: ORANGE }}
                        />
                        <div className="leading-tight">
                          <div className="font-bold text-[#2F3641] text-sm sm:text-base md:text-lg">
                            {s.name}
                          </div>
                          <div className="text-xs sm:text-sm text-[#6b7280]">
                            {s.role}
                          </div>
                        </div>
                      </div>

                      <Quote className="w-5 h-5 md:w-6 md:h-6 text-[#c8cbd1]" />

                      <div className="space-y-2 md:space-y-3">
                        {s.lines.map((l, idx) => (
                          <p
                            key={idx}
                            className={`text-[15px] sm:text-[16px] md:text-[17px] leading-6 md:leading-7 text-[#2F3641] ${
                              idx === s.lines.length - 1
                                ? "font-bold"
                                : "font-semibold"
                            }`}
                          >
                            {l}
                          </p>
                        ))}
                      </div>

                      <div className="mt-auto pt-2 sm:pt-3 md:pt-4 flex items-center gap-2 text-xs sm:text-sm text-[#6b7280]">
                        <MapPin className="w-4 h-4" />
                        {s.location}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controles inferiores en móvil */}
        <div className="mt-4 sm:hidden flex justify-center gap-3">
          <button
            onClick={() => scrollBySlide("prev")}
            className="w-11 h-11 rounded-full bg-white/70 hover:bg-white shadow-sm grid place-items-center"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6 text-[#2F3641]" />
          </button>
          <button
            onClick={() => scrollBySlide("next")}
            className="w-11 h-11 rounded-full bg-white/70 hover:bg-white shadow-sm grid place-items-center"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-6 h-6 text-[#2F3641]" />
          </button>
        </div>
      </div>
    </section>
  );
}
