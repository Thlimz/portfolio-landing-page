import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Building2, Swords, MonitorSmartphone, Bot,
  ExternalLink, X, Check,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 'cizy-crm',
    category: 'IA · IMÓVEIS',
    title: 'CiZy + CRM Imobiliário',
    shortDesc:
      'Ecossistema completo para imobiliárias: agente de IA no WhatsApp que qualifica leads 24/7 e plataforma CRM com 10 módulos.',
    fullDesc:
      'Dois sistemas integrados que fecham o ciclo da captação ao fechamento. A CiZy atende clientes no WhatsApp com conversa natural, memória individual e grounding — só fala de imóveis que realmente existem no inventário. O CRM centraliza toda a jornada com pipeline visual, gestão de corretores, financeiro e relatórios.',
    tags: ['Python', 'FastAPI', 'Next.js 16', 'Gemini 2.5', 'Pinecone', 'Docker'],
    Icon: Building2,
    iconBg: 'rgba(99,102,241,0.12)',
    iconColor: '#818cf8',
    features: [
      'Agente de IA que atende no WhatsApp 24/7 com conversa natural',
      'Memória de longo prazo por cliente via Pinecone (busca vetorial)',
      'Grounding com inventário real — nunca inventa imóvel ou preço',
      'Lead criado automaticamente no CRM ao qualificar o cliente',
      'Pipeline kanban de vendas e locação com histórico completo',
      '10 módulos: clientes, imóveis, agenda, corretores, financeiro, relatórios',
    ],
  },
  {
    id: 'academia',
    category: 'FULL-STACK · WEB',
    title: 'Sistema de Academia de Luta',
    shortDesc:
      'Plataforma web completa com landing page animada, CRM de alunos, controle financeiro, campeonatos e automações via WhatsApp.',
    fullDesc:
      'Sistema full-stack com landing page (Framer Motion) e painel administrativo completo. Gerencia alunos por faixa, categoria e turma; controla inadimplência com disparo automático de cobranças pelo WhatsApp; e administra campeonatos com inscrições M:N e cron jobs automáticos.',
    tags: ['React', 'Vite', 'Python', 'FastAPI', 'SQLite', 'JWT'],
    Icon: Swords,
    iconBg: 'rgba(239,68,68,0.12)',
    iconColor: '#f87171',
    features: [
      'Landing page pública com animações, catálogo de turmas e loja',
      'Painel admin com gestão completa de alunos, faixas e categoria de peso',
      'Controle financeiro e cobrança automática de inadimplentes via WhatsApp',
      'Módulo de campeonatos com relação M:N alunos↔competições',
      'Cron job mensal de inadimplência e toast de novos leads em tempo real',
      'Auth JWT com troca de senha obrigatória e gestão de usuários',
    ],
  },
  {
    id: 'instagram-agent',
    category: 'IA · AUTOMAÇÃO',
    title: 'Agente de Conteúdo Instagram',
    shortDesc:
      'Agente de IA que gera posts, carrosséis e reels, agenda publicações e automatiza DMs com base em palavras-chave nos comentários.',
    fullDesc:
      'Sistema completo de automação de conteúdo para perfis business. O Gemini gera o copy; o Playwright renderiza os slides; o ffmpeg monta os reels com áudio de fundo. Um daemon monitora comentários e dispara DMs automáticas com link de conversão. Tudo aprovado via dashboard web antes de publicar.',
    tags: ['Python', 'Node.js', 'Gemini', 'Playwright', 'ffmpeg', 'Instagram API'],
    Icon: MonitorSmartphone,
    iconBg: 'rgba(236,72,153,0.12)',
    iconColor: '#f472b6',
    features: [
      'Geração de posts, carrosséis e reels com copy por IA (Gemini)',
      'Renderização de slides visuais via Playwright (headless Chromium)',
      'Montagem de reels com trilha sonora aleatória via ffmpeg',
      'Daemon que monitora comentários e envia DMs automáticas com link',
      'Dashboard web com fila de aprovação, agenda e relatórios de engajamento',
      'Inicialização automática no boot via Windows Task Scheduler',
    ],
  },
  {
    id: 'whatsapp-sheets',
    category: 'IA · INTEGRAÇÃO',
    title: 'WhatsApp → Google Sheets',
    shortDesc:
      'Agente multimodal que lê mensagens de WhatsApp (texto e áudio), extrai dados com Gemini 2.5 Flash e salva em planilha automaticamente.',
    fullDesc:
      'Solução de extração de dados para um operador de playlists Spotify. O agente agrupa mensagens fragmentadas com debounce de 30s no Redis, processa texto e áudio OGG diretamente no Gemini 2.5 Flash e salva pedidos estruturados no Google Sheets, reagindo com emoji na mensagem original.',
    tags: ['Python', 'FastAPI', 'Gemini 2.5', 'Redis', 'Evolution API', 'Docker'],
    Icon: Bot,
    iconBg: 'rgba(34,197,94,0.12)',
    iconColor: '#4ade80',
    features: [
      'Debounce de 30s via Redis para agregar mensagens fragmentadas',
      'Processamento multimodal de áudio OGG diretamente no Gemini 2.5 Flash',
      'Extração estruturada com saída tipada e validada (Pydantic)',
      'Salvamento automático em Google Sheets via Service Account',
      'Reação com emoji: 👍 sucesso · ❓ baixa confiança · ⚠️ erro',
      'Deploy completo em VPS com Docker Compose (bot + Redis + Evolution API)',
    ],
  },
];

