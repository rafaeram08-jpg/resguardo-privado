import os

app_content = """import React, { useEffect, useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Activity, Terminal, ShieldAlert } from "lucide-react";
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import { FeaturesGrid, DetailedInfo } from './components/Sections';
const Scene3D = React.lazy(() => import('./components/Scene3D'));

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('dark');
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
    { id: 'customers', label: 'Casos de Uso' },
    { id: 'changelog', label: 'API Docs' },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* 3D Scene Background - Fixed to follow scroll */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <Suspense fallback={null}>
            <Scene3D />
         </Suspense>
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="max-w-[80rem] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 font-bold text-lg tracking-tight cursor-pointer group">
              <div className="w-6 h-6 rounded-md border border-white/20 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors bg-white/5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"></div>
              </div>
              <span>LexLFPIORPI</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map(link => (
                <button key={link.id} className="text-sm text-slate-400 hover:text-white transition-colors font-medium">
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm text-slate-400 hover:text-white transition-colors font-medium mr-2">Iniciar sesión</button>
            <button className="btn-secondary py-1.5 px-4 text-sm">Contactar Ventas</button>
            <button className="btn-primary py-1.5 px-4 text-sm">Comenzar</button>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
            className="fixed inset-0 top-[64px] bg-black/95 backdrop-blur-xl z-40 p-6 flex flex-col gap-6 border-t border-white/10"
          >
            <nav className="flex flex-col gap-4 text-lg font-medium">
              {navLinks.map(link => (
                <button key={link.id} className="text-left text-slate-400 hover:text-white">
                  {link.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 pt-32 pb-20">
        {/* Radial Glow behind Hero */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] ambient-glow glow-emerald opacity-20"></div>

        {/* Linear-style Hero Section */}
        <section className="px-6 max-w-[80rem] mx-auto flex flex-col items-center text-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <a href="#" className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-medium mb-10 hover:bg-white/10 transition-colors backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Nuevo: Conexión directa al Portal SPPLD del SAT
              <ArrowRight size={12} className="ml-1 text-slate-500" />
            </a>

            <h1 className="text-6xl md:text-[5.5rem] leading-[1.05] font-extrabold tracking-tighter mb-8 text-glow max-w-4xl text-balance">
              La API moderna para <br/>
              <span className="gradient-text-green">el cumplimiento SAT.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl text-balance tracking-tight">
              Infraestructura diseñada para automatizar la Ley Antilavado (LFPIORPI). Extrae datos de Constancias Fiscales, monitorea el Art. 69-B y genera XMLs al SAT en milisegundos.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button className="btn-primary group">
                Integrar API
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform opacity-70" />
              </button>
              <button className="btn-secondary group">
                <Terminal size={16} className="mr-2 text-slate-400 group-hover:text-white transition-colors" />
                Leer la documentación
              </button>
            </div>
          </motion.div>
        </section>

        {/* Dashboard Mockup - Linear Style */}
        <section className="mt-20 px-6 max-w-[70rem] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="rounded-2xl border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            {/* Window Controls */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
              <div className="w-3 h-3 rounded-full bg-white/20"></div>
              <div className="w-3 h-3 rounded-full bg-white/20"></div>
              <div className="w-3 h-3 rounded-full bg-white/20"></div>
              <div className="ml-4 text-xs font-mono text-slate-500 flex gap-4">
                <span className="flex items-center gap-1"><Activity size={12}/> SAT Gateway: Conectado</span>
                <span>Latencia UIF: 42ms</span>
              </div>
            </div>
            
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="col-span-1 md:col-span-2 space-y-4 font-mono text-sm">
                  <div className="text-slate-500">// Validación de Constancia de Situación Fiscal</div>
                  <div className="text-emerald-400">POST /v1/sat/csf/verify</div>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                    <span className="text-cyan-400">"rfc":</span> <span className="text-white">"GACM800101XX9"</span>,<br/>
                    <span className="text-cyan-400">"regimen_fiscal":</span> <span className="text-white">"General de Ley Personas Morales"</span>,<br/>
                    <span className="text-cyan-400">"estatus_padron":</span> <span className="text-emerald-400">"ACTIVO"</span>,<br/>
                    <span className="text-cyan-400">"listas_negras_69B":</span> <span className="text-slate-500">false</span>,<br/>
                    <span className="text-cyan-400">"acuse_sppld_requerido":</span> <span className="text-emerald-400">true</span>
                  </div>
               </div>
               <div className="space-y-4">
                  <div className="h-24 rounded-lg bg-white/5 border border-white/5 flex flex-col justify-center p-4">
                    <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Estatus DOF / 69-B</div>
                    <div className="text-xl font-semibold text-emerald-400 flex items-center gap-2">
                       <ShieldAlert size={18} /> Sin Anomalías
                    </div>
                  </div>
                  <div className="h-24 rounded-lg bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 flex flex-col justify-center p-4">
                    <div className="text-xs text-emerald-500/70 uppercase tracking-widest mb-1">Portal SPPLD</div>
                    <div className="text-lg font-semibold text-emerald-400">Conexión Segura TLS</div>
                  </div>
               </div>
            </div>
          </motion.div>
        </section>

        <FeaturesGrid />
        <DetailedInfo />

      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black border-t border-white/10 pt-20 pb-10 px-6">
        <div className="max-w-[80rem] mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
             <div className="flex items-center gap-3 font-bold text-lg tracking-tight mb-6 text-white">
              <div className="w-6 h-6 rounded-md border border-white/20 flex items-center justify-center bg-white/5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              </div>
              LexLFPIORPI
            </div>
            <p className="text-slate-400 max-w-sm text-sm">
              Diseñado para equipos de ingeniería y cumplimiento oficial en México.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Producto</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Extracción de CSF</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Validación RFCs (69-B)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Automatización de XMLs SPPLD</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Empresa</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Acerca de</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contacto Ventas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
"""
with open("src/App.tsx", "w") as f: f.write(app_content)

