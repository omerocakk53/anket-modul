import AnswerItem from "../AnswerItem";
import { FiTrash2 } from "react-icons/fi";

export default function AnswerTable({ cevaplar, sorular, onDelete, isDeleting }) {
  if (!cevaplar || cevaplar.length === 0) {
    return (
      <div className="tw-text-center tw-py-10 tw-bg-neutral-white tw-rounded-lg tw-shadow-sm tw-border tw-text-neutral-dark">
        <p className="tw-text-lg tw-mb-2">Cevap bulunamadı</p>
        <p className="tw-text-sm tw-text-gray-500">Henüz bu ankete cevap verilmemiş.</p>
      </div>
    );
  }

  return (
    <div className="tw-space-y-6">
      {cevaplar.map((cevap, idx) => (
        <div
          key={cevap._id || idx}
          className="tw-bg-white tw-p-4 tw-rounded-lg tw-shadow-md tw-relative"
        >
          {/* Sil Butonu */}
          <button
            onClick={() => onDelete(cevap._id)}
            disabled={isDeleting}
            className="tw-absolute tw-top-4 tw-right-4 tw-p-2 tw-text-danger tw-hover:text-red-700 tw-disabled:opacity-50"
            title="Cevabı Sil"
          >
            <FiTrash2 size={18} />
          </button>

          {/* Başlık */}
          <h4 className="tw-text-md tw-font-bold tw-text-neutral-darkest tw-mb-4 tw-pr-8">
            Cevap İd: #{idx + 1} <br /> Cevap Tarihi: {new Date(cevap.createdAt).toLocaleString("tr-TR")} <br />  Cevaplayan İd: {cevap._id} <br /> Cevaplayan İsmi: {cevap.userName}
          </h4>

          {/* Cevaplar */}
          <div className="tw-divide-y">
            {sorular.map((soru, i) => {
              const ans = cevap.answers.find((a) => a.itemType === soru.type);
              if (!ans) return null;
              return <AnswerItem key={soru.id} index={i+1} soru={soru} cevap={ans} />;
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
