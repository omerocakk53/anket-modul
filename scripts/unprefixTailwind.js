const fs = require("fs");
const path = require("path");

const fileExtensions = [".js", ".jsx", ".ts", ".tsx", ".html"];
const targetDir = "./src";

const classNameRegex = /class(Name)?=["']([^"']+)["']/g;

function unprefixClasses(str) {
  return str
    .split(" ")
    .map((cls) => {
      if (cls.startsWith("tw-")) {
        return cls.replace(/^tw-/, "");
      }
      return cls;
    })
    .join(" ");
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");

  const updated = content.replace(classNameRegex, (match, isName, classes) => {
    const unprefixed = unprefixClasses(classes);
    return `class${isName || ""}="${unprefixed}"`;
  });

  if (updated !== content) {
    fs.writeFileSync(filePath, updated, "utf-8");
    console.log("🧹 Prefix kaldırıldı:", filePath);
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
console.log("✅ Prefix'ler temizlendi.");
