const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');

// First, add new variables to :root and .dark
css = css.replace('--ink:#072A1F;', '--ink:#072A1F;\n  --surface-dark: #072A1F;\n  --text-on-dark: #FFFFFF;');
css = css.replace('--ink: #FFFFFF;', '--ink: #FFFFFF;\n  --surface-dark: #061B14;\n  --text-on-dark: #FFFFFF;');

// Now replace background:var(--ink) in specific dark components
const darkComponents = [
  '.hero',
  '.bd',
  '.pso b',
  '.cr.k',
  'thead th.hl',
  '.duo .card.dark',
  '.qt',
  '.pc.top',
  '.cta'
];

darkComponents.forEach(comp => {
  // We need to replace background:var(--ink) with background:var(--surface-dark)
  // and color:#fff with color:var(--text-on-dark) where applicable.
  // Using a simple regex to replace within the block of the component.
  
  const regex = new RegExp(`(${comp.replace(/\./g, '\\.')}\\{[^}]+)var\\(--ink\\)`, 'g');
  css = css.replace(regex, '$1var(--surface-dark)');
  
  const regexColor = new RegExp(`(${comp.replace(/\./g, '\\.')}\\{[^}]+)color:#fff`, 'g');
  css = css.replace(regexColor, '$1color:var(--text-on-dark)');
});

// Also fix linear-gradient in .mk
css = css.replace('var(--ink),var(--verde)', 'var(--surface-dark),var(--verde)');

// Also .duo .card.dark has border-color:var(--ink)
css = css.replace('.duo .card.dark{background:var(--surface-dark);border-color:var(--ink)', '.duo .card.dark{background:var(--surface-dark);border-color:var(--surface-dark)');
css = css.replace('.pc.top{background:var(--surface-dark);border-color:var(--ink)', '.pc.top{background:var(--surface-dark);border-color:var(--surface-dark)');
css = css.replace('.cr.k{background:var(--surface-dark);border-color:var(--ink)', '.cr.k{background:var(--surface-dark);border-color:var(--surface-dark)');

fs.writeFileSync('src/index.css', css);
