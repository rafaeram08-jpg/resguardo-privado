import os

app_content = """import React, { useEffect, useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, ShieldCheck, Terminal } from "lucide-react";
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import { TrustLogos, FeaturesGrid, DetailedInfo, FinalCTA } from './components/Sections';
const Scene3D = React.lazy(() => import('./components/Scene3D'));

const fadeUpScroll = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: "easeOut" as any }
};

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
              <div className="w-8 h-8 rounded-lg bg-[#064E3B] flex items-center justify-center">
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
            <button className="text-sm text-slate-600 hover:text-emerald-800 transition-colors font-medium mr-2">Iniciar sesión</button>
            <button className="btn-secondary py-1.5 px-4 text-sm">Contactar Ventas</button>
            <button className="btn-primary py-1.5 px-4 text-sm" onClick={() => scrollToSection('cta')}>
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
              <button className="text-left text-slate-600 p-2">Iniciar sesión</button>
              <button className="btn-primary justify-center py-3 mt-2">Contactar Ventas</button>
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
              <button className="btn-primary group text-lg py-3 px-8 w-full sm:w-auto shadow-emerald-900/10" onClick={() => scrollToSection('cta')}>
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

        {/* Dashboard Mockup - Enters on Scroll */}
        <section className="mt-24 px-6 max-w-[75rem] mx-auto relative z-20">
          <motion.div 
            {...fadeUpScroll}
            className="rounded-2xl border border-slate-800 bg-[#0F172A] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] overflow-hidden"
          >
            {/* Window Controls */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <div className="ml-4 text-xs font-mono text-slate-400 flex gap-4">
                <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> SAT Gateway: Conectado
                </span>
                <span className="hidden sm:inline-block">Latencia: 32ms</span>
              </div>
            </div>
            
            <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
               <div className="col-span-1 lg:col-span-2 space-y-4 font-mono text-sm text-slate-300">
                  <div className="text-slate-500">// Validación de Constancia de Situación Fiscal (CSF)</div>
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-xs font-bold">POST</span> 
                    <span className="text-slate-200">/v1/sat/csf/verify</span>
                  </div>
                  <div className="bg-[#1E293B] p-5 rounded-xl border border-slate-700/50 shadow-inner overflow-x-auto">
                    <pre className="text-[13px] leading-loose">
<span className="text-blue-400">"id_solicitud"</span>: <span className="text-emerald-300">"req_9f82h3nx"</span>,<br/>
<span className="text-blue-400">"rfc"</span>: <span className="text-emerald-300">"GACM800101XX9"</span>,<br/>
<span className="text-blue-400">"regimen_fiscal"</span>: <span className="text-emerald-300">"General de Ley Personas Morales"</span>,<br/>
<span className="text-blue-400">"estatus_padron"</span>: <span className="text-emerald-400 font-bold">"ACTIVO"</span>,<br/>
<span className="text-blue-400">"listas_negras_69B"</span>: <span className="text-slate-400 italic">false</span>,<br/>
<span className="text-blue-400">"acuse_sppld_requerido"</span>: <span className="text-emerald-400 italic">true</span>
                    </pre>
                  </div>
               </div>
               <div className="space-y-4">
                  <div className="h-full min-h-[100px] rounded-xl bg-slate-800/40 border border-slate-700/50 flex flex-col justify-center p-6">
                    <div className="text-xs text-slate-400 uppercase tracking-widest mb-2 font-semibold">Estatus DOF / 69-B</div>
                    <div className="text-xl font-bold text-emerald-400 flex items-center gap-2">
                       <ShieldCheck size={24} /> Sin Anomalías
                    </div>
                  </div>
                  <div className="h-full min-h-[100px] rounded-xl bg-emerald-900/10 border border-emerald-800/30 flex flex-col justify-center p-6">
                    <div className="text-xs text-emerald-500/80 uppercase tracking-widest mb-2 font-semibold">Portal SPPLD</div>
                    <div className="text-lg font-bold text-emerald-400">Conexión Segura TLS</div>
                    <div className="text-xs text-slate-500 mt-1">Certificado Vigente</div>
                  </div>
               </div>
            </div>
          </motion.div>
        </section>

        <TrustLogos />
        <FeaturesGrid />
        <DetailedInfo />
        <FinalCTA />

      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-50 border-t border-slate-200 pt-16 pb-8 px-6 overflow-hidden">
        <div className="max-w-[80rem] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
             <div className="flex items-center gap-2 font-bold text-lg tracking-tight mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#064E3B] flex items-center justify-center shadow-sm">
                  <ShieldCheck className="text-white" size={18} />
              </div>
              <span className="text-slate-900">Lex<span className="text-emerald-700">LFPIORPI</span></span>
            </div>
            <p className="text-slate-500 max-w-sm text-sm leading-relaxed mb-6">
              Infraestructura moderna para equipos de cumplimiento oficial en México. Prevención inteligente de lavado de dinero y automatización fiscal.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4 text-sm">Producto</h4>
            <ul className="space-y-3 text-slate-500 text-sm font-medium">
              <li><a href="#" className="hover:text-emerald-700 transition-colors">Extracción de CSF</a></li>
              <li><a href="#" className="hover:text-emerald-700 transition-colors">Validación RFCs (69-B)</a></li>
              <li><a href="#" className="hover:text-emerald-700 transition-colors">Avisos XMLs SPPLD</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4 text-sm">Recursos</h4>
            <ul className="space-y-3 text-slate-500 text-sm font-medium">
              <li><a href="#" className="hover:text-emerald-700 transition-colors">Documentación API</a></li>
              <li><a href="#" className="hover:text-emerald-700 transition-colors">Guía Ley Antilavado</a></li>
              <li><a href="#" className="hover:text-emerald-700 transition-colors">Blog de Cumplimiento</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4 text-sm">Empresa</h4>
            <ul className="space-y-3 text-slate-500 text-sm font-medium">
              <li><a href="#" className="hover:text-emerald-700 transition-colors">Acerca de nosotros</a></li>
              <li><a href="#" className="hover:text-emerald-700 transition-colors">Contacto Ventas</a></li>
              <li><a href="#" className="hover:text-emerald-700 transition-colors">Aviso de Privacidad</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-[80rem] mx-auto border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm">© {new Date().getFullYear()} LexLFPIORPI, S.A.P.I. de C.V. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
"""
with open("src/App.tsx", "w") as f: f.write(app_content)

