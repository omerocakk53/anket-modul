import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';

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
    <div className="tw-fixed tw-inset-0 tw-z-50 tw-bg-black/40 tw-flex tw-items-center tw-justify-center">
      <div className="tw-bg-white tw-w-full tw-max-w-xl tw-rounded-2xl tw-shadow-2xl tw-p-8 tw-relative tw-animate-fade-in">
        <button
          onClick={onClose}
          className="tw-absolute tw-top-4 tw-right-4 tw-text-neutral-700 tw-hover:text-red-600 tw-transition"
        >
          <IoMdClose size={26} />
        </button>

        <h3 className="tw-text-2xl tw-font-semibold tw-text-center tw-text-neutral-800 tw-mb-6">
          Yeni Klasör ve Anket Oluştur
        </h3>

        {/* Step 1 */}
        {currentStep === 1 && (
          <form onSubmit={handleSubmitStep1} className="tw-space-y-6">
            <div>
              <label htmlFor="new-group-name" className="tw-block tw-font-medium tw-text-neutral-700 tw-mb-1">
                Yeni Klasör Adı <span className="tw-text-red-500">*</span>
              </label>
              <input
                id="new-group-name"
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                className="tw-w-full tw-border tw-border-neutral-300 tw-rounded-xl tw-px-4 tw-py-2 tw-focus:ring-2 tw-focus:ring-primary tw-focus:outline-none tw-transition"
                placeholder="Yeni klasörünüz için bir isim girin"
              />
            </div>
            <div className="tw-flex tw-justify-end">
              <button
                type="submit"
                className="tw-bg-primary tw-text-white tw-px-6 tw-py-2 tw-rounded-xl tw-hover:bg-primary-dark tw-transition tw-disabled:opacity-50"
                disabled={!newGroupName.trim()}
              >
                İleri
              </button>
            </div>
          </form>
        )}

        {/* Step 2 */}
        {currentStep === 2 && (
          <form onSubmit={handleSubmitStep2} className="tw-space-y-6">
            <div>
              <label htmlFor="title" className="tw-block tw-font-medium tw-text-neutral-700 tw-mb-1">
                Anket Başlığı <span className="tw-text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="tw-w-full tw-border tw-border-neutral-300 tw-rounded-xl tw-px-4 tw-py-2 tw-focus:ring-2 tw-focus:ring-primary tw-focus:outline-none tw-transition"
                placeholder="Anket başlığı girin"
              />
            </div>
            <div>
              <label htmlFor="description" className="tw-block tw-font-medium tw-text-neutral-700 tw-mb-1">
                Açıklama (İsteğe Bağlı)
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="tw-w-full tw-border tw-border-neutral-300 tw-rounded-xl tw-px-4 tw-py-2 tw-h-24 tw-resize-y tw-focus:ring-2 tw-focus:ring-primary tw-focus:outline-none tw-transition"
                placeholder="Anketin amacı hakkında bilgi verin"
              />
            </div>
            <div className="tw-flex tw-justify-between tw-gap-4">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="tw-border tw-border-secondary tw-text-secondary tw-px-6 tw-py-2 tw-rounded-xl tw-hover:bg-secondary/10 tw-transition"
              >
                Geri
              </button>
              <button
                type="submit"
                className="tw-bg-primary tw-text-white tw-px-6 tw-py-2 tw-rounded-xl tw-hover:bg-primary-dark tw-transition tw-disabled:opacity-50"
                disabled={!title.trim() || !description.trim()}
              >
                İleri
              </button>
            </div>
          </form>
        )}

        {/* Step 3 */}
        {currentStep === 3 && (
          <div className="tw-space-y-6">
            <p className="tw-text-center tw-text-neutral-800">
              Yeni klasör ve ilk anketinizi oluşturmak üzeresiniz:
            </p>
            <div className="tw-bg-neutral-100 tw-p-4 tw-rounded-xl tw-space-y-2 tw-border tw-border-neutral-300">
              <p><strong>Klasör Adı:</strong> <span className="tw-text-primary">{newGroupName}</span></p>
              <p><strong>Anket Başlığı:</strong> <span className="tw-text-primary">{title}</span></p>
              <p><strong>Açıklama:</strong> {description || <span className="tw-italic tw-text-neutral-500">Yok</span>}</p>
            </div>
            <div className="tw-flex tw-justify-between tw-gap-4">
              <button
                onClick={() => setCurrentStep(2)}
                className="tw-border tw-border-secondary tw-text-secondary tw-px-6 tw-py-2 tw-rounded-xl tw-hover:bg-secondary/10 tw-transition"
              >
                Geri
              </button>
              <button
                onClick={handleCreateNewGroupAndSurvey}
                className="tw-bg-primary tw-text-white tw-px-6 tw-py-2 tw-rounded-xl tw-hover:bg-primary-dark tw-transition"
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
