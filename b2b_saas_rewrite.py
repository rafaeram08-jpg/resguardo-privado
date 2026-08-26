import os

# --- CSS REWRITE ---
css_content = """@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");
@import "tailwindcss";

:root {
  --bg-page: #F9FAFB;
  --bg-surface: #FFFFFF;
  --text-primary: #0F172A;
  --text-secondary: #475569;
  --border-light: #E2E8F0;
  --accent-primary: #0F172A;
  --accent-blue: #2563EB;
  --accent-blue-subtle: #EFF6FF;
  --font-sans: 'Inter', sans-serif;
}

body {
  background-color: var(--bg-page);
  color: var(--text-primary);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  letter-spacing: -0.02em;
  font-weight: 600;
}

/* Buttons */
.btn-primary {
  background-color: var(--accent-primary);
  color: #FFFFFF;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.625rem 1.25rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}
.btn-primary:hover {
  background-color: #334155;
}

.btn-secondary {
  background-color: var(--bg-surface);
  color: var(--text-primary);
  border: 1px solid var(--border-light);
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.625rem 1.25rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0,0,0,0.02);
}
.btn-secondary:hover {
  background-color: #F8FAFC;
  border-color: #CBD5E1;
}

/* Cards */
.saas-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-light);
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.02);
  transition: box-shadow 0.2s ease;
}
.saas-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.03);
}

/* FABs */
.fab-chat, .fab-top, .fab-wa {
  background-color: var(--bg-surface) !important;
  color: var(--text-primary) !important;
  border: 1px solid var(--border-light) !important;
  border-radius: 9999px !important;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03) !important;
  transition: all 0.2s ease !important;
  position: fixed;
  z-index: 95;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.fab-chat { bottom: 30px; right: 90px; width: 48px; height: 48px; }
.fab-top { bottom: 90px; right: 30px; width: 48px; height: 48px; }
.fab-wa { bottom: 30px; right: 30px; width: 48px; height: 48px; }
.fab-wa svg { width: 22px; height: 22px; }
.fab-chat:hover, .fab-top:hover, .fab-wa:hover {
  border-color: var(--text-primary) !important;
  transform: translateY(-2px) !important;
}

/* Chat Widget Overrides */
.chat-window {
  border-radius: 16px !important;
  background-color: var(--bg-surface) !important;
  border: 1px solid var(--border-light) !important;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
}
.chat-header {
  background-color: var(--bg-surface) !important;
  color: var(--text-primary) !important;
  border-bottom: 1px solid var(--border-light) !important;
}
.chat-header h3 { font-weight: 500; font-size: 0.875rem !important; }
.chat-header button { color: var(--text-secondary) !important; }
.chat-header button:hover { color: var(--text-primary) !important; }
.chat-messages { background-color: var(--bg-page) !important; }
.chat-bubble { border-radius: 8px !important; }
.chat-bubble.bot {
  background-color: var(--bg-surface) !important;
  border: 1px solid var(--border-light) !important;
  color: var(--text-primary) !important;
  box-shadow: 0 1px 2px rgba(0,0,0,0.02) !important;
}
.chat-bubble.user {
  background-color: var(--text-primary) !important;
  color: #fff !important;
  border: none !important;
}
.chat-input-area {
  background-color: var(--bg-surface) !important;
  border-top: 1px solid var(--border-light) !important;
}
.chat-input-area input {
  border-radius: 8px !important;
  border: 1px solid var(--border-light) !important;
  background-color: var(--bg-surface) !important;
  color: var(--text-primary) !important;
}
.chat-input-area input:focus {
  border-color: var(--accent-blue) !important;
  box-shadow: 0 0 0 1px var(--accent-blue) !important;
  outline: none !important;
}
.chat-input-area button {
  border-radius: 8px !important;
  background-color: var(--text-primary) !important;
  color: #fff !important;
}

.section-padding { padding: 6rem 1.5rem; }
@media (min-width: 1024px) { .section-padding { padding: 8rem 3rem; } }
.text-balance { text-wrap: balance; }

.mobile-nav-overlay {
  position: fixed; inset: 0; background-color: var(--bg-surface); z-index: 40;
  display: flex; flex-direction: column; padding: 5rem 1.5rem;
}

html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
.lenis.lenis-stopped { overflow: hidden; }
.lenis.lenis-scrolling iframe { pointer-events: none; }
"""

with open("src/index.css", "w") as f:
    f.write(css_content)

