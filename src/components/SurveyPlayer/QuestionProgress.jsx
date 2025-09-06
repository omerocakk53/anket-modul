const questionLabels = [
  "Kısa Metin",
  "Çoktan Seçmeli",
  "Uzun Metin",
  "Resimli Çoktan Seçmeli",
  "Soru Grubu",
  "Açılan Liste",
  "Sayısal Cevap",
  "Değerlendirme Ölçeği",
  "E-posta",
  "Derecelendirme",
  "Bağlantı/Site Adresi",
  "Sıralama",
  "Dosya Yükleme",
  "Matris",
  "Tablo",
];

export default function QuestionProgress({ currentItem, data }) {
  if (!currentItem) return null;
  if (!questionLabels.includes(currentItem.label)) return null;

  const questionItems = data.filter((i) => questionLabels.includes(i.label));
  const currentNumber =
    questionItems.findIndex((i) => i.id === currentItem.id) + 1;
  const total = questionItems.length;

  return (
    <div className="absolute top-4 left-0 right-0 text-center text-sm text-primary-text">
      {`Soru ${currentNumber} / ${total}`}
    </div>
  );
}
