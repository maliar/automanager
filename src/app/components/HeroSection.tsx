import { Button } from "./ui/button";
import { Logo } from "./Logo";
import heroImage from "figma:asset/9443651b2eb27e01cb4f06ee39de87a7031a26a7.png";

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-blue-600 text-white overflow-hidden">
      {/* Background Image - Under Gradient */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
        <img 
          src={heroImage}
          alt="Contract management illustration"
          className="w-full h-full object-cover object-right opacity-30"
        />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800/90 to-transparent"></div>

      {/* Navigation */}
      <nav className="relative z-20 px-4 py-4 md:py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="w-40 md:w-56">
            <Logo />
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#sluzba" className="text-white/90 hover:text-white transition-colors">
              O službe
            </a>
            <a href="#prax" className="text-white/90 hover:text-white transition-colors">
              V praxi
            </a>
            <a href="#kontakt" className="text-white/90 hover:text-white transition-colors">
              Kontakt
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative px-4 py-12 md:py-20 pb-16 md:pb-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <h1 className="mb-6 text-center md:text-left max-w-3xl text-[34px] md:text-[46px] leading-tight">
            Zmluvy pod kontrolou. Bez čakania.<br />Bez chaosu.
          </h1>
          
          <div className="space-y-4 mb-8 text-center md:text-left max-w-3xl">
            <p className="text-lg md:text-xl text-blue-50 font-semibold">
              Osobná správa zmlúv ako služba – rýchlo, prehľadne a s jednou kontaktnou osobou.
            </p>
            <p className="text-base md:text-lg text-blue-100">
              Postaráme sa o kompletnú správu vašich zmlúv a komunikáciu s poisťovňami. Vy sa venujete tomu podstatnému, my riešime administratívu, kontrolu aj zmeny – spoľahlivo a včas.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button 
              size="lg" 
              className="bg-white text-blue-700 hover:bg-blue-50 shadow-xl"
              onClick={() => scrollToSection('kontakt')}
            >
              Chcem osobný backoffice
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white bg-white/10 hover:bg-white/20 hover:text-white"
              onClick={() => scrollToSection('prax')}
            >
              Ako to funguje
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}