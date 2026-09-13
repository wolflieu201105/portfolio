import { cpSync, mkdirSync, rmSync } from 'node:fs';

const output = 'dist';
const entries = ['index.html', 'style.css', 'script.js', 'favicon.ico'];
const assets = [
  'assets/Gia_Huy_Pham_Resume.pdf',
  'assets/images/profile.jpg',
  'assets/images/project3.png',
];

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

for (const entry of entries) {
  cpSync(entry, `${output}/${entry}`, { recursive: true });
}

for (const asset of assets) {
  mkdirSync(`${output}/${asset.substring(0, asset.lastIndexOf('/'))}`, { recursive: true });
  cpSync(asset, `${output}/${asset}`);
}

console.log('Portfolio built in dist/');
