import { User, Clock, FolderKanban } from "lucide-react";

export function ApproachSection() {
  const benefits = [
    {
      icon: User,
      title: "Nie call centrum. Osobná správa.",
      description: "Vaše zmluvy nespravuje anonymná linka, ale konkrétny človek, ktorý pozná vašu situáciu, históriu aj súvislosti. Každú zmluvu spravujeme individuálne a dlhodobo."
    },
    {
      icon: Clock,
      title: "Rýchla reakcia, keď ju potrebujete",
      description: "Našou ambíciou je vybaviť požiadavku do 30 minút, v čase špičky najneskôr do 60 minút. Pretože vieme, že pri zmluvách často rozhodujú minúty."
    },
    {
      icon: FolderKanban,
      title: "Všetko na jednom mieste",
      description: "Preverenie platieb a splatnosti, zmeny údajov, zelené karty, ŠPZ, vinkulácie pre banky a leasingové spoločnosti, potvrdenia aj komunikácia s poisťovňami – riešime za vás."
    }
  ];

  return (
    <section id="prax" className="py-16 md:py-24 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="mb-4 text-blue-900 text-3xl md:text-4xl">Čo to pre vás znamená v praxi</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Osobný prístup a profesionálna starostlivosť o každú zmluvu
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-blue-100"
            >
              <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <benefit.icon className="w-8 h-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-blue-900">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}