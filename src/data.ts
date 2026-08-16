export const G: Record<string, any> = {
  vehiculos: {
    t: 'Venta de vehículos, camiones y maquinaria',
    b: 'Actividad Vulnerable prevista en el Artículo 17 de la LFPIORPI',
    d: [
      'Venta de unidad nueva o usada por arriba del umbral en UMA',
      'Acumulación de operaciones del mismo cliente en un periodo',
      'Pago que toca el límite permitido en efectivo',
      'Venta de flotilla a persona moral de reciente creación'
    ],
    r: [
      'Unidades de alto valor con reventa rápida en mercado informal',
      'Pagos desde cuentas de terceros ajenos al comprador',
      'Solicitud de facturar a nombre de un tercero sin justificación',
      'Cliente indiferente al precio y a las condiciones mecánicas'
    ],
    q: [
      'Matriz de riesgo por tipo de unidad y forma de pago',
      'Procedimiento de acumulación entre venta, refacciones y taller',
      'Política de pago en efectivo y su límite',
      'Formato de Beneficiario Controlador para venta de flotilla'
    ]
  },
  joyeria: {
    t: 'Joyería, relojería, metales y piedras preciosas',
    b: 'Actividad Vulnerable prevista en el Artículo 17 de la LFPIORPI',
    d: [
      'Venta o compra por arriba del umbral en UMA',
      'Operaciones recurrentes del mismo cliente',
      'Compra de piezas a particulares',
      'Pago en efectivo cercano al límite permitido'
    ],
    r: [
      'Bien de alto valor, fácil de transportar y de convertir',
      'Cliente recurrente que fracciona compras',
      'Compra a particular sin acreditar procedencia de la pieza',
      'Operaciones en las que el cliente no solicita factura'
    ],
    q: [
      'Criterios de riesgo por pieza, monto y recurrencia',
      'Procedimiento de acumulación por cliente',
      'Expediente para compra a particulares',
      'Señales de alerta específicas de mostrador'
    ]
  },
  inmuebles: {
    t: 'Inmobiliarias, desarrollo y correduría',
    b: 'Actividad Vulnerable prevista en el Artículo 17 de la LFPIORPI',
    d: [
      'Compraventa o desarrollo de inmuebles',
      'Servicios de intermediación en la operación',
      'Arrendamiento por arriba del umbral aplicable',
      'Operaciones con personas morales de estructura compleja'
    ],
    r: [
      'Montos altos con estructura societaria opaca',
      'Pagos parciales desde múltiples orígenes',
      'Compradores que no visitan el inmueble',
      'Operaciones muy por debajo del valor de mercado'
    ],
    q: [
      'Metodología de riesgo por tipo de operación y contraparte',
      'Procedimiento de identificación de cadena de control',
      'Criterios de zona geográfica de riesgo',
      'Expediente para persona moral y para fideicomiso'
    ]
  },
  prestamos: {
    t: 'Préstamos, empeño y crédito no bancario',
    b: 'Actividad Vulnerable prevista en el Artículo 17 de la LFPIORPI',
    d: [
      'Otorgamiento habitual o profesional de préstamos',
      'Operaciones de empeño por arriba del umbral',
      'Alta frecuencia de operaciones con el mismo cliente',
      'Liquidaciones anticipadas en efectivo'
    ],
    r: [
      'Alta frecuencia y volumen con expediente incompleto',
      'Prendas de origen no acreditado',
      'Liquidación anticipada sin razón económica aparente',
      'Terceros que liquidan por cuenta del deudor'
    ],
    q: [
      'Perfil transaccional por tipo de cliente',
      'Procedimiento de acumulación por frecuencia',
      'Criterios de riesgo por origen de la prenda',
      'Bitácora de operaciones inusuales'
    ]
  },
  arte: {
    t: 'Comercio de arte y servicios de blindaje',
    b: 'Actividades Vulnerables previstas en el Artículo 17 de la LFPIORPI',
    d: [
      'Comercialización de obra por arriba del umbral',
      'Servicios de blindaje de vehículos o inmuebles',
      'Operaciones con intermediarios o representantes',
      'Ventas a personas morales o fideicomisos'
    ],
    r: [
      'Valuación subjetiva que dificulta detectar sobreprecio',
      'Compradores que operan por medio de representante',
      'Blindaje solicitado con urgencia y pago inmediato',
      'Operaciones con componente transfronterizo'
    ],
    q: [
      'Criterios de riesgo por tipo de obra o servicio',
      'Procedimiento de identificación del comprador final',
      'Política de valuación y su documentación',
      'Señales de alerta específicas del giro'
    ]
  }
};

export const REGLAS = [
  { k: 'rec', mal: ['no', 'duda'], p: 3, c: 'Ya exigible', t: 'Representante Encargado de Cumplimiento sin designar', d: 'Es el responsable formal ante el SAT. Sin designación, ninguna otra obligación tiene a quién imputarse dentro de la empresa.' },
  { k: 'manual', mal: ['no', 'viejo'], p: 3, c: '1 mar 2027', t: 'Manual de Políticas Internas ausente o desactualizado', d: 'Un manual anterior a la reforma de 2025 no refleja el enfoque basado en riesgos ni el plazo de conservación de diez años.' },
  { k: 'metodologia', mal: ['no', 'mental'], p: 3, c: '1 mar 2027', t: 'Metodología de Evaluación de Riesgos sin documentar', d: 'Hacerlo bien no basta: hay que poder demostrar con qué criterios se clasificó a cada cliente y cuándo se revisaron.' },
  { k: 'bc', mal: ['no', 'aveces'], p: 2, c: 'Ya exigible', t: 'Beneficiario Controlador sin identificar de forma consistente', d: 'Debe recabarse en toda operación sujeta a identificación, con declaración firmada del cliente.' },
  { k: 'listas', mal: ['no', 'sinacuse'], p: 2, c: 'Ya exigible', t: 'Consulta de listas restrictivas sin evidencia', d: 'Sin el acuse guardado en el expediente, para efectos de una revisión la consulta no ocurrió.' },
  { k: 'resguardo', mal: ['no', 'papel'], p: 2, c: 'Ya exigible', t: 'Conservación de expedientes por debajo de diez años', d: 'El plazo se duplicó y aplica también a comprobantes de pago y acuses de avisos presentados.' },
  { k: 'capacitacion', mal: ['no', 'informal'], p: 2, c: 'Anual', t: 'Capacitación anual sin constancia', d: 'La capacitación se acredita con lista de asistencia y constancia, no con la afirmación de que se impartió.' }
];
