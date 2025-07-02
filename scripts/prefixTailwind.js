// scripts/prefixTailwind.js
const fs = require("fs");
const path = require("path");

const fileExtensions = [".js", ".jsx", ".ts", ".tsx", ".html"];
const targetDir = "./src"; // kendi kaynak klasörün

// Tailwind regex (çoklu className içindeki kelimeleri bul)
const classNameRegex = /class(Name)?=["']([^"']+)["']/g;

function prefixClasses(str) {
  return str
    .split(" ")
    .map((cls) => {
      if (cls.startsWith("tw-") || cls.startsWith("{") || cls.includes("tw`")) return cls;
      return `tw-${cls}`;
    })
    .join(" ");
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");

  const updated = content.replace(classNameRegex, (match, isName, classes) => {
    const prefixed = prefixClasses(classes);
    return `class${isName || ""}="${prefixed}"`;
  });

  if (updated !== content) {
    fs.writeFileSync(filePath, updated, "utf-8");
    console.log("Updated:", filePath);
  }
}

function walk(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fileExtensions.includes(path.extname(fullPath))) {
      processFile(fullPath);
    }
  });
}

walk(targetDir);
console.log("✅ Prefix işlemi tamamlandı.");
