const fs = require('fs');

let app = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Remove 3D Core Element entirely
const hero3dRegex = /\{\/\* 3D Core Element \*\/\}[\s\S]*?<\/div>[\s]*<div className="wrap hero-in">/;
app = app.replace(hero3dRegex, '<div className="wrap hero-in">');

// 2. Remove the radial gradients in hero
const radialRegex = /<motion\.div\s*style=\{\{\s*position: 'absolute', top: '-38%',[\s\S]*?y: heroY1\s*\}\}\s*\/>\s*<motion\.div\s*style=\{\{\s*position: 'absolute', bottom: '6%',[\s\S]*?y: heroY2\s*\}\}\s*\/>/;
app = app.replace(radialRegex, '');

// Add CTA button at the end of each tab content
function addCtaToTab(tabName, content) {
  const ctaCode = `
        <div className="wrap" style={{ textAlign: 'center', padding: '60px 0 100px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>¿Listo para empezar?</h2>
          <button onClick={() => { setActiveTab('contacto'); window.scrollTo(0,0); }} className="btn">Solicitar diagnóstico sin costo</button>
        </div>
`;
  // Let's replace the ending motion.div for the tab
  return app.replace(new RegExp(`(</section>\\s*</motion\\.div>\\s*\\)}[\\s]*\\{activeTab === '${tabName}')`, 'g'), `</section>${ctaCode}</motion.div>\n        )}\n        {activeTab === '${tabName}'`);
}

// But actually, we don't know the next tab dynamically, so let's just do it directly.
// e.g. for calendario:
app = app.replace(/(<section className="sec sec-mist rv" id="calendario">[\s\S]*?<Proceso \/>\s*)<\/motion\.div>/, `$1        <div className="wrap" style={{ textAlign: 'center', padding: '60px 0 80px' }}>\n          <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>¿Listo para empezar?</h2>\n          <button onClick={() => { setActiveTab('contacto'); window.scrollTo(0,0); }} className="btn">Solicitar diagnóstico</button>\n        </div>\n          </motion.div>`);

app = app.replace(/(<section className="sec rv" id="alcance">[\s\S]*?<Revision \/>\s*)<\/motion\.div>/, `$1        <div className="wrap" style={{ textAlign: 'center', padding: '60px 0 80px' }}>\n          <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>¿Aplica a su giro?</h2>\n          <button onClick={() => { setActiveTab('contacto'); window.scrollTo(0,0); }} className="btn">Solicitar diagnóstico</button>\n        </div>\n          </motion.div>`);

app = app.replace(/(<section className="sec sec-mist rv" id="mitos">[\s\S]*?)<\/motion\.div>/, `$1        <div className="wrap" style={{ textAlign: 'center', padding: '60px 0 80px' }}>\n          <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>Asegure su cumplimiento</h2>\n          <button onClick={() => { setActiveTab('contacto'); window.scrollTo(0,0); }} className="btn">Solicitar diagnóstico</button>\n        </div>\n          </motion.div>`);

app = app.replace(/(<section className="sec rv" id="diagnostico">[\s\S]*?)<\/motion\.div>/, `$1        <div className="wrap" style={{ textAlign: 'center', padding: '60px 0 80px' }}>\n          <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>Empecemos a trabajar</h2>\n          <button onClick={() => { setActiveTab('contacto'); window.scrollTo(0,0); }} className="btn">Solicitar diagnóstico</button>\n        </div>\n          </motion.div>`);

app = app.replace(/(<section className="sec rv" id="precios">[\s\S]*?<Requisitos \/>\s*)<\/motion\.div>/, `$1        <div className="wrap" style={{ textAlign: 'center', padding: '60px 0 80px' }}>\n          <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>Transparencia total</h2>\n          <button onClick={() => { setActiveTab('contacto'); window.scrollTo(0,0); }} className="btn">Solicitar diagnóstico</button>\n        </div>\n          </motion.div>`);

app = app.replace(/(<section className="sec rv" id="faq">[\s\S]*?)<\/motion\.div>/, `$1        <div className="wrap" style={{ textAlign: 'center', padding: '60px 0 80px' }}>\n          <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>¿Tiene alguna otra duda?</h2>\n          <button onClick={() => { setActiveTab('contacto'); window.scrollTo(0,0); }} className="btn">Hablemos de su caso</button>\n        </div>\n          </motion.div>`);


fs.writeFileSync('src/App.tsx', app);
