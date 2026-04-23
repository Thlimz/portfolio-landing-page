import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each word of the manifesto
      const words = sectionRef.current.querySelectorAll('.word-reveal');
      gsap.fromTo(
        words,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Parallax on the texture image
      gsap.to('.philosophy-texture', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const splitWords = (text, className = '') => {
    return text.split(' ').map((word, i) => (
      <span
        key={i}
        className={`word-reveal inline-block mr-[0.3em] opacity-0 ${className}`}
      >
        {word}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative w-full overflow-hidden bg-slate"
    >
      {/* Parallax Texture Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="philosophy-texture absolute inset-0 bg-cover bg-center opacity-[0.06]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?w=1920&q=80&auto=format')`,
            height: '140%',
            top: '-20%',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 section-padding">
        <div className="max-w-5xl mx-auto">
          {/* Neutral Statement */}
          <div className="mb-12">
            <p className="font-heading text-lg md:text-xl text-background/30 leading-relaxed">
              {splitWords(
                'A maioria das empresas de tecnologia foca em: entregar projetos genéricos, rápidos e descartáveis.'
              )}
            </p>
          </div>

          {/* Contrast Statement — Massive */}
          <div>
            <p className="text-2xl md:text-4xl lg:text-5xl leading-tight">
              {splitWords('Eu foco em:', 'font-heading font-bold text-background')}
              <br />
              {splitWords('construir', 'font-drama italic text-background text-3xl md:text-5xl lg:text-6xl')}
              <span className="word-reveal inline-block mr-[0.3em] opacity-0 font-drama italic text-accent text-3xl md:text-5xl lg:text-6xl">
                instrumentos digitais
              </span>
              {splitWords(
                'que geram resultado real.',
                'font-drama italic text-background text-3xl md:text-5xl lg:text-6xl'
              )}
            </p>
          </div>

          {/* Decorative line */}
          <div className="mt-16 flex items-center gap-4">
            <div className="h-px flex-1 bg-background/10"></div>
            <span className="font-mono-data text-xs text-background/20 uppercase tracking-widest">
              Manifesto
            </span>
            <div className="h-px flex-1 bg-background/10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
