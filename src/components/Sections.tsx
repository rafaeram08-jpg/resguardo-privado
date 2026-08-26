import React from 'react';
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
