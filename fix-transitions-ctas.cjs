const fs = require('fs');

let app = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Fix transitions
app = app.replace(/initial=\{\{ opacity: 0, y: 20 \}\} animate=\{\{ opacity: 1, y: 0 \}\} exit=\{\{ opacity: 0, y: -20 \}\}/g, 'initial={{ opacity: 0, scale: 0.98, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: -15 }}');

// 2. Remove "Powered by Synthos"
app = app.replace(/<span className="lg-t">Resguardo<span>Powered by Synthos<\/span><\/span>/, '<span className="lg-t">Resguardo</span>');

// 3. Remove 3D Hero
const hero3dRegex = /\{\/\* 3D Core Element \*\/\}[\s\S]*?\{\/\* End 3D Core \*\/\}/;
// Since I don't know exactly where the 3D core ends, let's just use regex or substring replacing
