import { Building2 } from "lucide-react";
import aboutImage from "figma:asset/741217a6fbeeffd82c4b2d50f5aa5a3e6c6cf856.png";

export function AboutSection() {
  return (
    <section id="sluzba" className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12 justify-center">
          <div className="bg-blue-50 p-3 rounded-2xl">
            <Building2 className="w-8 h-8 text-blue-700" />
          </div>
          <h2 className="text-center text-blue-900 text-3xl md:text-4xl">Osobný backoffice pre vašu zmluvnú agendu</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image */}
          <div className="order-1">
            <img 
              src={aboutImage}
              alt="Personal contract management"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          
          {/* Text Content */}
          <div className="order-2">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              Každému zákazníkovi poskytujeme vlastný osobný „backoffice" – jedno miesto, kde má všetky zmluvné záležitosti vyriešené rýchlo a s jednou konkrétnou osobou. Bez prepájania, bez opakovaného vysvetľovania, bez zbytočného čakania.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}