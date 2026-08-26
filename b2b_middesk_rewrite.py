import os

# --- CSS REWRITE ---
css_content = """@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");
@import "tailwindcss";

:root {
  --bg-page: #FFFFFF;
  --bg-surface: #F9FAFB;
  --bg-surface-alt: #F3F4F6;
  --text-primary: #111827;
  --text-secondary: #4B5563;
  --border-light: #E5E7EB;
  
  --accent-primary: #111827; /* Dark almost black for buttons */
  --accent-blue: #2563EB; /* Bright blue for links/highlights */
  --accent-blue-light: #DBEAFE;
  --accent-green: #10B981;
  --accent-green-light: #D1FAE5;
  
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
  font-weight: 600;
  color: var(--text-primary);
}

/* Typography Overrides */
.text-balance {
  text-wrap: balance;
}

/* Buttons */
.btn-primary {
  background-color: var(--accent-primary);
  color: #FFFFFF;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  transition: background-color 0.2s ease, transform 0.1s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  cursor: pointer;
}
.btn-primary:hover {
  background-color: #1F2937;
}
.btn-primary:active {
  transform: scale(0.98);
}

.btn-secondary {
  background-color: #FFFFFF;
  color: var(--text-primary);
  border: 1px solid var(--border-light);
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}
.btn-secondary:hover {
  background-color: var(--bg-surface);
  border-color: #D1D5DB;
}

/* Input Fields */
.input-field {
  background-color: #FFFFFF;
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  color: var(--text-primary);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
}
.input-field:focus {
  outline: none;
  border-color: var(--accent-blue);
  box-shadow: 0 0 0 3px var(--accent-blue-light);
}

/* Cards / Bento Boxes */
.saas-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-light);
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  transition: box-shadow 0.2s ease;
}

/* UI Mockup Window */
.ui-mockup {
  background: #FFFFFF;
  border: 1px solid var(--border-light);
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);
  overflow: hidden;
}
.ui-mockup-header {
  border-bottom: 1px solid var(--border-light);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #F9FAFB;
}
.ui-mockup-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

/* Navigation */
.nav-link {
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.2s ease;
}
.nav-link:hover {
  color: var(--text-primary);
}

/* Dividers */
.section-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-light) 15%, var(--border-light) 85%, transparent);
  width: 100%;
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

# --- APP.TSX REWRITE ---
app_content = """import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import { HeroMockup, FeaturesGrid, APIDocs } from './components/Sections';

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
    { id: 'platform', label: 'Platform' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'customers', label: 'Customers' },
    { id: 'resources', label: 'Resources' },
    { id: 'pricing', label: 'Pricing' },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] font-sans">
      
      {/* Top Banner (Optional Middesk style) */}
      <div className="bg-[#EFF6FF] text-[#1E40AF] text-sm font-medium py-2 px-4 text-center flex items-center justify-center gap-2">
        <span className="bg-white text-[#1E40AF] text-xs font-bold px-2 py-0.5 rounded-full border border-blue-200">New</span>
        <span>Introducing Automated LFPIORPI Filing for Real Estate.</span>
        <a href="#" className="underline font-semibold ml-2 hover:text-blue-800">Read the announcement -></a>
      </div>

      {/* Header */}
      <header className="sticky top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-[var(--border-light)]">
        <div className="max-w-[80rem] mx-auto px-6 h-[72px] flex items-center justify-between">
          
          <div className="flex items-center gap-10">
            {/* Logo */}
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary)] flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span>Lex<span className="font-normal text-[var(--text-secondary)]">LFPIORPI</span></span>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <button key={link.id} className="nav-link">
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button className="nav-link mr-2">Sign in</button>
            <button className="btn-secondary py-2 px-4">Contact Sales</button>
            <button className="btn-primary py-2 px-4">Get Started</button>
          </div>

          <button className="lg:hidden text-[var(--text-primary)]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
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
            className="fixed inset-0 top-[110px] bg-white z-40 p-6 flex flex-col gap-6 border-t border-[var(--border-light)]"
          >
            <nav className="flex flex-col gap-4 text-lg font-medium">
              {navLinks.map(link => (
                <button key={link.id} className="text-left text-[var(--text-secondary)]">
                  {link.label}
                </button>
              ))}
              <div className="h-px bg-[var(--border-light)] my-4"></div>
              <button className="text-left text-[var(--text-secondary)]">Sign in</button>
              <button className="btn-primary justify-center w-full mt-4">Get Started</button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-6 max-w-[80rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-[4rem] font-bold leading-[1.05] tracking-tight mb-6">
              The modern identity platform for B2B compliance.
            </h1>
            <p className="text-xl text-[var(--text-secondary)] mb-10 leading-relaxed text-balance">
              Automate your LFPIORPI obligations. Verify businesses, screen beneficiaries, and file SAT notices automatically through a single API.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input type="email" placeholder="Enter your work email" className="input-field py-3" />
              <button className="btn-primary whitespace-nowrap px-6">
                Start for free
              </button>
            </div>
            
            <div className="mt-8 text-sm text-[var(--text-secondary)] flex items-center gap-6 font-medium">
              <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[var(--accent-blue)]"/> SAT Compliant</div>
              <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[var(--accent-blue)]"/> OFAC Screening</div>
            </div>
          </div>
          
          <div className="relative w-full h-[500px]">
             <HeroMockup />
          </div>
        </section>

        {/* Logo Cloud */}
        <section className="py-12 border-y border-[var(--border-light)] bg-white">
          <div className="max-w-[80rem] mx-auto px-6">
            <p className="text-center text-sm font-semibold text-[var(--text-secondary)] mb-8 uppercase tracking-widest">Trusted by industry leaders in Mexico</p>
            <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
              {/* Fake Logos for styling */}
              <div className="text-2xl font-bold font-serif tracking-tighter">AcmeCorp</div>
              <div className="text-2xl font-bold tracking-widest">GLOBEX</div>
              <div className="text-2xl font-bold italic">Soylent</div>
              <div className="text-2xl font-bold uppercase">Initech</div>
              <div className="text-2xl font-bold tracking-tight">Umbrella</div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <FeaturesGrid />

        {/* API Mockup Section */}
        <APIDocs />

      </main>

      <footer className="bg-white border-t border-[var(--border-light)] pt-20 pb-10 px-6 mt-20">
        <div className="max-w-[80rem] mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight mb-4">
              <div className="w-6 h-6 rounded-md bg-[var(--accent-primary)] flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span>LexLFPIORPI</span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] max-w-xs mb-6">
              Building the infrastructure of trust for the Mexican economy. Compliance without the operational overhead.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-sm">Platform</h4>
            <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
              <li><a href="#" className="hover:text-[var(--text-primary)]">Business Verification</a></li>
              <li><a href="#" className="hover:text-[var(--text-primary)]">Beneficial Ownership</a></li>
              <li><a href="#" className="hover:text-[var(--text-primary)]">SAT Reporting API</a></li>
              <li><a href="#" className="hover:text-[var(--text-primary)]">Risk Scoring</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-sm">Resources</h4>
            <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
              <li><a href="#" className="hover:text-[var(--text-primary)]">Documentation</a></li>
              <li><a href="#" className="hover:text-[var(--text-primary)]">API Reference</a></li>
              <li><a href="#" className="hover:text-[var(--text-primary)]">LFPIORPI Guide</a></li>
              <li><a href="#" className="hover:text-[var(--text-primary)]">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-sm">Company</h4>
            <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
              <li><a href="#" className="hover:text-[var(--text-primary)]">About</a></li>
              <li><a href="#" className="hover:text-[var(--text-primary)]">Careers</a></li>
              <li><a href="#" className="hover:text-[var(--text-primary)]">Contact</a></li>
              <li><a href="#" className="hover:text-[var(--text-primary)]">Privacy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-[80rem] mx-auto pt-8 border-t border-[var(--border-light)] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--text-secondary)]">
          <div>© {new Date().getFullYear()} LexLFPIORPI, Inc. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[var(--text-primary)]">Twitter</a>
            <a href="#" className="hover:text-[var(--text-primary)]">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
