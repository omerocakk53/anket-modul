const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const outputFile = path.join(srcDir, 'index.js');

function getAllFiles(dirPath, arrayOfFiles = [], basePath = dirPath) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    const relativePath = './' + path.relative(basePath, fullPath).replace(/\\/g, '/');

    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles, basePath);
    } else if ((file.endsWith('.js') || file.endsWith('.jsx')) && file !== 'index.js') {
      arrayOfFiles.push(relativePath.replace(/\.jsx?$/, '')); // remove .js/.jsx
    }
  });

  return arrayOfFiles;
}

const allModules = getAllFiles(srcDir);
const exportLines = allModules.map(p => `export * from '${p}';`);

fs.writeFileSync(outputFile, exportLines.join('\n') + '\n');
console.log(`✅ ${outputFile} dosyasına ${exportLines.length} adet export eklendi.`);
