with open("src/App.tsx", "r") as f:
    content = f.read()

new_content = """import React, { useEffect, useState, Suspense } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { ChevronUp, Menu, X, ArrowRight, ShieldCheck, Zap, Activity } from "lucide-react";
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import GirosTabs from './components/GirosTabs';
import { Revision, Proceso, Capas } from './components/Sections';
import ChatWidget from './components/ChatWidget';

// Lazy load the 3D scene to prevent hydration mismatch and improve load time
const Scene3D = React.lazy(() => import('./components/Scene3D'));

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowScrollTop(latest > 600);
  });

  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const navLinks = [
    { id: 'soluciones', label: 'Plataforma' },
    { id: 'productos', label: 'Sectores' },
    { id: 'tecnologia', label: 'Tecnología' },
    { id: 'recursos', label: 'Desarrolladores' },
  ];

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] font-sans relative overflow-hidden">
      
      {/* Background Animated Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>
        <div className="gradient-blob blob-3"></div>
        <div className="gradient-blob blob-4"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[var(--bg-surface)]/80 backdrop-blur-xl border-b border-[var(--border-light)]">
        <div className="max-w-[80rem] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight cursor-pointer group" onClick={() => window.scrollTo(0,0)}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-tr from-[var(--color-violet)] to-[var(--accent-blue)] text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <ShieldCheck size={18} />
            </div>
            <span>Lex<span className="text-[var(--text-secondary)] font-medium">LFPIORPI</span></span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--text-secondary)]">
            {navLinks.map(link => (
              <button key={link.id} onClick={() => handleNavClick(link.id)} className="hover:text-[var(--text-primary)] transition-colors">
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => handleNavClick('contacto')} className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              Iniciar sesión
            </button>
            <button onClick={() => handleNavClick('contacto')} className="btn-primary">
              Comenzar ahora
            </button>
          </div>

          <button className="md:hidden text-[var(--text-primary)]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mobile-nav-overlay pt-20 border-b border-[var(--border-light)]"
          >
            <nav className="flex flex-col gap-4 text-base font-medium">
              {navLinks.map(link => (
                <button key={link.id} onClick={() => handleNavClick(link.id)} className="text-left py-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  {link.label}
                </button>
              ))}
              <div className="h-px bg-[var(--border-light)] my-2"></div>
              <button onClick={() => handleNavClick('contacto')} className="text-left py-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                Iniciar sesión
              </button>
              <button onClick={() => handleNavClick('contacto')} className="btn-primary mt-2 justify-center w-full">
                Comenzar ahora
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-24 relative z-10">
        
        {/* Hero Section */}
        <section id="inicio" className="px-6 py-12 md:py-20 max-w-[80rem] mx-auto flex flex-col lg:flex-row items-center gap-12">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 text-left relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 backdrop-blur-sm border border-violet-200 text-violet-700 text-xs font-semibold mb-8 shadow-sm">
              <Zap size={14} className="text-amber-500 fill-amber-500" />
              Nueva API de Integración 2.0 disponible
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-balance leading-[1.1]">
              Auditoría Legal, <br/>
              <span className="gradient-text">Impulsada por Datos.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-xl text-balance leading-relaxed">
              La plataforma más avanzada en México para la Prevención de Lavado de Dinero (PLD). Conecta tus operaciones y automatiza el cumplimiento con el SAT.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button onClick={() => handleNavClick('contacto')} className="btn-primary py-3 px-6 text-base group">
                Explorar Plataforma
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => handleNavClick('soluciones')} className="btn-secondary py-3 px-6 text-base">
                Ver Documentación API
              </button>
            </div>
            
            <div className="mt-12 flex items-center gap-8 text-sm font-medium text-[var(--text-secondary)]">
              <div className="flex items-center gap-2">
                <Activity size={18} className="text-emerald-500" />
                <span>Monitoreo 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-blue-500" />
                <span>Cifrado AES-256</span>
              </div>
            </div>
          </motion.div>

          {/* 3D Scene Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="flex-1 w-full relative z-0"
          >
            <Suspense fallback={<div className="w-full h-[500px] flex items-center justify-center text-slate-400">Cargando motor 3D...</div>}>
              <Scene3D />
            </Suspense>
          </motion.div>

        </section>

        {/* Dynamic Context Tabs */}
        <GirosTabs />

        {/* Content Sections */}
        <Revision />
        <Capas />
        <Proceso />

      </main>

      <footer className="bg-[var(--bg-surface-solid)] border-t border-[var(--border-light)] py-16 px-6 relative z-10 mt-20">
        <div className="max-w-[80rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-[var(--border-light)] pb-12 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight mb-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-tr from-[var(--color-violet)] to-[var(--accent-blue)] text-white shadow-md">
                  <ShieldCheck size={18} />
              </div>
              <span>Lex<span className="text-[var(--text-secondary)] font-medium">LFPIORPI</span></span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] max-w-sm leading-relaxed">
              La plataforma líder de cumplimiento LFPIORPI para empresas en México. Automatiza la prevención de lavado de dinero con inteligencia artificial.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <span className="font-semibold mb-2">Producto</span>
            <button className="text-left text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Verificación de identidad (KYC)</button>
            <button className="text-left text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Monitoreo de riesgo (AML)</button>
            <button className="text-left text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Presentación de Avisos SAT</button>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <span className="font-semibold mb-2">Desarrolladores</span>
            <button className="text-left text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Documentación API</button>
            <button className="text-left text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Webhooks</button>
            <button className="text-left text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Estado del Sistema</button>
          </div>
        </div>
        <div className="max-w-[80rem] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--text-secondary)]">
          <div>© {new Date().getFullYear()} LexLFPIORPI, Inc. Todos los derechos reservados.</div>
          <div className="flex gap-4">
            <button className="hover:text-[var(--text-primary)]">Privacidad</button>
            <button className="hover:text-[var(--text-primary)]">Términos</button>
            <button className="hover:text-[var(--text-primary)]">Legal</button>
          </div>
        </div>
      </footer>

      {/* FABs */}
      <a href="https://wa.me/5211234567890" target="_blank" rel="noopener noreferrer" className="fab-wa" aria-label="Contactar por WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fab-top"
            aria-label="Volver arriba"
          >
            <ChevronUp size={20} strokeWidth={2} />
          </motion.button>
        )}
      </AnimatePresence>

      <ChatWidget currentContext={activeTab} />
    </div>
  );
}
"""

with open("src/App.tsx", "w") as f:
    f.write(new_content)
