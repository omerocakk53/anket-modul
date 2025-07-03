import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { Toaster, toast } from 'react-hot-toast' // toast ekle

export default function CreateNewGroupModal({
  isOpen,
  onClose,
  title,
  setTitle,
  description,
  setDescription,
  newGroupName,
  setNewGroupName,
  currentStep,
  setCurrentStep,
  handleCreateNewGroupAndSurvey
}) {
  const handleSubmitStep1 = (e) => {
    e.preventDefault();
    if (!newGroupName.trim()) {
      toast.error("Klasör adı boş bırakılamaz.");
      return;
    }
    setCurrentStep(2);
  };

  const handleSubmitStep2 = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Anket başlığı boş bırakılamaz.");
      return;
    } else if (!description.trim()) {
      toast.error("Anket açıklaması boş bırakılamaz.");
      return;
    }
    setCurrentStep(3);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl p-8 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-700 hover:text-red-600 transition"
        >
          <IoMdClose size={26} />
        </button>

        <h3 className="text-2xl font-semibold text-center text-neutral-800 mb-6">
          Yeni Klasör ve Anket Oluştur
        </h3>

        {/* Step 1 */}
        {currentStep === 1 && (
          <form onSubmit={handleSubmitStep1} className="space-y-6">
            <div>
              <label htmlFor="new-group-name" className="block font-medium text-neutral-700 mb-1">
                Yeni Klasör Adı <span className="text-red-500">*</span>
              </label>
              <input
                id="new-group-name"
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                className="w-full border border-neutral-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none transition"
                placeholder="Yeni klasörünüz için bir isim girin"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-xl hover:bg-primary-dark transition disabled:opacity-50"
                disabled={!newGroupName.trim()}
              >
                İleri
              </button>
            </div>
          </form>
        )}

        {/* Step 2 */}
        {currentStep === 2 && (
          <form onSubmit={handleSubmitStep2} className="space-y-6">
            <div>
              <label htmlFor="title" className="block font-medium text-neutral-700 mb-1">
                Anket Başlığı <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-neutral-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none transition"
                placeholder="Anket başlığı girin"
              />
            </div>
            <div>
              <label htmlFor="description" className="block font-medium text-neutral-700 mb-1">
                Açıklama (İsteğe Bağlı)
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-neutral-300 rounded-xl px-4 py-2 h-24 resize-y focus:ring-2 focus:ring-primary focus:outline-none transition"
                placeholder="Anketin amacı hakkında bilgi verin"
              />
            </div>
            <div className="flex justify-between gap-4">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="border border-secondary text-secondary px-6 py-2 rounded-xl hover:bg-secondary/10 transition"
              >
                Geri
              </button>
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-xl hover:bg-primary-dark transition disabled:opacity-50"
                disabled={!title.trim() || !description.trim()}
              >
                İleri
              </button>
            </div>
          </form>
        )}

        {/* Step 3 */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <p className="text-center text-neutral-800">
              Yeni klasör ve ilk anketinizi oluşturmak üzeresiniz:
            </p>
            <div className="bg-neutral-100 p-4 rounded-xl space-y-2 border border-neutral-300">
              <p><strong>Klasör Adı:</strong> <span className="text-primary">{newGroupName}</span></p>
              <p><strong>Anket Başlığı:</strong> <span className="text-primary">{title}</span></p>
              <p><strong>Açıklama:</strong> {description || <span className="italic text-neutral-500">Yok</span>}</p>
            </div>
            <div className="flex justify-between gap-4">
              <button
                onClick={() => setCurrentStep(2)}
                className="border border-secondary text-secondary px-6 py-2 rounded-xl hover:bg-secondary/10 transition"
              >
                Geri
              </button>
              <button
                onClick={handleCreateNewGroupAndSurvey}
                className="bg-primary text-white px-6 py-2 rounded-xl hover:bg-primary-dark transition"
              >
                Oluştur
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
