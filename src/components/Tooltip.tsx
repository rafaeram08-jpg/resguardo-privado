import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
}

export default function Tooltip({ children, content }: TooltipProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className="ttip-wrap"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', display: 'inline-block', cursor: 'help' }}
    >
      <span style={{ borderBottom: '1px dashed rgba(217, 169, 74, 0.6)' }}>
        {children}
      </span>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginBottom: '10px',
              padding: '10px 14px',
              background: 'var(--ink)',
              border: '1px solid rgba(217, 169, 74, 0.3)',
              color: '#fff',
              fontSize: '0.8rem',
              fontWeight: 500,
              borderRadius: '6px',
              width: 'max-content',
              maxWidth: '260px',
              whiteSpace: 'normal',
              zIndex: 100,
              pointerEvents: 'none',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              lineHeight: 1.4,
              textAlign: 'center'
            }}
          >
            {content}
            {/* Little arrow at the bottom */}
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              marginLeft: '-6px',
              borderWidth: '6px',
              borderStyle: 'solid',
              borderColor: 'rgba(217, 169, 74, 0.3) transparent transparent transparent'
            }}></div>
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              marginLeft: '-5px',
              borderWidth: '5px',
              borderStyle: 'solid',
              borderColor: 'var(--ink) transparent transparent transparent',
              marginTop: '-1px'
            }}></div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
