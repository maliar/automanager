import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { ApproachSection } from "./components/ApproachSection";
import { ServicesSection } from "./components/ServicesSection";
import { PersonalTouchSection } from "./components/PersonalTouchSection";
import { ReviewsSection } from "./components/ReviewsSection";
import { TrustSection } from "./components/TrustSection";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <HeroSection />
      <AboutSection />
      <ApproachSection />
      <ServicesSection />
      <PersonalTouchSection />
      <ReviewsSection />
      <TrustSection />
    </div>
  );
}