const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');

const darkTheme = `
.dark {
  --ink: #FFFFFF;
  --ink-2: #F4F8F6;
  --ink-3: #EAF1ED;
  --verde: #3FB68C;
  --verde-2: #12986A;
  --verde-3: #0E7A55;
  --verde-soft: rgba(63, 182, 140, 0.15);
  --verde-soft-2: rgba(63, 182, 140, 0.25);
  --paper: #04140F;
  --mist: #061B14;
  --mist-2: #0B251B;
  --line: rgba(255, 255, 255, 0.1);
  --line-2: rgba(255, 255, 255, 0.15);
  --slate: #9BAE9F;
  --slate-2: #CBDAD3;
  --oro: #EBC167;
  --oro-soft: rgba(217, 169, 74, 0.15);
  --rojo: #E85D4E;
  --rojo-soft: rgba(194, 68, 56, 0.15);
  
  --sh: 0 4px 20px -4px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3);
  --sh-2: 0 12px 36px -8px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.4);
  --sh-hover: 0 20px 48px -12px rgba(0,0,0,0.7), 0 8px 24px rgba(0,0,0,0.5);
}
`;

if (!css.includes('.dark {')) {
  css = css.replace(':root{', ':root{\n  color-scheme: light dark;' + darkTheme + '} /* To be safely placed outside root, actually replace directly */');
  
  // Actually, better to just append .dark at the end of the variables section
  css = fs.readFileSync('src/index.css', 'utf8');
  css = css.replace(/--sh-hover:[^;]+;\n}/, match => match + darkTheme);
  fs.writeFileSync('src/index.css', css);
}
