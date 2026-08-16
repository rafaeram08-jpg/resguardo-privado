const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');
app = app.replace(/\/\/ Check URL path on mount to show 404 if path is not root\s*useEffect\(\(\) => \{\s*if \(window\.location\.pathname !== '\/' && window\.location\.pathname !== '\/index\.html'\) \{\s*setActiveTab\('404'\);\s*\}\s*\}, \[\]\);/g, '');
fs.writeFileSync('src/App.tsx', app);
