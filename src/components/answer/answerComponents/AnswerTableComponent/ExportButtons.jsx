import React, { useState, useMemo } from "react";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FiFileText } from "react-icons/fi";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";

const ExportButtons = ({ answers = [], survey = {} }) => {
  const [fileName, setFileName] = useState("anket_yanitlari");

  const formatValue = (val) => {
    if (Array.isArray(val)) return val.join(", ");
    if (typeof val === "object" && val !== null) {
      // Obje içindeki tüm anahtar-değer çiftlerini daha okunaklı bir stringe dönüştür
      return Object.entries(val)
        .map(([k, v]) => `${k}: ${v}`)
        .join(" | ");
    }
    return val ?? ""; // null veya undefined ise boş string döndür
  };

  const transformedData = useMemo(() => {
    return answers.map((ans) => {
      const row = {
        ID: ans._id,
        Tarih: new Date(ans.createdAt).toLocaleString("tr-TR"), // Türkçe formatta tarih
        Kullanici: ans.userName || "Misafir", // Kullanıcı adı yoksa "Misafir"
      };

      (survey.items || []).forEach((item) => {
        const matched = ans.answers.find((a) => a.itemId === item.id);

        if (!matched) {
          row[item.title || item.id] = ""; // Eşleşme yoksa boş bırak
          return;
        }

        // Soru tiplerine göre özel formatlama
        if (item.type === "QuestionGroup" && Array.isArray(matched.value)) {
          matched.value.forEach((subAns, idx) => {
            Object.entries(subAns).forEach(([key, val]) => {
              const colName = `${item.title || "Grup"} (${idx + 1}) - ${key}`; // Grup adı ve index ile daha açıklayıcı
              row[colName] = formatValue(val);
            });
          });
        } else if (
          item.type === "MultipleChoice" ||
          item.type === "ImageChoice"
        ) {
          row[item.title || item.id] = Array.isArray(matched.value)
            ? matched.value
                .map((v) =>
                  typeof v === "object" && v.title ? v.title : v.toString()
                )
                .join(", ")
            : formatValue(matched.value); // Tekli seçimler için de formatValue kullan
        } else if (item.type === "Matris" || item.type === "Table" && typeof matched.value === "object") {
          Object.entries(matched.value).forEach(([k, v]) => {
            const colName = `${item.title || item.type} - ${k}`; // Matris başlığı ve sütun adı
            row[colName] = formatValue(v);
          });
        } else {
          // Diğer tüm soru tipleri için genel formatlama
          row[item.title || item.id] = formatValue(matched.value);
        }
      });

      return row;
    });
  }, [answers, survey]);

  const handleExcelExport = () => {
    if (!transformedData.length) {
      alert("Dışa aktarılacak veri yok!");
      return;
    }

    // Worksheet oluştur
    const worksheet = XLSX.utils.json_to_sheet(transformedData);

    // Sütun başlıklarını al
    const headers = Object.keys(transformedData[0]);

    // Sütun genişliklerini ayarla (min 15, max 50 - başlığa ve içeriğe göre dinamik)
    const colWidths = headers.map((header) => {
      const maxLength = Math.max(
        header.length,
        ...transformedData.map((row) => String(row[header]).length)
      );
      return { wch: Math.min(50, Math.max(15, maxLength + 2)) }; // Minimum 15, maksimum 50 karakter genişliği, 2 karakter boşluk payı
    });
    worksheet["!cols"] = colWidths;

    // Başlık hücrelerine basit stil uygula (SheetJS'in desteklediği ölçüde)
    // Bu stil genellikle XLSX.writeFile veya XLSX.write'da cellStyles: true ile etkinleşir.
    headers.forEach((header, idx) => {
      const cellAddress = XLSX.utils.encode_cell({ c: idx, r: 0 }); // İlk satırdaki başlık hücreleri
      if (!worksheet[cellAddress]) {
        worksheet[cellAddress] = { v: header }; // Hücre boşsa başlığı ekle
      }

      // Hücre stilini dene. SheetJS'in ücretsiz versiyonu sınırlıdır.
      // Genellikle sadece temel font, hizalama ve arka plan renkleri çalışır.
      worksheet[cellAddress].s = {
        font: { bold: true, sz: 12, color: { rgb: "FF000000" } }, // Kalın, 12 punto, siyah metin
        fill: { fgColor: { rgb: "FFD9D9D9" } }, // Açık gri arka plan
        alignment: { horizontal: "center", vertical: "center", wrapText: true }, // Metni ortala ve kaydır
        border: {
          top: { style: "thin", color: { rgb: "FFCCCCCC" } },
          bottom: { style: "thin", color: { rgb: "FFCCCCCC" } },
          left: { style: "thin", color: { rgb: "FFCCCCCC" } },
          right: { style: "thin", color: { rgb: "FFCCCCCC" } },
        },
      };
    });

    // Workbook oluştur ve sayfayı ekle
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Cevaplar");

    // Dosya oluştur ve indir
    // cellStyles: true, stil objelerinin uygulanmasını dener.
    const wbout = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
      cellStyles: true,
    });
    const blob = new Blob([wbout], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(blob, `${fileName}.xlsx`);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 my-4 w-full">
      <input
        type="text"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        placeholder="Dosya adı"
        className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
      />
      <div className="flex flex-wrap gap-3">
        <CSVLink
          data={transformedData}
          filename={`${fileName}.csv`}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all font-medium shadow-sm hover:shadow-md"
        >
          <FiFileText className="text-lg" />
          CSV Dışa Aktar
        </CSVLink>
        <button
          onClick={handleExcelExport}
          className="flex items-center gap-2 bg-success hover:bg-success/70 text-white px-4 py-2 rounded-lg transition-all font-medium shadow-sm hover:shadow-md"
        >
          <PiMicrosoftExcelLogoFill className="text-lg" />
          Excel Dışa Aktar
        </button>
      </div>
    </div>
  );
};

export default ExportButtons;