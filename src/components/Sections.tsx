import React from 'react';

export function Revision() {
  return (
    <section className="sec rv" id="revision">
        <div className="wrap">
          <div className="cab">
            <span className="tag">Cómo se ve una revisión</span>
            <h2>Cinco preguntas que se contestan con papeles</h2>
            <p>Una revisión en materia de prevención de lavado no empieza preguntando si usted es honesto. Empieza pidiéndole documentos, y suele seguir este orden.</p>
          </div>
          <div className="pasos">
            <div className="pso"><b>1</b><p>Muéstreme su Manual de Políticas Internas vigente.</p></div>
            <div className="pso"><b>2</b><p>Enséñeme la metodología con la que clasifica a sus clientes por nivel de riesgo.</p></div>
            <div className="pso"><b>3</b><p>Tome este cliente del expediente. ¿Por qué lo clasificó como riesgo bajo?</p></div>
            <div className="pso"><b>4</b><p>Muéstreme dónde consta que revisó su escala de riesgo en el último periodo.</p></div>
            <div className="pso"><b>5</b><p>Enséñeme la constancia de la capacitación anual de su personal.</p></div>
          </div>
          <div className="remate">
            <svg className="ico ico-lg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></svg>
            <div>Las cinco se contestan con documentos, no con explicaciones. Y si el documento no existía el día del requerimiento, no se puede fabricar después: los documentos de cumplimiento llevan fecha, y esa fecha se revisa.</div>
          </div>
        </div>
      </section>
  );
}

export function Capas() {
  return (
    <section className="sec rv" id="capas">
        <div className="wrap">
          <div className="cab">
            <span className="tag">Delimitación</span>
            <h2>Lo que el software no hace</h2>
            <p>Existen buenos sistemas de prevención de lavado en México y probablemente usted necesite uno. Pero un sistema genera alertas; no redacta el criterio que las justifica. Cuando le pregunten por qué clasificó a ese cliente como riesgo bajo, la respuesta tiene que estar escrita de antemano.</p>
          </div>
          <div className="duo">
            <div className="card">
              <div className="ib"><svg className="ico" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M8 14h8" /></svg></div>
              <div className="rot">Capa transaccional</div>
              <h3>Lo que resuelve un software</h3>
              <ul className="lst">
                <li>Expedientes digitales de clientes</li>
                <li>Cotejo automático contra listas restrictivas</li>
                <li>Acumulación de operaciones y control de umbrales</li>
                <li>Generación del archivo para el portal del SAT</li>
                <li>Alertas cuando una operación se sale del perfil</li>
                <li>Bitácora de consultas con sello de tiempo</li>
              </ul>
              <p className="fin">Se contrata por suscripción. No lo vendemos ni recibimos comisión por recomendarlo.</p>
            </div>
            <div className="card dark">
              <div className="ib dark"><svg className="ico" viewBox="0 0 24 24"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></svg></div>
              <div className="rot">Capa documental — Resguardo</div>
              <h3>Lo que ningún sistema le escribe</h3>
              <ul className="lst">
                <li>Manual de Políticas Internas adaptado a su giro</li>
                <li>Metodología de Evaluación de Riesgos con criterios y ponderaciones</li>
                <li>Justificación escrita de cada nivel de riesgo asignado</li>
                <li>Formatos de expediente y de Beneficiario Controlador</li>
                <li>Procedimiento escrito del aviso de veinticuatro horas</li>
                <li>Constancia documentada de la capacitación anual</li>
                <li>Carpeta de evidencia ordenada para el verificador</li>
              </ul>
              <p className="fin">Se entrega una vez y se mantiene. Es lo primero que le van a pedir.</p>
            </div>
          </div>
        </div>
      </section>
  );
}

