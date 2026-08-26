with open("src/components/GirosTabs.tsx", "r") as f:
    content = f.read()

new_content = """import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { G } from '../data';
import { ChevronRight, ArrowRight } from 'lucide-react';

export default function GirosTabs() {
  const [active, setActive] = useState('vehiculos');
  const data = G[active as keyof typeof G];

  const tabs = [
    { k: 'vehiculos', l: 'Comercialización de Vehículos' },
    { k: 'inmuebles', l: 'Desarrollo Inmobiliario' },
    { k: 'mutuos', l: 'Préstamos y Mutuos' },
    { k: 'arrendamiento', l: 'Arrendamiento de Inmuebles' },
    { k: 'joyas', l: 'Metales y Joyas' },
    { k: 'fe_publica', l: 'Servicios de Fe Pública' }
  ];

  return (
    <section className="section-padding bg-[var(--bg-page)] relative z-10" id="productos">
      <div className="max-w-[80rem] mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Reglas específicas por Actividad Vulnerable</h2>
          <p className="text-lg text-[var(--text-secondary)] text-balance">Nuestros flujos de validación se adaptan automáticamente a los umbrales de Identificación y Aviso estipulados en el Artículo 17 de la LFPIORPI para tu industria específica.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Tab List */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            {tabs.map(t => (
              <button
                key={t.k}
                onClick={() => setActive(t.k)}
                className={`px-5 py-4 text-left rounded-xl transition-all flex justify-between items-center text-sm font-semibold
                  ${active === t.k 
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm border border-blue-200 text-blue-700 scale-105 transform origin-left' 
                    : 'text-[var(--text-secondary)] hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-sm'
                  }`}
              >
                {t.l}
                {active === t.k && (
                  <motion.div layoutId="active-pill" className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md">
                    <ArrowRight size={16} />
                  </motion.div>
                )}
              </button>
            ))}
          </div>

          {/* Right Column: Tab Content */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
              >
                <div className="saas-card p-8 md:p-12 bg-white/80 backdrop-blur-xl">
                  <h3 className="text-3xl font-bold mb-6 text-slate-800 tracking-tight">{tabs.find(t=>t.k===active)?.l}</h3>
                  <p className="text-[var(--text-secondary)] text-lg mb-10 leading-relaxed text-balance">
                    {data.c}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-[var(--border-light)]">
                    <div>
                      <div className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-3 uppercase tracking-wider">
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></div>
                        </div>
                        Alerta Principal (Umbrales)
                      </div>
                      <p className="text-slate-600 text-base leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">{data.p}</p>
                    </div>
                    
                    <div>
                      <div className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-3 uppercase tracking-wider">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                        </div>
                        Requisitos Documentales
                      </div>
                      <ul className="space-y-3">
                        {data.d.map((item, i) => (
                          <li key={i} className="flex gap-3 text-slate-600 text-sm font-medium items-start">
                            <span className="text-emerald-500 mt-0.5"><ChevronRight size={16}/></span>
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
      </div>
    </section>
  );
}
"""

with open("src/components/GirosTabs.tsx", "w") as f:
    f.write(new_content)
