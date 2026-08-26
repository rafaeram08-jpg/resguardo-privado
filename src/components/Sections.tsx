import React from 'react';
import { Search, Globe, Fingerprint, Database, Check, Box, Cpu } from 'lucide-react';
import { motion } from 'motion/react';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: "easeOut" as any }
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
          
          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.0, ease: "easeOut" as any }} className="saas-card p-8 md:p-10 group bg-white">
            <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center mb-8 text-[#064E3B] group-hover:bg-[#064E3B] group-hover:text-white transition-colors">
              <Search size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-900">Extracción Constancias (CSF)</h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              Extracción OCR en tiempo real y validación directa contra los servidores del SAT. Obtenemos Régimen Fiscal y Código Postal en milisegundos.
            </p>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" as any }} className="saas-card p-8 md:p-10 group bg-white">
            <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center mb-8 text-[#064E3B] group-hover:bg-[#064E3B] group-hover:text-white transition-colors">
              <Globe size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-900">Listas Negras y Art. 69-B</h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              Monitoreo continuo contra EFOS (Empresas Fantasma), listas del SAT, OFAC y la ONU. Alertas por Webhook al instante si el estatus cambia.
            </p>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" as any }} className="saas-card p-8 md:p-10 group bg-white">
            <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center mb-8 text-[#064E3B] group-hover:bg-[#064E3B] group-hover:text-white transition-colors">
              <Fingerprint size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-900">Beneficiario Controlador</h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              Algoritmos diseñados para mapear Actas Constitutivas y estructuras corporativas, identificando al dueño real según las reformas fiscales mexicanas.
            </p>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" as any }} className="saas-card p-8 md:p-10 group bg-white">
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
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex items-center gap-3 text-slate-800 font-medium"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <Check size={14} className="text-[#064E3B]" />
                </div>
                {text}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" as any }} className="relative">
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
