import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <section className="space-y-3">
    <h2 className="text-xl font-bold text-foreground">{title}</h2>
    <div className="text-muted-foreground leading-relaxed space-y-3">{children}</div>
  </section>
);

const Subheading = ({ children }: { children: ReactNode }) => (
  <h3 className="text-base font-semibold text-foreground pt-1">{children}</h3>
);

const BlankLine = () => (
  <span
    className="inline-block min-w-[12ch] border-b border-muted-foreground/50 align-baseline"
    aria-label="Espacio reservado"
  />
);

const AvisoPrivacidad = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1 container mx-auto max-w-3xl px-6 pt-28 pb-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden />
          <span>Volver al inicio</span>
        </Link>

        <header className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary mb-2">
            Usuarios página web – INMOLEADS BY EXPERTIZDIGITAL
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Aviso de privacidad integral
          </h1>
          <p className="text-sm text-muted-foreground">
            Fecha de última actualización: 07 de abril de 2026
          </p>
        </header>

        <article className="space-y-10 font-montserrat text-[15px] md:text-base">
          <div className="text-muted-foreground leading-relaxed space-y-4">
            <p>
              Bienvenido al Aviso de Privacidad Integral para los Usuarios de Página Web{" "}
              <strong className="text-foreground">INMOLEADS BY EXPERTIZDIGITAL</strong>. Este
              documento proporciona información sobre el Responsable de sus datos personales,
              qué tipo de información podemos recabar y las finalidades para las que solicitamos
              su información cuando navega por nuestra página web.
            </p>
            <p>
              Este Aviso de Privacidad cumple con lo dispuesto por la Ley Federal de Protección de
              Datos Personales en Posesión de Particulares (en lo sucesivo la &quot;Ley&quot;), su
              Reglamento y demás disposiciones aplicables en México, por tratarse del país en el
              que está ubicado el establecimiento de la entidad responsable de sus datos
              personales.
            </p>
          </div>

          <Section title="Identidad y domicilio del Responsable">
            <p>
              <strong className="text-foreground">ExpertizOne, S.C.</strong>, (en adelante,{" "}
              <strong className="text-foreground">INMOLEADS BY EXPERTIZDIGITAL</strong>) es el
              Responsable del uso y protección de tus datos personales. INMOLEADS BY
              EXPERTIZDIGITAL señala como domicilio para oír y recibir notificaciones el ubicado
              en Calle Jose Maria Maria Velazco 27890, Zona Urbana Rio, CP 22010 - CR 22001, en
              la Ciudad de Tijuana en la entidad de Baja California, país México.
            </p>
          </Section>

          <Section title="¿Para qué fines utilizaremos sus datos personales?">
            <p>
              Los datos personales que recabamos de usted, los utilizaremos para las siguientes
              finalidades:
            </p>
            <Subheading>Finalidades primarias</Subheading>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Proporcionar información a los titulares sobre los servicios prestados por
                INMOLEADS BY EXPERTIZDIGITAL, cuando estos así lo solicitan.
              </li>
              <li>
                Evaluación de perfil, canalización e información sobre opciones inmobiliarias,
                compra, o liberación de propiedades con adeudo.
              </li>
              <li>Atención y seguimiento a través de medios electrónicos.</li>
              <li>
                Estadística y registro histórico de navegación en la página web de INMOLEADS BY
                EXPERTIZDIGITAL.
              </li>
              <li>
                Análisis de datos mediante el uso de tecnologías de analítica, inteligencia
                artificial y/o &quot;big data&quot;, con el objeto de evaluar el uso los servicios
                e información que proporcionamos en la página web de INMOLEADS BY
                EXPERTIZDIGITAL.
              </li>
            </ul>
            <p>
              Las finalidades primarias de tratamiento de datos personales enlistadas con
              anterioridad requieren de su consentimiento, toda vez que no se encuentran
              contempladas dentro de los supuestos de excepción enunciados en el artículo 9° de la
              Ley, de conformidad con el artículo 15 Fracción III.
            </p>
            <Subheading>Finalidades secundarias</Subheading>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Elaboración de reportes y estadísticas, métricas y análisis de rendimientos de
                campañas publicitarias.
              </li>
              <li>
                Realización de acciones de remarketing y optimizaciones publicitarias para mejora
                del servicio.
              </li>
              <li>Comunicación</li>
            </ul>
          </Section>

          <Section title="¿Qué categorías de datos personales recabamos?">
            <p>
              En concreto, INMOLEADS BY EXPERTIZDIGITAL podrá recabar y tratar las siguientes
              categorías de datos personales:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Datos de identificación: nombre completo.</li>
              <li>Datos de contacto.</li>
              <li>Datos relacionados con crédito o vivienda INFONAVIT o FOVISSTTE.</li>
              <li>Datos de navegación, dispositivos y geolocalización</li>
            </ul>
            <Subheading>Datos personales sensibles</Subheading>
            <p>
              Para cumplir con las finalidades descritas en este Aviso INMOLEADS BY
              EXPERTIZDIGITAL no trata ni solicita datos personales sensibles.
            </p>
            <Subheading>Datos personales de terceros</Subheading>
            <p>
              Si entrega a INMOLEADS BY EXPERTIZDIGITAL datos personales de terceros (por ejemplo,
              referencias personales y/o laborales) para el cumplimiento de finalidades
              identificadas en el presente Aviso de Privacidad, deberá informarles sobre la
              existencia del tratamiento de sus datos personales y el contenido de este Aviso de
              Privacidad. Si proporciona dicha información, también manifiesta con su entrega que
              cuenta previamente con el consentimiento de sus titulares para proporcionar su
              información a INMOLEADS BY EXPERTIZDIGITAL y que los mismos son correctos y
              completos.
            </p>
          </Section>

          <Section title="¿Con quién compartimos su información personal y para qué fines?">
            <p>
              Sus datos personales podrán ser transferidos, dentro o fuera del territorio de
              México, a las siguientes categorías de destinatarios y para las finalidades
              identificadas:
            </p>
            <ul className="list-disc pl-5 space-y-3">
              <li>
                Organismos públicos; administraciones públicas federales, estatales y/o municipales;
                comisiones; institutos y/o entidades reguladoras, para el cumplimiento de la
                normativa sobre seguridad pública, así como para el cumplimiento de requerimientos
                judiciales o administrativos emitidos por autoridades competentes.
              </li>
              <li>
                Prestadores de servicios, para obtener servicios con finalidades de resguardo
                centralizado de la información; control de altas y bajas; modificaciones sobre el
                alcance de los servicios contratados; así como para la realización de análisis y
                estadísticas sobre nuestros clientes, con el objeto de evaluar, mejorar y diseñar
                nuevos servicios.
              </li>
              <li>
                Compañías filiales o subsidiarias de INMOLEADS BY EXPERTIZDIGITAL, para comunicar a
                estas entidades (Unidades de Negocio de INMOLEADS BY EXPERTIZDIGITAL) sobre
                información solicitada por los Usuarios sobre productos y servicios comercializados
                por dichas unidades de negocio.
              </li>
            </ul>
            <p>
              Las transferencias de datos personales antes indicadas no requieren de su
              consentimiento para poder ser efectuadas, toda vez que se encuentran contempladas
              dentro de los supuestos de excepción enunciados en el Artículo 36 de la Ley.
              Cualquier transferencia de sus datos personales que sí requiera de su consentimiento
              para efectuarse, será informada previamente, a través de la comunicación
              correspondiente y de la actualización al presente Aviso de Privacidad.
            </p>
          </Section>

          <Section title="¿Cómo puede ejercer sus derechos de Acceso, Rectificación, Cancelación y Oposición?">
            <p>
              Como titular de datos personales, usted puede ejercer cualquiera de sus derechos de
              acceso, rectificación, cancelación u oposición (en adelante, Derechos ARCO). Tenga
              presente que los Derechos ARCO comprenden:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-foreground">Acceso:</strong> derecho de conocer qué datos
                personales tenemos de usted, así como información sobre cómo los tratamos o
                compartimos.
              </li>
              <li>
                <strong className="text-foreground">Rectificación:</strong> derecho de solicitar
                en todo momento, la rectificación de sus datos que resulten inexactos o
                incompletos.
              </li>
              <li>
                <strong className="text-foreground">Cancelación:</strong> derecho a que cese el
                tratamiento de sus datos personales, a partir de un bloqueo y su posterior
                supresión.
              </li>
              <li>
                <strong className="text-foreground">Oposición:</strong> derecho a oponerse, por
                causa legítima, al tratamiento de sus datos personales.
              </li>
            </ul>
            <p>
              Para el ejercicio de cualquiera de los Derechos ARCO, usted podrá presentar la
              solicitud respectiva descargando el &quot;Formato para el Ejercicio de los Derechos
              ARCO y Revocación del Consentimiento&quot; que se encuentra en:{" "}
              <a
                href="/Formato-ARCO-ExpertizDigital.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4 hover:text-primary/90"
              >
                Descargar formato
              </a>{" "}
              o bien, también lo puede solicitar al correo electrónico:{" "}
              <a
                href="mailto:privacidad@inmoleads.pro"
                className="text-primary underline underline-offset-4 hover:text-primary/90"
              >
                privacidad@inmoleads.pro
              </a>
              .
            </p>
            <p>
              Para el ejercicio de cualquiera de los Derechos ARCO, usted deberá presentar la
              solicitud respectiva a través del siguiente medio: correo electrónico:{" "}
              <a
                href="mailto:privacidad@inmoleads.pro"
                className="text-primary underline underline-offset-4 hover:text-primary/90"
              >
                privacidad@inmoleads.pro
              </a>
              . La solicitud deberá incluir o estar acompañada de:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Su nombre y domicilio completos, u otro medio para comunicar la respuesta a su
                solicitud;
              </li>
              <li>
                Copia de un documento que acredite su identidad, y en su caso, la representación
                legal si alguien ejerce el derecho en su nombre;
              </li>
              <li>
                Una descripción clara y precisa del Derecho ARCO que desea ejercer y de los datos
                personales relacionados con su solicitud; y
              </li>
              <li>
                En su caso, cualquier otra información o documento que nos ayude a localizar sus
                datos personales o que respalde su solicitud en aquellos casos en que solicite una
                rectificación o una oposición.
              </li>
            </ul>
            <p>
              INMOLEADS BY EXPERTIZDIGITAL responderá a su solicitud dentro de los 20 (veinte) días
              hábiles siguientes a la fecha en que sea enviada y recibida. Si la solicitud resulta
              procedente, la haremos efectiva dentro de los 15 (quince) días hábiles siguientes a la
              fecha en que comunique la respuesta. En caso de que la información y/o documentación
              proporcionada en su solicitud resulten incompletas, erróneas y/o insuficientes, o
              bien, no se acompañen los documentos necesarios para acreditar su identidad o la
              representación legal correspondiente, le solicitaremos la corrección y subsanación de
              las deficiencias para poder dar trámite a dicha solicitud. Contarás con 10 (diez)
              días hábiles para atender el requerimiento y corrección de la solicitud; en caso
              contrario ésta se tendrá por no presentada.
            </p>
            <p>
              El uso de medios electrónicos para el ejercicio de los Derechos ARCO autoriza a
              INMOLEADS BY EXPERTIZDIGITAL para dar respuesta a la solicitud correspondiente a
              través del mismo medio, salvo que indique otro medio de contacto en tu solicitud, de
              forma clara y expresa.
            </p>
            <p>
              El derecho de cancelación no es absoluto. Por favor tome en cuenta que INMOLEADS BY
              EXPERTIZDIGITAL debe conservar información para cumplir con diversas obligaciones
              legales y que para hacerlo puede compartir sus datos personales con otras entidades u
              organismos. En tales casos, es posible que el derecho de cancelación deba solicitarse
              ante la entidad que recibió sus datos personales.
            </p>
            <Subheading>
              Datos de contacto de la persona o departamento de datos personales
            </Subheading>
            <p>Los datos de contacto de la persona o departamento de datos personales, que está a cargo de dar trámite a las solicitudes de Derechos ARCO, son los siguientes:</p>
            <ul className="list-none space-y-2 pl-0">
              <li>
                Nombre de la persona o departamento de datos personales: <BlankLine />
              </li>
              <li>
                Domicilio: <BlankLine />
              </li>
            </ul>
          </Section>

          <Section title="¿Quiere revocar su consentimiento?">
            <p>
              En algunos casos, puede revocar el consentimiento para el tratamiento de sus datos
              personales; sin embargo, esta revocación no puede tener efectos retroactivos, es
              decir, no puede afectar a situaciones, trámites o transferencias realizadas antes de la
              revocación de su consentimiento; así como tampoco en los casos en que dicha
              revocación suponga la imposibilidad de cumplir con obligaciones derivadas de una
              relación jurídica vigente entre usted y INMOLEADS BY EXPERTIZDIGITAL, o suponga el
              incumplimiento de disposiciones generales de orden público que establezcan la
              obligación de mantener el tratamiento de sus datos personales durante determinado
              período.
            </p>
            <p>
              Si desea revocar su consentimiento, puede enviar una solicitud de revocación de
              consentimiento al correo electrónico{" "}
              <a
                href="mailto:privacidad@inmoleads.pro"
                className="text-primary underline underline-offset-4 hover:text-primary/90"
              >
                privacidad@inmoleads.pro
              </a>
              , siguiendo las instrucciones aplicables al ejercicio de los Derechos ARCO.
            </p>
          </Section>

          <Section title="Medios automáticos para recabar datos personales">
            <p>
              Le informamos que en nuestra página de internet utilizamos &quot;cookies&quot;,
              &quot;web beacons&quot; u otras tecnologías, a través de las cuales es posible
              monitorear su comportamiento como usuario de internet, así como brindarle un mejor
              servicio y experiencia al navegar en nuestra página. Los datos personales que
              recabamos a través de estas tecnologías, los utilizaremos para el manejo de la sesión
              del usuario, así como para desplegar el contenido en el idioma correspondiente.
            </p>
            <p>Los datos personales que obtenemos de estas tecnologías de rastreo son los siguientes:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Identificadores, nombre de usuario y contraseñas de una sesión</li>
              <li>Idioma preferido por el usuario</li>
              <li>Tipo de navegador del usuario</li>
              <li>Tipo de sistema operativo del usuario</li>
              <li>Fecha y hora del inicio y final de una sesión de un usuario</li>
              <li>Búsquedas realizadas por un usuario</li>
            </ul>
            <p>
              Si usted no desea brindar información no específica, puede programar su navegador
              para rechazar las &quot;cookies&quot;, &quot;web beacons&quot; u otras tecnologías, o
              para avisar cuando un sitio intente enviarle las mismas. Sin embargo; si desactiva la
              opción de aceptar las &quot;cookies&quot;, &quot;web beacons&quot; u otras
              tecnologías, algunas de las secciones o servicios de nuestro sitio web pueden no
              funcionar correctamente. Para conocer cómo desactivarlas en su navegador, consulte el
              sitio web de su proveedor (por ejemplo: Internet Explorer, Google Chrome, Mozilla
              Firefox, Safari, entre otros).
            </p>
          </Section>

          <Section title="¿Cómo puede conocer los cambios en este aviso de privacidad?">
            <p>
              El presente aviso de privacidad puede sufrir modificaciones, cambios o actualizaciones
              derivadas de nuevos requerimientos legales; de nuestras propias necesidades por los
              productos o servicios que ofrecemos; de nuestras prácticas de privacidad; de cambios
              en nuestro modelo de negocio, o por otras causas.
            </p>
            <p>
              Nos comprometemos a mantenerlo informado sobre los cambios que pueda sufrir el
              presente aviso de privacidad, en tales casos, publicaremos dichos cambios en el sitio
              web:{" "}
              <a
                href="https://inmoleads.pro/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4 hover:text-primary/90"
              >
                https://inmoleads.pro/
              </a>
              , sección Aviso de Privacidad. Si así lo deseas, podrás solicitar la última versión
              de este Aviso de Privacidad a través de nuestro correo{" "}
              <a
                href="mailto:privacidad@inmoleads.pro"
                className="text-primary underline underline-offset-4 hover:text-primary/90"
              >
                privacidad@inmoleads.pro
              </a>
              .
            </p>
          </Section>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default AvisoPrivacidad;
