const fs = require('fs');

let app = fs.readFileSync('src/App.tsx', 'utf8');

app = app.replace(/initial=\{\{ opacity: 0, y: 20 \}\}/g, 'initial={{ opacity: 0, scale: 0.98, y: 15 }}');
app = app.replace(/animate=\{\{ opacity: 1, y: 0 \}\}/g, 'animate={{ opacity: 1, scale: 1, y: 0 }}');
app = app.replace(/exit=\{\{ opacity: 0, y: -20 \}\}/g, 'exit={{ opacity: 0, scale: 0.96, y: -15 }}');

fs.writeFileSync('src/App.tsx', app);
