import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function IconGithub({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function IconLinkedin({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

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
      className="section-padding bg-primary"
    >
      <div className="max-w-4xl mx-auto text-center">
        <span className="contact-reveal opacity-0 font-mono-data text-xs text-accent uppercase tracking-widest mb-6 block">
          Contato
        </span>

        <h2 className="contact-reveal opacity-0 font-heading font-black text-3xl md:text-5xl lg:text-6xl text-white tracking-tighter-custom leading-tight mb-6">
          Vamos trabalhar
          <span className="font-drama italic text-accent"> juntos</span>?
        </h2>

        <p className="contact-reveal opacity-0 font-heading text-base md:text-lg text-white/50 max-w-xl mx-auto leading-relaxed mb-12">
          Aberto a oportunidades, colaborações e projetos interessantes. Me chama para conversar.
        </p>

        <div className="contact-reveal opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="mailto:thiplima3@gmail.com"
            className="btn-magnetic btn-primary text-base px-8 py-4 flex items-center gap-3"
          >
            <span className="btn-bg" />
            Enviar E-mail
            <ArrowRight size={18} />
          </a>
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-magnetic btn-outline border-white/20 text-white hover:text-accent hover:border-accent text-base px-8 py-4"
          >
            <span className="btn-bg" />
            WhatsApp
          </a>
        </div>

        <div className="contact-reveal opacity-0 flex items-center justify-center gap-8">
          <a
            href="#"
            className="flex items-center gap-2 font-mono-data text-xs text-white/25 hover:text-accent transition-colors"
          >
            <IconGithub size={14} />
            GitHub
          </a>
          <div className="h-3 w-px bg-white/10" />
          <a
            href="#"
            className="flex items-center gap-2 font-mono-data text-xs text-white/25 hover:text-accent transition-colors"
          >
            <IconLinkedin size={14} />
            LinkedIn
          </a>
          <div className="h-3 w-px bg-white/10" />
          <span className="font-mono-data text-xs text-white/25">
            thiplima3@gmail.com
          </span>
        </div>
      </div>
    </section>
  );
}
