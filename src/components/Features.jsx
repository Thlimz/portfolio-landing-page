import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* =============================================
   CARD 1 — Diagnostic Shuffler
   ============================================= */
function ShufflerCard() {
  const [order, setOrder] = useState([0, 1, 2]);
  const containerRef = useRef(null);

  const items = [
    { label: 'Análise de Processos', tag: 'DIAGNÓSTICO', color: '#C9A84C' },
    { label: 'Mapeamento de Fluxos', tag: 'WORKFLOW', color: '#8B7A3D' },
    { label: 'Plano de Automação', tag: 'EXECUÇÃO', color: '#D4B85C' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setOrder((prev) => {
        const arr = [...prev];
        arr.unshift(arr.pop());
        return arr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card-surface p-8 h-full flex flex-col" id="feature-card-shuffler">
      <div className="mb-6">
        <h3 className="font-heading font-bold text-xl text-primary tracking-tight-custom mb-2">
          Automações Inteligentes
        </h3>
        <p className="font-heading text-sm text-slate/60 leading-relaxed">
          Processos automatizados que eliminam tarefas repetitivas e escalam sua operação.
        </p>
      </div>

      <div ref={containerRef} className="relative flex-1 min-h-[180px]">
        {order.map((itemIdx, stackPos) => {
          const item = items[itemIdx];
          const yOffset = stackPos * 12;
          const scale = 1 - stackPos * 0.04;
          const zIndex = 3 - stackPos;
          const opacity = 1 - stackPos * 0.2;

          return (
            <div
              key={itemIdx}
              className="absolute left-0 right-0 rounded-xl border border-primary/10 bg-background p-4 shadow-sm"
              style={{
                top: `${yOffset}px`,
                transform: `scale(${scale})`,
                zIndex,
                opacity,
                transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-heading font-semibold text-sm text-primary">
                  {item.label}
                </span>
                <span
                  className="font-mono-data text-[10px] font-medium px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${item.color}15`,
                    color: item.color,
                  }}
                >
                  {item.tag}
                </span>
              </div>
              <div className="mt-3 flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-1.5 rounded-full"
                    style={{
                      width: `${20 + Math.random() * 40}%`,
                      backgroundColor: `${item.color}${i === 0 ? '40' : '15'}`,
                    }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =============================================
   CARD 2 — Telemetry Typewriter
   ============================================= */
function TypewriterCard() {
  const [lines, setLines] = useState([]);
  const [currentText, setCurrentText] = useState('');
  const [msgIndex, setMsgIndex] = useState(0);
  const feedRef = useRef(null);

  const messages = [
    '> Iniciando diagnóstico de processos...',
    '  ✓ 12 fluxos manuais identificados',
    '  ✓ Tempo médio de execução: 4.2h → 0.3h',
    '> Construindo automação para CRM...',
    '  ✓ Pipeline de dados conectado',
    '  ✓ Webhooks configurados com sucesso',
    '> Otimizando landing page...',
    '  ✓ Taxa de conversão +340% em 30 dias',
    '  ✓ Leads qualificados: 127 → 583',
    '> Sistema operacional. Monitorando...',
  ];

  useEffect(() => {
    let charIndex = 0;
    const msg = messages[msgIndex % messages.length];

    const typeInterval = setInterval(() => {
      if (charIndex <= msg.length) {
        setCurrentText(msg.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setLines((prev) => {
            const newLines = [...prev, msg];
            return newLines.length > 7 ? newLines.slice(-7) : newLines;
          });
          setCurrentText('');
          setMsgIndex((prev) => prev + 1);
        }, 800);
      }
    }, 35);

    return () => clearInterval(typeInterval);
  }, [msgIndex]);

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [lines, currentText]);

  return (
    <div className="card-surface-dark p-8 h-full flex flex-col" id="feature-card-typewriter">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-heading font-bold text-xl text-background tracking-tight-custom mb-2">
            Sites de Alta Conversão
          </h3>
          <p className="font-heading text-sm text-background/40 leading-relaxed">
            Páginas que transformam visitantes em clientes com design e dados.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="pulse-dot-accent"></div>
          <span className="font-mono-data text-[10px] text-accent uppercase tracking-widest">
            Live Feed
          </span>
        </div>
      </div>

      <div
        ref={feedRef}
        className="flex-1 bg-primary/50 rounded-xl p-4 overflow-hidden font-mono-data text-xs leading-6"
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className={`${
              line.includes('✓') ? 'text-accent/80' : 'text-background/50'
            }`}
          >
            {line}
          </div>
        ))}
        {currentText && (
          <div className="text-background/70">
            {currentText}
            <span className="cursor-blink"></span>
          </div>
        )}
      </div>
    </div>
  );
}

/* =============================================
   CARD 3 — Cursor Protocol Scheduler
   ============================================= */
function SchedulerCard() {
  const [activeDay, setActiveDay] = useState(-1);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [pressing, setPressing] = useState(false);
  const [savedVisible, setSavedVisible] = useState(false);
  const gridRef = useRef(null);
  const saveRef = useRef(null);
  const animating = useRef(false);

  const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  useEffect(() => {
    const runCycle = () => {
      if (animating.current) return;
      animating.current = true;

      const targetDay = Math.floor(Math.random() * 7);
      const gridEl = gridRef.current;
      const saveEl = saveRef.current;
      if (!gridEl || !saveEl) return;

      const cells = gridEl.querySelectorAll('[data-day]');
      const targetCell = cells[targetDay];
      if (!targetCell) return;

      const gridRect = gridEl.getBoundingClientRect();
      const cellRect = targetCell.getBoundingClientRect();
      const saveRect = saveEl.getBoundingClientRect();

      // Show cursor
      setCursorVisible(true);
      setCursorPos({
        x: -20,
        y: gridRect.height / 2,
      });

      // Move to target cell
      setTimeout(() => {
        setCursorPos({
          x: cellRect.left - gridRect.left + cellRect.width / 2,
          y: cellRect.top - gridRect.top + cellRect.height / 2,
        });
      }, 300);

      // Click the cell
      setTimeout(() => {
        setPressing(true);
        setTimeout(() => setPressing(false), 200);
        setActiveDay(targetDay);
      }, 900);

      // Move to save button
      setTimeout(() => {
        setCursorPos({
          x: saveRect.left - gridRect.left + saveRect.width / 2,
          y: saveRect.top - gridRect.top + saveRect.height / 2,
        });
      }, 1500);

      // Click save
      setTimeout(() => {
        setPressing(true);
        setTimeout(() => setPressing(false), 200);
        setSavedVisible(true);
      }, 2100);

      // Fade out
      setTimeout(() => {
        setCursorVisible(false);
        setTimeout(() => {
          setSavedVisible(false);
          setActiveDay(-1);
          animating.current = false;
        }, 800);
      }, 3000);
    };

    const interval = setInterval(runCycle, 5000);
    const timeout = setTimeout(runCycle, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="card-surface p-8 h-full flex flex-col" id="feature-card-scheduler">
      <div className="mb-6">
        <h3 className="font-heading font-bold text-xl text-primary tracking-tight-custom mb-2">
          Presença Digital Premium
        </h3>
        <p className="font-heading text-sm text-slate/60 leading-relaxed">
          Estratégia digital completa para escalar sua marca e gerar autoridade.
        </p>
      </div>

      <div ref={gridRef} className="relative flex-1">
        {/* Week Grid */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {days.map((day, i) => (
            <div key={i} className="text-center">
              <span className="font-mono-data text-[10px] text-slate/40 block mb-2">
                {day}
              </span>
              <div
                data-day={i}
                className={`aspect-square rounded-lg border flex items-center justify-center transition-all duration-300 ${
                  activeDay === i
                    ? 'bg-accent border-accent scale-95'
                    : 'border-primary/10 hover:border-primary/20'
                }`}
              >
                {activeDay === i && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6L5 9L10 3"
                      stroke="#0D0D12"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <button
          ref={saveRef}
          className={`w-full py-2.5 rounded-xl font-heading text-xs font-semibold transition-all duration-300 ${
            savedVisible
              ? 'bg-accent text-primary'
              : 'bg-primary/5 text-slate/50'
          }`}
        >
          {savedVisible ? '✓ Salvo' : 'Salvar Agendamento'}
        </button>

        {/* Animated Cursor */}
        {cursorVisible && (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="absolute pointer-events-none"
            style={{
              left: cursorPos.x,
              top: cursorPos.y,
              transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              transform: pressing ? 'scale(0.85)' : 'scale(1)',
              opacity: cursorVisible ? 1 : 0,
              zIndex: 10,
            }}
          >
            <path
              d="M5 3L19 12L12 13L9 20L5 3Z"
              fill="#C9A84C"
              stroke="#0D0D12"
              strokeWidth="1"
            />
          </svg>
        )}
      </div>
    </div>
  );
}

/* =============================================
   FEATURES SECTION — Wrapper
   ============================================= */
export default function Features() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.feature-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 max-w-xl">
          <span className="font-mono-data text-xs text-accent uppercase tracking-widest mb-4 block">
            Serviços
          </span>
          <h2 className="font-heading font-black text-3xl md:text-5xl text-primary tracking-tighter-custom leading-tight mb-4">
            Artefatos que
            <span className="font-drama italic text-accent"> funcionam.</span>
          </h2>
          <p className="font-heading text-base text-slate/60 leading-relaxed">
            Cada solução é construída como um instrumento de precisão — sem templates genéricos, sem atalhos.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="feature-card opacity-0">
            <ShufflerCard />
          </div>
          <div className="feature-card opacity-0">
            <TypewriterCard />
          </div>
          <div className="feature-card opacity-0">
            <SchedulerCard />
          </div>
        </div>
      </div>
    </section>
  );
}
