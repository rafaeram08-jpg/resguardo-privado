import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <Helmet>
        <title>Cargando... | LexLFPIORPI</title>
      </Helmet>
      
      <div className="relative">
        {/* Pulsing background rings */}
        <motion.div 
          className="absolute inset-0 rounded-2xl bg-emerald-500/20"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute inset-0 rounded-2xl bg-emerald-500/10"
          animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2, delay: 0.2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Logo Container */}
        <div className="relative z-10 w-16 h-16 rounded-2xl bg-[#10B981] flex items-center justify-center shadow-xl shadow-emerald-900/20">
          <ShieldCheck className="text-white" size={32} />
        </div>
      </div>
      
      <div className="mt-8 flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <span className="text-slate-900">Lex<span className="text-emerald-700">LFPIORPI</span></span>
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm font-medium text-slate-500 flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Estableciendo conexión segura...
        </motion.div>
      </div>
    </div>
  );
}
