import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { REGLAS } from '../data';

export default function Quiz() {
  const [R, setR] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any>(null);

  const answeredCount = Object.keys(R).filter(k => R[k]).length;

  const setVal = (k: string, v: string) => {
    setR(prev => ({ ...prev, [k]: v }));
  };

  const renderOption = (key: string, value: string, text: string) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="op"
      type="button"
      aria-pressed={R[key] === value}
      onClick={() => setVal(key, value)}
    >
      {text}
    </motion.button>
  );

  const handleCalculate = () => {
    const ok = !!R.giro && !!R.requerimiento && REGLAS.every(r => !!R[r.k]);
    if (!ok) {
      alert('Faltan respuestas. Conteste las nueve preguntas para calcular la exposición.');
      return;
    }

    if (R.giro === 'ninguno') {
      setResult({
        nivel: 'Fuera de alcance',
        clase: 'niv b',
        lectura: 'Por el giro que indicó, es probable que no realice una Actividad Vulnerable del Artículo 17. Conviene confirmarlo con su asesor, pero no somos el servicio que necesita.',
        aviso: 'Si su operación cambia o abre una línea de negocio distinta, la obligación puede activarse.',
        faltas: []
      });
      return;
    }

    let pts = 0;
    const hall: any[] = [];
    REGLAS.forEach(r => {
      if (r.mal.includes(R[r.k])) {
        pts += r.p;
        hall.push(r);
      }
    });
    if (R.requerimiento === 'si') pts += 3;

    let n, c, tx;
    if (pts >= 11) {
      n = 'Exposición alta'; c = 'niv a'; tx = 'Faltan los documentos centrales del régimen. Si hoy llegara un requerimiento, no habría qué entregar. Es la situación más común y también la más urgente.';
    } else if (pts >= 5) {
      n = 'Exposición media'; c = 'niv m'; tx = 'Hay estructura pero está incompleta o sin documentar. Lo que existe probablemente no resista una revisión tal como está redactado hoy.';
    } else if (pts > 0) {
      n = 'Exposición baja'; c = 'niv b'; tx = 'La operación está razonablemente cubierta. Los faltantes son puntuales y se resuelven sin rehacer todo el esquema.';
    } else {
      n = 'Sin faltantes'; c = 'niv b'; tx = 'Por sus respuestas no aparecen faltantes documentales. En ese caso el diagnóstico no se le cobraría, pero conviene verificar el contenido de los documentos, no solo su existencia.';
    }

    const aviso = R.requerimiento === 'si'
      ? 'Indicó que ya recibió un requerimiento. Eso cambia la prioridad: antes de redactar cualquier documento conviene que un abogado revise el estado del procedimiento. Se lo decimos en la primera llamada, sin costo.'
      : 'Esta autoevaluación es orientativa. El diagnóstico formal coteja su operación real contra el texto publicado en el Diario Oficial de la Federación.';

    setResult({ nivel: n, clase: c, lectura: tx, aviso, faltas: hall });
    setTimeout(() => document.getElementById('res')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  };

  return (
    <motion.div layout className="quiz">
      <div className="qt">
        <h3>Exposición documental</h3>
        <div>
          <div className="pg"><span>{answeredCount}</span> de 9 respondidas</div>
          <div className="qbar">
            <motion.i 
              initial={{ width: 0 }} 
              animate={{ width: `${(answeredCount / 9) * 100}%` }} 
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
      <motion.div layout className="qb">
        <p className="mini">
          <strong>Antes de empezar.</strong> Esta herramienta es orientativa y de carácter general. No constituye asesoría jurídica, fiscal ni contable, no genera relación profesional alguna y su resultado no acredita cumplimiento ni incumplimiento ante ninguna autoridad. Se basa exclusivamente en las respuestas que usted proporcione, sin verificación documental. Consulte los <a href="#terminos">términos de uso</a>.
        </p>

        <motion.div layout className="q">
          <label className="t" htmlFor="giro">1. ¿A qué se dedica el negocio?</label>
          <span className="h">Determina si queda como sujeto obligado conforme al Artículo 17 de la LFPIORPI.</span>
          <select className="op" id="giro" value={R.giro || ''} onChange={(e) => setVal('giro', e.target.value)}>
            <option value="">Seleccione un giro</option>
            <option value="vehiculos">Venta de vehículos, camiones o maquinaria</option>
            <option value="joyeria">Joyería, relojería, metales o piedras preciosas</option>
            <option value="arte">Comercio de obra de arte</option>
            <option value="inmuebles">Inmobiliaria, desarrollo o correduría de inmuebles</option>
            <option value="prestamos">Préstamos, empeño o crédito no bancario</option>
            <option value="blindaje">Blindaje de vehículos o inmuebles</option>
            <option value="otro">Otro giro</option>
            <option value="ninguno">Ninguno de estos</option>
          </select>
        </motion.div>

        <motion.div layout className="q">
          <span className="t">2. ¿Tiene designado ante el SAT a un Representante Encargado de Cumplimiento?</span>
          <span className="h">Es la persona formalmente responsable del cumplimiento. No es un puesto que pueda quedar vacío.</span>
          <div className="ops">
            {renderOption('rec', 'si', 'Sí, designado y vigente')}
            {renderOption('rec', 'no', 'No')}
            {renderOption('rec', 'duda', 'No estoy seguro')}
          </div>
        </motion.div>

        <motion.div layout className="q">
          <span className="t">3. ¿Existe un Manual de Políticas Internas por escrito?</span>
          <span className="h">Documento formal adoptado por la dirección, no un instructivo interno ni un correo con indicaciones.</span>
          <div className="ops">
            {renderOption('manual', 'si', 'Sí, y está actualizado')}
            {renderOption('manual', 'viejo', 'Existe pero es de hace años')}
            {renderOption('manual', 'no', 'No existe')}
          </div>
        </motion.div>

        <motion.div layout className="q">
          <span className="t">4. ¿Puede explicar por escrito por qué un cliente es riesgo bajo, medio o alto?</span>
          <span className="h">Criterios documentados, con ponderaciones y revisión periódica. Es el corazón del enfoque basado en riesgos.</span>
          <div className="ops">
            {renderOption('metodologia', 'si', 'Sí, está documentado')}
            {renderOption('metodologia', 'mental', 'Lo hacemos, pero no está escrito')}
            {renderOption('metodologia', 'no', 'No clasificamos clientes')}
          </div>
        </motion.div>

        <motion.div layout className="q">
          <span className="t">5. ¿Le pide al cliente declarar quién es el Beneficiario Controlador?</span>
          <span className="h">Formato firmado donde declara si actúa a nombre propio o de un tercero que ejerce el control.</span>
          <div className="ops">
            {renderOption('bc', 'si', 'Sí, en todas las operaciones')}
            {renderOption('bc', 'aveces', 'Solo en algunas')}
            {renderOption('bc', 'no', 'No')}
          </div>
        </motion.div>

        <motion.div layout className="q">
          <span className="t">6. ¿Consulta listas restrictivas antes de cerrar una operación?</span>
          <span className="h">Listas del Consejo de Seguridad de la ONU y listado del Artículo 69-B del SAT, entre otras aplicables.</span>
          <div className="ops">
            {renderOption('listas', 'si', 'Sí, y se guarda el acuse')}
            {renderOption('listas', 'sinacuse', 'Se consulta, sin guardar evidencia')}
            {renderOption('listas', 'no', 'No se consultan')}
          </div>
        </motion.div>

        <motion.div layout className="q">
          <span className="t">7. ¿Conserva los expedientes por diez años?</span>
          <span className="h">El plazo se duplicó de cinco a diez años. Aplica a expedientes, comprobantes y acuses de avisos.</span>
          <div className="ops">
            {renderOption('resguardo', 'si', 'Sí, digital y ordenado')}
            {renderOption('resguardo', 'papel', 'En papel, sin orden claro')}
            {renderOption('resguardo', 'no', 'No, se depuran antes')}
          </div>
        </motion.div>

        <motion.div layout className="q">
          <span className="t">8. ¿Su personal recibe capacitación anual documentada?</span>
          <span className="h">Con lista de asistencia y constancia. Sin constancia, para efectos de revisión, no ocurrió.</span>
          <div className="ops">
            {renderOption('capacitacion', 'si', 'Sí, con constancia')}
            {renderOption('capacitacion', 'informal', 'Se les explica, sin constancia')}
            {renderOption('capacitacion', 'no', 'No')}
          </div>
        </motion.div>

        <motion.div layout className="q">
          <span className="t">9. ¿Ha recibido algún requerimiento o visita del SAT en esta materia?</span>
          <span className="h">Incluye requerimientos de información, no solo visitas de verificación.</span>
          <div className="ops">
            {renderOption('requerimiento', 'si', 'Sí')}
            {renderOption('requerimiento', 'no', 'No')}
          </div>
        </motion.div>

        <motion.button 
          whileHover={{ scale: 1.02 }} 
          whileTap={{ scale: 0.98 }} 
          layout 
          className="btn" 
          type="button" 
          onClick={handleCalculate}
        >
          Calcular mi exposición
        </motion.button>

        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, height: 0, filter: 'blur(8px)' }}
              animate={{ opacity: 1, height: 'auto', filter: 'blur(0px)' }}
              exit={{ opacity: 0, height: 0, filter: 'blur(8px)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="res on" 
              id="res" 
              aria-live="polite"
              style={{ overflow: 'hidden' }}
            >
              <div className="rc">
                <div className={result.clase}>{result.nivel}</div>
                <p>{result.lectura}</p>
              </div>
              <ul className="fal">
                {result.faltas.length === 0 && result.nivel === 'Sin faltantes' ? (
                  <li>
                    <span className="cu">—</span>
                    <span className="qu">Sin faltantes detectados<small>La autoevaluación revisa si los documentos existen, no si su contenido cumple.</small></span>
                  </li>
                ) : (
                  result.faltas.map((f: any, i: number) => (
                    <li key={i}>
                      <span className="cu">{f.c}</span>
                      <span className="qu">{f.t}<small>{f.d}</small></span>
                    </li>
                  ))
                )}
              </ul>
              <p className="disc">{result.aviso}</p>
              <p className="disc">Este resultado no constituye un dictamen ni una opinión profesional. Refleja únicamente las respuestas capturadas y no fue verificado contra documento alguno.</p>
              <a href="#contacto" className="btn" style={{ marginTop: 24, display: 'inline-flex' }}>Pedir el diagnóstico formal</a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
