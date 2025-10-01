import { useRef } from "react";
import { ChevronLeft, ChevronRight, MapPin, Quote } from "lucide-react";
import degradado from "@/assets/degradado.png";

// Imágenes
import captura1 from "@/assets/captura11.jpeg";
import testimonio1 from "@/assets/testimonio1.jpg";

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
    role: "Inversionista",
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
    role: "KV FLIP",
    location: "Edo. México",
    lines: ["El acompañamiento fue excelente y los resultados llegaron rápido."],
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

  // 👇 Diferente estilo solo para Axel (id 1)
  const mediaClass = (slide: Slide) =>
    slide.id === 1
      ? "h-full w-full object-contain bg-black p-2"
      : "h-full w-full object-cover";

  return (
    <section className="relative py-16 md:py-20 overflow-hidden font-montserrat">
      {/* Fondo degradado */}
      <img
        src={degradado as unknown as string}
        alt=""
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      <div className="relative container mx-auto px-6 max-w-6xl">
        <h2 className="text-center text-3xl md:text-4xl lg:text-[40px] leading-tight text-[#2F3641] mb-8">
          Lo que <span className="font-extrabold">Nuestros Clientes</span>
          <br className="hidden md:block" /> dicen sobre nosotros
        </h2>

        {/* Flechas minimalistas y grandes */}
        <button
          onClick={() => scrollBySlide("prev")}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/60 hover:bg-white shadow-sm flex items-center justify-center transition"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-7 h-7 text-[#2F3641]" />
        </button>
        <button
          onClick={() => scrollBySlide("next")}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/60 hover:bg-white shadow-sm flex items-center justify-center transition"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-7 h-7 text-[#2F3641]" />
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
                  className="snap-center shrink-0 w-[72vw] md:w-[620px] lg:w-[680px] xl:w-[720px] min-h-[520px] md:min-h-[560px] rounded-[28px] overflow-hidden bg-white/55 backdrop-blur-md shadow-[0_25px_60px_rgba(0,0,0,0.15)] ring-1 ring-white/60"
                >
                  <div
                    className={`grid h-full ${
                      mediaLeft ? "grid-cols-[42%_58%]" : "grid-cols-[58%_42%]"
                    }`}
                  >
                    {/* Media */}
                    <div className={`${mediaLeft ? "" : "order-last"} relative`}>
                      {s.mediaType === "image" ? (
                        <img
                          src={s.mediaSrc}
                          alt={s.mediaAlt || s.name}
                          className={mediaClass(s)}
                        />
                      ) : (
                        <video
                          src={s.mediaSrc}
                          className={mediaClass(s)}
                          controls
                          preload="metadata"
                        />
                      )}
                      <div className="absolute inset-0 pointer-events-none ring-1 ring-white/40" />
                    </div>

                    {/* Texto */}
                    <div className="relative p-6 md:p-8 flex flex-col bg-gradient-to-b from-white/70 to-[#f7e7de]/60">
                      <div className="flex items-center gap-3 mb-5">
                        <span
                          className="inline-block w-5 h-5 rounded-full"
                          style={{ backgroundColor: ORANGE }}
                        />
                        <div className="leading-tight">
                          <div className="font-bold text-[#2F3641]">{s.name}</div>
                          <div className="text-sm text-[#6b7280]">{s.role}</div>
                        </div>
                      </div>

                      <Quote className="w-6 h-6 text-[#c8cbd1] mb-2" />

                      <div className="space-y-3">
                        {s.lines.map((l, idx) => (
                          <p
                            key={idx}
                            className={`text-[17px] leading-7 text-[#2F3641] ${
                              idx === s.lines.length - 1
                                ? "font-bold"
                                : "font-semibold"
                            }`}
                          >
                            {l}
                          </p>
                        ))}
                      </div>

                      <div className="mt-auto pt-6 flex items-center gap-2 text-sm text-[#6b7280]">
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
      </div>
    </section>
  );
}
