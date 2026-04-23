import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-reveal',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding bg-background"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Label */}
        <span className="contact-reveal opacity-0 font-mono-data text-xs text-accent uppercase tracking-widest mb-6 block">
          Próximo Passo
        </span>

        {/* Headline */}
        <h2 className="contact-reveal opacity-0 font-heading font-black text-3xl md:text-5xl lg:text-6xl text-white tracking-tighter-custom leading-tight mb-6">
          Pronto para construir algo
          <span className="font-drama italic text-accent"> extraordinário</span>?
        </h2>

        {/* Description */}
        <p className="contact-reveal opacity-0 font-heading text-base md:text-lg text-slate/60 max-w-2xl mx-auto leading-relaxed mb-12">
          Vamos conversar sobre como transformar sua operação com automações inteligentes, sites de alta conversão e uma presença digital que gera autoridade.
        </p>

        {/* CTA */}
        <div className="contact-reveal opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-magnetic btn-primary text-base px-8 py-4 flex items-center gap-3"
            id="cta-whatsapp"
          >
            <span className="btn-bg"></span>
            Falar no WhatsApp
            <ArrowRight size={18} />
          </a>
          <a
            href="mailto:contato@cztechnology.com"
            className="btn-magnetic btn-outline border-white/20 text-white hover:text-accent hover:border-accent text-base px-8 py-4"
            id="cta-email"
          >
            <span className="btn-bg"></span>
            Enviar E-mail
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="contact-reveal opacity-0 mt-16 flex flex-wrap items-center justify-center gap-8 text-slate/30">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent/50"></div>
            <span className="font-mono-data text-xs uppercase tracking-wider">
              Resposta em 24h
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent/50"></div>
            <span className="font-mono-data text-xs uppercase tracking-wider">
              Orçamento gratuito
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent/50"></div>
            <span className="font-mono-data text-xs uppercase tracking-wider">
              Sem compromisso
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
