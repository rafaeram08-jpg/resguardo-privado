import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import GirosTabs from './components/GirosTabs';
import Quiz from './components/Quiz';
import Tooltip from './components/Tooltip';
import NotFound from './components/NotFound';
import Breadcrumbs from './components/Breadcrumbs';
import { Revision, Capas, Proceso, Requisitos } from './components/Sections';

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // Find the entry that is intersecting the most or simply the first one
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
          setActiveTab(entry.target.id);
        }
      });
    }, { threshold: [0.2, 0.5], rootMargin: '-10% 0px -50% 0px' });

    const sections = document.querySelectorAll('#top, #alcance, #comparativa, #calendario, #diagnostico, #entregables, #glosario, #contacto');
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [dias, setDias] = useState(0);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 
           (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  

  const { scrollY } = useScroll();
  const heroY1 = useTransform(scrollY, [0, 800], [0, 250]);
  const heroY2 = useTransform(scrollY, [0, 800], [0, -200]);

  // Lenis Smooth Scroll Effect
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync tab changes with layout recalcs
    const resizeObserver = new ResizeObserver(() => {
      // Lenis auto-resizes by default, but it's safe to keep the observer active.
    });
    resizeObserver.observe(document.body);

    return () => {
      lenis.destroy();
      resizeObserver.disconnect();
    };
  }, []);

  // Scroll Progress Effect
  useEffect(() => {
    // Force scroll reset when tab changes to avoid getting stuck midway
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeTab]);

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement;
      const p = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setScrollProgress(p);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  // Dynamic SEO Meta Tags per Section
  useEffect(() => {
    const seoData: Record<string, { title: string, desc: string }> = {
      'top': { 
        title: 'Resguardo | Cumplimiento LFPIORPI', 
        desc: 'Documentación de cumplimiento para negocios que realizan Actividades Vulnerables en México. Evite multas y asegure su continuidad.' 
      },
      'alcance': { 
        title: 'Giros Obligados | Resguardo', 
        desc: 'Conozca si su empresa se considera Actividad Vulnerable según el Artículo 17 de la LFPIORPI. Inmobiliarias, agencias, joyerías y más.' 
      },
      'comparativa': { 
        title: 'Alternativas de Cumplimiento | Resguardo', 
        desc: 'Comparamos las diferentes formas de cumplir con la Ley Antilavado: desde no hacer nada hasta contratar especialistas o software.' 
      },
      'calendario': { 
        title: 'Fechas Clave SAT | Resguardo', 
        desc: 'Las fechas críticas de la LFPIORPI. Conozca cuándo debe entregar su Manual de Políticas Internas y Metodología de Evaluación de Riesgos.' 
      },
      'diagnostico': { 
        title: 'Diagnóstico LFPIORPI | Resguardo', 
        desc: 'Evalúe el nivel de cumplimiento de su negocio en solo dos minutos con nuestro cuestionario interactivo y confidencial.' 
      },
      'entregables': { 
        title: 'Alcance y Honorarios | Resguardo', 
        desc: 'Transparencia en nuestros entregables y costos. Conozca el detalle del Manual de Políticas y la Metodología de Evaluación de Riesgos.' 
      },
      'glosario': { 
        title: 'Glosario Antilavado | Resguardo', 
        desc: 'Términos clave sobre cumplimiento normativo, UIF, SAT y Prevención de Lavado de Dinero explicados de forma sencilla.' 
      },
      'contacto': { 
        title: 'Solicitar Diagnóstico | Resguardo', 
        desc: 'Hablemos 15 minutos sin costo. Evaluamos si su giro entra en el alcance de la ley y determinamos cómo podemos ayudarle a cumplir.' 
      }
    };

    const currentSeo = seoData[activeTab] || seoData['top'];
    
    // Update Title
    document.title = currentSeo.title;
    
    // Helper to update meta tags
    const updateMeta = (nameAttr: string, nameValue: string, content: string) => {
      let el = document.querySelector(`meta[${nameAttr}="${nameValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(nameAttr, nameValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMeta('name', 'description', currentSeo.desc);
    updateMeta('property', 'og:title', currentSeo.title);
    updateMeta('property', 'og:description', currentSeo.desc);
    
    // Update URL Hash for shareability (optional but good for SEO)
    if (activeTab && activeTab !== 'top') {
      window.history.replaceState(null, '', `#${activeTab}`);
    } else {
      window.history.replaceState(null, '', window.location.pathname);
    }
    
  }, [activeTab]);

  // Intersection Observer Effect
  useEffect(() => {
    const ob = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('on');
          ob.unobserve(e.target);
        }
      });
    }, { threshold: 0.05 });
    document.querySelectorAll('.rv').forEach(n => ob.observe(n));
    return () => ob.disconnect();
  }, []);

  // Timeline Progress Effect
  useEffect(() => {
    const ini = new Date(2025, 6, 16);
    const meta = new Date(2027, 2, 1);
    const fin = new Date(2028, 11, 31);
    const hoy = new Date();

    const pct = Math.min(100, Math.max(0, ((hoy.getTime() - ini.getTime()) / (fin.getTime() - ini.getTime())) * 100));
    const pctW = Math.min(100, Math.max(0, ((hoy.getTime() - ini.getTime()) / (meta.getTime() - ini.getTime())) * 100));

    const timeout = setTimeout(() => {
      const a = document.getElementById('avance');
      const h = document.getElementById('hoy');
      const wb = document.getElementById('wbar');
      if (a) a.style.width = pct.toFixed(1) + '%';
      if (h) h.style.left = pct.toFixed(1) + '%';
      if (wb) wb.style.width = pctW.toFixed(1) + '%';
    }, 340);
    
    return () => clearTimeout(timeout);
  }, []);

  // Days Counter Effect
  useEffect(() => {
    const meta = new Date(2027, 2, 1);
    const hoy = new Date();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targetDias = Math.max(0, Math.ceil((meta.getTime() - hoy.getTime()) / 86400000));

    if (reduce) {
      setDias(targetDias);
    } else {
      let s: number | null = null;
      let reqId: number;
      const animate = (t: number) => {
        if (!s) s = t;
        const k = Math.min((t - s) / 1100, 1);
        const e = 1 - Math.pow(1 - k, 3);
        setDias(Math.round(targetDias * e));
        if (k < 1) reqId = requestAnimationFrame(animate);
      };
      reqId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(reqId);
    }
  }, []);

  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({ nombre: '', empresa: '', telefono: '', correo: '', giro: '', situacion: '', consentimiento: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
    // Clear error on change
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
    setFormStatus('idle');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const errors: Record<string, string> = {};
    if (!formData.nombre.trim()) errors.nombre = 'El nombre es obligatorio';
    if (!formData.empresa.trim()) errors.empresa = 'La empresa es obligatoria';
    if (!formData.telefono.trim() || formData.telefono.length < 10) errors.telefono = 'Ingrese un teléfono válido de 10 dígitos';
    if (!formData.correo.trim() || !/^\S+@\S+\.\S+$/.test(formData.correo)) errors.correo = 'Ingrese un correo electrónico válido';
    if (!formData.giro) errors.giro = 'Seleccione su giro';
    if (!formData.consentimiento) errors.consentimiento = 'Debe aceptar los términos';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setFormStatus('error');
      return;
    }

    setFormStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ nombre: '', empresa: '', telefono: '', correo: '', giro: '', situacion: '', consentimiento: false });
    }, 1500);
  };

  return (
    <>
      <div className="prog" style={{ width: `${scrollProgress}%` }}></div>

      
      <nav className="nav">
        <div className="nav-in">
          <button className="logo" onClick={() => { document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
            <span className="mk">
              <svg viewBox="0 0 24 24"><path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z" /></svg>
            </span>
            <span className="lg-t">Resguardo</span>
          </button>
          <div className="nav-l">
            <button onClick={() => document.getElementById('calendario')?.scrollIntoView({ behavior: 'smooth' })} className={activeTab === 'calendario' ? 'active-tab' : ''}>Calendario</button>
            <button onClick={() => document.getElementById('alcance')?.scrollIntoView({ behavior: 'smooth' })} className={activeTab === 'alcance' ? 'active-tab' : ''}>Su giro</button>
            <button onClick={() => document.getElementById('comparativa')?.scrollIntoView({ behavior: 'smooth' })} className={activeTab === 'comparativa' ? 'active-tab' : ''}>Comparativa</button>
            <button onClick={() => document.getElementById('diagnostico')?.scrollIntoView({ behavior: 'smooth' })} className={activeTab === 'diagnostico' ? 'active-tab' : ''}>Autoevaluación</button>
            <button onClick={() => document.getElementById('entregables')?.scrollIntoView({ behavior: 'smooth' })} className={activeTab === 'entregables' ? 'active-tab' : ''}>Honorarios</button>
            <button onClick={() => document.getElementById('glosario')?.scrollIntoView({ behavior: 'smooth' })} className={activeTab === 'glosario' ? 'active-tab' : ''}>Preguntas</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              onClick={toggleTheme} 
              aria-label="Alternar modo oscuro"
              style={{ 
                background: 'none', border: 'none', cursor: 'pointer', 
                color: 'var(--slate)', display: 'flex', alignItems: 'center', 
                justifyContent: 'center', padding: '6px', transition: 'color 0.2s' 
              }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--verde)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--slate)'}
            >
              {theme === 'light' ? (
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              ) : (
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              )}
            </button>
            <button onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })} className="btn btn-sm">Solicitar diagnóstico</button>
            <button onClick={() => setIsMobileMenuOpen(true)} className="hamburger" aria-label="Abrir menú">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div 
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            >
              <button className="close-menu" onClick={() => setIsMobileMenuOpen(false)}>
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '32px' }}>
                <button onClick={() => { setIsMobileMenuOpen(false); document.getElementById('calendario')?.scrollIntoView({ behavior: 'smooth' }); }} className={activeTab === 'calendario' ? 'active-tab' : ''}>Calendario</button>
                <button onClick={() => { setIsMobileMenuOpen(false); document.getElementById('alcance')?.scrollIntoView({ behavior: 'smooth' }); }} className={activeTab === 'alcance' ? 'active-tab' : ''}>Su giro</button>
                <button onClick={() => { setIsMobileMenuOpen(false); document.getElementById('comparativa')?.scrollIntoView({ behavior: 'smooth' }); }} className={activeTab === 'comparativa' ? 'active-tab' : ''}>Comparativa</button>
                <button onClick={() => { setIsMobileMenuOpen(false); document.getElementById('diagnostico')?.scrollIntoView({ behavior: 'smooth' }); }} className={activeTab === 'diagnostico' ? 'active-tab' : ''}>Autoevaluación</button>
                <button onClick={() => { setIsMobileMenuOpen(false); document.getElementById('entregables')?.scrollIntoView({ behavior: 'smooth' }); }} className={activeTab === 'entregables' ? 'active-tab' : ''}>Honorarios</button>
                <button onClick={() => { setIsMobileMenuOpen(false); document.getElementById('glosario')?.scrollIntoView({ behavior: 'smooth' }); }} className={activeTab === 'glosario' ? 'active-tab' : ''}>Preguntas</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>


            <header className="hero" id="top">
        <motion.div 
          className="wrap hero-in"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
              }
            }
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <motion.span 
              className="tag d"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
              }}
            >
              <i></i>Actividades Vulnerables · LFPIORPI
            </motion.span>
            
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
              }}
            >
              Cumplir no basta. Hay que <em>poder demostrarlo</em>.
            </motion.h1>
            
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
              }}
            >
              A partir del 1 de marzo de 2027 el SAT puede pedirle su Manual de Políticas Internas y su Metodología de Evaluación de Riesgos. Y usted tiene que entregarlos ese día.
            </motion.p>
            
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
              }}
            >
              Redactamos ambos documentos para su giro, armamos la carpeta de evidencia y capacitamos a su personal. <strong>No vendemos software: escribimos lo que ningún software escribe.</strong>
            </motion.p>
            
            <motion.div 
              className="hero-btns"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
              }}
            >
              <button onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })} className="btn">Solicitar diagnóstico</button>
              <button onClick={() => document.getElementById('entregables')?.scrollIntoView({ behavior: 'smooth' })} className="btn btn-gh">Alcance y honorarios</button>
            </motion.div>
            
            <motion.p 
              className="hero-mini"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
              }}
            >
              Diagnóstico en una semana con precio cerrado. Si no encontramos ningún faltante, no se cobra.
            </motion.p>
          </div>

          <motion.aside 
            className="widget"
            variants={{
              hidden: { opacity: 0, scale: 0.95, y: 20 },
              show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
            }}
          >
            <div className="widget-in">
              <div className="w-top">
                <span className="w-lbl">Tiempo restante</span>
                <span className="w-dot"><i></i>En curso</span>
              </div>
              <div className="num">{dias.toLocaleString('es-MX')}</div>
              <div className="num-u">días naturales</div>
              <div className="w-bar"><i id="wbar"></i></div>
              <div className="w-bar-l"><span>Jul 2025</span><span>Mar 2027</span></div>
              <div className="w-sep"></div>
              <div className="w-f">1 de marzo de 2027</div>
              <p className="w-d">Fecha en que el Manual de Políticas Internas y la Metodología de Evaluación de Riesgos deben estar listos y disponibles para la autoridad.</p>
            </div>
          </motion.aside>
        </motion.div>

        <div className="banda">
          <div className="wrap">
            <div className="banda-in">
              <div className="bd"><b>17</b><span><Tooltip content="Catalogadas exhaustivamente por la ley como susceptibles al lavado de dinero.">Actividades Vulnerables</Tooltip> definidas en el Artículo 17</span></div>
              <div className="bd"><b>10 años</b><span><Tooltip content="Plazo obligatorio de resguardo para expedientes e información del cliente.">Plazo de conservación</Tooltip> de expedientes, antes eran cinco</span></div>
              <div className="bd"><b>24 horas</b><span>Plazo para el <Tooltip content="Reporte inmediato a la UIF cuando se detecta una operación sospechosa o ilícita.">aviso urgente</Tooltip> por operación sospechosa</span></div>
              <div className="bd"><b>2028</b><span>Primer ejercicio sujeto a <Tooltip content="Revisión externa anual obligatoria que certifica el nivel de cumplimiento normativo.">auditoría anual obligatoria</Tooltip></span></div>
            </div>
          </div>
        </div>
      </header>

      <section className="franja">
        <div className="wrap">
          <div className="fr-cab">
            <h2>Usted está aquí</h2>
            <p>El régimen no entró de golpe. Estas son las cinco fechas que importan y dónde nos encontramos hoy.</p>
          </div>
          <div className="stepper">
            <div className="hoy" id="hoy"><b>Hoy</b><i></i></div>
            <div className="riel"><i id="avance"></i></div>
            <div className="hitos">
              <div className="hito"><b>Jul 2025</b><span>Reforma a la ley</span></div>
              <div className="hito"><b>Ago 2026</b><span>Reglas de Carácter General publicadas</span></div>
              <div className="hito"><b>Nov 2026</b><span>Entrada en vigor general</span></div>
              <div className="hito k"><b>Mar 2027</b><span>Manual y Metodología exigibles</span></div>
              <div className="hito"><b>2028</b><span>Primera auditoría anual</span></div>
            </div>
          </div>
        </div>
      </section>

      
        <section className="sec rv" id="alcance">
          <div className="wrap">
            <div className="cab">
              <span className="tag">Alcance</span>
              <h2>Su giro y lo que le aplica</h2>
              <p>El Artículo 17 de la LFPIORPI define diecisiete Actividades Vulnerables. Estas son las que atendemos. El umbral lo marca la operación, no el tamaño del negocio: un lote con tres empleados queda igual de obligado que una distribuidora nacional.</p>
            </div>
            <GirosTabs />
          </div>
        </section>
        <Revision />


                  <div className="wrap" style={{ textAlign: 'center', padding: '60px 0 80px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>¿Aplica a su giro?</h2>
          <button onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })} className="btn">Solicitar diagnóstico</button>
        </div>
          
        <section className="sec rv" id="comparativa">
          <div className="wrap">
            <div className="cab">
              <span className="tag">Comparativa</span>
              <h2>Cuatro caminos, y lo que resuelve cada uno</h2>
              <p>Antes de contratar a nadie conviene ver qué cubre realmente cada opción. Incluida la de no hacer nada.</p>
            </div>
            <div className="tabla">
              <div className="tw">
                <table>
                  <thead>
                    <tr>
                      <th>Necesidad</th>
                      <th>No hacer nada</th>
                      <th>Software PLD</th>
                      <th>Despacho contable</th>
                      <th className="hl">Resguardo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Manual de Políticas Internas redactado para su giro</td>
                      <td><span className="no">No</span></td>
                      <td><span className="no">No</span></td>
                      <td>A veces, genérico</td>
                      <td className="hl"><span className="si">Sí</span></td>
                    </tr>
                    <tr>
                      <td>Metodología de riesgo documentada y ponderada</td>
                      <td><span className="no">No</span></td>
                      <td><span className="no">No</span></td>
                      <td>Rara vez</td>
                      <td className="hl"><span className="si">Sí</span></td>
                    </tr>
                    <tr>
                      <td>Alertas y monitoreo transaccional diario</td>
                      <td><span className="no">No</span></td>
                      <td><span className="si">Sí</span></td>
                      <td><span className="no">No</span></td>
                      <td className="hl">No, se recomienda proveedor</td>
                    </tr>
                    <tr>
                      <td>Presentación de avisos ante el SAT</td>
                      <td><span className="no">No</span></td>
                      <td>Genera el archivo</td>
                      <td><span className="si">Sí</span></td>
                      <td className="hl">No, lo hace usted</td>
                    </tr>
                    <tr>
                      <td>Capacitación anual con constancia</td>
                      <td><span className="no">No</span></td>
                      <td><span className="no">No</span></td>
                      <td>Rara vez</td>
                      <td className="hl"><span className="si">Sí</span></td>
                    </tr>
                    <tr>
                      <td>Carpeta de evidencia lista para revisión</td>
                      <td><span className="no">No</span></td>
                      <td>Parcial</td>
                      <td>Parcial</td>
                      <td className="hl"><span className="si">Sí</span></td>
                    </tr>
                    <tr>
                      <td>Costo típico</td>
                      <td>Cero hasta la multa</td>
                      <td>Suscripción mensual</td>
                      <td>Incluido en iguala</td>
                      <td className="hl">Precio cerrado por etapa</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <p className="nota">Las columnas de software y despacho describen lo que típicamente incluye cada servicio, no a un proveedor en particular. La recomendación honesta en muchos casos es combinar: software para la operación diaria, nosotros para la parte documental.</p>
          </div>
        </section>

        <Capas />
        <section className="sec sec-mist rv" id="mitos">
          <div className="wrap">
            <div className="cab">
              <span className="tag">Malentendidos comunes</span>
              <h2>Lo que se cree y lo que dice la norma</h2>
              <p>Tres ideas que escuchamos seguido y que le pueden costar caro en una revisión.</p>
            </div>
            <div className="mitos">
              <div className="mito">
                <div className="m1"><span>Lo que se cree</span><p>“Como no manejamos efectivo, esto no nos aplica.”</p></div>
                <div className="m2"><span>Lo que dice la norma</span><p>La obligación nace de la actividad y del monto de la operación, no de la forma de pago. Una transferencia por arriba del umbral genera las mismas obligaciones de identificación y aviso que el efectivo.</p></div>
              </div>
              <div className="mito">
                <div className="m1"><span>Lo que se cree</span><p>“Ya tenemos un manual, lo bajamos de internet.”</p></div>
                <div className="m2"><span>Lo que dice la norma</span><p>El manual debe reflejar la operación real del negocio y venir acompañado de una metodología de riesgo propia. Un documento genérico acredita conocimiento de la obligación sin haberla cumplido.</p></div>
              </div>
              <div className="mito">
                <div className="m1"><span>Lo que se cree</span><p>“Mi contador presenta los avisos, con eso basta.”</p></div>
                <div className="m2"><span>Lo que dice la norma</span><p>Presentar avisos es una obligación entre varias. También hay que tener manual, metodología documentada, expedientes integrados, capacitación acreditada y evidencia de todo lo anterior.</p></div>
              </div>
            </div>
          </div>
        </section>



                  <div className="wrap" style={{ textAlign: 'center', padding: '60px 0 80px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>Asegure su cumplimiento</h2>
          <button onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })} className="btn">Solicitar diagnóstico</button>
        </div>
          
        <section className="sec sec-mist rv" id="calendario">
          <div className="wrap">
            <div className="cab">
              <span className="tag">Calendario</span>
              <h2>Qué se vuelve exigible y cuándo</h2>
              <p>Las obligaciones entran de forma escalonada. Esto determina en qué orden hay que trabajar y qué se puede posponer sin riesgo.</p>
            </div>
            <div className="cal">
              <div className="cr"><div className="cr-f">16 jul 2025<span>Vigente</span></div><div><h3>Reforma a la LFPIORPI</h3><p>Cambia la arquitectura de obligaciones. Entre otras cosas, la conservación de expedientes pasa de cinco a diez años.</p></div></div>
              <div className="cr"><div className="cr-f">27 mar 2026<span>Vigente</span></div><div><h3>Reforma al Reglamento</h3><p>Aterriza la auditoría periódica, la acumulación de operaciones y la verificación contra bases de datos del SAT.</p></div></div>
              <div className="cr"><div className="cr-f">7 ago 2026<span>Publicado</span></div><div><h3>Reglas de Carácter General</h3><p>Reforman las reglas vigentes desde 2013. Es la pieza que vuelve operativas las obligaciones y fija el calendario que sigue.</p></div></div>
              <div className="cr"><div className="cr-f">30 nov 2026<span>Próximo</span></div><div><h3>Entrada en vigor general</h3><p>Surten efectos las reglas reformadas, salvo lo que los artículos transitorios difieren a 2027 y 2028.</p></div></div>
              <div className="cr k"><div className="cr-f">1 mar 2027<span>Aquí entramos</span></div><div><h3>Manual y Metodología, disponibles para la autoridad</h3><p>La primera obligación puramente documental. Se resuelve sin tocar sus sistemas, y es la que nosotros redactamos.</p></div></div>
              <div className="cr"><div className="cr-f">1 jun 2027<span>Después</span></div><div><h3>Monitoreo automatizado y alertas</h3><p>Aquí sí se necesita software. No lo vendemos: le ayudamos a elegirlo y a que el sistema y su manual digan lo mismo.</p></div></div>
              <div className="cr"><div className="cr-f">2028<span>Ejercicio completo</span></div><div><h3>Primera auditoría anual obligatoria</h3><p>La auditoría revisa el año completo. Lo que no se documentó durante el ejercicio no se puede documentar al cierre.</p></div></div>
            </div>
            <p className="nota">Las fechas provienen del acuerdo publicado en el Diario Oficial de la Federación el 7 de agosto de 2026, que contiene múltiples artículos transitorios con plazos distintos por obligación. En el diagnóstico se entrega el cotejo puntual contra el texto publicado, citando el transitorio que aplica a su giro. Esta página no sustituye la lectura del texto oficial.</p>
          </div>
        </section>
        <Proceso />



                  <div className="wrap" style={{ textAlign: 'center', padding: '60px 0 80px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>¿Listo para empezar?</h2>
          <button onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })} className="btn">Solicitar diagnóstico</button>
        </div>
          
        <section className="sec rv" id="diagnostico">
          <div className="wrap">
            <div className="cab">
              <span className="tag">Autoevaluación</span>
              <h2>Revise qué le falta en dos minutos</h2>
              <p>Nueve preguntas. El resultado se calcula en su navegador: no se envía nada a ningún servidor hasta que usted decida contactarnos.</p>
            </div>
            <Quiz />
          </div>
        </section>

                  <div className="wrap" style={{ textAlign: 'center', padding: '60px 0 80px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>Empecemos a trabajar</h2>
          <button onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })} className="btn">Solicitar diagnóstico</button>
        </div>
          
        <section className="sec sec-mist rv" id="entregables">
          <div className="wrap">
            <div className="cab">
              <span className="tag">Entregables</span>
              <h2>Qué contiene el Manual que se entrega</h2>
              <p>Para que sepa exactamente qué está comprando. El contenido de cada capítulo se adapta a su giro, pero la estructura es esta y se entrega completa.</p>
            </div>
            <div className="chips">
              <div className="chip"><b>Capítulo I</b><span>Marco legal aplicable y declaración de cumplimiento de la dirección</span></div>
              <div className="chip"><b>Capítulo II</b><span>Política de aceptación de clientes y supuestos de rechazo</span></div>
              <div className="chip"><b>Capítulo III</b><span>Umbrales de identificación y de aviso aplicables al giro</span></div>
              <div className="chip"><b>Capítulo IV</b><span>Identificación del cliente e integración del expediente</span></div>
              <div className="chip"><b>Capítulo V</b><span>Beneficiario Controlador y criterios de cadena de control</span></div>
              <div className="chip"><b>Capítulo VI</b><span>Metodología de riesgos: factores, ponderaciones y niveles</span></div>
              <div className="chip"><b>Capítulo VII</b><span>Personas Políticamente Expuestas e identificación reforzada</span></div>
              <div className="chip"><b>Capítulo VIII</b><span>Consulta de listas restrictivas y resguardo del acuse</span></div>
              <div className="chip"><b>Capítulo IX</b><span>Acumulación de operaciones y control de fraccionamiento</span></div>
              <div className="chip"><b>Capítulo X</b><span>Señales de alerta específicas del giro y su tratamiento</span></div>
              <div className="chip"><b>Capítulo XI</b><span>Aviso de veinticuatro horas y escalamiento interno</span></div>
              <div className="chip"><b>Capítulo XII</b><span>Estructura interna y responsabilidades por área</span></div>
              <div className="chip"><b>Capítulo XIII</b><span>Conservación por diez años y cadena de custodia</span></div>
              <div className="chip"><b>Capítulo XIV</b><span>Programa de capacitación anual y forma de acreditarla</span></div>
              <div className="chip"><b>Capítulo XV</b><span>Auditoría periódica: alcance y tratamiento de hallazgos</span></div>
              <div className="chip"><b>Anexos</b><span>Formatos, declaraciones, bitácoras y actas</span></div>
            </div>
            <p className="nota">Los umbrales expresados en UMA se verifican contra el valor vigente al momento de la redacción y se señalan expresamente como parámetros que deben actualizarse cada año. Un manual con un umbral congelado deja de servir en cuanto cambia la UMA.</p>
          </div>
        </section>

        <section className="sec rv" id="precios">
          <div className="wrap">
            <div className="cab">
              <span className="tag">Honorarios</span>
              <h2>Tres etapas, precios cerrados</h2>
              <p>No cobramos por hora ni abrimos alcance a mitad del trabajo. Cada etapa tiene entregables listados y fecha de entrega comprometida por escrito antes de que usted pague.</p>
            </div>
            <div className="precios">
              <div className="pc">
                <div className="et">Etapa 1 · Entrada</div>
                <h3>Diagnóstico</h3>
                <div className="mn">$2,500 <small>MXN</small></div>
                <div className="pz">Una semana</div>
                <ul>
                  <li>Determinación de si es sujeto obligado y bajo qué supuesto</li>
                  <li>Cotejo de su operación actual contra lo exigible</li>
                  <li>Revisión del contenido de los documentos que ya existan</li>
                  <li>Faltantes priorizados con la fecha límite de cada uno</li>
                  <li>Informe entregado impreso y en digital</li>
                  <li>Reunión de presentación de resultados</li>
                </ul>
                <div className="gar">Si no encontramos ningún faltante documental, no se cobra.</div>
              </div>
              <div className="pc top">
                <span className="badge">Lo más contratado</span>
                <div className="et">Etapa 2 · Implementación</div>
                <h3>Manual y Metodología</h3>
                <div className="mn">$18,000 – $35,000 <small>MXN</small></div>
                <div className="pz">Tres a cinco semanas</div>
                <ul>
                  <li>Manual de Políticas Internas completo, redactado para su giro</li>
                  <li>Metodología de Evaluación de Riesgos con matriz y ponderaciones</li>
                  <li>Formatos de expediente para persona física y moral</li>
                  <li>Formato de declaración de Beneficiario Controlador</li>
                  <li>Procedimiento escrito del aviso de veinticuatro horas</li>
                  <li>Carpeta de evidencia estructurada para revisión</li>
                  <li>Sesión de capacitación al personal, con constancia</li>
                  <li>Acta de adopción para firma de la dirección</li>
                </ul>
                <div className="gar">El rango depende del giro y del número de sucursales. Se cierra en el diagnóstico.</div>
              </div>
              <div className="pc">
                <div className="et">Etapa 3 · Permanencia</div>
                <h3>Resguardo continuo</h3>
                <div className="mn">$2,500 – $5,000 <small>MXN / mes</small></div>
                <div className="pz">Mensual, sin plazo forzoso</div>
                <ul>
                  <li>Revisión periódica de la matriz de riesgo</li>
                  <li>Actualización del manual cuando cambie la norma</li>
                  <li>Actualización anual de umbrales por cambio de UMA</li>
                  <li>Capacitación anual documentada</li>
                  <li>Preparación de la carpeta para la auditoría anual</li>
                  <li>Consulta por teléfono sobre casos concretos</li>
                </ul>
                <div className="gar">Se cancela con treinta días de aviso. Los documentos son suyos.</div>
              </div>
            </div>
            <p className="nota">Precios en pesos mexicanos, antes de IVA. No incluyen gastos de traslado fuera de la zona metropolitana ni el costo de software de terceros. La cotización formal se emite después del encuadre, detalla el alcance por escrito y tiene vigencia de treinta días naturales. Nuestra responsabilidad frente al cliente se limita al monto de los honorarios efectivamente pagados, conforme al contrato de prestación de servicios.</p>
          </div>
        </section>
        <Requisitos />

                  <div className="wrap" style={{ textAlign: 'center', padding: '60px 0 80px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>Transparencia total</h2>
          <button onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })} className="btn">Solicitar diagnóstico</button>
        </div>
          
        <section className="sec sec-mist rv" id="glosario">
          <div className="wrap">
            <div className="cab">
              <span className="tag">Glosario</span>
              <h2>Los términos que va a escuchar</h2>
              <p>Si algún proveedor se los explica con rodeos, aquí están en corto.</p>
            </div>
            <div className="glos">
              <div className="gl"><div className="ib" style={{marginBottom: 0}}><svg className="ico" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h10" /></svg></div><div><b><Tooltip content="Ej. Venta de inmuebles, vehículos, préstamos, joyas.">Actividad Vulnerable</Tooltip></b><p>Cualquiera de las diecisiete actividades del Artículo 17 que, por su naturaleza, pueden usarse para introducir recursos ilícitos. Si realiza una, es sujeto obligado.</p></div></div>
              <div className="gl"><div className="ib" style={{marginBottom: 0}}><svg className="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg></div><div><b><Tooltip content="Valor actualizado anualmente (Unidad de Medida y Actualización).">Umbral</Tooltip></b><p>Monto expresado en UMA a partir del cual nace la obligación. Hay dos: uno para identificar al cliente y armar expediente, y otro más alto para presentar aviso.</p></div></div>
              <div className="gl"><div className="ib" style={{marginBottom: 0}}><svg className="ico" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></svg></div><div><b><Tooltip content="El dueño real detrás de corporaciones y prestanombres.">Beneficiario Controlador</Tooltip></b><p>La persona física de carne y hueso que realmente se beneficia o controla la operación, aunque en el papel aparezca una empresa. Hay que identificarla y documentarla.</p></div></div>
              <div className="gl"><div className="ib" style={{marginBottom: 0}}><svg className="ico" viewBox="0 0 24 24"><path d="M3 12h4l3 8 4-16 3 8h4" /></svg></div><div><b><Tooltip content="Metodología obligatoria en base a lineamientos internacionales (GAFI).">Enfoque basado en riesgos</Tooltip></b><p>Ya no se aplican las mismas medidas a todos por igual. Hay que clasificar clientes y operaciones en riesgo bajo, medio o alto, y poder justificar por escrito ese criterio.</p></div></div>
              <div className="gl"><div className="ib" style={{marginBottom: 0}}><svg className="ico" viewBox="0 0 24 24"><path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z" /></svg></div><div><b><Tooltip content="El puente formal entre la entidad y la UIF.">Representante Encargado de Cumplimiento</Tooltip></b><p>La persona de su empresa designada formalmente ante el SAT como responsable del cumplimiento. No puede ser un externo ni quedar vacante.</p></div></div>
              <div className="gl"><div className="ib" style={{marginBottom: 0}}><svg className="ico" viewBox="0 0 24 24"><path d="M21 15V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9" /><path d="M3 15h18v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg></div><div><b><Tooltip content="Control para evitar la evasión de umbrales mediante operaciones fraccionadas.">Acumulación</Tooltip></b><p>Sumar las operaciones de un mismo cliente en un periodo para evitar que se fraccionen y queden por debajo del umbral. El sistema tiene que detectarlo.</p></div></div>
            </div>
          </div>
        </section>

        <section className="sec rv" id="limites">
          <div className="wrap">
            <div className="cab">
              <span className="tag">Límites</span>
              <h2>Lo que no hacemos</h2>
              <p>Esto se escribe antes de contratar. Si un proveedor le ofrece las seis cosas de abajo sin matices, vale la pena preguntarle bajo qué figura y con qué responsabilidad lo hace.</p>
            </div>
            <div className="rej">
              <div className="lim"><div className="ib rojo"><svg className="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M5.6 5.6l12.8 12.8" /></svg></div><h4>No auditamos lo que redactamos</h4><p>La auditoría periódica la hace auditoría interna o un tercero independiente. Si nosotros escribimos su manual, no podemos revisarlo nosotros mismos sin destruir la independencia del dictamen.</p></div>
              <div className="lim"><div className="ib rojo"><svg className="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M5.6 5.6l12.8 12.8" /></svg></div><h4>No somos su Representante Encargado de Cumplimiento</h4><p>Ese cargo se designa formalmente ante el SAT y recae en una persona de su empresa. Lo capacitamos y le entregamos los procedimientos, pero el nombramiento es suyo.</p></div>
              <div className="lim"><div className="ib rojo"><svg className="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M5.6 5.6l12.8 12.8" /></svg></div><h4>No damos asesoría jurídica ni fiscal</h4><p>Redactamos documentación operativa conforme a la norma vigente. Si ya hay un procedimiento sancionador abierto, eso lo lleva un abogado y se lo decimos desde la primera llamada, sin cobrar.</p></div>
              <div className="lim"><div className="ib rojo"><svg className="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M5.6 5.6l12.8 12.8" /></svg></div><h4>No presentamos avisos por usted</h4><p>Los avisos ante el portal del SAT los presenta el sujeto obligado por conducto de su Representante Encargado de Cumplimiento. Le entregamos el procedimiento y lo capacitamos; el envío es suyo.</p></div>
              <div className="lim"><div className="ib rojo"><svg className="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M5.6 5.6l12.8 12.8" /></svg></div><h4>No investigamos a sus clientes</h4><p>No hacemos perfilamiento de personas, no accedemos a bases restringidas y no ofrecemos información que no sea de acceso público. Le diseñamos el procedimiento con las fuentes que legítimamente puede usar.</p></div>
              <div className="lim"><div className="ib rojo"><svg className="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M5.6 5.6l12.8 12.8" /></svg></div><h4>No prometemos que no habrá multa</h4><p>Nadie puede prometer eso, y quien lo prometa está vendiendo algo que no controla. Lo que ofrecemos es que, cuando le pidan la documentación, exista, esté fechada y sea defendible.</p></div>
            </div>
          </div>
        </section>

        <section className="sec sec-mist rv" id="confidencialidad">
          <div className="wrap">
            <div className="cab">
              <span className="tag">Su información</span>
              <h2>Cómo manejamos lo que nos comparte</h2>
              <p>Este servicio toca información sensible del negocio. Las reglas están escritas y se firman antes de recibir el primer documento.</p>
            </div>
            <div className="duo">
              <div className="card">
                <div className="ib"><svg className="ico" viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg></div>
                <div className="rot">Compromisos</div>
                <h3>Lo que asumimos</h3>
                <ul className="lst">
                  <li>Convenio de confidencialidad firmado antes de recibir información</li>
                  <li>Principio de información mínima: pedimos solo lo indispensable</li>
                  <li>Para el diagnóstico basta, por lo general, con que nos describa el procedimiento</li>
                  <li>Los datos personales se manejan conforme a la LFPDPPP</li>
                  <li>Devolución o destrucción de la información al cierre, a su elección</li>
                  <li>No usamos su nombre como referencia comercial sin autorización escrita</li>
                </ul>
              </div>
              <div className="card">
                <div className="ib"><svg className="ico" viewBox="0 0 24 24"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" /><circle cx="12" cy="12" r="2.5" /></svg></div>
                <div className="rot">Transparencia</div>
                <h3>Lo que conviene que sepa</h3>
                <ul className="lst">
                  <li>No conservamos copias de los expedientes de sus clientes</li>
                  <li>No compartimos su información con proveedores de software ni con nadie más</li>
                  <li>La información que usted proporcione se presume veraz; el trabajo depende de eso</li>
                  <li>Los documentos entregados son suyos y los conserva si termina la relación</li>
                  <li>Nuestras plantillas y metodología interna siguen siendo nuestras</li>
                  <li>Consulte el aviso de privacidad completo</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="sec rv" id="faq">
          <div className="wrap">
            <div className="cab">
              <span className="tag">Preguntas</span>
              <h2>Lo que nos preguntan seguido</h2>
            </div>
            <div className="faq">
              <details><summary>Mi contador ya me lleva esto. ¿Para qué los necesito?</summary><div className="cu"><p>Su contador lleva la materia fiscal. Esta es una ley administrativa, no fiscal, y el cumplimiento que exige es distinto: manual, metodología de riesgo, expedientes, capacitación y evidencia. Muchos despachos contables no lo cubren porque no es su materia.</p><p>Si su contador sí lo cubre, perfecto: pídale el Manual de Políticas Internas por escrito y revise su fecha. Si lo tiene y está actualizado, no nos necesita. Si tarda en contestar, ahí está la respuesta.</p></div></details>
              <details><summary>¿Esto sustituye a un software de prevención de lavado?</summary><div className="cu"><p>No. Son cosas distintas y probablemente necesite las dos. El software resuelve la operación diaria: expedientes, alertas, generación de avisos. Nosotros resolvemos la parte documental que el software no escribe.</p><p>En el diagnóstico le decimos si además le conviene contratar un sistema y qué debería exigirle. No cobramos comisión de ningún proveedor, y eso queda por escrito en el contrato.</p></div></details>
              <details><summary>Somos un negocio chico. ¿De verdad aplica?</summary><div className="cu"><p>La ley no distingue por tamaño de empresa. Distingue por actividad y por monto de operación. Un lote con tres empleados que vende una unidad por arriba del umbral queda igual de obligado que una distribuidora nacional.</p><p>Lo que sí cambia con el tamaño es el costo de cumplir. Por eso el alcance de la Etapa 2 se ajusta al giro y al número de sucursales, y por eso existe la Etapa 1 a precio bajo.</p></div></details>
              <details><summary>¿Cuánto es la multa?</summary><div className="cu"><p>Depende de la infracción. Las sanciones se calculan en UMA y el rango varía mucho entre no presentar un aviso, presentarlo fuera de plazo o no integrar el expediente.</p><p>No publicamos una cifra genérica porque cambia con el valor de la UMA y con el supuesto concreto. En el diagnóstico se entrega el cálculo de su exposición con la cita del artículo aplicable, no un número redondo de folleto.</p></div></details>
              <details><summary>¿Puedo bajar un manual de internet y ahorrarme esto?</summary><div className="cu"><p>Puede, y mucha gente lo hace. El problema es específico: el régimen exige que la metodología de riesgo refleje <em>sus</em> clientes, <em>sus</em> operaciones, <em>sus</em> formas de pago y <em>sus</em> zonas geográficas. Un manual genérico demuestra justo lo contrario de lo que se pretende acreditar.</p><p>En una revisión, un manual descargado suele ser peor que no tener manual, porque acredita conocimiento de la obligación junto con omisión en su cumplimiento.</p></div></details>
              <details><summary>¿Qué pasa si me multan de todos modos?</summary><div className="cu"><p>Puede ocurrir, y se lo decimos de frente. Nuestro trabajo es que exista documentación defendible y fechada, no impedir un acto de autoridad que no controlamos.</p><p>Nuestra responsabilidad frente a usted está delimitada por escrito en el contrato y se limita al monto de los honorarios efectivamente pagados. No asumimos el pago de sanciones. Cualquier proveedor que le diga lo contrario, pídaselo por escrito y verá qué contesta.</p></div></details>
              <details><summary>¿Quiénes son ustedes? No los conozco.</summary><div className="cu"><p>Somos una firma nueva. No tenemos veinte años de trayectoria ni una lista de clientes que presumir, y no vamos a inventar testimonios para aparentarlo.</p><p>Lo que sí tenemos es método documentado, alcance por escrito antes de cobrar, precio cerrado y una garantía que asumimos nosotros en la etapa de entrada. Si el diagnóstico no le sirve, no lo paga.</p></div></details>
              <details><summary>¿Trabajan en toda la República?</summary><div className="cu"><p>El diagnóstico y la redacción se hacen a distancia. La sesión de adopción y la capacitación pueden ser presenciales o remotas, según le convenga.</p><p>Si requiere presencia física fuera de la zona metropolitana, se cotizan los gastos de traslado por separado y se le informan antes de contratar, nunca después.</p></div></details>
            </div>
          </div>
        </section>

                  <div className="wrap" style={{ textAlign: 'center', padding: '60px 0 80px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>¿Tiene alguna otra duda?</h2>
          <button onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })} className="btn">Hablemos de su caso</button>
        </div>
          
            <section className="cta" id="contacto">
        <div className="wrap cta-in">
          <div>
            <span className="tag d"><i></i>Siguiente paso</span>
            <h2>Empecemos por una llamada de quince minutos</h2>
            <p className="sb">Le respondemos el mismo día hábil. La primera conversación sirve para saber si su giro entra en el alcance. No hay presentación comercial ni demostración de producto.</p>
            <ul>
              <li>Sin costo y sin compromiso</li>
              <li>Le decimos de frente si no somos lo que necesita</li>
              <li>Si hay un procedimiento abierto, lo canalizamos con un abogado</li>
            </ul>
          </div>

          <form className="form" id="formulario" onSubmit={handleFormSubmit}>
            <div className="fc">
              <label htmlFor="nombre">Nombre</label>
              <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} className={formErrors.nombre ? 'error' : ''} disabled={formStatus === 'loading'} />
              {formErrors.nombre && <span className="fc-error-msg">{formErrors.nombre}</span>}
            </div>
            <div className="fc">
              <label htmlFor="empresa">Empresa</label>
              <input type="text" id="empresa" name="empresa" value={formData.empresa} onChange={handleChange} className={formErrors.empresa ? 'error' : ''} disabled={formStatus === 'loading'} />
              {formErrors.empresa && <span className="fc-error-msg">{formErrors.empresa}</span>}
            </div>
            <div className="fc">
              <label htmlFor="telefono">Teléfono</label>
              <input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} className={formErrors.telefono ? 'error' : ''} disabled={formStatus === 'loading'} />
              {formErrors.telefono && <span className="fc-error-msg">{formErrors.telefono}</span>}
            </div>
            <div className="fc">
              <label htmlFor="correo">Correo</label>
              <input type="email" id="correo" name="correo" value={formData.correo} onChange={handleChange} className={formErrors.correo ? 'error' : ''} disabled={formStatus === 'loading'} />
              {formErrors.correo && <span className="fc-error-msg">{formErrors.correo}</span>}
            </div>
            <div className="fc f">
              <label htmlFor="giroForm">Giro del negocio</label>
              <select id="giroForm" name="giro" value={formData.giro} onChange={handleChange} className={formErrors.giro ? 'error' : ''} disabled={formStatus === 'loading'}>
                <option value="" disabled>Seleccione</option>
                <option value="Venta de vehículos, camiones o maquinaria">Venta de vehículos, camiones o maquinaria</option>
                <option value="Joyería, relojería, metales o piedras preciosas">Joyería, relojería, metales o piedras preciosas</option>
                <option value="Comercio de obra de arte">Comercio de obra de arte</option>
                <option value="Inmobiliaria, desarrollo o correduría">Inmobiliaria, desarrollo o correduría</option>
                <option value="Préstamos, empeño o crédito no bancario">Préstamos, empeño o crédito no bancario</option>
                <option value="Blindaje de vehículos o inmuebles">Blindaje de vehículos o inmuebles</option>
                <option value="Otro">Otro</option>
              </select>
              {formErrors.giro && <span className="fc-error-msg">{formErrors.giro}</span>}
            </div>
            <div className="fc f">
              <label htmlFor="situacion">Situación actual (opcional)</label>
              <textarea id="situacion" name="situacion" placeholder="Por ejemplo: no tenemos manual, o ya recibimos un requerimiento." value={formData.situacion} onChange={handleChange} disabled={formStatus === 'loading'}></textarea>
            </div>
            <label className="chk">
              <input type="checkbox" name="consentimiento" checked={formData.consentimiento} onChange={handleChange} disabled={formStatus === 'loading'} />
              <span>He leído el aviso de privacidad y autorizo el tratamiento de mis datos para ser contactado. Entiendo que este envío no genera relación profesional ni obligación de contratar para ninguna de las partes.</span>
            </label>
            {formErrors.consentimiento && <span className="fc-error-msg" style={{ gridColumn: '1/-1', marginTop: '-10px' }}>{formErrors.consentimiento}</span>}
            
            <button className="btn btn-w" type="submit" disabled={formStatus === 'loading'} style={{ position: 'relative' }}>
              <span style={{ opacity: formStatus === 'loading' ? 0 : 1 }}>Enviar solicitud</span>
              {formStatus === 'loading' && (
                <span className="btn-spinner"></span>
              )}
            </button>
            
            <AnimatePresence>
              {formStatus === 'success' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="form-msg success">
                  Su solicitud ha sido enviada con éxito. Nos pondremos en contacto con usted a la brevedad.
                </motion.div>
              )}
            </AnimatePresence>
            
            <p className="priv">Sus datos se usan únicamente para atender esta solicitud. No se comparten con terceros ni se incorporan a listas de correo. Puede solicitar su eliminación en cualquier momento.</p>
          </form>
        </div>
      </section>
          <footer className="pie">
        <div className="wrap">
          <div className="pie-in">
            <div>
              <a className="logo" href="#top">
                <span className="mk">
                  <svg viewBox="0 0 24 24"><path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z" /></svg>
                </span>
                <span className="lg-t">Resguardo</span>
              </a>
              <p style={{ maxWidth: '38ch', marginTop: 14 }}>Documentación de cumplimiento para negocios que realizan Actividades Vulnerables en México.</p>
            </div>
            <div>
              <h4>Sitio</h4>
              <ul>
                <li><button onClick={() => document.getElementById('calendario')?.scrollIntoView({ behavior: 'smooth' })} style={{background:'none',border:'none',color:'inherit',padding:0,cursor:'pointer'}}>Calendario</button></li>
                <li><button onClick={() => document.getElementById('alcance')?.scrollIntoView({ behavior: 'smooth' })} style={{background:'none',border:'none',color:'inherit',padding:0,cursor:'pointer'}}>Su giro</button></li>
                <li><button onClick={() => document.getElementById('comparativa')?.scrollIntoView({ behavior: 'smooth' })} style={{background:'none',border:'none',color:'inherit',padding:0,cursor:'pointer'}}>Comparativa</button></li>
                <li><button onClick={() => document.getElementById('diagnostico')?.scrollIntoView({ behavior: 'smooth' })} style={{background:'none',border:'none',color:'inherit',padding:0,cursor:'pointer'}}>Autoevaluación</button></li>
                <li><button onClick={() => document.getElementById('glosario')?.scrollIntoView({ behavior: 'smooth' })} style={{background:'none',border:'none',color:'inherit',padding:0,cursor:'pointer'}}>Glosario</button></li>
                <li><button onClick={() => document.getElementById('entregables')?.scrollIntoView({ behavior: 'smooth' })} style={{background:'none',border:'none',color:'inherit',padding:0,cursor:'pointer'}}>Honorarios</button></li>
              </ul>
            </div>
            <div>
              <h4>Legal y contacto</h4>
              <ul>
                <li><a href="#aviso">Aviso legal</a></li>
                <li><a href="#privacidad">Aviso de privacidad</a></li>
                <li><a href="#terminos">Términos de uso</a></li>
                <li><a href="#whatsapp">WhatsApp</a></li>
                <li><button onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })} style={{background:'none',border:'none',color:'inherit',padding:0,cursor:'pointer'}}>Solicitar diagnóstico</button></li>
              </ul>
            </div>
          </div>
          <p className="pie-legal">Fuentes normativas: LFPIORPI (DOF 16 jul 2025) · Reglamento reformado (DOF 27 mar 2026) · Reglas de Carácter General (DOF 7 ago 2026) · Portal de Prevención de Lavado de Dinero del SAT. El contenido de este sitio es informativo y de carácter general. No constituye asesoría jurídica, fiscal ni contable, no sustituye la lectura del texto normativo vigente y su consulta no genera relación profesional alguna.</p>
        </div>
      </footer>

      <button onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })} className="movil" style={{ border: 'none', width: '100%' }}>Solicitar diagnóstico</button>

      <a href="https://wa.me/5211234567890" target="_blank" rel="noopener noreferrer" className="fab-wa" aria-label="Contactar por WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </>
  );
}