# --- APP.TSX REWRITE ---
app_content = """import React, { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { ChevronUp, Menu, X, ArrowRight, CheckCircle2 } from "lucide-react";
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import GirosTabs from './components/GirosTabs';
import { Revision, Proceso } from './components/Sections';
import ChatWidget from './components/ChatWidget';

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
    { id: 'productos', label: 'Productos' },
    { id: 'soluciones', label: 'Soluciones' },
    { id: 'recursos', label: 'Recursos' },
    { id: 'precios', label: 'Precios' },
  ];

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] font-sans relative overflow-x-hidden">
      
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[var(--bg-surface)]/80 backdrop-blur-md border-b border-[var(--border-light)]">
        <div className="max-w-[80rem] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="w-6 h-6 bg-[var(--accent-blue)] rounded-md flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
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
              Contactar Ventas
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
                Contactar Ventas
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-24 relative z-10">
        
        {/* Hero Section */}
        <section id="inicio" className="px-6 py-16 md:py-24 max-w-[80rem] mx-auto text-center flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent-blue-subtle)] text-[var(--accent-blue)] text-xs font-medium mb-8 border border-[var(--accent-blue)]/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-blue)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-blue)]"></span>
              </span>
              Actualizado con la última miscelánea fiscal
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-balance">
              Cumplimiento corporativo sin fricción operativa.
            </h1>
            
            <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-2xl text-balance leading-relaxed">
              Infraestructura legal y automatización de expedientes para Actividades Vulnerables. Defiende tu empresa ante auditorías del SAT con precisión matemática.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button onClick={() => handleNavClick('contacto')} className="btn-primary py-3 px-6 text-base group">
                Crear cuenta gratuita
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => handleNavClick('soluciones')} className="btn-secondary py-3 px-6 text-base">
                Ver documentación
              </button>
            </div>
            
            <div className="mt-12 text-sm text-[var(--text-secondary)] flex items-center gap-6 opacity-70 font-medium">
              <div className="flex items-center gap-2"><CheckCircle2 size={16} /> KYC Automatizado</div>
              <div className="hidden sm:flex items-center gap-2"><CheckCircle2 size={16} /> Matrices de Riesgo</div>
              <div className="hidden md:flex items-center gap-2"><CheckCircle2 size={16} /> Avisos al SAT</div>
            </div>
          </motion.div>
        </section>

        {/* Dynamic Context Tabs */}
        <GirosTabs />

        {/* Content Sections */}
        <Revision />
        <Proceso />

      </main>

      <footer className="bg-[var(--bg-surface)] border-t border-[var(--border-light)] py-16 px-6 relative z-10 mt-20">
        <div className="max-w-[80rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-[var(--border-light)] pb-12 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight mb-4">
              <div className="w-6 h-6 bg-[var(--text-primary)] rounded-md flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span>Lex<span className="text-[var(--text-secondary)] font-medium">LFPIORPI</span></span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] max-w-sm leading-relaxed">
              La plataforma líder de cumplimiento LFPIORPI para empresas en México. Automatiza la prevención de lavado de dinero.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <span className="font-semibold mb-2">Producto</span>
            <button className="text-left text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Verificación de identidad</button>
            <button className="text-left text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Monitoreo de riesgo</button>
            <button className="text-left text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Presentación de avisos</button>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <span className="font-semibold mb-2">Compañía</span>
            <button className="text-left text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Acerca de nosotros</button>
            <button className="text-left text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Privacidad</button>
            <button className="text-left text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Términos de servicio</button>
          </div>
        </div>
        <div className="max-w-[80rem] mx-auto text-sm text-[var(--text-secondary)]">
          © {new Date().getFullYear()} LexLFPIORPI, Inc. Fuentes: LFPIORPI (DOF 16 jul 2025). Plataforma informativa.
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
    f.write(app_content)

# --- GIROS REWRITE ---
giros_content = """import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { G } from '../data';
import { ChevronRight } from 'lucide-react';

