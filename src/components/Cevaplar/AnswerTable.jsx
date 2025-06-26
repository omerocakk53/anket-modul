import AnswerItem from "../AnswerItem";
import { FiTrash2 } from "react-icons/fi";

export default function AnswerTable({ cevaplar, sorular, onDelete, isDeleting }) {
  if (!cevaplar || cevaplar.length === 0) {
    return (
      <div className="text-center py-10 bg-neutral-white rounded-lg shadow-sm border text-neutral-dark">
        <p className="text-lg mb-2">Cevap bulunamadı</p>
        <p className="text-sm text-gray-500">Henüz bu ankete cevap verilmemiş.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {cevaplar.map((cevap, idx) => (
        <div
          key={cevap._id || idx}
          className="bg-white p-4 rounded-lg shadow-md relative"
        >
          {/* Sil Butonu */}
          <button
            onClick={() => onDelete(cevap._id)}
            disabled={isDeleting}
            className="absolute top-4 right-4 p-2 text-danger hover:text-red-700 disabled:opacity-50"
            title="Cevabı Sil"
          >
            <FiTrash2 size={18} />
          </button>

          {/* Başlık */}
          <h4 className="text-md font-bold text-neutral-darkest mb-4 pr-8">
            Cevap İd: #{idx + 1} <br /> Cevap Tarihi: {new Date(cevap.createdAt).toLocaleString("tr-TR")} <br />  Cevaplayan İd: {cevap._id} <br /> Cevaplayan İsmi: {cevap.userName}
          </h4>

          {/* Cevaplar */}
          <div className="divide-y">
            {sorular.map((soru, i) => {
              const ans = cevap.find((a) => a._id === soru._id);
              if (!ans) return null;
              return <AnswerItem key={soru._id} index={i} soru={soru} cevap={ans} />;
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