sections_content = """import React from 'react';
import { Search, Globe, Fingerprint, Database, Check, Layers, Box, Cpu } from 'lucide-react';
import { motion } from 'motion/react';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" as any }
};

export function FeaturesGrid() {
  return (
    <section className="section-padding" id="features">
      <div className="max-w-[80rem] mx-auto">
        <motion.div {...fadeUp} className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Diseñado para escalar.<br/>Construido para el SAT.</h2>
          <p className="text-lg text-slate-400 text-balance max-w-2xl">
            Una arquitectura unificada que elimina el ingreso manual en el portal SPPLD. Todo lo que necesitas para cumplir con las regulaciones mexicanas, en una API para desarrolladores.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <motion.div {...fadeUp} className="saas-card p-8 md:p-10 group">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-8 text-emerald-400 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-colors">
              <Search size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">Extracción Constancias (CSF)</h3>
            <p className="text-slate-400 leading-relaxed">
              Extracción OCR en tiempo real y validación directa contra los servidores del SAT. Obtenemos Régimen Fiscal y Código Postal en milisegundos.
            </p>
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="saas-card p-8 md:p-10 group">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-8 text-cyan-400 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20 transition-colors">
              <Globe size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">Listas Negras y Art. 69-B</h3>
            <p className="text-slate-400 leading-relaxed">
              Monitoreo continuo contra EFOS (Empresas Fantasma), listas del SAT, OFAC y la ONU. Alertas por Webhook al instante si el estatus cambia.
            </p>
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="saas-card p-8 md:p-10 group">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-8 text-blue-400 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-colors">
              <Layers size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">Beneficiario Controlador</h3>
            <p className="text-slate-400 leading-relaxed">
              Algoritmos diseñados para mapear Actas Constitutivas y estructuras corporativas, identificando al dueño real según las reformas fiscales mexicanas.
            </p>
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="saas-card p-8 md:p-10 group">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-8 text-emerald-400 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-colors">
              <Database size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">Avisos XML Automatizados</h3>
            <p className="text-slate-400 leading-relaxed">
              Procesamos tu facturación (CFDI 4.0), calculamos umbrales LFPIORPI y enviamos el layout oficial XML directamente al portal SPPLD.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export function DetailedInfo() {
  return (
    <section className="section-padding border-t border-white/5 relative overflow-hidden" id="methodology">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] ambient-glow glow-blue opacity-10"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] ambient-glow glow-emerald opacity-10"></div>
      
      <div className="max-w-[80rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div {...fadeUp}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-medium mb-6">
             <Cpu size={14} className="text-emerald-400" /> Infraestructura Oficial
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Aprobado por Oficiales de Cumplimiento.</h2>
          <p className="text-lg text-slate-400 mb-8 leading-relaxed">
            Deja de depender de Excel y cargas masivas manuales en el SAT. Integra nuestras APIs en tu flujo de registro y el sistema gestionará la lógica regulatoria en tiempo real.
          </p>
          <ul className="space-y-4">
            {[
              'Bóveda criptográfica de expedientes (NOM-151)',
              'Latencia sub-50ms para cruce de RFCs en vivo',
              'Alertas de riesgo accionables vía Webhooks'
            ].map((text, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-300 font-medium text-sm">
                <Check size={16} className="text-emerald-400" /> {text}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div {...fadeUp} className="relative">
          <div className="saas-card p-1">
            <div className="bg-black/80 rounded-[20px] p-6 border border-white/5">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5 text-sm text-slate-400 font-mono">
                <Box size={16} /> webhook.received
              </div>
              <div className="space-y-3 font-mono text-xs md:text-sm text-slate-300">
                <div className="flex"><span className="text-cyan-400 w-28">event_type:</span> <span className="text-rose-400">"sat.69b_alerta"</span></div>
                <div className="flex"><span className="text-cyan-400 w-28">rfc_empresa:</span> <span className="text-white">"GACM800101XX9"</span></div>
                <div className="flex"><span className="text-cyan-400 w-28">estatus_previo:</span> <span className="text-emerald-400">"limpio"</span></div>
                <div className="flex"><span className="text-cyan-400 w-28">estatus_nuevo:</span> <span className="text-rose-400">"efo_definitivo"</span></div>
                <div className="flex"><span className="text-cyan-400 w-28">accion_sistema:</span> <span className="text-slate-400">"transacciones_bloqueadas"</span></div>
                <div className="flex"><span className="text-cyan-400 w-28">publicacion_dof:</span> <span className="text-slate-400">"2026-08-18"</span></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
"""
with open("src/components/Sections.tsx", "w") as f: f.write(sections_content)

