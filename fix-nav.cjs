const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');

css = css.replace('--paper:#FFFFFF;', '--paper:#FFFFFF;\n  --nav-bg: rgba(255, 255, 255, 0.87);');
css = css.replace('--paper: #04140F;', '--paper: #04140F;\n  --nav-bg: rgba(4, 20, 15, 0.87);');
css = css.replace('.nav{position:sticky;top:0;z-index:100;background:rgba(255,255,255,.87);', '.nav{position:sticky;top:0;z-index:100;background:var(--nav-bg);');

fs.writeFileSync('src/index.css', css);
