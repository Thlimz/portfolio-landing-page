import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: '3+', label: 'Anos de experiência' },
  { value: '4', label: 'Projetos em destaque' },
  { value: 'UVA', label: 'Engenharia de Software' },
];

const HIGHLIGHTS = [
  'Análise e correção de bugs em sistemas corporativos',
  'Desenvolvimento e manutenção de aplicações Java',
  'Integração entre sistemas e APIs REST',
  'Criação de agentes de IA e automações com Python e n8n',
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-reveal',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '.stat-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* Left: Bio */}
          <div className="flex-1 max-w-2xl">
            <span className="about-reveal opacity-0 font-mono-data text-xs text-accent uppercase tracking-widest mb-6 block">
              Sobre mim
            </span>

            <h2 className="about-reveal opacity-0 font-heading font-black text-3xl md:text-5xl text-white tracking-tighter-custom leading-tight mb-8">
              Construindo soluções que
              <span className="font-drama italic text-accent"> funcionam.</span>
            </h2>

            <p className="about-reveal opacity-0 font-heading text-base md:text-lg text-white/50 leading-relaxed mb-6">
              Profissional de tecnologia com atuação como Analista de Desenvolvimento desde 2023,
              trabalhando com investigação e resolução de bugs, atendimento a clientes e sustentação
              de sistemas corporativos.
            </p>

            <p className="about-reveal opacity-0 font-heading text-base md:text-lg text-white/50 leading-relaxed mb-10">
              Combino experiência sólida em Java e Python com interesse crescente em IA e automações —
              criando soluções que reduzem trabalho manual e entregam resultados reais. Cursando
              Engenharia de Software na Universidade Veiga de Almeida, no Rio de Janeiro.
            </p>

            {/* Highlights */}
            <ul className="space-y-3">
              {HIGHLIGHTS.map((item, i) => (
                <li key={i} className="about-reveal opacity-0 flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-[7px] flex-shrink-0" />
                  <span className="font-heading text-sm text-white/40 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Stats */}
          <div className="lg:w-72 flex flex-col gap-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="stat-card opacity-0 bg-[#22222E] border border-white/5 rounded-2xl p-7"
              >
                <p className="font-heading font-black text-5xl text-white tracking-tighter-custom mb-2">
                  {stat.value}
                </p>
                <p className="font-mono-data text-xs text-white/35 uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
