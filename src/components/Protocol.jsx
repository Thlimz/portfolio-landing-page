import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SKILL_GROUPS = [
  {
    category: 'Linguagens',
    skills: ['Java', 'Python', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    category: 'Frameworks',
    skills: ['Spring Boot', 'React', 'Maven', 'Hibernate', 'REST APIs'],
  },
  {
    category: 'IA & Automação',
    skills: ['Agentes de IA', 'n8n', 'Chatbots', 'Prompt Engineering', 'Fluxos Automatizados'],
  },
  {
    category: 'Banco de Dados',
    skills: ['MySQL', 'SQL'],
  },
  {
    category: 'Ferramentas',
    skills: ['Git / GitHub', 'Postman', 'IntelliJ IDEA', 'VS Code', 'Jira'],
  },
  {
    category: 'Metodologias',
    skills: ['Scrum', 'Jira', 'Análise de Requisitos', 'Testes de Integração'],
  },
];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skill-group',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14 max-w-xl">
          <span className="font-mono-data text-xs text-accent uppercase tracking-widest mb-4 block">
            Stack
          </span>
          <h2 className="font-heading font-black text-3xl md:text-5xl text-white tracking-tighter-custom leading-tight mb-4">
            Tecnologias que
            <span className="font-drama italic text-accent"> domino.</span>
          </h2>
          <p className="font-heading text-base text-white/40 leading-relaxed">
            Ferramentas e linguagens que uso no dia a dia para construir soluções robustas.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {SKILL_GROUPS.map((group) => (
            <div key={group.category} className="skill-group opacity-0">
              <h3 className="font-mono-data text-[10px] text-accent/60 uppercase tracking-widest mb-4">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono-data text-xs text-white/45 border border-white/10 rounded-full px-3 py-1.5 hover:border-accent/25 hover:text-white/65 transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
