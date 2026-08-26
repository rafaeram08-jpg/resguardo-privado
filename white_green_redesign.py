import os

css_content = """@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");
@import "tailwindcss";

:root {
  --bg-page: #FFFFFF;
  --bg-surface: #F8FAFC;
  --bg-surface-alt: #F1F5F9;
  --text-primary: #0F172A;
  --text-secondary: #475569;
  --border-light: #E2E8F0;
  
  --accent-dark: #064E3B; /* Deep Dark Green / Emerald 900 */
  --accent-main: #059669; /* Emerald 600 */
  --accent-light: #D1FAE5; /* Emerald 100 */
  
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
  color: var(--text-primary);
}

.text-balance {
  text-wrap: balance;
}

.text-gradient {
  background: linear-gradient(135deg, var(--accent-dark), var(--accent-main));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Buttons */
.btn-primary {
  background-color: var(--accent-dark);
  color: #FFFFFF;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.75rem 1.75rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(6, 78, 59, 0.1), 0 2px 4px -1px rgba(6, 78, 59, 0.06);
}
.btn-primary:hover {
  background-color: #022C22; /* Emerald 950 */
  transform: translateY(-1px);
  box-shadow: 0 10px 15px -3px rgba(6, 78, 59, 0.1), 0 4px 6px -2px rgba(6, 78, 59, 0.05);
}

.btn-secondary {
  background-color: #FFFFFF;
  color: var(--text-primary);
  border: 1px solid var(--border-light);
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.75rem 1.75rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
.btn-secondary:hover {
  background-color: var(--bg-surface);
  border-color: #CBD5E1;
}

/* Cards */
.saas-card {
  background-color: #FFFFFF;
  border: 1px solid var(--border-light);
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
}
.saas-card:hover {
  border-color: #CBD5E1;
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
}

.section-padding { padding: 8rem 1.5rem; }
@media (min-width: 1024px) { .section-padding { padding: 10rem 3rem; } }

/* Lenis */
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
.lenis.lenis-stopped { overflow: hidden; }
.lenis.lenis-scrolling iframe { pointer-events: none; }
"""
with open("src/index.css", "w") as f: f.write(css_content)

