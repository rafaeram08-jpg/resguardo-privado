import React from 'react';
import { ShieldCheck, Mail, FileText, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
      <div className="max-w-[80rem] mx-auto px-6">
        
        {/* Top Floating Card for Contact & Support - utilizing saas-card */}
        <div className="saas-card bg-white p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">¿Necesitas ayuda con tu integración?</h3>
            <p className="text-slate-600">Nuestro equipo de soporte técnico y legal está listo para ayudarte en cada paso.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
             <a href="mailto:soporte@lexlfpiorpi.com" className="btn-secondary whitespace-nowrap">
               <Mail size={18} className="mr-2 text-slate-500" />
               Soporte Técnico
             </a>
             <a href="mailto:ventas@lexlfpiorpi.com" className="btn-primary whitespace-nowrap">
               <Mail size={18} className="mr-2" />
               Contactar Ventas
             </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
             <div className="flex items-center gap-2 font-bold text-xl tracking-tight mb-6">
              <div className="w-8 h-8 rounded-lg bg-[#10B981] flex items-center justify-center shadow-md shadow-emerald-500/20">
                  <ShieldCheck className="text-white" size={18} />
              </div>
              <span className="text-slate-900">Lex<span className="text-[#10B981]">LFPIORPI</span></span>
            </div>
            <p className="text-slate-500 max-w-sm text-sm leading-relaxed mb-6">
              Infraestructura moderna para equipos de cumplimiento oficial en México. Prevención inteligente de lavado de dinero y automatización fiscal.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#10B981] hover:border-[#10B981] hover:bg-emerald-50 transition-all" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#10B981] hover:border-[#10B981] hover:bg-emerald-50 transition-all" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#10B981] hover:border-[#10B981] hover:bg-emerald-50 transition-all" aria-label="GitHub">
                <Github size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-sm">Producto</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              <li><a href="#" className="hover:text-[#10B981] transition-colors">Extracción de CSF</a></li>
              <li><a href="#" className="hover:text-[#10B981] transition-colors">Validación RFCs (69-B)</a></li>
              <li><a href="#" className="hover:text-[#10B981] transition-colors">Avisos XMLs SPPLD</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-sm">Recursos</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              <li><a href="#" className="hover:text-[#10B981] transition-colors">Documentación API</a></li>
              <li><a href="#" className="hover:text-[#10B981] transition-colors">Guía Ley Antilavado</a></li>
              <li><a href="#" className="hover:text-[#10B981] transition-colors">Centro de Ayuda</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-sm">Contacto</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-slate-400" />
                <span>soporte@lexlfpiorpi.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Legal Disclaimer Section mapped as a saas-card */}
        <div className="saas-card bg-white border-slate-200 p-6 mb-8 shadow-sm">
          <div className="flex items-start gap-4">
             <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
               <ShieldCheck size={20} className="text-slate-400" />
             </div>
             <div>
                <h4 className="text-slate-800 font-semibold mb-2 text-sm">Aviso Legal (LFPIORPI)</h4>
                <p className="text-xs text-slate-500 leading-relaxed max-w-5xl">
                  LexLFPIORPI es una plataforma tecnológica independiente que facilita la gestión y estructuración de información administrativa. No somos una autoridad gubernamental ni un despacho jurídico. El envío de avisos al Portal SPPLD, la validación final de los umbrales de Actividades Vulnerables y el cumplimiento de las obligaciones establecidas en la Ley Federal para la Prevención e Identificación de Operaciones con Recursos de Procedencia Ilícita (LFPIORPI) son responsabilidad exclusiva del usuario y/o Responsable de Cumplimiento designado.
                </p>
             </div>
          </div>
        </div>
        
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left font-medium">
            © {new Date().getFullYear()} LexLFPIORPI, S.A.P.I. de C.V. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6 text-slate-500 text-sm font-medium">
            <a href="#" className="hover:text-[#10B981] transition-colors flex items-center gap-2">
              <FileText size={16} /> Política de Privacidad
            </a>
            <a href="#" className="hover:text-[#10B981] transition-colors">Términos y Condiciones</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
