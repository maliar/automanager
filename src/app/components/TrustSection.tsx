import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { useState, type FormEvent, type ChangeEvent } from "react";
import { projectId, publicAnonKey } from '/utils/supabase/info';

export function TrustSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-235ea927/contact`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Nepodarilo sa odoslať správu');
      }

      setSubmitStatus({
        type: 'success',
        message: 'Správa bola úspešne odoslaná! Čoskoro vás budeme kontaktovať.'
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });

    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Nepodarilo sa odoslať správu. Skúste nás kontaktovať priamo na info@automanager.sk'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="kontakt" className="py-16 md:py-24 px-4 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 text-white">
      {/* CTA Section */}
      <div className="max-w-5xl mx-auto mb-24">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 md:p-16 border border-white/20 shadow-2xl text-center">
          <h2 className="text-white mb-6 text-3xl md:text-4xl">Zverte správu zmlúv profesionálom</h2>
          <p className="text-xl md:text-2xl text-blue-50 leading-relaxed mb-8 max-w-3xl mx-auto">
            Získajte osobný backoffice a pokoj, že vaša zmluvná agenda funguje presne tak, ako má.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-blue-700 hover:bg-blue-50 shadow-xl text-lg px-8"
            onClick={() => scrollToSection('kontakt-formular')}
          >
            Kontaktujte nás
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
      
      {/* Contact Section */}
      <div id="kontakt-formular" className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Information */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-semibold mb-6">Kontaktujte nás</h3>
            
            <div className="space-y-6">
              <div>
                <p className="font-semibold text-lg mb-1">automanager, s.r.o.</p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-lg mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-blue-50">Štepná 14</p>
                  <p className="text-blue-50">841 04 Bratislava</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <Phone className="w-5 h-5" />
                </div>
                <a href="tel:+421948105090" className="text-blue-50 hover:text-white transition-colors">
                  +421 948 10 50 90
                </a>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <Mail className="w-5 h-5" />
                </div>
                <a href="mailto:info@automanager.sk" className="text-blue-50 hover:text-white transition-colors">
                  info@automanager.sk
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-semibold mb-6">Napíšte nám</h3>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-blue-50">
                  Vaše meno
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  placeholder="Ján Novák"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-blue-50">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  placeholder="jan.novak@email.sk"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2 text-blue-50">
                  Telefónne číslo
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  placeholder="+421 900 000 000"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-blue-50">
                  Vaša správa
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent resize-none"
                  placeholder="Napíšte nám vašu správu..."
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-white text-blue-700 hover:bg-blue-50 shadow-lg"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Odosielam...' : 'Odoslať správu'}
              </Button>
            </form>

            {submitStatus.type && (
              <div
                className={`mt-4 p-4 rounded-lg ${
                  submitStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {submitStatus.message}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-48 opacity-90">
            <Logo />
          </div>
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 border border-white/20">
            <p className="text-sm text-blue-100">© 2025 Osobná správa zmlúv ako služba</p>
          </div>
        </div>
      </div>
    </section>
  );
}