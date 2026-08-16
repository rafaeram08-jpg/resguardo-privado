const fs = require('fs');

let app = fs.readFileSync('src/App.tsx', 'utf8');

// We will recreate the return statement of App component.
// First, extract the state and hooks.
const topPart = app.substring(0, app.indexOf('return ('));

const navActiveLinks = {
  calendario: 'calendario',
  giro: 'alcance',
  comparativa: 'comparativa',
  diagnostico: 'diagnostico',
  honorarios: 'entregables',
  preguntas: 'glosario'
};

// We will implement an IntersectionObserver in the top part!
let newTopPart = topPart.replace(
  "const [activeTab, setActiveTab] = useState<'inicio' | 'calendario' | 'giro' | 'comparativa' | 'diagnostico' | 'honorarios' | 'preguntas' | 'contacto' | '404'>('inicio');",
  `const [activeTab, setActiveTab] = useState('inicio');
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // Find the entry that is intersecting the most or simply the first one
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
          setActiveTab(entry.target.id);
        }
      });
    }, { threshold: [0.2, 0.5], rootMargin: '-10% 0px -50% 0px' });

    const sections = document.querySelectorAll('section[id], header[id]');
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);`
);

// Remove the 404 effect
newTopPart = newTopPart.replace(
  /useEffect\(\(\) => \{\s*if \(window\.location\.pathname !== '\/' && window\.location\.pathname !== '\/index\.html'\) \{\s*setActiveTab\('404'\);\s*\}\s*\}, \[\]\);/,
  ''
);

// We need to extract the raw content of each tab, removing the AnimatePresence and motion wrappers.
function extractTab(tabName) {
  const regex = new RegExp(`\\{activeTab === '${tabName}' (&&|\\?) \\([\\s]*<motion\\.div[^>]*>([\\s\\S]*?)</motion\\.div>\\s*\\)( : \\([\\s\\S]*?\\)\\s*\\})?`);
  const match = app.match(regex);
  if (match) return match[2];
  return '';
}

const inicioContent = extractTab('inicio');
const giroContent = extractTab('giro');
const comparativaContent = extractTab('comparativa');
const calendarioContent = extractTab('calendario');
const diagnosticoContent = extractTab('diagnostico');
const honorariosContent = extractTab('honorarios');
const preguntasContent = extractTab('preguntas');
const contactoContent = extractTab('contacto'); // Need special care for the ternary fallback

// Contact content extract:
const contactoMatch = app.match(/\{activeTab === 'contacto' \? \([\s]*<motion\.div[^>]*>([\s\S]*?)<\/motion\.div>\s*\)\s*:\s*\([\s]*<motion\.div[^>]*>[\s\S]*?<\/motion\.div>\s*\)\s*\}/);
const ctaContent = contactoMatch ? contactoMatch[1] : '';


// In inicioContent, it currently renders header#top, franja, Revision, Capas, Proceso, Requisitos
// We should replace those with the actual specific sections from the other tabs!
// Wait! If we just concatenate all specific tab contents in order, we will have:
// header (from inicio, but we strip Revision, Capas, Proceso, Requisitos)
let headerOnly = inicioContent.substring(0, inicioContent.indexOf('<Revision />'));

// We need to clean up CTAs from inside the extracted tabs?
// Or leave them! Calls to action are good.
// We just need to replace `setActiveTab('contacto'); window.scrollTo(0,0);` with `document.getElementById('contacto')?.scrollIntoView();`
function cleanCTAs(html) {
  let cleaned = html.replace(/onClick=\{[^}]*setActiveTab\('([^']+)'\)[^}]*\}/g, 'onClick={() => document.getElementById(\'$1\')?.scrollIntoView()}');
  // Handle some edge cases where it scrolls to 0,0
  cleaned = cleaned.replace(/onClick=\{\(\) => \{ setActiveTab\('[^']+'\); window\.scrollTo\(0,0\); \}\}/g, 'onClick={() => document.getElementById(\'contacto\')?.scrollIntoView()}');
  // For other links in footer
  return cleaned;
}

const fullScrollContent = cleanCTAs(
  headerOnly + 
  giroContent + 
  comparativaContent + 
  calendarioContent + 
  diagnosticoContent + 
  honorariosContent + 
  preguntasContent + 
  ctaContent
);

// Create the new return statement
let returnStatement = app.substring(app.indexOf('return ('), app.indexOf('<nav className="nav">'));

const navBlock = `
      <nav className="nav">
        <div className="nav-in">
          <button className="logo" onClick={() => { document.getElementById('top')?.scrollIntoView(); }} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
            <span className="mk">
              <svg viewBox="0 0 24 24"><path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z" /></svg>
            </span>
            <span className="lg-t">Resguardo</span>
          </button>
          <div className="nav-l">
            <button onClick={() => document.getElementById('calendario')?.scrollIntoView()} className={activeTab === 'calendario' ? 'active-tab' : ''}>Calendario</button>
            <button onClick={() => document.getElementById('alcance')?.scrollIntoView()} className={activeTab === 'alcance' ? 'active-tab' : ''}>Su giro</button>
            <button onClick={() => document.getElementById('comparativa')?.scrollIntoView()} className={activeTab === 'comparativa' ? 'active-tab' : ''}>Comparativa</button>
            <button onClick={() => document.getElementById('diagnostico')?.scrollIntoView()} className={activeTab === 'diagnostico' ? 'active-tab' : ''}>Autoevaluación</button>
            <button onClick={() => document.getElementById('entregables')?.scrollIntoView()} className={activeTab === 'entregables' ? 'active-tab' : ''}>Honorarios</button>
            <button onClick={() => document.getElementById('glosario')?.scrollIntoView()} className={activeTab === 'glosario' ? 'active-tab' : ''}>Preguntas</button>
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
            <button onClick={() => document.getElementById('contacto')?.scrollIntoView()} className="btn btn-sm">Solicitar diagnóstico</button>
          </div>
        </div>
      </nav>
`;

// Footer extract
let footer = app.substring(app.indexOf('<footer className="pie">'));
// Clean footer links
footer = cleanCTAs(footer);

const newFileContent = newTopPart + returnStatement + navBlock + fullScrollContent + footer;

fs.writeFileSync('src/App.tsx', newFileContent);