app_content = """import React, { useEffect, useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, ShieldCheck, Terminal } from "lucide-react";
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import { FeaturesGrid, DetailedInfo } from './components/Sections';
const Scene3D = React.lazy(() => import('./components/Scene3D'));

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
    { id: 'customers', label: 'Casos de Uso' },
    { id: 'changelog', label: 'API Docs' },
  ];

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
            <div className="flex items-center gap-2 font-bold text-lg tracking-tight cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-[#064E3B] flex items-center justify-center">
                  <ShieldCheck className="text-white" size={18} />
              </div>
              <span className="text-slate-900">Lex<span className="text-emerald-700">LFPIORPI</span></span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map(link => (
                <button key={link.id} className="text-sm text-slate-600 hover:text-emerald-800 transition-colors font-medium">
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm text-slate-600 hover:text-emerald-800 transition-colors font-medium mr-2">Iniciar sesión</button>
            <button className="btn-secondary py-1.5 px-4 text-sm">Contactar Ventas</button>
            <button className="btn-primary py-1.5 px-4 text-sm">Comenzar</button>
          </div>

          <button className="md:hidden text-slate-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
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
            className="fixed inset-0 top-[64px] bg-white/95 backdrop-blur-xl z-40 p-6 flex flex-col gap-6 border-t border-slate-200"
          >
            <nav className="flex flex-col gap-4 text-lg font-medium">
              {navLinks.map(link => (
                <button key={link.id} className="text-left text-slate-600 hover:text-emerald-800">
                  {link.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 pt-32 pb-20">
        
        {/* Subtle Light Gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-50 rounded-full blur-[100px] opacity-70 pointer-events-none -z-10"></div>

        {/* Hero Section */}
        <section className="px-6 max-w-[80rem] mx-auto flex flex-col items-center text-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <a href="#" className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium mb-10 hover:bg-emerald-100 transition-colors">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              Nuevo: Conexión directa al Portal SPPLD del SAT
              <ArrowRight size={12} className="ml-1 text-emerald-700" />
            </a>

            <h1 className="text-5xl md:text-[5rem] leading-[1.05] font-extrabold tracking-tighter mb-8 max-w-4xl text-balance">
              La API moderna para <br/>
              <span className="text-gradient">el cumplimiento SAT.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-3xl text-balance tracking-tight">
              Infraestructura diseñada para automatizar la Ley Antilavado (LFPIORPI). Extrae datos de Constancias Fiscales, monitorea el Art. 69-B y genera XMLs al SAT en milisegundos.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button className="btn-primary group text-lg py-3 px-8">
                Integrar API
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-secondary group text-lg py-3 px-8">
                <Terminal size={18} className="mr-2 text-slate-500 group-hover:text-emerald-800 transition-colors" />
                Leer la documentación
              </button>
            </div>
          </motion.div>
        </section>

        {/* Dashboard Mockup - Dark Mode inside Light Theme for contrast */}
        <section className="mt-20 px-6 max-w-[70rem] mx-auto relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="rounded-2xl border border-slate-800 bg-[#0F172A] shadow-2xl overflow-hidden"
          >
            {/* Window Controls */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 bg-slate-900">
              <div className="w-3 h-3 rounded-full bg-slate-700"></div>
              <div className="w-3 h-3 rounded-full bg-slate-700"></div>
              <div className="w-3 h-3 rounded-full bg-slate-700"></div>
              <div className="ml-4 text-xs font-mono text-slate-400 flex gap-4">
                <span className="flex items-center gap-1 text-emerald-400">SAT Gateway: Conectado</span>
              </div>
            </div>
            
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="col-span-1 md:col-span-2 space-y-4 font-mono text-sm text-slate-300">
                  <div className="text-slate-500">// Validación de Constancia de Situación Fiscal</div>
                  <div className="text-emerald-400">POST /v1/sat/csf/verify</div>
                  <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                    <span className="text-blue-400">"rfc":</span> <span className="text-emerald-300">"GACM800101XX9"</span>,<br/>
                    <span className="text-blue-400">"regimen_fiscal":</span> <span className="text-emerald-300">"General de Ley Personas Morales"</span>,<br/>
                    <span className="text-blue-400">"estatus_padron":</span> <span className="text-emerald-400">"ACTIVO"</span>,<br/>
                    <span className="text-blue-400">"listas_negras_69B":</span> <span className="text-slate-500">false</span>,<br/>
                    <span className="text-blue-400">"acuse_sppld_requerido":</span> <span className="text-emerald-400">true</span>
                  </div>
               </div>
               <div className="space-y-4">
                  <div className="h-24 rounded-xl bg-slate-800/50 border border-slate-700 flex flex-col justify-center p-5">
                    <div className="text-xs text-slate-400 uppercase tracking-widest mb-1">Estatus DOF / 69-B</div>
                    <div className="text-xl font-semibold text-emerald-400 flex items-center gap-2">
                       Sin Anomalías
                    </div>
                  </div>
                  <div className="h-24 rounded-xl bg-emerald-900/20 border border-emerald-800/50 flex flex-col justify-center p-5">
                    <div className="text-xs text-emerald-500 uppercase tracking-widest mb-1">Portal SPPLD</div>
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
      <footer className="relative z-10 bg-slate-50 border-t border-slate-200 pt-20 pb-10 px-6 mt-12">
        <div className="max-w-[80rem] mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
             <div className="flex items-center gap-2 font-bold text-lg tracking-tight mb-6">
              <div className="w-8 h-8 rounded-lg bg-[#064E3B] flex items-center justify-center">
                  <ShieldCheck className="text-white" size={18} />
              </div>
              <span className="text-slate-900">Lex<span className="text-emerald-700">LFPIORPI</span></span>
            </div>
            <p className="text-slate-500 max-w-sm text-sm leading-relaxed">
              Diseñado para equipos de ingeniería y cumplimiento oficial en México. Prevención inteligente de lavado de dinero.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4 text-sm">Producto</h4>
            <ul className="space-y-3 text-slate-500 text-sm font-medium">
              <li><a href="#" className="hover:text-emerald-700 transition-colors">Extracción de CSF</a></li>
              <li><a href="#" className="hover:text-emerald-700 transition-colors">Validación RFCs (69-B)</a></li>
              <li><a href="#" className="hover:text-emerald-700 transition-colors">Automatización XMLs SPPLD</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4 text-sm">Empresa</h4>
            <ul className="space-y-3 text-slate-500 text-sm font-medium">
              <li><a href="#" className="hover:text-emerald-700 transition-colors">Acerca de</a></li>
              <li><a href="#" className="hover:text-emerald-700 transition-colors">Contacto Ventas</a></li>
              <li><a href="#" className="hover:text-emerald-700 transition-colors">Privacidad</a></li>
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
import { Search, Globe, Fingerprint, Database, Check, Box, Cpu } from 'lucide-react';
import { motion } from 'motion/react';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: "easeOut" as any }
};

export function FeaturesGrid() {
  return (
    <section className="section-padding bg-slate-50 mt-32 border-y border-slate-200" id="features">
      <div className="max-w-[80rem] mx-auto">
        <motion.div {...fadeUp} className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Diseñado para escalar.<br/>Construido para el SAT.</h2>
          <p className="text-lg text-slate-600 text-balance">
            Una arquitectura unificada que elimina el ingreso manual en el portal SPPLD. Todo lo que necesitas para cumplir con las regulaciones mexicanas, en una API.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <motion.div {...fadeUp} className="saas-card p-8 md:p-10 group bg-white">
            <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center mb-8 text-[#064E3B] group-hover:bg-[#064E3B] group-hover:text-white transition-colors">
              <Search size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-900">Extracción Constancias (CSF)</h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              Extracción OCR en tiempo real y validación directa contra los servidores del SAT. Obtenemos Régimen Fiscal y Código Postal en milisegundos.
            </p>
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="saas-card p-8 md:p-10 group bg-white">
            <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center mb-8 text-[#064E3B] group-hover:bg-[#064E3B] group-hover:text-white transition-colors">
              <Globe size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-900">Listas Negras y Art. 69-B</h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              Monitoreo continuo contra EFOS (Empresas Fantasma), listas del SAT, OFAC y la ONU. Alertas por Webhook al instante si el estatus cambia.
            </p>
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="saas-card p-8 md:p-10 group bg-white">
            <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center mb-8 text-[#064E3B] group-hover:bg-[#064E3B] group-hover:text-white transition-colors">
              <Fingerprint size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-900">Beneficiario Controlador</h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              Algoritmos diseñados para mapear Actas Constitutivas y estructuras corporativas, identificando al dueño real según las reformas fiscales mexicanas.
            </p>
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="saas-card p-8 md:p-10 group bg-white">
            <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center mb-8 text-[#064E3B] group-hover:bg-[#064E3B] group-hover:text-white transition-colors">
              <Database size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-900">Avisos XML Automatizados</h3>
            <p className="text-slate-600 leading-relaxed font-medium">
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
    <section className="section-padding relative overflow-hidden bg-white" id="methodology">
      <div className="max-w-[80rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div {...fadeUp}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-6">
             <Cpu size={14} className="text-emerald-600" /> Infraestructura Oficial
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Aprobado por Oficiales de Cumplimiento.</h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Deja de depender de Excel y cargas masivas manuales en el SAT. Integra nuestras APIs en tu flujo de registro y el sistema gestionará la lógica regulatoria en tiempo real.
          </p>
          <ul className="space-y-4">
            {[
              'Bóveda criptográfica de expedientes (NOM-151)',
              'Latencia sub-50ms para cruce de RFCs en vivo',
              'Alertas de riesgo accionables vía Webhooks'
            ].map((text, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-800 font-medium">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <Check size={14} className="text-[#064E3B]" />
                </div>
                {text}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div {...fadeUp} className="relative">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 p-2">
            <div className="bg-[#0F172A] rounded-xl p-6 border border-slate-800">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800 text-sm text-slate-400 font-mono">
                <Box size={16} /> webhook.received
              </div>
              <div className="space-y-3 font-mono text-xs md:text-sm text-slate-300">
                <div className="flex"><span className="text-blue-400 w-28">event_type:</span> <span className="text-rose-400">"sat.69b_alerta"</span></div>
                <div className="flex"><span className="text-blue-400 w-28">rfc_empresa:</span> <span className="text-emerald-300">"GACM800101XX9"</span></div>
                <div className="flex"><span className="text-blue-400 w-28">estatus_previo:</span> <span className="text-emerald-400">"limpio"</span></div>
                <div className="flex"><span className="text-blue-400 w-28">estatus_nuevo:</span> <span className="text-rose-400">"efo_definitivo"</span></div>
                <div className="flex"><span className="text-blue-400 w-28">accion_sistema:</span> <span className="text-slate-400">"transacciones_bloqueadas"</span></div>
                <div className="flex"><span className="text-blue-400 w-28">publicacion_dof:</span> <span className="text-slate-400">"2026-08-18"</span></div>
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

scene_content = """import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function GlassShape() {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const scrollY = window.scrollY;
      const vh = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = vh > 0 ? scrollY / vh : 0;
      
      // Gentle floating rotation
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 + scrollProgress * Math.PI;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 + scrollProgress * Math.PI * 0.5;
      
      // Move shape downwards as user scrolls
      meshRef.current.position.y = -scrollProgress * 5; 
      meshRef.current.position.x = 2.5 - (scrollProgress * 2);
    }
  });

  return (
    <group ref={meshRef} position={[2.5, 0, 0]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Outer Glass Icosahedron */}
        <mesh>
          <icosahedronGeometry args={[2.2, 0]} />
          <MeshTransmissionMaterial 
            backside
            samples={4}
            thickness={2}
            chromaticAberration={0.05}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.3}
            temporalDistortion={0.1}
            clearcoat={1}
            color="#ffffff"
          />
        </mesh>
        
        {/* Inner Solid Dark Green Core */}
        <Sphere args={[1.2, 32, 32]}>
          <meshStandardMaterial color="#064E3B" roughness={0.2} metalness={0.8} />
        </Sphere>
      </Float>
    </group>
  );
}

export default function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }} style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={1.5} color="#ffffff" />
      <directionalLight position={[10, 10, 5]} intensity={3} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#059669" />
      <GlassShape />
    </Canvas>
  );
}
"""
with open("src/components/Scene3D.tsx", "w") as f: f.write(scene_content)
