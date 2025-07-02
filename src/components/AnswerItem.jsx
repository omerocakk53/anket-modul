import { Tooltip } from "react-tooltip";
import { FiHelpCircle, FiEdit, FiFileText, FiMail, FiHash, FiBarChart2, FiStar, FiChevronDown, FiCheckSquare, FiImage, FiLayers, FiFile, FiGrid } from "react-icons/fi";

const ICONS = {
  ShortText: FiEdit,
  LongText: FiFileText,
  Email: FiMail,
  Numeric: FiHash,
  Scale: FiBarChart2,
  Rating: FiStar,
  Dropdown: FiChevronDown,
  MultipleChoice: FiCheckSquare,
  ImageChoice: FiImage,
  QuestionGroup: FiLayers,
  Matris: FiGrid,
  FileUpload: FiFile,
};

const getLabel = (type) => ({
  ShortText: "Kısa Metin", LongText: "Uzun Metin", Email: "E-posta", Numeric: "Sayısal",
  Scale: "Skala", Rating: "Derecelendirme", Dropdown: "Açılır Menü", MultipleChoice: "Çoktan Seçmeli",
  ImageChoice: "Görsel Seçimi", QuestionGroup: "Soru Grubu", Matris: "Matris", FileUpload: "Dosya Yükleme",
}[type] || type);

const renderValue = (type, value) => {
  if (!value) return <em>Yanıt yok.</em>;

  if (typeof value === "object") {
    const renderObject = (obj) => (
      <div className="tw-grid tw-grid-cols-2 tw-gap-1">
        {Object.entries(obj).map(([k, v], i) => (
          <div key={i} className="tw-bg-gray-100 tw-p-2 tw-mb-2 tw-rounded-md">
            <b>{isNaN(k) ? k : parseInt(k) + 1}:</b>{" "}
            {typeof v === "object" && v !== null
              ? renderObject(v) // Recursive gösterim
              : String(v)}
          </div>
        ))}
      </div>
    );
    return renderObject(value);
  }


  return <p>{value}</p>;
};


export default function AnswerItem({ index, soru, cevap }) {
  const Icon = ICONS[soru.iconKey || soru.itemType] || FiHelpCircle;
  const label = getLabel(soru.type);
  return (
    <div className="tw-mb-4 tw-border-l-4 tw-border-blue-500 tw-pl-3">
      <p className="tw-text-blue-600 tw-font-semibold tw-flex tw-items-center tw-gap-1">
        <span data-tooltip-id={`tt-${soru.id}`} data-tooltip-content={label}>
          <Icon className="tw-w-5 tw-h-5 tw-cursor-pointer" />
        </span>
        {index}. Soru: {soru.title || soru.label || soru.id}
      </p>
      <p className="tw-text-sm tw-text-gray-500 tw-italic">({label})</p>
      <div className="tw-mt-1">{renderValue(soru.itemType, cevap?.value)}</div>
      <Tooltip id={`tt-${soru.id}`} place="top" effect="solid" />
    </div>
  );
}
