const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace('lang="en"', 'lang="es-MX"');
html = html.replace(/<title>.*?<\/title>/, '<title>Resguardo | Cumplimiento LFPIORPI</title>');
html = html.replace(/<meta name="description" content=".*?" \/>/, '<meta name="description" content="Documentación de cumplimiento para negocios que realizan Actividades Vulnerables en México. Proteja su empresa ante el SAT y evite multas." />');
html = html.replace(/<meta property="og:title" content=".*?" \/>/, '<meta property="og:title" content="Resguardo | Cumplimiento LFPIORPI" />');
html = html.replace(/<meta property="og:description" content=".*?" \/>/, '<meta property="og:description" content="Documentación de cumplimiento para negocios que realizan Actividades Vulnerables en México. Proteja su empresa ante el SAT y evite multas." />');

fs.writeFileSync('index.html', html);
