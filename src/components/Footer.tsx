import React from 'react';
import { ShieldCheck, Mail, FileText } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 px-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        <div className="lg:col-span-2">
           <div className="flex items-center gap-2 font-bold text-xl tracking-tight mb-6 text-white">
            <div className="w-8 h-8 rounded-lg bg-[#10B981] flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <ShieldCheck className="text-white" size={18} />
            </div>
            <span>Lex<span className="text-[#10B981]">LFPIORPI</span></span>
          </div>
          <p className="text-slate-400 max-w-sm text-sm leading-relaxed mb-6">
            Infraestructura moderna para equipos de cumplimiento oficial en México. Prevención inteligente de lavado de dinero y automatización fiscal (Art. 69-B del SAT).
          </p>
        </div>
        
        <div>
          <h4 className="font-bold text-white mb-6 text-sm">Producto</h4>
          <ul className="space-y-4 text-slate-400 text-sm font-medium">
            <li><a href="#" className="hover:text-[#10B981] transition-colors">Extracción de CSF</a></li>
            <li><a href="#" className="hover:text-[#10B981] transition-colors">Validación RFCs (69-B)</a></li>
            <li><a href="#" className="hover:text-[#10B981] transition-colors">Avisos XMLs SPPLD</a></li>
            <li><a href="#" className="hover:text-[#10B981] transition-colors">Monitoreo Continuo</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-white mb-6 text-sm">Recursos</h4>
          <ul className="space-y-4 text-slate-400 text-sm font-medium">
            <li><a href="#" className="hover:text-[#10B981] transition-colors">Documentación API</a></li>
            <li><a href="#" className="hover:text-[#10B981] transition-colors">Guía Ley Antilavado</a></li>
            <li><a href="#" className="hover:text-[#10B981] transition-colors">Blog de Cumplimiento</a></li>
            <li><a href="#" className="hover:text-[#10B981] transition-colors">Webinars y Talleres</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-white mb-6 text-sm">Empresa</h4>
          <ul className="space-y-4 text-slate-400 text-sm font-medium">
            <li><a href="#" className="hover:text-[#10B981] transition-colors">Acerca de nosotros</a></li>
            <li><a href="mailto:soporte@lexlfpiorpi.com" className="hover:text-[#10B981] transition-colors">Contacto Ventas</a></li>
            <li><a href="#" className="hover:text-[#10B981] transition-colors">Aviso de Privacidad</a></li>
            <li><a href="#" className="hover:text-[#10B981] transition-colors">Términos del Servicio</a></li>
          </ul>
        </div>
      </div>
      
      {/* Legal Disclaimer Section */}
      <div className="max-w-7xl mx-auto border-t border-slate-800 pt-8 pb-8">
        <h4 className="text-white font-semibold mb-3 text-sm">Aviso Legal (LFPIORPI)</h4>
        <p className="text-xs text-slate-500 leading-relaxed mb-6 max-w-4xl">
          LexLFPIORPI es una plataforma tecnológica independiente que facilita la gestión y estructuración de información administrativa. No somos una autoridad gubernamental ni un despacho jurídico. El envío de avisos al Portal SPPLD, la validación final de los umbrales de Actividades Vulnerables y el cumplimiento de las obligaciones establecidas en la Ley Federal para la Prevención e Identificación de Operaciones con Recursos de Procedencia Ilícita (LFPIORPI) son responsabilidad exclusiva del usuario y/o Responsable de Cumplimiento designado.
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-slate-500 text-xs text-center md:text-left">
          © {new Date().getFullYear()} LexLFPIORPI, S.A.P.I. de C.V. Todos los derechos reservados.
        </p>
        <div className="flex items-center gap-6 text-slate-500 text-xs">
          <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
          <a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a>
        </div>
      </div>
    </footer>
  );
}
