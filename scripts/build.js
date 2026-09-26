const fs = require('fs');
const path = require('path');

const srcJsPath = path.join(__dirname, '..', 'src', 'cookie-access.js');
const srcCssPath = path.join(__dirname, '..', 'src', 'cookie-access.css');
const distDir = path.join(__dirname, '..', 'dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

let jsCode = fs.readFileSync(srcJsPath, 'utf8');
let cssCode = fs.readFileSync(srcCssPath, 'utf8');

// Minify CSS
const minCss = cssCode
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s*([\{\}:;,])\s*/g, '$1')
  .replace(/\s+/g, ' ')
  .trim();

// Write raw and minified CSS
fs.writeFileSync(path.join(distDir, 'cookie-access.css'), cssCode);
fs.writeFileSync(path.join(distDir, 'cookie-access.min.css'), minCss);

// Create the self-contained JS bundle with auto-embedded CSS
const autoCssInjection = `
(function() {
  if (typeof document !== 'undefined' && !document.getElementById('ca-embedded-styles')) {
    var style = document.createElement('style');
    style.id = 'ca-embedded-styles';
    style.textContent = ${JSON.stringify(minCss)};
    (document.head || document.documentElement).appendChild(style);
  }
})();
`;

const standaloneJs = autoCssInjection + '\n' + jsCode;

// Write raw and minified JS (both now self-contained for 100% reliability on Next.js, Vite, etc.)
fs.writeFileSync(path.join(distDir, 'cookie-access.js'), standaloneJs);
fs.writeFileSync(path.join(distDir, 'cookie-access.min.js'), standaloneJs);
fs.writeFileSync(path.join(distDir, 'cookie-access.bundle.js'), standaloneJs);
fs.writeFileSync(path.join(__dirname, '..', 'cookie-access.bundle.js'), standaloneJs);

// Fix dist/index.html script reference so it uses the bundle directly
const distIndexHtml = path.join(distDir, 'index.html');
if (fs.existsSync(distIndexHtml)) {
  let html = fs.readFileSync(distIndexHtml, 'utf8');
  html = html.replace('/src/cookie-access.js', './cookie-access.bundle.js');
  html = html.replace('src="/src/cookie-access.js"', 'src="./cookie-access.bundle.js"');
  html = html.replace('/src/cookie-access.css', './cookie-access.css');
  fs.writeFileSync(distIndexHtml, html);
}

console.log('✓ Successfully created:');
console.log('  - dist/cookie-access.css');
console.log('  - dist/cookie-access.min.css');
console.log('  - dist/cookie-access.js (Self-contained with auto-embedded styles)');
console.log('  - dist/cookie-access.min.js (Self-contained with auto-embedded styles)');
console.log('  - dist/cookie-access.bundle.js (All-in-one standalone bundle)');
console.log('  - cookie-access.bundle.js (Root CDN bundle)');

// Auto-purge jsDelivr global cache for @main so embeds get instant updates
const https = require('https');
const purgeFiles = [
  'dist/cookie-access.bundle.js',
  'cookie-access.bundle.js',
  'dist/cookie-access.min.js',
  'dist/cookie-access.js',
  'dist/cookie-access.min.css',
  'dist/cookie-access.css'
];

let pending = purgeFiles.length;
purgeFiles.forEach(file => {
  const url = `https://purge.jsdelivr.net/gh/nx1reps/cookie-access@main/${file}`;
  https.get(url, (res) => {
    res.resume();
    res.on('end', () => {
      pending--;
      if (pending <= 0) {
        console.log('✓ Triggered jsDelivr CDN cache flush for all @main distribution files');
        process.exit(0);
      }
    });
  }).on('error', () => {
    pending--;
    if (pending <= 0) process.exit(0);
  });
});

setTimeout(() => process.exit(0), 1500);
