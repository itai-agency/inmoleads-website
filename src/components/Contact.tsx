import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";

const Contact = () => {
  return (
    <section id="contacto" className="py-24 bg-muted/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            ¡COMUNÍCATE CON NOSOTROS!
          </h2>
          <p className="text-xl text-muted-foreground">
            Queremos saber de ti
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Conecta con nosotros</h3>
              <p className="text-muted-foreground mb-8">
                Cada vez más cerca de ti. Completa el formulario y nos pondremos en contacto contigo.
              </p>
            </div>

            <div className="space-y-4">
              <Card className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Oficinas</div>
                    <div className="text-sm text-muted-foreground">
                      Presencia en 14 ciudades y 13 estados
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Teléfono</div>
                    <div className="text-sm text-muted-foreground">
                      +52 (55) 1234-5678
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Email</div>
                    <div className="text-sm text-muted-foreground">
                      contacto@inmoleads.com
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <Card className="p-8">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Nombre</label>
                  <Input placeholder="Tu nombre" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Apellido</label>
                  <Input placeholder="Tu apellido" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input type="email" placeholder="tu@email.com" />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Teléfono</label>
                <Input type="tel" placeholder="+52 (55) 1234-5678" />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  ¿En qué ciudad o municipio te encuentras?
                </label>
                <Input placeholder="Ciudad, Estado" />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Mensaje</label>
                <Textarea 
                  placeholder="Cuéntanos sobre tu proyecto inmobiliario..."
                  rows={4}
                />
              </div>

              <Button size="lg" className="w-full">
                Enviar Solicitud
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
