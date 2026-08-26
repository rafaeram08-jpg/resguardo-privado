import os

css_content = """@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");
@import "tailwindcss";

:root {
  --bg-page: #FAFAFA;
  --bg-surface: #FFFFFF;
  --text-primary: #0F172A;
  --text-secondary: #475569;
  --border-light: #E2E8F0;
  
  --accent-blue: #3B82F6;
  --accent-indigo: #6366F1;
  --accent-violet: #8B5CF6;
  --accent-emerald: #10B981;
  --accent-rose: #F43F5E;
  
  --font-sans: 'Inter', sans-serif;
}

body {
  background-color: var(--bg-page);
  color: var(--text-primary);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

h1, h2, h3, h4, h5, h6 {
  letter-spacing: -0.03em;
  font-weight: 700;
}

.text-balance {
  text-wrap: balance;
}

/* Gradient Text */
.gradient-text {
  background: linear-gradient(135deg, var(--accent-blue), var(--accent-violet));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.gradient-text-alt {
  background: linear-gradient(135deg, var(--accent-emerald), #059669);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Vibrant Buttons */
.btn-primary {
  background: linear-gradient(135deg, var(--accent-blue), var(--accent-indigo));
  color: #FFFFFF;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.75rem 1.75rem;
  border-radius: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
}

.btn-secondary {
  background-color: #FFFFFF;
  color: var(--text-primary);
  border: 1px solid var(--border-light);
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.75rem 1.75rem;
  border-radius: 10px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}
.btn-secondary:hover {
  border-color: #CBD5E1;
  background-color: #F8FAFC;
}

/* Animated Background Blobs */
.blob {
  position: absolute;
  filter: blur(80px);
  z-index: 0;
  border-radius: 50%;
  opacity: 0.4;
  animation: float 10s infinite ease-in-out alternate;
  pointer-events: none;
}
@keyframes float {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(30px, -40px) scale(1.1); }
}

/* Colorful Cards */
.saas-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-light);
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}
.saas-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-color: #CBD5E1;
}

.section-padding { padding: 6rem 1.5rem; }
@media (min-width: 1024px) { .section-padding { padding: 8rem 3rem; } }

/* Lenis */
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
.lenis.lenis-stopped { overflow: hidden; }
.lenis.lenis-scrolling iframe { pointer-events: none; }
"""

with open("src/index.css", "w") as f:
    f.write(css_content)

app_content = """import React, { useEffect, useState, Suspense } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { Menu, X, ShieldCheck, ChevronUp } from "lucide-react";
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import { FeaturesGrid, DetailedInfo } from './components/Sections';

const Scene3D = React.lazy(() => import('./components/Scene3D'));

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowScrollTop(latest > 500);
  });

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const navLinks = [
    { id: 'plataforma', label: 'Plataforma' },
    { id: 'soluciones', label: 'Soluciones' },
    { id: 'desarrolladores', label: 'Desarrolladores' },
    { id: 'precios', label: 'Precios' },
  ];

  return (
    <div className="min-h-screen relative font-sans text-[var(--text-primary)] selection:bg-blue-200 selection:text-blue-900 overflow-hidden">
      
      {/* Colorful Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-blue-300 blob" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-[20%] right-[-10%] w-[35rem] h-[35rem] bg-indigo-300 blob" style={{ animationDelay: '-2s' }}></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[45rem] h-[45rem] bg-emerald-200 blob" style={{ animationDelay: '-4s' }}></div>
      
      {/* Header */}
      <header className="sticky top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-[80rem] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3 font-bold text-2xl tracking-tight cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <ShieldCheck className="text-white" size={22} />
              </div>
              <span className="text-slate-900">Lex<span className="font-light text-slate-500">LFPIORPI</span></span>
            </div>
            
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <button key={link.id} className="text-slate-600 font-medium hover:text-slate-900 transition-colors">
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button className="text-slate-600 font-medium mr-2 hover:text-slate-900 transition-colors">Iniciar sesión</button>
            <button className="btn-primary">Comenzar ahora</button>
          </div>

          <button className="lg:hidden text-slate-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[80px] bg-white/95 backdrop-blur-xl z-40 p-6 flex flex-col gap-6"
          >
            <nav className="flex flex-col gap-6 text-xl font-semibold">
              {navLinks.map(link => (
                <button key={link.id} className="text-left text-slate-600">
                  {link.label}
                </button>
              ))}
              <div className="h-px bg-slate-200 my-2"></div>
              <button className="text-left text-slate-600">Iniciar sesión</button>
              <button className="btn-primary justify-center w-full mt-2 py-4 text-lg">Comenzar ahora</button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        {/* Colorful & 3D Hero Section */}
        <section className="pt-24 pb-20 px-6 max-w-[80rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-semibold text-sm mb-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
              Nuevo Motor de Cumplimiento 3.0
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-8">
              Auditoría Legal, <br/>
              <span className="gradient-text">Impulsada por Datos.</span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-10 leading-relaxed text-balance">
              Automatiza tus obligaciones LFPIORPI. Verifica empresas, monitorea beneficiarios y genera Avisos al SAT con una sola API y una interfaz visual poderosa.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary py-4 px-8 text-lg">
                Probar Gratis
              </button>
              <button className="btn-secondary py-4 px-8 text-lg">
                Agendar Demo
              </button>
            </div>
            
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full h-[500px] lg:h-[650px] relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-white shadow-2xl shadow-blue-500/10 flex items-center justify-center"
          >
             <Suspense fallback={<div className="text-blue-500 font-semibold animate-pulse">Cargando motor 3D interactivo...</div>}>
                <Scene3D />
             </Suspense>
             {/* Overlay UI elements on top of 3D */}
             <div className="absolute bottom-6 left-6 right-6 bg-white/80 backdrop-blur-md border border-white p-4 rounded-2xl shadow-xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Estado del Sistema</div>
                  <div className="font-semibold text-slate-900">Validación Criptográfica Activa</div>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <ShieldCheck className="text-emerald-600" size={24} />
                </div>
             </div>
          </motion.div>
        </section>

        {/* Content & Features */}
        <FeaturesGrid />
        <DetailedInfo />

      </main>

      <footer className="bg-slate-50 border-t border-slate-200 pt-20 pb-10 px-6 mt-20 relative z-10">
        <div className="max-w-[80rem] mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
             <div className="flex items-center gap-3 font-bold text-2xl tracking-tight mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <ShieldCheck className="text-white" size={18} />
              </div>
              <span className="text-slate-900">LexLFPIORPI</span>
            </div>
            <p className="text-slate-500 max-w-sm text-balance">
              Construyendo la infraestructura de confianza para la economía mexicana. Cumplimiento sin fricción.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Plataforma</h4>
            <ul className="space-y-3 text-slate-600 font-medium">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Verificación KYC</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Beneficiario Controlador</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Avisos SAT SPPLD</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Empresa</h4>
            <ul className="space-y-3 text-slate-600 font-medium">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Sobre Nosotros</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Contacto</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Términos Legales</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-[80rem] mx-auto pt-8 border-t border-slate-200 text-slate-500 font-medium text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <div>© {new Date().getFullYear()} LexLFPIORPI, Inc. Todos los derechos reservados.</div>
        </div>
      </footer>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 w-12 h-12 bg-white text-slate-900 rounded-full shadow-xl border border-slate-200 flex items-center justify-center z-50 hover:bg-slate-50 hover:scale-105 transition-all"
          >
            <ChevronUp size={24} strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
"""

with open("src/App.tsx", "w") as f:
    f.write(app_content)
