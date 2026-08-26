import os

css_content = """@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");
@import "tailwindcss";

:root {
  --bg-page: #000000;
  --bg-surface: rgba(255, 255, 255, 0.03);
  --text-primary: #F4F4F5;
  --text-secondary: #A1A1AA;
  --border-light: rgba(255, 255, 255, 0.1);
  --border-hover: rgba(255, 255, 255, 0.2);
  
  --accent-emerald: #10B981;
  --accent-cyan: #06B6D4;
  --accent-blue: #3B82F6;
  
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
  letter-spacing: -0.04em;
  font-weight: 700;
}

.text-balance {
  text-wrap: balance;
}

/* Linear-style text gradient */
.text-glow {
  background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.5) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-text-green {
  background: linear-gradient(135deg, var(--accent-emerald), var(--accent-cyan));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Linear-style Buttons */
.btn-primary {
  background-color: #FFFFFF;
  color: #000000;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.2);
}
.btn-primary:hover {
  background-color: #E4E4E7;
  box-shadow: 0 0 20px 0 rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}

.btn-secondary {
  background-color: rgba(255, 255, 255, 0.05);
  color: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(10px);
}
.btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

/* Linear-style Cards */
.saas-card {
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
  backdrop-filter: blur(20px);
}
.saas-card:hover {
  border-color: rgba(255, 255, 255, 0.15);
  background-color: rgba(255, 255, 255, 0.04);
  transform: translateY(-2px);
  box-shadow: 0 10px 40px -10px rgba(16, 185, 129, 0.1);
}
.saas-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.saas-card:hover::before {
  opacity: 1;
}

/* Ambient Glows */
.ambient-glow {
  position: absolute;
  filter: blur(120px);
  z-index: -1;
  border-radius: 50%;
  pointer-events: none;
  opacity: 0.15;
}
.glow-emerald { background-color: var(--accent-emerald); }
.glow-cyan { background-color: var(--accent-cyan); }
.glow-blue { background-color: var(--accent-blue); }

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
import { Menu, X, ArrowRight, Activity, Terminal } from "lucide-react";
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
    { id: 'features', label: 'Features' },
    { id: 'methodology', label: 'Methodology' },
    { id: 'customers', label: 'Customers' },
    { id: 'changelog', label: 'Changelog' },
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
            <button className="text-sm text-slate-400 hover:text-white transition-colors font-medium mr-2">Log in</button>
            <button className="btn-secondary py-1.5 px-4 text-sm">Contact Sales</button>
            <button className="btn-primary py-1.5 px-4 text-sm">Sign up</button>
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
              Introducing API 3.0 with Real-Time OFAC
              <ArrowRight size={12} className="ml-1 text-slate-500" />
            </a>

            <h1 className="text-6xl md:text-[5.5rem] leading-[1.05] font-extrabold tracking-tighter mb-8 text-glow max-w-4xl text-balance">
              The standard for <br/>
              <span className="gradient-text-green">compliance engineering.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl text-balance tracking-tight">
              A meticulously designed infrastructure to automate LFPIORPI obligations, verify businesses, and screen beneficiaries in milliseconds.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button className="btn-primary group">
                Start building
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform opacity-70" />
              </button>
              <button className="btn-secondary group">
                <Terminal size={16} className="mr-2 text-slate-400 group-hover:text-white transition-colors" />
                Read the docs
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
                <span className="flex items-center gap-1"><Activity size={12}/> Network: OK</span>
                <span>Latency: 42ms</span>
              </div>
            </div>
            
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="col-span-1 md:col-span-2 space-y-4 font-mono text-sm">
                  <div className="text-slate-500">// Processing verification request</div>
                  <div className="text-emerald-400">POST /v1/verify/business</div>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                    <span className="text-cyan-400">"id":</span> <span className="text-white">"req_9f82h3nx"</span>,<br/>
                    <span className="text-cyan-400">"status":</span> <span className="text-emerald-400">"verified"</span>,<br/>
                    <span className="text-cyan-400">"sat_status":</span> <span className="text-emerald-400">"active"</span>,<br/>
                    <span className="text-cyan-400">"ofac_match":</span> <span className="text-slate-500">false</span>,<br/>
                    <span className="text-cyan-400">"ubo_count":</span> <span className="text-white">2</span>
                  </div>
               </div>
               <div className="space-y-4">
                  <div className="h-24 rounded-lg bg-white/5 border border-white/5 flex flex-col justify-center p-4">
                    <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Risk Score</div>
                    <div className="text-2xl font-semibold text-emerald-400">0.02 <span className="text-sm text-slate-500">/ 1.00</span></div>
                  </div>
                  <div className="h-24 rounded-lg bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 flex flex-col justify-center p-4">
                    <div className="text-xs text-emerald-500/70 uppercase tracking-widest mb-1">SAT SPPLD</div>
                    <div className="text-lg font-semibold text-emerald-400">Auto-filing Active</div>
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
              Designed for modern engineering and compliance teams in Mexico.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Product</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Business Verification</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Beneficial Ownership</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Automated SAT Notices</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Company</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Legal</a></li>
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
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Designed for scale.<br/>Built for precision.</h2>
          <p className="text-lg text-slate-400 text-balance max-w-2xl">
            A unified architecture that eliminates fragmented compliance tools. Everything you need to meet Mexican regulations, wrapped in a developer-first API.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <motion.div {...fadeUp} className="saas-card p-8 md:p-10 group">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-8 text-emerald-400 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-colors">
              <Search size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">Advanced Verification</h3>
            <p className="text-slate-400 leading-relaxed">
              Real-time OCR extraction and validation against the SAT and INE databases. Instant structural parsing for corporate documents.
            </p>
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="saas-card p-8 md:p-10 group">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-8 text-cyan-400 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20 transition-colors">
              <Globe size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">Global Screening</h3>
            <p className="text-slate-400 leading-relaxed">
              Continuous monitoring against OFAC, UN Sanctions, and the SAT's Article 69-B (Blacklist). Webhook alerts the second status changes.
            </p>
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="saas-card p-8 md:p-10 group">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-8 text-blue-400 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-colors">
              <Layers size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">Beneficial Ownership</h3>
            <p className="text-slate-400 leading-relaxed">
              Algorithmically unravel nested corporate structures to identify ultimate beneficial owners, satisfying strict fiscal requirements.
            </p>
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="saas-card p-8 md:p-10 group">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-8 text-emerald-400 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-colors">
              <Database size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">Automated SAT Filing</h3>
            <p className="text-slate-400 leading-relaxed">
              We ingest your CFDI 4.0 data, calculate LFPIORPI thresholds, and automatically push XML notices to the SPPLD portal.
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
             <Cpu size={14} className="text-emerald-400" /> Infrastructure
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Built for engineers, approved by lawyers.</h2>
          <p className="text-lg text-slate-400 mb-8 leading-relaxed">
            Stop relying on manual spreadsheets. Integrate our robust APIs directly into your onboarding flow and let the system handle the complex regulatory logic automatically.
          </p>
          <ul className="space-y-4">
            {[
              'Cryptographically secure document vault (NOM-151)',
              'Sub-50ms API latency for synchronous checks',
              'Event-driven architecture via Webhooks'
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
                <div className="flex"><span className="text-cyan-400 w-24">event_type:</span> <span className="text-emerald-300">"risk_score.updated"</span></div>
                <div className="flex"><span className="text-cyan-400 w-24">entity_id:</span> <span className="text-white">"ent_8f99xa"</span></div>
                <div className="flex"><span className="text-cyan-400 w-24">prev_score:</span> <span className="text-emerald-400">"low"</span></div>
                <div className="flex"><span className="text-cyan-400 w-24">new_score:</span> <span className="text-rose-400">"high"</span></div>
                <div className="flex"><span className="text-cyan-400 w-24">trigger:</span> <span className="text-slate-400">"OFAC SDN List Match"</span></div>
                <div className="flex"><span className="text-cyan-400 w-24">timestamp:</span> <span className="text-slate-400">"2026-08-18T14:15:00Z"</span></div>
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
import { Float, Wireframe, Edges } from '@react-three/drei';
import * as THREE from 'three';

function ComplexShape() {
  const meshRef = useRef<THREE.Group>(null);
  
  // Respond to scroll position
  useFrame((state) => {
    if (meshRef.current) {
      const scrollY = window.scrollY;
      const vh = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = vh > 0 ? scrollY / vh : 0;
      
      // Continuous slow rotation + scroll-based rotation
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1 + scrollProgress * Math.PI * 2;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15 + scrollProgress * Math.PI;
      
      // Move shape based on scroll (starts right, moves left, moves down)
      // Base position is slightly top-right
      meshRef.current.position.y = -scrollProgress * 4; 
      meshRef.current.position.x = 2.5 - (scrollProgress * 5);
      meshRef.current.position.z = Math.sin(scrollProgress * Math.PI) * 2;
    }
  });

  return (
    <group ref={meshRef} position={[2.5, 0, 0]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh>
          <icosahedronGeometry args={[2, 1]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.8} />
          {/* Green and Cyan wireframe edges */}
          <Edges scale={1.0} color="#10b981" />
        </mesh>
        
        {/* Inner geometric core */}
        <mesh scale={0.6}>
          <octahedronGeometry args={[2, 0]} />
          <meshBasicMaterial color="#000000" />
          <Edges scale={1.0} color="#06b6d4" />
        </mesh>
      </Float>
    </group>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (particlesRef.current) {
      const scrollY = window.scrollY;
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05 + scrollY * 0.001;
      particlesRef.current.position.y = scrollY * -0.002;
    }
  });

  const count = 300;
  const positions = new Float32Array(count * 3);
  for(let i=0; i<count*3; i++) {
    positions[i] = (Math.random() - 0.5) * 20;
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#10b981" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

export default function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} style={{ width: '100%', height: '100%' }}>
      {/* Fog to fade out items in the distance, matching Linear's deep dark look */}
      <fog attach="fog" args={['#000000', 5, 15]} />
      <ComplexShape />
      <Particles />
    </Canvas>
  );
}
"""
with open("src/components/Scene3D.tsx", "w") as f: f.write(scene_content)

