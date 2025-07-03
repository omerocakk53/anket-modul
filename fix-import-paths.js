const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, 'src'); // kütüphanendeki kaynak klasör

// Düzeltmek istediğin import ifadesi (örnek)
const importToFix = '../utils/toastUtils';

// Taranacak dosya uzantıları
const exts = ['.js', '.jsx', '.ts', '.tsx'];

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else if (exts.includes(path.extname(file))) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

function fixImports() {
  const files = getAllFiles(rootDir);

  files.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');

    if (!content.includes(importToFix)) return;

    const fileDir = path.dirname(filePath);
    const targetModule = path.resolve(rootDir, 'utils', 'toastUtils.js');

    // Dosya klasöründen toastUtils.js dosyasına göreceli yolu hesapla
    let relativeImportPath = path.relative(fileDir, targetModule);

    // Windows pathlerini unix style yap
    relativeImportPath = relativeImportPath.replace(/\\/g, '/');

    // Uzantıyı kaldır (importlarda genelde dosya uzantısı olmaz)
    relativeImportPath = relativeImportPath.replace(/\.js$/, '');

    // Dosya içeriğinde importToFix geçen tüm satırları değiştir
    const fixedContent = content.replace(new RegExp(importToFix, 'g'), relativeImportPath);

    fs.writeFileSync(filePath, fixedContent, 'utf8');
    console.log(`Düzenlendi: ${filePath}`);
  });
}

fixImports();
