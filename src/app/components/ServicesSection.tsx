import { CheckCircle2, FileText, CreditCard, Mail, Calculator, Settings, Building2, FileCheck, ListChecks } from "lucide-react";
import servicesImage from "figma:asset/0dcf0ddfcf58692638e035bac4186e6cdd20f830.png";

export function ServicesSection() {
  const services = [
    {
      icon: CreditCard,
      title: "zaplatenosť a splatnosť poistenia"
    },
    {
      icon: FileText,
      title: "duplicitné zelené karty k vozidlám"
    },
    {
      icon: Settings,
      title: "dohlásenie ŠPZ"
    },
    {
      icon: Mail,
      title: "nedoručenú poštu z poisťovní"
    },
    {
      icon: Calculator,
      title: "prepočty a úpravy poistenia"
    },
    {
      icon: Settings,
      title: "zmeny údajov v poisťovniach"
    },
    {
      icon: Building2,
      title: "vinkulácie pre banky a leasing"
    },
    {
      icon: FileCheck,
      title: "potvrdenia a administratívu k zmluvám"
    }
  ];

  return (
    <section id="sluzby" className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-12 justify-center">
            <div className="bg-blue-50 p-3 rounded-2xl">
              <ListChecks className="w-8 h-8 text-blue-700" />
            </div>
            <h2 className="text-blue-900 text-3xl md:text-4xl">Čo riešime pre našich klientov najčastejšie</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all hover:border-blue-300"
            >
              <div className="flex items-start gap-4">
                <div className="bg-white p-2.5 rounded-lg shadow-sm shrink-0">
                  <service.icon className="w-5 h-5 text-blue-700" />
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {service.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image */}
            <div>
              <img 
                src={servicesImage}
                alt="Document archive"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            
            {/* Text */}
            <div className="flex items-start gap-4">
              <div className="bg-blue-50 p-3 rounded-lg shrink-0">
                <FileText className="w-6 h-6 text-blue-700" />
              </div>
              <p className="text-lg md:text-xl leading-relaxed text-blue-900">
                Všetky doklady k platbám, zmenám a výpovediam evidujeme až <span className="font-bold">10 rokov spätne</span> a vieme ich okamžite poskytnúť.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}