export function Proceso() {
  return (
    <section className="sec rv" id="proceso">
        <div className="wrap">
          <div className="cab">
            <span className="tag">Método</span>
            <h2>Cómo trabajamos</h2>
            <p>Cinco etapas con entregable propio. Cada una tiene una salida verificable: si una etapa no produce su documento, no se avanza a la siguiente ni se factura.</p>
          </div>
          <div className="proc">
            <div className="pr"><div className="pr-n">01</div><div><h3>Llamada de encuadre</h3><p>Quince minutos por teléfono para determinar si su giro entra en el alcance y si hay un procedimiento sancionador abierto. Si lo hay, se lo decimos y lo mandamos con un abogado antes de cobrarle nada.</p></div><div className="pr-o"><b>Salida</b>Confirmación por escrito de si procede el diagnóstico. Sin costo.</div></div>
            <div className="pr"><div className="pr-n">02</div><div><h3>Diagnóstico documental</h3><p>Revisamos qué documentos existen hoy y qué contienen realmente. No basta con que exista un manual: hay que leer si su contenido corresponde al régimen vigente después de las reformas de 2025 y 2026.</p></div><div className="pr-o"><b>Salida</b>Informe con faltantes priorizados y la fecha límite de cada uno.</div></div>
            <div className="pr"><div className="pr-n">03</div><div><h3>Redacción</h3><p>Manual y Metodología escritos para su operación concreta: sus formas de pago, sus tipos de cliente, sus zonas geográficas. Un manual genérico bajado de internet es peor que no tenerlo, porque acredita que no se evaluó nada.</p></div><div className="pr-o"><b>Salida</b>Borrador completo para su revisión, con control de cambios.</div></div>
            <div className="pr"><div className="pr-n">04</div><div><h3>Adopción e implantación</h3><p>Los documentos no sirven hasta que la dirección los adopta formalmente y el personal los conoce. Acompañamos la sesión de adopción y la capacitación, y dejamos la constancia firmada.</p></div><div className="pr-o"><b>Salida</b>Acta de adopción, lista de asistencia y constancia de capacitación.</div></div>
            <div className="pr"><div className="pr-n">05</div><div><h3>Mantenimiento</h3><p>La matriz de riesgo se revisa periódicamente por mandato de ley y la norma va a seguir moviéndose hasta 2028. Sin mantenimiento, el manual queda desactualizado y vuelve a no servir.</p></div><div className="pr-o"><b>Salida</b>Bitácora de revisiones y actualizaciones fechadas.</div></div>
          </div>
        </div>
      </section>
  );
}

export function Requisitos() {
  return (
    <section className="sec sec-mist rv" id="requisitos">
        <div className="wrap">
          <div className="cab">
            <span className="tag">Corresponsabilidad</span>
            <h2>Qué ponemos cada quien</h2>
            <p>Esto se dice antes de contratar, no a mitad del trabajo. El cumplimiento no se puede subcontratar por completo: hay partes que solo puede hacer el negocio, y si no las hace, los documentos no protegen a nadie.</p>
          </div>
          <div className="duo">
            <div className="card">
              <div className="ib"><svg className="ico" viewBox="0 0 24 24"><path d="M12 20h9M4 20V8l8-5 8 5v12" /><path d="M9 20v-6h6v6" /></svg></div>
              <div className="rot">Nosotros</div>
              <h3>Lo que ponemos</h3>
              <ul className="lst">
                <li>Lectura y cotejo contra el texto normativo publicado</li>
                <li>Redacción íntegra del Manual y de la Metodología</li>
                <li>Diseño de la matriz de riesgo con criterios ponderados</li>
                <li>Formatos, procedimientos y estructura de la carpeta de evidencia</li>
                <li>Sesión de capacitación al personal, con constancia</li>
                <li>Un solo interlocutor durante todo el proyecto</li>
              </ul>
            </div>
            <div className="card oro">
              <div className="ib oro"><svg className="ico" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" /></svg></div>
              <div className="rot">Usted</div>
              <h3>Lo que pone su empresa</h3>
              <ul className="lst">
                <li>Información veraz sobre cómo opera realmente el negocio</li>
                <li>Una persona designada como enlace, con tiempo asignado</li>
                <li>Designación formal del Representante Encargado de Cumplimiento</li>
                <li>Adopción formal de los documentos por parte de la dirección</li>
                <li>Aplicación efectiva de los procedimientos en la operación diaria</li>
                <li>Aviso oportuno si cambia el giro, abre sucursal o llega un requerimiento</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
  );
}