function ProjectModal({ project, onClose }) {
  const overlayRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' });
      gsap.fromTo(cardRef.current, { y: 32, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' });
    });
    return () => ctx.revert();
  }, []);

  const close = () => {
    const ctx = gsap.context(() => {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' });
      gsap.to(cardRef.current, { y: 16, opacity: 0, scale: 0.97, duration: 0.2, ease: 'power2.in', onComplete: onClose });
    });
    return () => ctx.revert();
  };

  const { category, title, fullDesc, tags, Icon, iconBg, iconColor, features } = project;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
      style={{ background: 'rgba(13,13,18,0.85)', backdropFilter: 'blur(12px)' }}
      onClick={(e) => { if (e.target === overlayRef.current) close(); }}
    >
      <div
        ref={cardRef}
        className="relative w-full max-w-xl bg-[#16161F] border border-white/8 rounded-3xl p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        {/* Close */}
        <button
          onClick={close}
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-white/30 hover:text-white hover:bg-white/8 transition-colors"
        >
          <X size={16} />
        </button>

        {/* Category */}
        <span className="font-mono-data text-[10px] text-white/25 uppercase tracking-widest block mb-4">
          {category}
        </span>

        {/* Icon + Title */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: iconBg }}>
            <Icon size={22} style={{ color: iconColor }} />
          </div>
          <h3 className="font-heading font-black text-xl text-white tracking-tight-custom leading-tight">
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="font-heading text-sm text-white/50 leading-relaxed mb-7">
          {fullDesc}
        </p>

        {/* Features */}
        <div className="mb-7">
          <p className="font-mono-data text-[10px] text-white/25 uppercase tracking-widest mb-4">
            Funcionalidades
          </p>
          <ul className="space-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <span
                  className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                  style={{ backgroundColor: iconBg }}
                >
                  <Check size={9} style={{ color: iconColor }} />
                </span>
                <span className="font-heading text-sm text-white/55 leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tags */}
        <div>
          <p className="font-mono-data text-[10px] text-white/25 uppercase tracking-widest mb-3">
            Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-mono-data text-[10px] border rounded-full px-3 py-1"
                style={{ color: iconColor, borderColor: iconBg, backgroundColor: iconBg }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, onOpen }) {
  const { category, title, shortDesc, tags, Icon, iconBg, iconColor } = project;

  return (
    <button
      className="project-card opacity-0 card-surface p-7 flex flex-col gap-5 group transition-shadow duration-500 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1)] text-left w-full cursor-pointer"
      onClick={() => onOpen(project)}
    >
      {/* Top row */}
      <div className="flex items-center justify-between">
        <span className="font-mono-data text-[10px] text-white/25 uppercase tracking-widest">
          {category}
        </span>
        <ExternalLink
          size={14}
          className="text-white/10 group-hover:text-accent/50 transition-colors duration-300"
        />
      </div>

      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: iconBg }}
      >
        <Icon size={20} style={{ color: iconColor }} />
      </div>

      {/* Copy */}
      <div className="flex-1">
        <h3 className="font-heading font-bold text-lg text-white tracking-tight-custom mb-2">
          {title}
        </h3>
        <p className="font-heading text-sm text-white/40 leading-relaxed">
          {shortDesc}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 pt-1">
        {tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="font-mono-data text-[10px] text-white/30 border border-white/10 rounded-full px-3 py-1"
          >
            {tag}
          </span>
        ))}
        {tags.length > 4 && (
          <span className="font-mono-data text-[10px] text-white/20 border border-white/5 rounded-full px-3 py-1">
            +{tags.length - 4}
          </span>
        )}
      </div>
    </button>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.13,
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

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setActiveProject(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <section ref={sectionRef} id="projects" className="section-padding bg-primary">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-14 max-w-xl">
            <span className="font-mono-data text-xs text-accent uppercase tracking-widest mb-4 block">
              Projetos
            </span>
            <h2 className="font-heading font-black text-3xl md:text-5xl text-white tracking-tighter-custom leading-tight mb-4">
              O que eu
              <span className="font-drama italic text-accent"> construí.</span>
            </h2>
            <p className="font-heading text-base text-white/40 leading-relaxed">
              Projetos reais desenvolvidos ao longo da minha trajetória. Clique em qualquer card para ver detalhes.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={setActiveProject} />
            ))}
          </div>
        </div>
      </section>

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </>
  );
}
