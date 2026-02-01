import { Users, CheckCircle2 } from "lucide-react";

export function PersonalTouchSection() {
  const targetAudience = [
    "nechcú riešiť administratívu",
    "chcú mať zmluvy pod kontrolou",
    "očakávajú rýchlu reakciu",
    "uprednostňujú osobný prístup pred call centrom",
    "chcú mať istotu, že je všetko vyriešené správne a včas"
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="bg-blue-50 p-3 rounded-2xl">
            <Users className="w-8 h-8 text-blue-700" />
          </div>
          <h2 className="text-center text-blue-900 text-3xl md:text-4xl">Pre koho je služba určená</h2>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-blue-100">
            <p className="text-2xl text-center text-gray-900 font-semibold mb-8">
              Pre klientov, ktorí:
            </p>
            
            <div className="space-y-4">
              {targetAudience.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="bg-blue-50 p-2 rounded-lg shrink-0 mt-1">
                    <CheckCircle2 className="w-5 h-5 text-blue-700" />
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}