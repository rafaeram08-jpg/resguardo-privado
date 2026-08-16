const fs = require('fs');

let app = fs.readFileSync('src/App.tsx', 'utf8');
app = app.replace(/<span style=\{\{ color: 'rgba\(255,255,255,\.42\)' \}\}>Powered by Synthos<\/span>/g, '');
fs.writeFileSync('src/App.tsx', app);
