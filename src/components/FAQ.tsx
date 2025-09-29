import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "¿Cuál es el proceso de captación de marketing?",
      answer: "Utilizamos una combinación de estrategias digitales avanzadas, incluyendo SEO, publicidad en redes sociales, y campañas de Google Ads para captar leads de alta calidad interesados en el mercado inmobiliario."
    },
    {
      question: "¿Hay condiciones de largo plazo involucradas?",
      answer: "No, trabajamos con contratos flexibles que se adaptan a tus necesidades. Puedes iniciar con proyectos específicos sin compromisos a largo plazo."
    },
    {
      question: "¿Cuál es nuestra cobertura geográfica?",
      answer: "Tenemos presencia en 14 ciudades principales y 13 estados de México, con capacidad de expandir nuestros servicios según las necesidades de cada cliente."
    },
    {
      question: "¿Cuándo se pueden esperar resultados concretos?",
      answer: "Los primeros leads calificados suelen comenzar a llegar en las primeras 2-3 semanas. Los resultados óptimos y constantes se observan generalmente después del primer mes de operación."
    }
  ];

  return (
    <section className="py-24 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center">
            Preguntas frecuentes
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-background/10 backdrop-blur-sm rounded-xl border border-secondary-foreground/20 px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold text-lg pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-secondary-foreground/80 pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
