const fs = require('fs');

let app = fs.readFileSync('src/App.tsx', 'utf8');
const hero3dRegex = /<div className="hero-3d-obj">[\s\S]*?<\/div>\s*<div className="wrap hero-in">/;
if (hero3dRegex.test(app)) {
  app = app.replace(hero3dRegex, '<div className="wrap hero-in">');
  fs.writeFileSync('src/App.tsx', app);
}
