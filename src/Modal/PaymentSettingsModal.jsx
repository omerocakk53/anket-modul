import React, { useEffect, useState } from "react";
import Payment from "../components/Items/Payment";
import ModalLayout from "../components/Layouts/ModalLayout";

function PaymentSettingsModal({ isOpen, onClose, onSave, initialData, count }) {
  const [title, setTitle] = useState("");
  const [helpText, setHelpText] = useState("");
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("₺"); // ✅ yeni: para birimi
  const [SurveyNumberVisible, setSurveyNumberVisible] = useState(true);

  const handleSave = () => {
    onSave({ title, helpText, amount, currency, SurveyNumberVisible }); // ✅ currency dahil edildi
    setTitle("");
    setHelpText("");
    setAmount(0);
    setCurrency("₺");
  };

  useEffect(() => {
    if (initialData && Object.keys(initialData).length !== 0) {
      setTitle(initialData.title || "");
      setHelpText(initialData.helpText || "");
      setAmount(initialData.amount || 0);
      setCurrency(initialData.currency || "₺"); // ✅ varsa ayarla
      setSurveyNumberVisible(initialData?.SurveyNumberVisible);
    } else {
      setTitle("");
      setHelpText("");
      setAmount(0);
      setCurrency("₺");
      setSurveyNumberVisible(true);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const leftPanel = (
    <div className="space-y-2">
      <h2 className="text-lg font-bold">Ödeme Alanı Ayarları</h2>

      {/* Başlık */}
      <div>
        <label className="block text-sm font-medium mb-1">Başlık</label>
        <input
          className="w-full border rounded p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ödeme başlığı"
        />
      </div>

      {/* Yardım Metni */}
      <div>
        <label className="block text-sm font-medium mb-1">Yardım Metni (isteğe bağlı)</label>  <input
          className="w-full border rounded p-2"
          value={helpText}
          onChange={(e) => setHelpText(e.target.value)}
        />
      </div>

      {/* Tutar */}
      <div>
        <label className="block text-sm font-medium mb-1">Tutar ({currency})</label>
        <input
          type="number"
          className="w-full border rounded p-2"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="0"
        />
      </div>

      {/* ✅ Para Birimi Seçimi */}
      <div>
        <label className="block text-sm font-medium mb-1">Para Birimi</label>
        <select
          className="w-full border rounded p-2"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="₺">Türk Lirası (₺)</option>
          <option value="$">Dolar ($)</option>
          <option value="€">Euro (€)</option>
          <option value="£">Sterlin (£)</option>
        </select>
      </div>

      {/* Soru numarası */}
      <div className="flex items-center space-x-3">
        <label
          className="text-sm font-medium text-primary-dark select-none cursor-pointer"
          onClick={() => setSurveyNumberVisible(prev => !prev)}
        >
          Soru Numarası Gözüksün
        </label>
        <button
          type="button"
          aria-pressed={SurveyNumberVisible}
          onClick={() => setSurveyNumberVisible(prev => !prev)}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${SurveyNumberVisible ? 'bg-primary' : 'bg-neutral-light'}`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${SurveyNumberVisible ? 'translate-x-6' : 'translate-x-0'}`}
          />
        </button>
      </div>

      {/* Butonlar */}
      <div className="flex gap-2 p-5 absolute left-0 bottom-0 bg-neutral md:w-1/2 w-full ">
        <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>Vazgeç</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSave}>Kaydet</button>
      </div>
    </div>
  );

  const rightPanel = (
    <Payment
      title={title}
      helpText={helpText}
      amount={amount}
      currency={currency} // ✅ yeni prop
      count={count}
      SurveyNumberVisible={SurveyNumberVisible}
    />
  );

  return <ModalLayout leftPanel={leftPanel} rightPanel={rightPanel} />;
}

export default PaymentSettingsModal;
