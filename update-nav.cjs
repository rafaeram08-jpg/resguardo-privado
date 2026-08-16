const fs = require('fs');

let app = fs.readFileSync('src/App.tsx', 'utf8');

const hamburgerButton = `
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
`;

app = app.replace(
  /            <button onClick=\{\(\) => document\.getElementById\('contacto'\)\?\.scrollIntoView\(\{ behavior: 'smooth' \}\)\} className="btn btn-sm">Solicitar diagnóstico<\/button>\n          <\/div>\n        <\/div>\n      <\/nav>/,
  `            <button onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })} className="btn btn-sm">Solicitar diagnóstico</button>` + hamburgerButton
);

fs.writeFileSync('src/App.tsx', app);
