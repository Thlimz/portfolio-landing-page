import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* =============================================
   SVG Animation 1 — Rotating Geometry
   ============================================= */
function RotatingGeometry() {
  const svgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(svgRef.current.querySelector('.geo-inner'), {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
        transformOrigin: 'center center',
      });
      gsap.to(svgRef.current.querySelector('.geo-outer'), {
        rotation: -360,
        duration: 30,
        repeat: -1,
        ease: 'none',
        transformOrigin: 'center center',
      });
    }, svgRef);
    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      className="opacity-20"
    >
      <g className="geo-outer">
        <circle cx="100" cy="100" r="90" stroke="#C9A84C" strokeWidth="0.5" strokeDasharray="4 8" />
        <circle cx="100" cy="100" r="75" stroke="#C9A84C" strokeWidth="0.3" strokeDasharray="2 6" />
      </g>
      <g className="geo-inner">
        <polygon
          points="100,20 180,100 100,180 20,100"
          stroke="#C9A84C"
          strokeWidth="0.5"
          fill="none"
        />
        <polygon
          points="100,40 160,100 100,160 40,100"
          stroke="#C9A84C"
          strokeWidth="0.3"
          fill="none"
        />
      </g>
      <circle cx="100" cy="100" r="4" fill="#C9A84C" opacity="0.5" />
    </svg>
  );
}

/* =============================================
   SVG Animation 2 — Laser Scanner
   ============================================= */
function LaserScanner() {
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(lineRef.current, {
        y: 160,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" className="opacity-20">
      {/* Dot Grid */}
      {Array.from({ length: 10 }).map((_, row) =>
        Array.from({ length: 10 }).map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={20 + col * 18}
            cy={20 + row * 18}
            r="1.5"
            fill="#C9A84C"
            opacity="0.3"
          />
        ))
      )}
      {/* Laser Line */}
      <line
        ref={lineRef}
        x1="0"
        y1="20"
        x2="200"
        y2="20"
        stroke="#C9A84C"
        strokeWidth="1"
        opacity="0.6"
      />
    </svg>
  );
}

/* =============================================
   SVG Animation 3 — Pulse Waveform (EKG)
   ============================================= */
function PulseWaveform() {
  const pathRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current;
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 3,
        repeat: -1,
        ease: 'power2.inOut',
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <svg width="200" height="80" viewBox="0 0 200 80" fill="none" className="opacity-25">
      <path
        ref={pathRef}
        d="M0,40 L30,40 L40,10 L50,70 L60,20 L70,60 L80,40 L120,40 L130,15 L140,65 L150,25 L160,55 L170,40 L200,40"
        stroke="#C9A84C"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =============================================
   PROTOCOL SECTION — Sticky Stacking Cards
   ============================================= */
export default function Protocol() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const steps = [
    {
      number: '01',
      title: 'Diagnóstico',
      desc1: 'Análise profunda dos processos, gargalos e',
      desc2: 'oportunidades de automação do seu negócio.',
      Animation: RotatingGeometry,
    },
    {
      number: '02',
      title: 'Implementação',
      desc1: 'Construção das automações, sites e integrações',
      desc2: 'com testes rigorosos a cada etapa.',
      Animation: LaserScanner,
    },
    {
      number: '03',
      title: 'Escala',
      desc1: 'Monitoramento contínuo e otimização',
      desc2: 'para maximizar resultados ao longo do tempo.',
      Animation: PulseWaveform,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (i < steps.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: 'top top',
            end: `+=${window.innerHeight}`,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.to(card, {
                scale: 1 - progress * 0.1,
                filter: `blur(${progress * 20}px)`,
                opacity: 1 - progress * 0.5,
                duration: 0.1,
                overwrite: 'auto',
              });
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="protocol" className="bg-primary">
      {/* Section Header */}
      <div className="section-padding pb-8 md:pb-12">
        <div className="max-w-7xl mx-auto">
          <span className="font-mono-data text-xs text-accent uppercase tracking-widest mb-4 block">
            Processo
          </span>
          <h2 className="font-heading font-black text-3xl md:text-5xl text-white tracking-tighter-custom leading-tight mb-4">
            Protocolo de
            <span className="font-drama italic text-accent"> entrega.</span>
          </h2>
          <p className="font-heading text-base text-white/40 max-w-lg">
            Cada projeto segue um processo cirúrgico de 3 etapas para
            garantir resultados previsíveis.
          </p>
        </div>
      </div>

      {/* Stacking Cards */}
      {steps.map((step, i) => (
        <div
          key={i}
          ref={(el) => (cardsRef.current[i] = el)}
          className="h-screen flex items-center justify-center px-4 md:px-8"
        >
          <div className="card-surface w-full max-w-5xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-8 md:gap-16">
            {/* Left: Content */}
            <div className="flex-1">
              <span className="font-mono-data text-sm text-accent mb-4 block">
                {step.number}
              </span>
              <h3 className="font-heading font-black text-3xl md:text-5xl text-white tracking-tighter-custom mb-6">
                {step.title}
              </h3>
              <p className="font-heading text-base text-slate/60 leading-relaxed">
                {step.desc1}
                <br />
                {step.desc2}
              </p>
            </div>

            {/* Right: SVG Animation */}
            <div className="flex items-center justify-center w-48 h-48 md:w-64 md:h-64">
              <step.Animation />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
