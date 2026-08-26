with open("src/components/Sections.tsx", "r") as f:
    content = f.read()

new_content = """import React from 'react';
import { motion } from 'motion/react';
import { Users, FileSearch, Fingerprint, ShieldCheck, Database, Check, AlertTriangle, Briefcase, FileSignature } from 'lucide-react';

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
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Infraestructura completa para Prevención de Lavado de Dinero</h2>
        <p className="text-lg text-[var(--text-secondary)] text-balance">
          Cumplir con la Ley Federal para la Prevención e Identificación de Operaciones con Recursos de Procedencia Ilícita (LFPIORPI) nunca fue tan intuitivo. Nuestra API y Dashboard gestionan todo el ciclo de vida del sujeto obligado.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="saas-card p-8 col-span-1 md:col-span-2 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
              <FileSearch size={28} />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Integración SPPLD Automatizada</h3>
            <p className="text-[var(--text-secondary)] mb-6 max-w-lg text-balance text-lg">Gestiona tu alta y designación de Responsable de Cumplimiento sin perder tiempo. Sincronización directa y validación criptográfica de acuses del SAT.</p>
            <ul className="space-y-2 mt-4">
              <li className="flex items-center gap-2 text-sm font-medium"><Check size={16} className="text-emerald-500"/> Acuses encriptados</li>
              <li className="flex items-center gap-2 text-sm font-medium"><Check size={16} className="text-emerald-500"/> Renovación de certificados FIEL</li>
            </ul>
          </div>
        </motion.div>

        <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="saas-card p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all"></div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-4">Manuales de Prevención</h3>
            <p className="text-[var(--text-secondary)] text-balance">Generación dinámica de manuales PLD adaptados a los umbrales específicos de tu sector (UMAs actualizadas 2025).</p>
          </div>
        </motion.div>

        <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="saas-card p-8 relative overflow-hidden group">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl group-hover:bg-violet-500/20 transition-all"></div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-violet-500/30">
              <Fingerprint size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-4">KYC Biométrico y Documental</h3>
            <p className="text-[var(--text-secondary)] text-balance">Validación de INE/Pasaporte, comprobantes de domicilio y constancias de situación fiscal en tiempo real.</p>
          </div>
        </motion.div>

        <motion.div {...fadeUp} transition={{ delay: 0.4 }} className="saas-card p-8 col-span-1 md:col-span-2 relative overflow-hidden group flex flex-col justify-between">
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all"></div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/30">
              <Database size={28} />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Auditoría y Generación de Avisos</h3>
            <p className="text-[var(--text-secondary)] max-w-lg text-balance text-lg">
              Evita multas millonarias. Nuestro motor cruza tu facturación CFDI 4.0 con los umbrales de LFPIORPI para alertarte exactamente cuándo y cómo presentar tus avisos a la UIF.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export function Capas() {
  return (
    <section className="section-padding bg-[var(--bg-surface-solid)] relative z-10 border-y border-[var(--border-light)]" id="tecnologia">
      <div className="max-w-[80rem] mx-auto text-center">
        <motion.div {...fadeUp} className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Protección Multicapa</h2>
          <p className="text-lg text-[var(--text-secondary)] text-balance max-w-2xl mx-auto">
            El marco legal mexicano exige estricto control sobre el Beneficiario Controlador y listas restrictivas.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
              <AlertTriangle size={32} />
            </div>
            <h4 className="text-xl font-bold mb-3">Listas Negras y OFAC</h4>
            <p className="text-[var(--text-secondary)]">Búsqueda continua en listas de la ONU, OFAC, y el Artículo 69-B del CFF (Empresas Fantasma).</p>
          </motion.div>
          
          <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
              <Briefcase size={32} />
            </div>
            <h4 className="text-xl font-bold mb-3">Beneficiario Controlador</h4>
            <p className="text-[var(--text-secondary)]">Mapeo de estructuras corporativas complejas para identificar a la persona física final detrás de cada operación.</p>
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-violet-50 flex items-center justify-center text-violet-600 mb-6">
              <FileSignature size={32} />
            </div>
            <h4 className="text-xl font-bold mb-3">Retención Documental</h4>
            <p className="text-[var(--text-secondary)]">Cumplimos con la obligación de retención de 5 años bajo estándares de encriptación bancaria y sellos de tiempo NOM-151.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Proceso() {
  return (
    <section className="section-padding relative z-10" id="recursos">
      <div className="max-w-[80rem] mx-auto">
        <motion.div {...fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-6">
              <Zap size={14} className="fill-blue-700" />
              REST API & Webhooks
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Diseñada para desarrolladores y oficiales de cumplimiento</h2>
            <p className="text-lg text-[var(--text-secondary)] mb-8 text-balance">
              Integra flujos de validación directamente en tu onboarding existente o utiliza nuestro dashboard web para gestionar expedientes manualmente. Flexibilidad total para tu equipo.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                'Webhooks para alertas de cambios en nivel de riesgo', 
                'SDKs disponibles para Node.js, Python y Go', 
                'Ambiente de Sandbox para pruebas seguras'
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-3 text-[var(--text-primary)] font-medium">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  {text}
                </li>
              ))}
            </ul>
            <button className="btn-secondary">Leer la documentación de la API</button>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-[var(--color-cyan)] to-[var(--color-violet)] rounded-3xl opacity-20 blur-xl"></div>
            
            <motion.div 
              whileHover={{ rotateY: 5, rotateX: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative saas-card bg-white p-8 shadow-2xl"
              style={{ transformPerspective: 1000 }}
            >
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-[var(--border-light)]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600"><Users size={24}/></div>
                  <div>
                    <div className="font-bold text-lg text-slate-800">Verificación KYC</div>
                    <div className="text-sm text-slate-500 font-mono">req_8f72h3_x91</div>
                  </div>
                </div>
                <div className="bg-emerald-100 text-emerald-700 text-sm font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  Aprobado
                </div>
              </div>
              
              <div className="space-y-5 font-mono text-sm">
                <div className="flex justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
                  <span className="text-slate-500">status</span>
                  <span className="text-emerald-600 font-semibold">"verified"</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
                  <span className="text-slate-500">risk_level</span>
                  <span className="text-blue-600 font-semibold">"low"</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
                  <span className="text-slate-500">pep_match</span>
                  <span className="text-slate-800 font-semibold">false</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
                  <span className="text-slate-500">sat_69b_status</span>
                  <span className="text-emerald-600 font-semibold">"clean"</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
                  <span className="text-slate-500">last_updated</span>
                  <span className="text-slate-800 font-semibold">"2026-08-17T22:12:00Z"</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
"""

with open("src/components/Sections.tsx", "w") as f:
    f.write(new_content)
