import React from 'react';
import { motion } from 'motion/react';

interface NotFoundProps {
  onGoHome: () => void;
  key?: React.Key;
}

export default function NotFound({ onGoHome }: NotFoundProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={{
        minHeight: '75vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '120px 24px',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div className="wrap">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '28vw',
            fontWeight: 900,
            color: 'var(--verde)',
            opacity: 0.03,
            lineHeight: 1,
            pointerEvents: 'none',
            zIndex: -1,
            whiteSpace: 'nowrap'
          }}
        >
          404
        </motion.div>
        
        <h1 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 'clamp(4rem, 10vw, 8rem)',
          fontWeight: 800,
          color: 'var(--verde)',
          lineHeight: 1,
          marginBottom: '24px',
          letterSpacing: '-0.04em'
        }}>
          404
        </h1>
        <h2 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
          fontWeight: 700,
          color: 'var(--ink)',
          marginBottom: '20px'
        }}>
          Página no encontrada
        </h2>
        <p style={{
          color: 'var(--slate)',
          fontSize: '1.1rem',
          maxWidth: '520px',
          margin: '0 auto 48px auto',
          lineHeight: 1.65
        }}>
          Lo sentimos, la página que está buscando no existe o ha sido movida. Verifique la dirección web o regrese a nuestra página principal para continuar.
        </p>
        <button 
          className="btn" 
          onClick={onGoHome}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Volver al inicio
        </button>
      </div>
    </motion.div>
  );
}
