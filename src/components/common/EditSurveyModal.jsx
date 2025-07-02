import React, { useState, useEffect } from 'react';
import { FiX, FiInfo } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function EditSurveyModal({ survey, onClose, onUpdate,updatesurveyfeature }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    group: '',
    active: false,
    tags: [],
    link: '', // ← eklendi
  });

  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    setFormData({
      title: '',
      description: '',
      group: '',
      active: survey.active || false,
      tags: survey.tags || [],
      link: survey.link || '', // ← eklendi
    });
  }, [survey]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleActive = () => {
    setFormData(prev => ({ ...prev, active: !prev.active }));
  };

  const handleNewTagChange = (e) => {
    setNewTag(e.target.value);
  };

  const handleAddTag = () => {
    const tag = newTag.trim();

    if (!tag) {
      toast.warning("Etiket boş olamaz.");
      return;
    }

    if (formData.tags.includes(tag)) {
      toast.warning("Bu etiket zaten eklenmiş.");
      setNewTag('');
      return;
    }

    if (formData.tags.length >= 3) {
      toast.warning("En fazla 3 etiket ekleyebilirsiniz.");
      return;
    }

    setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
    setNewTag('');
  };


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const minCharLimit = 2;
    const errors = [];

    // Form alanlarını kontrol et
    if (formData.title && formData.title.trim().length < minCharLimit) {
      errors.push('Anket başlığı en az 2 karakter olmalı.');
    }
    if (formData.description && formData.description.trim().length < minCharLimit) {
      errors.push('Açıklama en az 2 karakter olmalı.');
    }
    if (formData.group && formData.group.trim().length < minCharLimit) {
      errors.push('Klasör adı en az 2 karakter olmalı.');
    }
    if (formData.link && formData.link.trim().length < minCharLimit) {
      errors.push('Link en az 2 karakter olmalı.');
    }
    if (formData.link && !/^[a-zA-Z0-9-_'']+$/.test(formData.link.trim())) {
      errors.push('Link yalnızca "a-z", "A-Z", "0-9", "-", "_" karakterlerini içerebilir.');
    }

    if (errors.length > 0) {
      errors.forEach(err => toast.warning(err));
      return;
    }

    // Boş veya geçersiz alanları filtrele
    const filteredData = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === 'string') {
        if (value.trim().length >= minCharLimit) {
          filteredData[key] = value.trim();
        }
      } else if (key === 'tags' && Array.isArray(value) && value.length > 0) {
        filteredData[key] = value;
      } else if (typeof value === 'boolean') {
        filteredData[key] = value;
      } else if (key === 'link' && typeof value === 'string' && value.trim().length >= minCharLimit) {
        filteredData[key] = value.trim();
      }
    });

    if (Object.keys(filteredData).length === 0) {
      toast.warning("Geçerli bir değişiklik yapmadınız.");
      return;
    }

    try {
      const updated = await updatesurveyfeature(survey._id, filteredData);
      toast.success("Anket Güncellendi");
      onUpdate(updated);
      onClose();
    } catch (error) {
      toast.error("Güncelleme sırasında hata oluştu.");
    }
  };


  return (
    <div className="tw-fixed tw-inset-0 tw-z-50 tw-flex tw-justify-center tw-items-center tw-bg-black/30 tw-backdrop-blur-sm tw-px-2">
      <div className="tw-bg-neutral-white tw-rounded-2xl tw-shadow-xl tw-p-4 tw-sm:p-6 tw-w-full tw-max-w-xl tw-max-h-[90vh] tw-overflow-y-auto tw-relative tw-border tw-border-neutral-light">

        {/* Kapat butonu */}
        <button
          onClick={onClose}
          className="tw-absolute tw-top-3 tw-right-3 tw-text-neutral-dark tw-hover:text-danger-dark tw-transition"
        >
          <FiX size={28} />
        </button>

        {/* Başlık */}
        <h2 className="tw-text-lg tw-sm:text-xl tw-font-semibold tw-mb-4 tw-text-primary-dark">Anketi Düzenle</h2>

        {/* Bilgi kutusu */}
        <div className="tw-flex tw-items-start tw-bg-info/10 tw-text-info tw-p-3 tw-rounded-md tw-text-sm tw-gap-2 tw-mb-5">
          <FiInfo className="tw-mt-1" />
          <span>
            <strong>Bilgi:</strong> Sadece doldurduğunuz alanlar güncellenecektir. Boş bırakılan değerler eski haliyle kalır.
          </span>
        </div>

        {/* Form alanları */}
        <form onSubmit={handleSubmit} className="tw-space-y-5">
          {/* Başlık */}
          <div>
            <label className="tw-block tw-text-sm tw-font-medium tw-text-primary-dark tw-mb-1">Anket Başlığı</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder={survey.title || 'Anket başlığı'}
              className="tw-w-full tw-p-2 tw-border tw-rounded-lg tw-border-neutral-light tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-primary-light"
            />
          </div>

          {/* Açıklama */}
          <div>
            <label className="tw-block tw-text-sm tw-font-medium tw-text-primary-dark tw-mb-1">Açıklama</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder={survey.description || 'Anket açıklaması'}
              rows={3}
              className="tw-w-full tw-p-2 tw-border tw-rounded-lg tw-border-neutral-light tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-primary-light"
            />
          </div>

          {/* Klasör Adı */}
          <div>
            <label className="tw-block tw-text-sm tw-font-medium tw-text-primary-dark tw-mb-1">Klasör Adı</label>
            <input
              name="group"
              value={formData.group}
              onChange={handleChange}
              placeholder={survey.group || 'Klasör adı'}
              className="tw-w-full tw-p-2 tw-border tw-rounded-lg tw-border-neutral-light tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-primary-light"
            />
          </div>
          {/* Link Adresi */}
          <div>
            <label className="tw-block tw-text-sm tw-font-medium tw-text-primary-dark tw-mb-1">
              Link Adresi
            </label>
            <div className="tw-flex tw-items-center tw-gap-2">
              <span className="tw-text-sm tw-text-neutral-dark tw-whitespace-nowrap">
                https://anketline.odanet.net/
              </span>
              <input
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder={survey.link || 'anket-linki'}
                className="tw-flex-1 tw-p-2 tw-border tw-rounded-lg tw-border-neutral-light tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-primary-light"
              />
            </div>
            <p className="tw-text-xs tw-text-neutral-dark tw-mt-1">
              Küçük harf, sayı ve tire (-) kullanılabilir. Örn: <code>ilk-anket</code>
            </p>
          </div>
          {/* Etiketler */}
          <div>
            <label className="tw-block tw-text-sm tw-font-medium tw-text-primary-dark tw-mb-1">Etiketler (en fazla 3)</label>

            <div className="tw-flex tw-gap-2 tw-mb-2 tw-flex-wrap">
              {formData.tags.map(tag => (
                <div
                  key={tag}
                  className="tw-flex tw-items-center tw-bg-primary-light tw-text-primary-text tw-rounded-full tw-px-3 tw-py-1 tw-text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="tw-ml-2 tw-text-primary-dark tw-hover:text-danger"
                    title="Etiketi kaldır"
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ))}
            </div>

            <input
              type="text"
              value={newTag}
              onChange={handleNewTagChange}
              onKeyDown={handleKeyDown}
              placeholder={formData.tags.length >= 3 ? 'Etiket limiti doldu' : 'Yeni etiket ekle'}
              disabled={formData.tags.length >= 3}
              className="tw-w-full tw-p-2 tw-border tw-border-neutral-light tw-rounded-lg tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-primary-light"
            />

            <button
              type="button"
              onClick={handleAddTag}
              disabled={formData.tags.length >= 3}
              className={`mt-2 w-full py-2 rounded-lg font-semibold transition ${formData.tags.length >= 3
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary hover:bg-secondary text-white'
                }`}
            >
              Etiket Ekle
            </button>
          </div>

          {/* Aktif mi? */}
          <div className="tw-flex tw-items-center tw-space-x-3">
            <label
              className="tw-text-sm tw-font-medium tw-text-primary-dark tw-select-none tw-cursor-pointer"
              onClick={handleToggleActive}
            >
              Anket Aktif mi?
            </label>
            <button
              type="button"
              aria-pressed={formData.active}
              onClick={handleToggleActive}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${formData.active ? 'bg-primary' : 'bg-neutral-light'
                }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${formData.active ? 'translate-x-6' : 'translate-x-0'
                  }`}
              />
            </button>
          </div>

          {/* Kaydet Butonu */}
          <button
            type="submit"
            className="tw-w-full tw-py-2 tw-rounded-lg tw-font-semibold tw-transition tw-bg-primary tw-hover:bg-secondary tw-text-white"
          >
            Kaydet
          </button>
        </form>
      </div>
    </div>

  );
}
