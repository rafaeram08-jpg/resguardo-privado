const fs = require('fs');

let app = fs.readFileSync('src/App.tsx', 'utf8');

app = app.replace('<span className="lg-t">Resguardo<span>Powered by Synthos</span></span>', '<span className="lg-t">Resguardo</span>');

// Adding main CTA block inside the hero content if needed, but it already has:
// <button onClick={() => { setActiveTab('diagnostico'); window.scrollTo(0,0); }} className="btn">Ver qué me falta</button>
// which is a pretty good CTA. Maybe change the text.
app = app.replace(
  '<button onClick={() => { setActiveTab(\'diagnostico\'); window.scrollTo(0,0); }} className="btn">Ver qué me falta</button>',
  '<button onClick={() => { setActiveTab(\'contacto\'); window.scrollTo(0,0); }} className="btn">Solicitar diagnóstico</button>'
);

fs.writeFileSync('src/App.tsx', app);