sections_content = """import React from 'react';
import { Search, Globe, Fingerprint, Database, Check, Box, Cpu, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: "easeOut" as any }
};

export function TrustLogos() {
  return (
    <section className="pt-24 pb-12 bg-white relative z-10 border-b border-slate-100">
      <div className="max-w-[80rem] mx-auto px-6">
        <p className="text-center text-sm font-semibold text-slate-400 mb-8 uppercase tracking-widest">
          Infraestructura confiable procesando millones de RFCs diariamente
        </p>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-40 grayscale">
          {/* Fictional recognizable B2B shapes */}
          <div className="text-xl md:text-2xl font-bold font-serif tracking-tighter">FinTech<span className="text-emerald-600">MX</span></div>
          <div className="text-xl md:text-2xl font-black tracking-widest uppercase">PagosCorp</div>
          <div className="text-xl md:text-2xl font-bold italic">RealEstateTrust</div>
          <div className="text-xl md:text-2xl font-extrabold uppercase">CrediBank</div>
          <div className="text-xl md:text-2xl font-bold tracking-tight">KreditAuto</div>
        </div>
      </div>
    </section>
  );
}

export function FeaturesGrid() {
  return (
    <section className="section-padding bg-slate-50 border-b border-slate-200" id="features">
      <div className="max-w-[80rem] mx-auto">
        <motion.div {...fadeUp} className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Diseñado para escalar.<br/>Construido para el SAT.</h2>
          <p className="text-lg text-slate-600 text-balance">
            Una arquitectura unificada que elimina el ingreso manual de datos. Todo lo que necesitas para cumplir con las regulaciones mexicanas, en una sola API.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.0, ease: "easeOut" as any }} className="saas-card p-8 md:p-10 group bg-white hover:border-emerald-200">
            <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center mb-8 text-[#064E3B] group-hover:bg-[#064E3B] group-hover:text-white transition-all duration-300">
              <Search size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-900">Extracción Constancias (CSF)</h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              Extracción OCR en tiempo real y validación directa contra los servidores del SAT. Obtenemos Régimen Fiscal, Código Postal y Estatus del Padrón en milisegundos.
            </p>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" as any }} className="saas-card p-8 md:p-10 group bg-white hover:border-emerald-200">
            <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center mb-8 text-[#064E3B] group-hover:bg-[#064E3B] group-hover:text-white transition-all duration-300">
              <Globe size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-900">Listas Negras y Art. 69-B</h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              Monitoreo continuo contra EFOS (Empresas Fantasma), listas del SAT, OFAC y la ONU. Alertas por Webhook al instante si el estatus de un cliente cambia.
            </p>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" as any }} className="saas-card p-8 md:p-10 group bg-white hover:border-emerald-200">
            <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center mb-8 text-[#064E3B] group-hover:bg-[#064E3B] group-hover:text-white transition-all duration-300">
              <Fingerprint size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-900">Beneficiario Controlador</h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              Algoritmos diseñados para procesar Actas Constitutivas y mapear estructuras corporativas complejas, identificando al dueño real según las reformas fiscales.
            </p>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" as any }} className="saas-card p-8 md:p-10 group bg-white hover:border-emerald-200">
            <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center mb-8 text-[#064E3B] group-hover:bg-[#064E3B] group-hover:text-white transition-all duration-300">
              <Database size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-900">Avisos XML Automatizados</h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              Procesamos tu facturación (CFDI 4.0), calculamos umbrales LFPIORPI de forma automática y enviamos el layout oficial XML directamente al portal SPPLD.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export function DetailedInfo() {
  return (
    <section className="section-padding relative overflow-hidden bg-white" id="methodology">
      <div className="max-w-[80rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div {...fadeUp}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
             <Cpu size={14} className="text-emerald-600" /> Infraestructura Segura
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Aprobado por Oficiales de Cumplimiento.</h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Deja de depender de Excel y cargas masivas manuales en la página del SAT. Integra nuestras APIs en tu flujo de registro y el sistema bloqueará riesgos antes de que ocurran.
          </p>
          <ul className="space-y-5">
            {[
              'Bóveda criptográfica de expedientes (Norma Oficial NOM-151)',
              'Latencia sub-50ms para cruce de RFCs durante el onboarding',
              'Alertas de riesgo accionables y automatizadas vía Webhooks'
            ].map((text, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex items-start gap-4 text-slate-800 font-medium"
              >
                <div className="w-6 h-6 mt-0.5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 border border-emerald-200">
                  <Check size={14} className="text-[#064E3B]" />
                </div>
                <span className="leading-snug">{text}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" as any }} className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-blue-50 rounded-2xl transform rotate-3 scale-105 opacity-50 blur-sm"></div>
          <div className="rounded-2xl border border-slate-200 bg-white shadow-2xl p-2 relative z-10">
            <div className="bg-[#0F172A] rounded-xl p-6 border border-slate-800 overflow-x-auto">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-700 text-sm text-slate-400 font-mono">
                <Box size={16} className="text-emerald-400" /> webhook.received
              </div>
              <div className="space-y-3 font-mono text-xs md:text-[13px] text-slate-300">
                <div className="flex"><span className="text-blue-400 w-32 shrink-0">"event_type":</span> <span className="text-rose-400">"sat.69b_alerta"</span>,</div>
                <div className="flex"><span className="text-blue-400 w-32 shrink-0">"rfc_empresa":</span> <span className="text-emerald-300">"GACM800101XX9"</span>,</div>
                <div className="flex"><span className="text-blue-400 w-32 shrink-0">"estatus_previo":</span> <span className="text-emerald-400">"limpio"</span>,</div>
                <div className="flex"><span className="text-blue-400 w-32 shrink-0">"estatus_nuevo":</span> <span className="text-rose-400 font-bold">"efo_definitivo"</span>,</div>
                <div className="flex"><span className="text-blue-400 w-32 shrink-0">"accion_sistema":</span> <span className="text-slate-400">"transacciones_bloqueadas"</span>,</div>
                <div className="flex"><span className="text-blue-400 w-32 shrink-0">"publicacion_dof":</span> <span className="text-slate-400">"2026-08-25"</span></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="py-24 px-6 relative z-10 bg-white" id="cta">
      <div className="max-w-[60rem] mx-auto">
        <motion.div 
          {...fadeUp}
          className="bg-[#064E3B] rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl"
        >
          {/* Decorative background circles */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-emerald-500/20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-emerald-700/40 blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Automatiza tu cumplimiento hoy.
            </h2>
            <p className="text-emerald-100/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto text-balance">
              Únete a las empresas líderes que ya utilizan LexLFPIORPI para operar de forma segura y cumplir con las normativas del SAT sin esfuerzo manual.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-[#064E3B] font-bold text-lg py-3.5 px-8 rounded-xl shadow-lg hover:bg-emerald-50 hover:scale-105 transition-all">
                Crear cuenta gratis
              </button>
              <button className="bg-emerald-800/50 border border-emerald-600/50 text-white font-semibold text-lg py-3.5 px-8 rounded-xl hover:bg-emerald-800 transition-colors">
                Hablar con un experto
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
"""
with open("src/components/Sections.tsx", "w") as f: f.write(sections_content)

