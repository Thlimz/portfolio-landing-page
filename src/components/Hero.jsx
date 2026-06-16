import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Mail } from 'lucide-react';

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

const TERMINAL_LINES = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: 'Thiago Lima' },
  { type: 'cmd', text: 'cat role.txt' },
  { type: 'out', text: 'Analista de Desenvolvimento' },
  { type: 'cmd', text: 'cat stack.txt' },
  { type: 'out', text: 'Java · Spring Boot · Python' },
  { type: 'out', text: 'React · n8n · AI Agents' },
  { type: 'cmd', text: 'cat status.txt' },
  { type: 'ok', text: '✓ Disponível para oportunidades' },
];

function TerminalCard() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step < TERMINAL_LINES.length) {
      const line = TERMINAL_LINES[step];
      const delay = step === 0 ? 1400 : line.type === 'cmd' ? 520 : 210;
      const t = setTimeout(() => setStep((s) => s + 1), delay);
      return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <div className="card-surface-dark rounded-2xl overflow-hidden">
      {/* Terminal chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/50 block" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50 block" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/50 block" />
        <span className="font-mono-data text-[10px] text-white/20 ml-2">
          thiago@portfolio:~
        </span>
      </div>

      {/* Lines */}
      <div className="p-5 space-y-1 min-h-[220px]">
        {TERMINAL_LINES.slice(0, step).map((line, i) => (
          <p
            key={i}
            className={`font-mono-data text-xs leading-5 ${
              line.type === 'cmd'
                ? 'text-white/60'
                : line.type === 'ok'
                ? 'text-green-400/70'
                : 'text-accent/70'
            }`}
          >
            {line.type === 'cmd' && (
              <span className="text-accent/40 mr-1.5">$</span>
            )}
            {line.text}
          </p>
        ))}
        {step < TERMINAL_LINES.length && (
          <p className="font-mono-data text-xs text-white/60">
            <span className="text-accent/40 mr-1.5">$</span>
            <span className="cursor-blink" />
          </p>
        )}
      </div>
    </div>
  );
}

const SUBTITLES = [
  'Analista de Desenvolvimento',
  'Engenheiro de Software',
  'Especialista em IA & Automações',
];

export default function Hero() {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const socialRef = useRef(null);
  const terminalRef = useRef(null);

  const [subIdx, setSubIdx] = useState(0);
  const [subVisible, setSubVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setSubVisible(false);
      setTimeout(() => {
        setSubIdx((i) => (i + 1) % SUBTITLES.length);
        setSubVisible(true);
      }, 350);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(badgeRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
        .fromTo(titleRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1 }, '-=0.4')
        .fromTo(subtitleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
        .fromTo(descRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
        .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.4')
        .fromTo(socialRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.3')
        .fromTo(terminalRef.current, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, '-=1.2');
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full min-h-[100dvh] flex items-center overflow-hidden bg-primary"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-1/4 right-1/3 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-32 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

          {/* Left: text */}
          <div className="flex-1 max-w-2xl">
            {/* Status badge */}
            <div ref={badgeRef} className="flex items-center gap-3 mb-8 opacity-0">
              <div className="pulse-dot" />
              <span className="font-mono-data text-xs text-white/40 uppercase tracking-widest">
                Rio de Janeiro · Disponível
              </span>
            </div>

            {/* Name */}
            <h1
              ref={titleRef}
              className="font-heading font-black text-5xl sm:text-6xl md:text-7xl leading-[0.9] tracking-tighter-custom text-white mb-3 opacity-0"
            >
              Thiago Lima
            </h1>

            {/* Rotating subtitle */}
            <div ref={subtitleRef} className="mb-7 h-9 opacity-0 overflow-hidden">
              <p
                className="font-drama italic text-xl md:text-2xl text-accent"
                style={{
                  opacity: subVisible ? 1 : 0,
                  transform: subVisible ? 'translateY(0)' : 'translateY(-6px)',
                  transition: 'opacity 0.35s ease, transform 0.35s ease',
                }}
              >
                {SUBTITLES[subIdx]}
              </p>
            </div>

            {/* Description */}
            <p
              ref={descRef}
              className="font-heading text-base md:text-lg text-white/50 max-w-lg leading-relaxed mb-9 opacity-0"
            >
              3 anos desenvolvendo sistemas corporativos, automações inteligentes
              e aplicações web. Cursando Engenharia de Software na UVA.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-wrap gap-4 items-center mb-10 opacity-0">
              <a href="#projects" className="btn-magnetic btn-primary">
                <span className="btn-bg" />
                Ver Projetos
              </a>
              <a href="#contact" className="btn-magnetic btn-outline">
                <span className="btn-bg" />
                Entrar em Contato
              </a>
            </div>

            {/* Social links */}
            <div ref={socialRef} className="flex items-center gap-5 opacity-0">
              <a
                href="#"
                className="flex items-center gap-2 font-mono-data text-xs text-white/30 hover:text-accent transition-colors group"
                aria-label="GitHub"
              >
                <IconGithub size={14} />
                GitHub
              </a>
              <div className="h-3 w-px bg-white/10" />
              <a
                href="#"
                className="flex items-center gap-2 font-mono-data text-xs text-white/30 hover:text-accent transition-colors group"
                aria-label="LinkedIn"
              >
                <IconLinkedin size={14} />
                LinkedIn
              </a>
              <div className="h-3 w-px bg-white/10" />
              <a
                href="mailto:thiplima3@gmail.com"
                className="flex items-center gap-2 font-mono-data text-xs text-white/30 hover:text-accent transition-colors group"
                aria-label="Email"
              >
                <Mail size={14} />
                Email
              </a>
            </div>
          </div>

          {/* Right: terminal */}
          <div ref={terminalRef} className="hidden lg:block w-72 xl:w-80 opacity-0">
            <TerminalCard />
          </div>

        </div>
      </div>
    </section>
  );
}
