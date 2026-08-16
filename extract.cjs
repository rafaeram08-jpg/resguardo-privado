const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regexRevision = /(<section className="sec rv" id="revision">[\s\S]*?<\/section>)/;
const regexCapas = /(<section className="sec rv" id="capas">[\s\S]*?<\/section>)/;
const regexProceso = /(<section className="sec rv" id="proceso">[\s\S]*?<\/section>)/;
const regexRequisitos = /(<section className="sec sec-mist rv" id="requisitos">[\s\S]*?<\/section>)/;

const r1 = code.match(regexRevision)[1];
const r2 = code.match(regexCapas)[1];
const r3 = code.match(regexProceso)[1];
const r4 = code.match(regexRequisitos)[1];

code = code.replace(r1, '<Revision />');
code = code.replace(r2, '<Capas />');
code = code.replace(r3, '<Proceso />');
code = code.replace(r4, '<Requisitos />');

// Now add them back to other tabs
// giro -> add Revision
code = code.replace(/(<section className="sec rv" id="alcance">[\s\S]*?<\/section>)/, '$1\n        <Revision />');
// comparativa -> add Capas
code = code.replace(/(<section className="sec sec-mist rv" id="mitos">)/, '<Capas />\n        $1');
// calendario -> add Proceso
code = code.replace(/(<section className="sec sec-mist rv" id="calendario">[\s\S]*?<\/section>)/, '$1\n        <Proceso />');
// honorarios -> add Requisitos
code = code.replace(/(<section className="sec rv" id="precios">[\s\S]*?<\/section>)/, '$1\n        <Requisitos />');

fs.writeFileSync('src/App.tsx', code);

// Create Sections.tsx exactly with the extracted code
const sectionsCode = `import React from 'react';

export function Revision() {
  return (
    ${r1}
  );
}

export function Capas() {
  return (
    ${r2}
  );
}

export function Proceso() {
  return (
    ${r3}
  );
}

export function Requisitos() {
  return (
    ${r4}
  );
}
`;
fs.writeFileSync('src/components/Sections.tsx', sectionsCode);
