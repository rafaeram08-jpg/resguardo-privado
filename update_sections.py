import os

sections_content = """import React from 'react';
import { ShieldCheck, Search, Database, Fingerprint, Lock, CheckCircle2, ChevronRight, AlertTriangle, FileText, Globe } from 'lucide-react';
import { motion } from 'motion/react';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" as any }
};

export function FeaturesGrid() {
  return (
    <section className="section-padding relative z-10" id="soluciones">
      <div className="max-w-[80rem] mx-auto">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Protección Multicapa Integral</h2>
          <p className="text-xl text-slate-600 text-balance">
            Nuestra plataforma unifica la verificación de identidad, el monitoreo continuo y la generación de reportes regulatorios en una sola experiencia fluida.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <motion.div {...fadeUp} className="saas-card col-span-1 md:col-span-2 bg-gradient-to-br from-white to-blue-50/50 p-8 md:p-12">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-inner shadow-white">
              <Search size={32} />
            </div>
            <h3 className="text-3xl font-bold mb-4">Verificación KYC y KYB Avanzada</h3>
            <p className="text-slate-600 text-lg mb-8 max-w-lg">
              Extraemos, validamos y cruzamos información de Constancias de Situación Fiscal, Identificaciones Oficiales y Actas Constitutivas en tiempo real.
            </p>
            <ul className="space-y-3">
              {['Extracción OCR de Alta Precisión', 'Validación de Listas Nominales (INE)', 'Consulta directa al SAT'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-medium text-slate-800">
                  <CheckCircle2 className="text-emerald-500" size={20}/> {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" as any }} className="saas-card bg-gradient-to-br from-white to-indigo-50/50 p-8 md:p-12">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-8">
              <Globe size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Monitoreo OFAC y ONU</h3>
            <p className="text-slate-600">
              Escaneo diario automático contra listas restrictivas internacionales y nacionales para prevenir financiamiento al terrorismo.
            </p>
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" as any }} className="saas-card bg-gradient-to-br from-white to-emerald-50/50 p-8 md:p-12">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-8">
              <Fingerprint size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Beneficiario Controlador</h3>
            <p className="text-slate-600">
              Despliega estructuras corporativas complejas para llegar a la persona física final, cumpliendo con las últimas reformas fiscales.
            </p>
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" as any }} className="saas-card col-span-1 md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 md:p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/10 text-blue-400 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md">
                <Database size={32} />
              </div>
              <h3 className="text-3xl font-bold mb-4">Avisos SAT SPPLD Automatizados</h3>
              <p className="text-slate-300 text-lg mb-8 max-w-lg">
                Se acabaron los XML manuales. Conectamos tu facturación y generamos los avisos en el formato exacto requerido por el portal del SAT.
              </p>
              <div className="bg-black/40 border border-white/10 rounded-xl p-6 font-mono text-sm">
                <div className="text-emerald-400 mb-2">// Payload Validado XSD</div>
                <div className="text-blue-300">&lt;Operacion&gt;</div>
                <div className="text-white pl-4">&lt;Fecha&gt;<span className="text-amber-300">2026-08-18</span>&lt;/Fecha&gt;</div>
                <div className="text-white pl-4">&lt;InstrumentoPago&gt;<span className="text-amber-300">Transferencia</span>&lt;/InstrumentoPago&gt;</div>
                <div className="text-blue-300">&lt;/Operacion&gt;</div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export function DetailedInfo() {
  return (
    <section className="section-padding bg-white relative z-10">
      <div className="max-w-[80rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div {...fadeUp}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 border border-rose-200 text-rose-700 font-semibold text-sm mb-6">
             <AlertTriangle size={16} /> Artículo 69-B
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-6">Prevención total de EFOS y EDOS.</h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Hacer negocios con Empresas que Facturan Operaciones Simuladas (EFOS) puede ser letal para tu empresa. LexLFPIORPI revisa diariamente el Diario Oficial de la Federación.
          </p>
          <div className="space-y-6">
            <div className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center shrink-0">
                <FileText className="text-blue-600" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg">Alertas Tempranas</h4>
                <p className="text-slate-600">Notificaciones automáticas si un cliente entra en el listado preventivo o definitivo del SAT.</p>
              </div>
            </div>
            <div className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center shrink-0">
                <Lock className="text-indigo-600" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg">Bloqueo Preventivo</h4>
                <p className="text-slate-600">Integración vía API para pausar transacciones antes de que se consoliden.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div {...fadeUp} className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 rounded-3xl transform rotate-3 opacity-20 blur-lg"></div>
          <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl p-8 relative z-10">
            <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-6">
              <h3 className="font-bold text-xl">Monitor de Riesgo</h3>
              <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Actualizado Hoy
              </div>
            </div>
            <div className="space-y-4 font-mono text-sm">
              {[
                { label: 'STATUS_69B', val: 'Limpio', color: 'text-emerald-600' },
                { label: 'COINCIDENCIA_OFAC', val: 'Ninguna', color: 'text-emerald-600' },
                { label: 'NIVEL_RIESGO', val: 'Medio', color: 'text-amber-600' },
                { label: 'UMBRAL_AVISO', val: '$832,513 / $850,000 MXN', color: 'text-blue-600' }
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors">
                  <span className="text-slate-500">{row.label}</span>
                  <span className={`font-bold ${row.color}`}>{row.val}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
"""

with open("src/components/Sections.tsx", "w") as f:
    f.write(sections_content)

scene_content = """import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Icosahedron, Sphere, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function Core() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <Icosahedron ref={meshRef} args={[1, 0]} scale={1.8}>
        <meshPhysicalMaterial 
          color="#3b82f6" 
          roughness={0.1} 
          metalness={0.8} 
          transmission={0.5} 
          thickness={0.5}
          wireframe={true}
        />
      </Icosahedron>
      
      {/* Inner glowing sphere */}
      <Sphere args={[1, 32, 32]} scale={1.2}>
         <MeshDistortMaterial
            color="#8b5cf6"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0}
          />
      </Sphere>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <div className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#3b82f6" />
        
        <Core />
        
        <Sparkles count={100} scale={8} size={2} speed={0.4} opacity={0.5} color="#6366f1" />
        
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
"""

with open("src/components/Scene3D.tsx", "w") as f:
    f.write(scene_content)
