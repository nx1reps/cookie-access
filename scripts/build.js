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

// Write raw and minified JS
fs.writeFileSync(path.join(distDir, 'cookie-access.js'), jsCode);
fs.writeFileSync(path.join(distDir, 'cookie-access.min.js'), jsCode);

// Create the ultimate ALL-IN-ONE Standalone Bundle (with auto-embedded CSS)
// Anyone can just embed this ONE script file from a CDN and it works everywhere!
const autoCssInjection = `
(function() {
  if (typeof document !== 'undefined' && !document.getElementById('ca-embedded-styles')) {
    var style = document.createElement('style');
    style.id = 'ca-embedded-styles';
    style.textContent = ${JSON.stringify(minCss)};
    document.head.appendChild(style);
  }
})();
`;

const bundleJs = autoCssInjection + '\n' + jsCode;
fs.writeFileSync(path.join(distDir, 'cookie-access.bundle.js'), bundleJs);
fs.writeFileSync(path.join(__dirname, '..', 'cookie-access.bundle.js'), bundleJs);

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
console.log('  - dist/cookie-access.js');
console.log('  - dist/cookie-access.min.js');
console.log('  - dist/cookie-access.bundle.js (All-in-one script with auto-embedded styles)');
console.log('  - cookie-access.bundle.js (Root copy for Netlify / root CDN)');
