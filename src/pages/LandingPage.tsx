import React, { useEffect, useState, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, ShieldCheck, Terminal } from "lucide-react";
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { useNavigate } from 'react-router-dom';

import { TrustLogos, FeaturesGrid, DetailedInfo, FinalCTA } from '../components/Sections';
import Footer from '../components/Footer';
const Scene3D = React.lazy(() => import('../components/Scene3D'));

const fadeUpScroll = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" as any }
};

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

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
    { id: 'features', label: 'Infraestructura' },
    { id: 'methodology', label: 'Portal SPPLD' },
    { id: 'cta', label: 'Comenzar' },
  ];

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Helmet>
        <title>LexLFPIORPI | API de Cumplimiento SAT y Ley Antilavado</title>
        <meta name="description" content="Infraestructura moderna para automatizar la Ley Antilavado (LFPIORPI). Extrae datos de Constancias Fiscales, monitorea el Art. 69-B y genera XMLs al SAT." />
        <meta name="keywords" content="LFPIORPI, Ley Antilavado, SAT, API SAT, Constancia de Situación Fiscal, Art. 69-B, Listas Negras SAT, Cumplimiento PLD, Portal SPPLD" />
      </Helmet>
      
      {/* 3D Scene Background - Light mode glass effect */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
         <Suspense fallback={null}>
            <Scene3D />
         </Suspense>
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-[80rem] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div 
              className="flex items-center gap-2 font-bold text-lg tracking-tight cursor-pointer"
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            >
              <div className="w-8 h-8 rounded-lg bg-[#10B981] flex items-center justify-center">
                  <ShieldCheck className="text-white" size={18} />
              </div>
              <span className="text-slate-900">Lex<span className="text-emerald-700">LFPIORPI</span></span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map(link => (
                <button 
                  key={link.id} 
                  onClick={() => scrollToSection(link.id)}
                  className="text-sm text-slate-600 hover:text-emerald-800 transition-colors font-medium"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => navigate('/login')} className="text-sm text-slate-600 hover:text-emerald-800 transition-colors font-medium mr-2">Iniciar sesión</button>
            <button onClick={() => navigate('/login')} className="btn-secondary py-1.5 px-4 text-sm">Contactar Ventas</button>
            <button className="btn-primary py-1.5 px-4 text-sm" onClick={() => navigate('/login')}>
              Empezar
            </button>
          </div>

          <button 
            className="md:hidden text-slate-900 p-2 -mr-2" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
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
            className="fixed inset-0 top-[64px] bg-white/95 backdrop-blur-xl z-40 p-6 flex flex-col gap-6 border-t border-slate-200"
          >
            <nav className="flex flex-col gap-4 text-lg font-medium">
              {navLinks.map(link => (
                <button 
                  key={link.id} 
                  onClick={() => scrollToSection(link.id)}
                  className="text-left text-slate-600 hover:text-emerald-800 p-2"
                >
                  {link.label}
                </button>
              ))}
              <div className="h-px bg-slate-200 my-2"></div>
              <button onClick={() => navigate('/login')} className="text-left text-slate-600 p-2">Iniciar sesión</button>
              <button onClick={() => navigate('/login')} className="btn-primary justify-center py-3 mt-2">Contactar Ventas</button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 pt-32 pb-20">
        
        {/* Subtle Light Gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-50 rounded-full blur-[120px] opacity-70 pointer-events-none -z-10"></div>

        {/* Hero Section */}
        <section className="px-6 max-w-[80rem] mx-auto flex flex-col items-center text-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center w-full"
          >
            <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-10 hover:bg-emerald-100 transition-colors shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              Nuevo: Conexión directa al Portal SPPLD del SAT
              <ArrowRight size={14} className="ml-1 text-emerald-700" />
            </a>

            <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.05] font-extrabold tracking-tighter mb-8 max-w-4xl text-balance">
              La API moderna para <br className="hidden md:block" />
              <span className="text-gradient">el cumplimiento SAT.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-500 mb-10 max-w-3xl text-balance tracking-tight">
              Infraestructura diseñada para automatizar la Ley Antilavado (LFPIORPI). Extrae datos de Constancias Fiscales, monitorea el Art. 69-B y genera XMLs al SAT en milisegundos.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button className="btn-primary group text-lg py-3 px-8 w-full sm:w-auto shadow-emerald-900/10" onClick={() => navigate('/login')}>
                Integrar API
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-secondary group text-lg py-3 px-8 w-full sm:w-auto" onClick={() => scrollToSection('features')}>
                <Terminal size={18} className="mr-2 text-slate-500 group-hover:text-emerald-800 transition-colors" />
                Explorar Infraestructura
              </button>
            </div>
          </motion.div>
        </section>

        <TrustLogos />
        <FeaturesGrid />
        <DetailedInfo />
        <FinalCTA />

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
