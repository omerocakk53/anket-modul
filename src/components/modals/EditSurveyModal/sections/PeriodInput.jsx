import React from "react";
import { FiX } from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function PeriodInput({
  periods,
  setPeriods,
  newPeriod,
  setNewPeriod,
}) {
  const handleAddPeriod = () => {
    if (!newPeriod.startDate || !newPeriod.endDate)
      return toast.error("Başlangıç ve bitiş tarihleri gerekli.");

    const start = new Date(newPeriod.startDate);
    const end = new Date(newPeriod.endDate);
    if (end < start)
      return toast.error("Bitiş tarihi başlangıçtan küçük olamaz.");

    if (periods.length > 0) {
      const lastEnd = new Date(periods[periods.length - 1].endDate);
      if (start < lastEnd)
        return toast.error(
          "Yeni başlangıç tarihi önceki bitiş tarihinden küçük olamaz.",
        );
    }

    setPeriods([...periods, { ...newPeriod, active: true }]);
    setNewPeriod({ startDate: "", endDate: "" });
  };

  const handleRemovePeriod = (index) =>
    setPeriods(periods.filter((_, i) => i !== index));

  return (
    <div>
      <label className="block text-sm font-medium text-primary-dark mb-1">
        Aktif Tarih Aralıkları
      </label>
      <div className="flex gap-2 mb-2">
        <input
          type="datetime-local"
          value={newPeriod.startDate}
          onChange={(e) =>
            setNewPeriod({ ...newPeriod, startDate: e.target.value })
          }
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="datetime-local"
          value={newPeriod.endDate}
          onChange={(e) =>
            setNewPeriod({ ...newPeriod, endDate: e.target.value })
          }
          className="w-full p-2 border rounded-lg"
        />
        <button
          type="button"
          onClick={handleAddPeriod}
          className="bg-primary text-white px-4 rounded"
        >
          Ekle
        </button>
      </div>

      <div className="space-y-2">
        {periods.map((p, idx) => {
          const now = new Date();
          const isActive = new Date(p.endDate) > now;
          const startDate = new Date(p.startDate).toLocaleDateString();
          const endDate = new Date(p.endDate).toLocaleString();

          return (
            <div
              key={idx}
              className={`flex items-center justify-between bg-gray-100 p-2 rounded mb-2 border ${
                isActive
                  ? "border-success bg-success/5 text-success"
                  : "border-danger bg-danger/5 text-danger"
              }`}
            >
              <div>
                <p className="text-sm">
                  <strong>Başlangıç:</strong> {startDate} &nbsp;
                  <strong>Bitiş:</strong> {endDate}
                </p>
                <div
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-full border font-medium text-xs mt-1 ${
                    isActive
                      ? "text-success bg-success/10 border-success"
                      : "text-danger bg-danger/10 border-danger"
                  }`}
                >
                  {isActive ? "Aktif" : "Pasif"}
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemovePeriod(idx)}
                className="text-danger hover:text-danger-dark"
                title="Bu partı kaldır"
              >
                <FiX size={18} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
