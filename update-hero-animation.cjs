const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `<header className="hero" id="top">
        

        <div className="wrap hero-in">
          <div>
            <span className="tag d"><i></i>Actividades Vulnerables · LFPIORPI</span>
            <h1>Cumplir no basta. Hay que <em>poder demostrarlo</em>.</h1>
            <p>A partir del 1 de marzo de 2027 el SAT puede pedirle su Manual de Políticas Internas y su Metodología de Evaluación de Riesgos. Y usted tiene que entregarlos ese día.</p>
            <p>Redactamos ambos documentos para su giro, armamos la carpeta de evidencia y capacitamos a su personal. <strong>No vendemos software: escribimos lo que ningún software escribe.</strong></p>
            <div className="hero-btns">
              <button onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })} className="btn">Solicitar diagnóstico</button>
              <button onClick={() => document.getElementById('entregables')?.scrollIntoView({ behavior: 'smooth' })} className="btn btn-gh">Alcance y honorarios</button>
            </div>
            <p className="hero-mini">Diagnóstico en una semana con precio cerrado. Si no encontramos ningún faltante, no se cobra.</p>
          </div>

          <aside className="widget">`;

const replacementStr = `<header className="hero" id="top">
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
          >`;

app = app.replace(targetStr, replacementStr);

// Change the closing </div> of hero-in to </motion.div>
const endTarget = `            </div>
          </aside>
        </div>`;

const endReplacement = `            </div>
          </motion.aside>
        </motion.div>`;

app = app.replace(endTarget, endReplacement);

fs.writeFileSync('src/App.tsx', app);

