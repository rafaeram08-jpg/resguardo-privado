import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "¿Qué es una Actividad Vulnerable según la LFPIORPI?",
    answer: "Son aquellas actividades económicas que, por su naturaleza, son susceptibles de ser utilizadas para operaciones con recursos de procedencia ilícita. Ejemplos incluyen el desarrollo inmobiliario, venta de vehículos, metales preciosos, obras de arte y servicios profesionales independientes. La ley exige identificar a los clientes y reportar ciertas transacciones."
  },
  {
    question: "¿Cuál es la diferencia entre el umbral de identificación y el de aviso?",
    answer: "El umbral de identificación obliga a la empresa a integrar un expediente completo (KYC) del cliente antes de realizar la operación. El umbral de aviso, que generalmente es un monto mayor, obliga adicionalmente a reportar dicha operación específica al Portal SPPLD del SAT en los tiempos marcados por la ley."
  },
  {
    question: "¿LexLFPIORPI envía los avisos automáticamente al SAT?",
    answer: "Nuestra plataforma automatiza el cálculo de umbrales, la estructuración de expedientes y genera el archivo XML con el layout oficial exacto. Sin embargo, por seguridad y responsabilidad legal, el Oficial de Cumplimiento debe descargar el XML y subirlo directamente al Portal SPPLD usando su FIEL."
  },
  {
    question: "¿Cómo monitorea el sistema el Artículo 69-B (Listas Negras)?",
    answer: "Nos conectamos en tiempo real con las publicaciones del Diario Oficial de la Federación (DOF) y bases de datos internacionales (OFAC, ONU). Si un RFC en tus expedientes cambia su estatus a EFOS (Empresa que Factura Operaciones Simuladas), el sistema bloquea transacciones preventivamente y envía una alerta vía Webhook."
  },
  {
    question: "¿Es segura la información y expedientes que subimos a la plataforma?",
    answer: "Absolutamente. Toda la información sensible y expedientes documentales se resguardan en bóvedas criptográficas bajo estrictos protocolos de encriptación (AES-256) y cumplen con los lineamientos de la Norma Oficial Mexicana NOM-151 para garantizar la inalterabilidad de los documentos electrónicos."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-padding bg-slate-50 border-t border-slate-200 relative overflow-hidden" id="faq">
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-6">
            <HelpCircle size={14} /> Preguntas Frecuentes
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900">
            Resuelve tus dudas sobre cumplimiento
          </h2>
          <p className="text-lg text-slate-600">
            Entendemos que la Ley Antilavado puede ser compleja. Aquí respondemos a las consultas más comunes de los Oficiales de Cumplimiento.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`saas-card bg-white border ${isOpen ? 'border-[#10B981]' : 'border-slate-200 hover:border-emerald-200'} rounded-2xl overflow-hidden transition-colors duration-300`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className={`font-semibold text-lg ${isOpen ? 'text-[#10B981]' : 'text-slate-800'}`}>
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-emerald-100 text-[#10B981]' : 'bg-slate-100 text-slate-400'}`}>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-slate-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
