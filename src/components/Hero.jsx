import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 }
      )
        .fromTo(
          subtitleRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2 },
          '-=0.9'
        )
        .fromTo(
          descRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          '-=0.7'
        )
        .fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          badgeRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.4'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full h-[100dvh] flex items-end overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80&auto=format')`,
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient" />

      {/* CZ Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span className="font-heading font-black text-[20vw] leading-none text-white/[0.02] tracking-tighter-custom">
          CZ
        </span>
      </div>

      {/* Content — Lower Third Left */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-16 md:pb-24">
        <div className="max-w-3xl">
          {/* Title: Bold Sans */}
          <h1
            ref={titleRef}
            className="font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tighter-custom text-background mb-2 opacity-0"
          >
            Excelência encontra
          </h1>

          {/* Drama Serif Italic */}
          <p
            ref={subtitleRef}
            className="font-drama italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] leading-[0.9] tracking-tight-custom text-accent mb-8 opacity-0"
          >
            Precisão.
          </p>

          {/* Description */}
          <p
            ref={descRef}
            className="font-heading text-base md:text-lg text-background/60 max-w-lg leading-relaxed mb-8 opacity-0"
          >
            Transformo empresas com automações inteligentes, sites de alta
            conversão e presença digital que gera resultados reais.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap gap-4 items-center opacity-0">
            <a href="#contact" className="btn-magnetic btn-primary">
              <span className="btn-bg"></span>
              Solicitar Orçamento
            </a>
            <a href="#features" className="btn-magnetic btn-outline">
              <span className="btn-bg"></span>
              Ver Serviços
            </a>
          </div>

          {/* Badge */}
          <div
            ref={badgeRef}
            className="mt-10 flex items-center gap-3 opacity-0"
          >
            <div className="pulse-dot-accent"></div>
            <span className="font-mono-data text-xs text-background/40 uppercase tracking-widest">
              Powered by CZTechnology
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