"""

with open("src/App.tsx", "w") as f:
    f.write(app_content)

# --- SECTIONS REWRITE ---
sections_content = """import React from 'react';
import { ShieldCheck, Search, Database, Fingerprint, Lock, ArrowRight, CheckCircle2, ChevronRight, Play } from 'lucide-react';
import { motion } from 'motion/react';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.5, ease: "easeOut" }
};

export function HeroMockup() {
  return (
    <div className="w-full h-full relative">
      {/* Abstract Background Elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      
      {/* Main UI Card Mockup */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="ui-mockup absolute right-0 top-4 w-[110%] md:w-full z-10"
      >
        <div className="ui-mockup-header">
          <div className="ui-mockup-dot bg-red-400"></div>
          <div className="ui-mockup-dot bg-amber-400"></div>
          <div className="ui-mockup-dot bg-green-400"></div>
          <div className="ml-4 text-xs text-[var(--text-secondary)] font-medium font-mono">dashboard.lexlfpiorpi.com/businesses</div>
        </div>
        
        <div className="p-6 bg-white">
          <div className="flex justify-between items-end mb-6 border-b border-[var(--border-light)] pb-4">
            <div>
              <h3 className="text-xl font-bold">Desarrolladora Inmobiliaria del Norte S.A. de C.V.</h3>
              <p className="text-sm text-[var(--text-secondary)]">RFC: DIN180214XX9 • Added Today at 10:42 AM</p>
            </div>
            <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-md text-sm font-semibold border border-emerald-200">
              Verified
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="border border-[var(--border-light)] rounded-lg p-4">
              <div className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-1">Risk Score</div>
              <div className="text-2xl font-bold text-emerald-600">Low Risk</div>
            </div>
            <div className="border border-[var(--border-light)] rounded-lg p-4">
              <div className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-1">Beneficiaries Found</div>
              <div className="text-2xl font-bold text-[var(--text-primary)]">3 Owners</div>
            </div>
          </div>
          
          <div>
            <div className="text-sm font-semibold mb-3">Watchlist Screening</div>
            <div className="space-y-2">
              {[
                { name: 'OFAC Sanctions List', status: 'Clear', color: 'emerald' },
                { name: 'SAT Art. 69-B (Blacklist)', status: 'Clear', color: 'emerald' },
                { name: 'UIF PEP Database', status: 'Review', color: 'amber' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center text-sm p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-light)]">
                  <span className="font-medium text-[var(--text-primary)]">{item.name}</span>
                  <div className={`flex items-center gap-1.5 text-${item.color}-700 font-semibold`}>
                    <CheckCircle2 size={14} />
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function FeaturesGrid() {
  return (
    <section className="section-padding bg-[var(--bg-surface-alt)]" id="solutions">
      <div className="max-w-[80rem] mx-auto">
        <motion.div {...fadeUp} className="max-w-2xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Complete your compliance lifecycle</h2>
          <p className="text-lg text-[var(--text-secondary)] text-balance">
            Replace fragmented manual processes with a unified API designed specifically for the Mexican regulatory environment.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Large Card 1 */}
          <motion.div {...fadeUp} className="saas-card col-span-1 md:col-span-2 bg-white flex flex-col justify-between">
            <div className="p-8 pb-0">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                <Search size={24} />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Automated Business Verification</h3>
              <p className="text-[var(--text-secondary)] text-lg mb-8 max-w-md">
                Instantly verify company details, RFC validity, and structural data directly against public registries and the SAT.
              </p>
            </div>
            <div className="bg-[#F8FAFC] border-t border-[var(--border-light)] p-6 mt-auto">
              <div className="flex items-center gap-4 text-sm font-mono text-slate-500 bg-white p-3 rounded border border-slate-200">
                <span className="text-blue-600 font-bold">POST</span>
                <span>/v1/businesses/verify</span>
                <span className="ml-auto text-emerald-600 font-bold">200 OK</span>
              </div>
            </div>
          </motion.div>

          {/* Small Card 1 */}
          <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="saas-card p-8 bg-white">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center mb-6">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Continuous Screening</h3>
            <p className="text-[var(--text-secondary)]">
              Daily monitoring against OFAC, UN sanctions, and the SAT's Article 69-B list. Receive webhook alerts instantly.
            </p>
          </motion.div>

          {/* Small Card 2 */}
          <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="saas-card p-8 bg-white">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-6">
              <Fingerprint size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Beneficial Ownership</h3>
            <p className="text-[var(--text-secondary)]">
              Unravel complex corporate structures to identify the ultimate beneficial owners (UBOs) automatically.
            </p>
          </motion.div>

          {/* Large Card 2 */}
          <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="saas-card col-span-1 md:col-span-2 bg-white flex flex-col md:flex-row items-center overflow-hidden">
            <div className="p-8 md:w-1/2">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center mb-6">
                <Database size={24} />
              </div>
              <h3 className="text-2xl font-semibold mb-3">SAT Notice Generation</h3>
              <p className="text-[var(--text-secondary)] text-lg mb-6">
                Connect your invoicing (CFDI 4.0) data. We calculate LFPIORPI thresholds and generate the exact XML payloads required for the SPPLD portal.
              </p>
              <a href="#" className="text-blue-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">Explore SAT integration <ArrowRight size={16}/></a>
            </div>
            <div className="md:w-1/2 bg-[#111827] h-full p-6 text-emerald-400 font-mono text-sm leading-relaxed overflow-hidden">
              <div className="opacity-50">{"// Auto-generated XML Payload"}</div>
              <div>&lt;Aviso&gt;</div>
              <div className="pl-4">&lt;SujetoObligado&gt;</div>
              <div className="pl-8">&lt;RFC&gt;EXA123456XX9&lt;/RFC&gt;</div>
              <div className="pl-4">&lt;/SujetoObligado&gt;</div>
              <div className="pl-4">&lt;DetalleOperacion&gt;</div>
              <div className="pl-8">&lt;Fecha&gt;2026-08-17&lt;/Fecha&gt;</div>
              <div className="pl-8">&lt;Monto&gt;1500000.00&lt;/Monto&gt;</div>
              <div className="pl-8">&lt;Moneda&gt;MXN&lt;/Moneda&gt;</div>
              <div className="pl-4">&lt;/DetalleOperacion&gt;</div>
              <div>&lt;/Aviso&gt;</div>
              <div className="mt-4 text-blue-400">{"// Validated against SAT XSD Schema"}</div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export function APIDocs() {
  return (
    <section className="section-padding bg-white" id="resources">
      <div className="max-w-[80rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div {...fadeUp}>
          <div className="text-sm font-bold tracking-widest uppercase text-blue-600 mb-4">Developer First</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Integrate compliance into your existing flows.</h2>
          <p className="text-lg text-[var(--text-secondary)] mb-8">
            Our REST API is designed for modern engineering teams. Build custom onboarding experiences while we handle the regulatory complexity in the background.
          </p>
          
          <div className="space-y-4 mb-8">
            {[
              { title: 'Clear Documentation', desc: 'Comprehensive guides and interactive API reference.' },
              { title: 'Webhooks', desc: 'Real-time updates on verification status and risk alerts.' },
              { title: 'Testing Environment', desc: 'Robust sandbox to simulate edge cases safely.' }
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--text-primary)]">{item.title}</h4>
                  <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex gap-4">
             <button className="btn-secondary">Read the Docs</button>
             <button className="text-[var(--text-secondary)] font-semibold flex items-center gap-2 hover:text-[var(--text-primary)]">
               <div className="w-8 h-8 rounded-full border border-[var(--border-light)] flex items-center justify-center"><Play size={12}/></div>
               Watch Demo
             </button>
          </div>
        </motion.div>
        
        <motion.div {...fadeUp} className="ui-mockup bg-[#0D1117] border-slate-800 text-slate-300 font-mono text-sm leading-relaxed p-6 h-full min-h-[400px]">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
            <div className="flex gap-4 text-xs font-semibold">
              <span className="text-white border-b-2 border-blue-500 pb-4">cURL</span>
              <span className="text-slate-500">Node.js</span>
              <span className="text-slate-500">Python</span>
            </div>
            <div className="text-xs text-slate-500">Copied!</div>
          </div>
          
          <div className="text-pink-400">curl <span className="text-slate-300">-X POST</span> https://api.lexlfpiorpi.com/v1/businesses \\</div>
          <div className="pl-4 text-slate-300">-H <span className="text-green-300">"Authorization: Bearer sk_live_..."</span> \\</div>
          <div className="pl-4 text-slate-300">-H <span className="text-green-300">"Content-Type: application/json"</span> \\</div>
          <div className="pl-4 text-slate-300">-d <span className="text-yellow-300">'{'{'}</span></div>
          <div className="pl-8 text-blue-300">"tax_id"<span className="text-slate-300">: </span><span className="text-green-300">"DIN180214XX9"</span>,</div>
          <div className="pl-8 text-blue-300">"name"<span className="text-slate-300">: </span><span className="text-green-300">"Desarrolladora Inmobiliaria..."</span>,</div>
          <div className="pl-8 text-blue-300">"perform_screening"<span className="text-slate-300">: </span><span className="text-orange-300">true</span></div>
          <div className="pl-4 text-yellow-300">{'}'}'</div>
          
          <div className="mt-6 pt-4 border-t border-slate-800 text-slate-500">
            {"// Response"}
          </div>
          <div className="text-yellow-300">{'{'}</div>
          <div className="pl-4 text-blue-300">"id"<span className="text-slate-300">: </span><span className="text-green-300">"bus_9182hf81"</span>,</div>
          <div className="pl-4 text-blue-300">"verification_status"<span className="text-slate-300">: </span><span className="text-green-300">"verified"</span>,</div>
          <div className="pl-4 text-blue-300">"risk_profile"<span className="text-slate-300">: </span>{'{'} ... {'}'}</div>
          <div className="text-yellow-300">{'}'}</div>

        </motion.div>
      </div>
    </section>
  );
}
"""

with open("src/components/Sections.tsx", "w") as f:
    f.write(sections_content)

