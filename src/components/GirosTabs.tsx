import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { G } from '../data';

export default function GirosTabs() {
  const [active, setActive] = useState('vehiculos');
  const data = G[active];

  const tabs = [
    { k: 'vehiculos', l: 'Vehículos y camiones' },
    { k: 'joyeria', l: 'Joyería y metales' },
    { k: 'inmuebles', l: 'Inmuebles' },
    { k: 'prestamos', l: 'Préstamos y empeño' },
    { k: 'arte', l: 'Arte y blindaje' }
  ];

  return (
    <>
      <div className="tabs" role="tablist" aria-label="Giros">
        {tabs.map(t => (
          <button
            key={t.k}
            className="tb"
            role="tab"
            aria-selected={active === t.k}
            onClick={() => setActive(t.k)}
          >
            {active === t.k && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 rounded-full"
                style={{ background: 'var(--ink)', zIndex: -1 }}
                transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
              />
            )}
            <span style={{ position: 'relative', zIndex: 1 }}>{t.l}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="panel"
          role="tabpanel"
        >
          <h3>{data.t}</h3>
          <div className="b">{data.b}</div>
          <div className="pgrid">
            <div>
              <h4>Qué activa la obligación</h4>
              <ul>{data.d.map((x: string) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div>
              <h4>Riesgos típicos del giro</h4>
              <ul>{data.r.map((x: string) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div>
              <h4>Qué documentamos</h4>
              <ul>{data.q.map((x: string) => <li key={x}>{x}</li>)}</ul>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
