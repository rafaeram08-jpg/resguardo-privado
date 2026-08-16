import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface BreadcrumbsProps {
  currentTab: string;
  onNavigate: (tab: any) => void;
}

export default function Breadcrumbs({ currentTab, onNavigate }: BreadcrumbsProps) {
  const getTabLabel = (tab: string) => {
    switch (tab) {
      case 'calendario': return 'Calendario';
      case 'giro': return 'Su giro';
      case 'comparativa': return 'Comparativa';
      case 'diagnostico': return 'Autoevaluación';
      case 'honorarios': return 'Honorarios';
      case 'preguntas': return 'Preguntas y Glosario';
      case 'contacto': return 'Solicitar diagnóstico';
      case '404': return 'Página no encontrada';
      default: return tab;
    }
  };

  return (
    <AnimatePresence mode="wait">
      {currentTab !== 'inicio' && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="breadcrumbs" 
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '32px 40px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.9rem',
            fontWeight: 500,
            color: 'var(--slate)',
            position: 'relative',
            zIndex: 10
          }}
        >
          <button 
            onClick={() => { onNavigate('inicio'); window.scrollTo(0,0); }}
            style={{ 
              background: 'none', border: 'none', padding: 0, cursor: 'pointer', 
              color: 'var(--slate)', textDecoration: 'none', transition: 'color 0.2s',
              display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'inherit'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--verde)'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--slate)'}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Inicio
          </button>
          
          <span style={{ color: 'var(--line-2)' }}>/</span>
          
          <motion.span 
            key={currentTab}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            style={{ color: 'var(--ink)', fontWeight: 600 }}
          >
            {getTabLabel(currentTab)}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