export default function GirosTabs() {
  const [active, setActive] = useState('vehiculos');
  const data = G[active as keyof typeof G];

  const tabs = [
    { k: 'vehiculos', l: 'Vehículos' },
    { k: 'inmuebles', l: 'Inmuebles' },
    { k: 'mutuos', l: 'Préstamos y Mutuos' },
    { k: 'arrendamiento', l: 'Arrendamiento' },
    { k: 'joyas', l: 'Metales y Joyas' },
    { k: 'fe_publica', l: 'Fe Pública' }
  ];

  return (
    <section className="section-padding bg-[var(--bg-page)] max-w-[80rem] mx-auto" id="productos">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Soporte para todas las actividades vulnerables</h2>
        <p className="text-lg text-[var(--text-secondary)] text-balance">Nuestros flujos de validación se adaptan a las regulaciones específicas de tu industria, desde la venta de inmuebles hasta el arrendamiento.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        
        {/* Left Column: Tab List */}
        <div className="lg:col-span-4 flex flex-col gap-1">
          {tabs.map(t => (
            <button
              key={t.k}
              onClick={() => setActive(t.k)}
              className={`px-4 py-3 text-left rounded-lg transition-all flex justify-between items-center text-sm font-medium
                ${active === t.k 
                  ? 'bg-white shadow-sm border border-[var(--border-light)] text-[var(--accent-primary)]' 
                  : 'text-[var(--text-secondary)] hover:bg-slate-100 border border-transparent'
                }`}
            >
              {t.l}
              {active === t.k && <ChevronRight size={16} className="text-[var(--accent-blue)]" />}
            </button>
          ))}
        </div>

        {/* Right Column: Tab Content */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="saas-card p-8 md:p-10 bg-white">
                <h3 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">{tabs.find(t=>t.k===active)?.l}</h3>
                <p className="text-[var(--text-secondary)] text-lg mb-10 leading-relaxed text-balance">
                  {data.c}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[var(--border-light)]">
                  <div>
                    <div className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div> Alerta Principal
                    </div>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{data.p}</p>
                  </div>
                  
                  <div>
                    <div className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[var(--accent-blue)]"></div> Requisitos
                    </div>
                    <ul className="space-y-2">
                      {data.d.map((item, i) => (
                        <li key={i} className="flex gap-2 text-[var(--text-secondary)] text-sm">
                          <span className="text-[var(--border-light)]">-</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
"""

with open("src/components/GirosTabs.tsx", "w") as f:
    f.write(giros_content)

# --- SECTIONS REWRITE ---
sections_content = """import React from 'react';
import { motion } from 'motion/react';
import { Users, FileSearch, Fingerprint, ShieldCheck, Database, Check } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

export function Revision() {
  return (
    <section className="section-padding max-w-[80rem] mx-auto" id="soluciones">
      <motion.div {...fadeUp} className="text-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Todo lo necesario para superar una inspección</h2>
        <p className="text-lg text-[var(--text-secondary)] text-balance">
          Construimos la infraestructura legal requerida por la autoridad. Recolecta documentos, firma expedientes y envía avisos con una sola integración.
        </p>
      </motion.div>

      <motion.div {...fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="saas-card p-8 col-span-1 md:col-span-2 bg-[var(--bg-surface)]">
          <div className="w-12 h-12 bg-blue-50 text-[var(--accent-blue)] rounded-xl flex items-center justify-center mb-6">
            <FileSearch size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-3">Integración en Portal SPPLD</h3>
          <p className="text-[var(--text-secondary)] mb-6 max-w-lg text-balance">Gestiona tu alta y designación de Responsable de Cumplimiento sin perder tiempo en burocracia. Sincronización directa y validación de acuses.</p>
        </div>

        <div className="saas-card p-8 bg-[var(--bg-surface)]">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-3">Manuales de Prevención</h3>
          <p className="text-[var(--text-secondary)] text-balance">Documentos generados dinámicamente según tu modelo de negocio real, evitando sanciones por plantillas genéricas.</p>
        </div>

        <div className="saas-card p-8 bg-[var(--bg-surface)]">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
            <Fingerprint size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-3">Expedientes KYC</h3>
          <p className="text-[var(--text-secondary)] text-balance">Validación automática de identificaciones y comprobantes de domicilio para integrar el expediente único del cliente.</p>
        </div>

        <div className="saas-card p-8 col-span-1 md:col-span-2 bg-[var(--bg-surface)] flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-6">
              <Database size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Auditoría y Avisos Mensuales</h3>
            <p className="text-[var(--text-secondary)] max-w-lg text-balance">
              El SAT cruza tus facturas con tus avisos antilavado. Nuestra plataforma valida discrepancias antes de la presentación oficial, protegiendo tu firma electrónica.
            </p>
          </div>
        </div>

      </motion.div>
    </section>
  );
}

export function Proceso() {
  return (
    <section className="section-padding bg-white border-y border-[var(--border-light)]" id="recursos">
      <div className="max-w-[80rem] mx-auto">
        <motion.div {...fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">API-first, pero diseñada para abogados</h2>
            <p className="text-lg text-[var(--text-secondary)] mb-8 text-balance">
              Integra flujos de validación en tu onboarding existente o utiliza nuestro dashboard web para gestionar expedientes manualmente. Flexibilidad total para tu equipo operativo.
            </p>
            <ul className="space-y-4 mb-8">
              {['Validación de listas negras (OFAC, ONU, SAT)', 'Score de riesgo dinámico', 'Custodia de documentos por 5 años'].map((text, i) => (
                <li key={i} className="flex items-center gap-3 text-[var(--text-primary)] font-medium">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  {text}
                </li>
              ))}
            </ul>
            <button className="btn-secondary">Leer la documentación</button>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl transform rotate-2"></div>
            <div className="relative saas-card bg-white p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[var(--border-light)]">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500"><Users size={20}/></div>
                <div>
                  <div className="font-semibold">Verificación de Cliente</div>
                  <div className="text-sm text-[var(--text-secondary)]">ID: req_8f72h3</div>
                </div>
                <div className="ml-auto bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">Aprobado</div>
              </div>
              <div className="space-y-4 font-mono text-sm text-slate-600">
                <div className="flex justify-between"><span className="text-slate-400">status</span><span className="text-emerald-600">"verified"</span></div>
                <div className="flex justify-between"><span className="text-slate-400">risk_level</span><span>"low"</span></div>
                <div className="flex justify-between"><span className="text-slate-400">pep_match</span><span>false</span></div>
                <div className="flex justify-between"><span className="text-slate-400">sat_status</span><span className="text-emerald-600">"active"</span></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Capas() { return null; }
export function Requisitos() { return null; }
"""

with open("src/components/Sections.tsx", "w") as f:
    f.write(sections_content)

