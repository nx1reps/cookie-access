const fs = require('fs');
const path = require('path');

const srcJsPath = path.join(__dirname, '..', 'src', 'cookie-access.js');
const srcCssPath = path.join(__dirname, '..', 'src', 'cookie-access.css');
const distDir = path.join(__dirname, '..', 'dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy standalone library files directly to dist/
fs.copyFileSync(srcJsPath, path.join(distDir, 'cookie-access.js'));
fs.copyFileSync(srcCssPath, path.join(distDir, 'cookie-access.css'));

// Create lightweight minified versions (stripping comments and excess whitespace)
let jsCode = fs.readFileSync(srcJsPath, 'utf8');
let cssCode = fs.readFileSync(srcCssPath, 'utf8');

// Basic minification
const minCss = cssCode
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s*([\{\}:;,])\s*/g, '$1')
  .replace(/\s+/g, ' ')
  .trim();

fs.writeFileSync(path.join(distDir, 'cookie-access.min.css'), minCss);
fs.writeFileSync(path.join(distDir, 'cookie-access.min.js'), jsCode);

console.log('✓ Successfully created dist/cookie-access.js, dist/cookie-access.min.js, and CSS files!');
