const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');

css = css.replace('.widget-in{background:#fff;color:var(--ink);', '.widget-in{background:var(--paper);color:var(--ink);');
css = css.replace('.duo .card.oro{background:var(--oro-soft);border-color:#F0E2C0}', '.duo .card.oro{background:var(--oro-soft);border-color:var(--line-2)}');
css = css.replace('.card.oro .lst li{border-bottom-color:#EFE0BE}', '.card.oro .lst li{border-bottom-color:var(--line)}');
css = css.replace('.btn-w{background:#fff;color:var(--ink)}', '.btn-w{background:var(--paper);color:var(--ink)}');
css = css.replace('.tb[aria-selected="true"]{background:transparent;border-color:transparent;color:#fff}', '.tb[aria-selected="true"]{background:transparent;border-color:transparent;color:var(--paper)}');

fs.writeFileSync('src/index.css', css);
