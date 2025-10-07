import { useRef } from "react";
import { ChevronLeft, ChevronRight, MapPin, Quote } from "lucide-react";
import degradado from "@/assets/degradado.png";
import captura1 from "@/assets/captura11.jpeg";
import captura2 from "@/assets/captura2.jpg";
import testimonio1 from "@/assets/testimonio1.jpg";

type Slide = {
  id: number;
  name: string;
  role: string;
  location: string;
  lines: string[];
  mediaSrc: string;
};

const SLIDES: Slide[] = [
  {
    id: 1,
    name: "Axel Serrano",
    role: "Bhaz Inmobiliaria",
    location: "México, Tijuana",
    lines: [
      "Nos encantó el servicio y los resultados que está teniendo... No nos vamos a dar abasto",
    ],
    mediaSrc: captura1,
  },
  {
    id: 2,
    name: "Alonso",
    role: "KV Flip",
    location: "Edo. México",
    lines: ["Empiezo a conocer los pro y contras de este negocio.",
    ],
    mediaSrc: captura2,
  },
  {
    id: 3,
    name: "Daniel Rodriguez",
    role: "RoRo Inmobiliaria",
    location: "Edo. México",
    lines: ["El acompañamiento fue excelente y los resultados llegaron rápido."],
    mediaSrc: testimonio1,
  },
];

const ORANGE = "#E85C03";

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-slide="true"]');
    const gap = 24;
    const delta = card ? card.clientWidth + gap : el.clientWidth * 0.9;
    el.scrollBy({ left: dir === "next" ? delta : -delta, behavior: "smooth" });
  };

  return (
    <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Fondo degradado global */}
      <img
        src={degradado as unknown as string}
        alt=""
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      <div className="relative container mx-auto px-4 sm:px-6 max-w-[1000px]">
        <h2 className="text-center text-[#2F3641] font-semibold
                       text-[clamp(24px,4vw,40px)] leading-tight mb-[clamp(16px,3vw,28px)]">
          Lo que <span className="font-extrabold">Nuestros Clientes</span>
          <br className="hidden md:block" /> dicen sobre nosotros
        </h2>

        {/* Flechas flotantes */}
        <button
          onClick={() => scroll("prev")}
          className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 z-30
                     w-[clamp(40px,4vw,56px)] h-[clamp(40px,4vw,56px)]
                     rounded-full bg-white/75 hover:bg-white shadow-[0_10px_30px_rgba(0,0,0,.15)]
                     ring-1 ring-white/60 items-center justify-center transition"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-[clamp(20px,2.4vw,28px)] h-[clamp(20px,2.4vw,28px)] text-[#2F3641]" />
        </button>
        <button
          onClick={() => scroll("next")}
          className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 z-30
                     w-[clamp(40px,4vw,56px)] h-[clamp(40px,4vw,56px)]
                     rounded-full bg-white/75 hover:bg-white shadow-[0_10px_30px_rgba(0,0,0,.15)]
                     ring-1 ring-white/60 items-center justify-center transition"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-[clamp(20px,2.4vw,28px)] h-[clamp(20px,2.4vw,28px)] text-[#2F3641]" />
        </button>

        {/* Track / Carrusel */}
        <div
          ref={trackRef}
          className="flex gap-[clamp(14px,2vw,24px)] overflow-x-auto pb-2 snap-x snap-mandatory
                     [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ scrollBehavior: "smooth" }}
        >
          <style>{`[data-carousel]::-webkit-scrollbar{display:none}`}</style>

          <div data-carousel className="contents">
            {SLIDES.map((s) => (
              <article
                key={s.id}
                data-slide="true"
                className="snap-center shrink-0
                  w-[75vw] sm:w-[68vw] md:w-[min(650px,68vw)]
                  rounded-[16px] overflow-hidden relative
                  bg-black/30 backdrop-blur-md
                  shadow-[0_12px_30px_rgba(0,0,0,0.1)]
                  ring-1 ring-white/50
                  min-h-[320px] max-h-[480px]
                "
              >
                {/* UNA sola capa de borde interior suave */}
                <div className="absolute inset-0 pointer-events-none
                                rounded-[clamp(18px,2vw,24px)] -1 ringring-white/35" />

                {/* 2 columnas que se adaptan */}
                <div
                  className="grid items-stretch h-full
                    gap-4 p-4
                    grid-cols-1 md:grid-cols-[300px_1fr]
                    md:gap-5 md:p-5"
                >
                  {/* Columna izquierda: chat */}
                  <div className="h-full rounded-[clamp(14px,1.6vw,20px)] bg-white
                      ring-1 ring-black/5 overflow-hidden
                      flex items-center justify-center
                    ">
                    <img
                      src={s.mediaSrc}
                      alt={`${s.name} chat`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Columna derecha: texto con degradado */}
                  <div className="relative h-full rounded-[clamp(14px,1.6vw,20px)]
                      overflow-hidden
                    ">
                    <div className="absolute inset-0" />
                    <div className="relative h-full flex flex-col justify-between
                        p-5 gap-4
                      ">
                      {/* encabezado */}
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className="inline-block rounded-full
                                     w-[clamp(12px,1.4vw,16px)] h-[clamp(12px,1.4vw,16px)]"
                          style={{ backgroundColor: ORANGE }}
                        />
                        <div className="leading-tight">
                          <div className="font-bold text-white 
                                          text-[18px] md:text-[20px] leading-tight">
                            {s.name}
                          </div>
                          <div className="text-white
                                          text-[14px] mt-0.5">
                            {s.role}
                          </div>
                        </div>
                      </div>

                      {/* cita */}
                      <div className="flex items-start gap-[clamp(8px,1.2vw,12px)]">
                        <Quote className="text-[#c8cbd1]
                                          w-[clamp(16px,1.8vw,20px)]
                                          mt-[2px]" />
                        <div className="space-y-[clamp(6px,1vw,10px)]">
                          {s.lines.map((l, i) => (
                            <p
                              key={i}
                              className={`text-white
                                text-[clamp(15px,1.8vw,18px)]
                                leading-[clamp(22px,2.4vw,28px)]
                                ${i === s.lines.length - 1 ? "font-extrabold" : "font-semibold"}`}
                            >
                              {l}
                            </p>
                          ))}
                        </div>
                      </div>

                      {/* ubicación al pie */}
                      <div className="mt-6 pt-3 border-t border-gray-600 flex items-center gap-2
                                      text-gray-300 text-[clamp(12px,1.2vw,14px)] sm:text-sm">
                        <MapPin className="w-[clamp(14px,1.6vw,16px)] h-[clamp(14px,1.6vw,16px)] text-gray-300" />
                        <span className="block sm:inline">{s.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Controles en móvil */}
        <div className="mt-4 sm:hidden flex justify-center gap-3">
          <button
            onClick={() => scroll("prev")}
            className="w-11 h-11 rounded-full bg-white/75 hover:bg-white shadow-sm grid place-items-center"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6 text-[#2F3641]" />
          </button>
          <button
            onClick={() => scroll("next")}
            className="w-11 h-11 rounded-full bg-white/75 hover:bg-white shadow-sm grid place-items-center"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-6 h-6 text-[#2F3641]" />
          </button>
        </div>
      </div>

      {/* Estilos específicos para dispositivos móviles */}
      <style>{`
        @media (max-width: 768px) {
          .text-white {
            font-size: 14px !important; /* Reducir tamaño de texto solo en móvil */
            line-height: 1.4;
          }
        }
      `}</style>
    </section>
  );
}
