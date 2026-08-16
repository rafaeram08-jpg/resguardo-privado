const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');

if (!css.includes('transition: background-color 0.3s ease, color 0.3s ease')) {
  css = css.replace('body{', 'body{transition: background-color 0.3s ease, color 0.3s ease;');
  fs.writeFileSync('src/index.css', css);
}
