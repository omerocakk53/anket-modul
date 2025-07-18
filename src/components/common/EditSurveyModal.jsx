import React, { useState, useEffect } from 'react';
import { FiX, FiInfo, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

export default function EditSurveyModal({ survey, onClose, onUpdate, updatesurveyfeature }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    group: '',
    active: false,
    tags: [],
    link: '',
    activePeriodDates: [],
  });

  const [newTag, setNewTag] = useState('');
  const [newPeriod, setNewPeriod] = useState({
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    setFormData({
      title: '',
      description: '',
      group: '',
      active: survey.active || false,
      tags: survey.tags || [],
      link: survey.link || '',
      activePeriodDates: survey.activePeriodDates || [], // → burası eklendi
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
  const handleAddPeriod = () => {
    if (!newPeriod.startDate || !newPeriod.endDate) {
      toast.error("Başlangıç ve bitiş tarihleri gerekli.");
      return;
    }

    const start = new Date(newPeriod.startDate);
    const end = new Date(newPeriod.endDate);

    if (end < start) {
      toast.error("Bitiş tarihi başlangıçtan küçük olamaz.");
      return;
    }

    // Son eklenen part varsa ona göre kontrol et
    if (formData.activePeriodDates.length > 0) {
      const lastEndDate = new Date(formData.activePeriodDates[formData.activePeriodDates.length - 1].endDate);
      if (start < lastEndDate) {
        toast.error("Yeni başlangıç tarihi önceki bitiş tarihinden küçük olamaz.");
        return;
      }
    }

    // Yeni partı ekle
    setFormData(prev => ({
      ...prev,
      activePeriodDates: [...prev.activePeriodDates, { ...newPeriod, active: true }],
    }));

    // Formu sıfırla (örneğin:)
    setNewPeriod({ startDate: '', endDate: '' });
  };

  const handleRemovePeriod = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      activePeriodDates: prev.activePeriodDates.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleAddTag = () => {
    const tag = newTag.trim();

    if (!tag) {
      toast.error("Etiket boş olamaz.");
      return;
    }

    if (formData.tags.includes(tag)) {
      toast("Bu etiket zaten eklenmiş.");
      setNewTag('');
      return;
    }

    if (formData.tags.length >= 3) {
      toast("En fazla 3 etiket ekleyebilirsiniz.");
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
    if (formData.activePeriodDates.length === 0 && survey.surveyType === 'MemberSatisfaction') {
      errors.push('En az bir aktif tarih aralığı eklemelisiniz.');
    }
    if (errors.length > 0) {
      errors.forEach(err => toast(err));
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
      } else if (key === 'activePeriodDates' && Array.isArray(value) && value.length > 0 && survey.surveyType === 'MemberSatisfaction') {
        filteredData[key] = value;
      }
    });

    if (Object.keys(filteredData).length === 0) {
      toast("Geçerli bir değişiklik yapmadınız.");
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
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm px-2">

      <div className="bg-neutral-white rounded-2xl shadow-xl p-4 sm:p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto relative border border-neutral-light">

        {/* Kapat butonu */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-neutral-dark hover:text-danger-dark transition"
        >
          <FiX size={28} />
        </button>

        {/* Başlık */}
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-primary-dark">Anketi Düzenle</h2>

        {/* Bilgi kutusu */}
        <div className="flex items-start bg-info/10 text-info p-3 rounded-md text-sm gap-2 mb-5">
          <FiInfo className="mt-1" />
          <span>
            <strong>Bilgi:</strong> Sadece doldurduğunuz alanlar güncellenecektir. Boş bırakılan değerler eski haliyle kalır.
          </span>
        </div>

        {/* Form alanları */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Sadece MemberSatisfaction için tarih */}
          {survey.surveyType === 'MemberSatisfaction' && (
            <div>
              <label className="block text-sm font-medium text-primary-dark mb-1">Aktif Tarih Aralıkları</label>

              <div className="flex gap-2 mb-2">
                <input
                  type="datetime-local"
                  value={newPeriod.startDate}
                  onChange={(e) => setNewPeriod(prev => ({ ...prev, startDate: e.target.value }))}
                  className="w-full p-2 border rounded-lg"
                />
                <input
                  type="datetime-local"
                  value={newPeriod.endDate}
                  onChange={(e) => setNewPeriod(prev => ({ ...prev, endDate: e.target.value }))}
                  className="w-full p-2 border rounded-lg"
                />
                <button type="button" onClick={handleAddPeriod} className="bg-primary text-white px-4 rounded">Ekle</button>
              </div>

              <div className="space-y-2">
                {formData.activePeriodDates.map((period, index) => {
                  const now = new Date();
                  const isActive = new Date(period.endDate) > now;

                  const startDate = new Date(period.startDate).toLocaleDateString();
                  const endDate = new Date(period.endDate).toLocaleString(); // saat:dakika:saniye dahil

                  return (
                    <div
                      key={index}
                      className={`flex items-center justify-between bg-gray-100 p-2 rounded mb-2 border ${isActive
                        ? 'border-success bg-success/5 text-success'
                        : 'border-danger bg-danger/5 text-danger'
                        }`}
                    >
                      <div>
                        <p className="text-sm">
                          <strong>Başlangıç:</strong> {startDate} &nbsp;
                          <strong>Bitiş:</strong> {endDate}
                        </p>
                        <div
                          className={`flex items-center gap-1 px-2 py-0.5 rounded-full border font-medium text-xs mt-1
                            ${isActive
                              ? 'text-success bg-success/10 border-success'
                              : 'text-danger bg-danger/10 border-danger'
                            }`}
                        >
                          {isActive ? 'Aktif' : 'Pasif'}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemovePeriod(index)}
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
          )}

          {/* Başlık */}
          <div>
            <label className="block text-sm font-medium text-primary-dark mb-1">Anket Başlığı</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder={survey.title || 'Anket başlığı'}
              className="w-full p-2 border rounded-lg border-neutral-light focus:outline-none focus:ring-2 focus:ring-primary-light"
            />
          </div>

          {/* Açıklama */}
          <div>
            <label className="block text-sm font-medium text-primary-dark mb-1">Açıklama</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder={survey.description || 'Anket açıklaması'}
              rows={3}
              className="w-full p-2 border rounded-lg border-neutral-light focus:outline-none focus:ring-2 focus:ring-primary-light"
            />
          </div>

          {/* Klasör Adı */}
          <div>
            <label className="block text-sm font-medium text-primary-dark mb-1">Klasör Adı</label>
            <input
              name="group"
              value={formData.group}
              onChange={handleChange}
              placeholder={survey.group || 'Klasör adı'}
              className="w-full p-2 border rounded-lg border-neutral-light focus:outline-none focus:ring-2 focus:ring-primary-light"
            />
          </div>
          {/* Link Adresi */}
          <div>
            <label className="block text-sm font-medium text-primary-dark mb-1">
              Link Adresi
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-dark whitespace-nowrap">
                https://anketline.odanet.net/
              </span>
              <input
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder={survey.link || 'anket-linki'}
                className="flex-1 p-2 border rounded-lg border-neutral-light focus:outline-none focus:ring-2 focus:ring-primary-light"
              />
            </div>
            <p className="text-xs text-neutral-dark mt-1">
              Küçük harf, sayı ve tire (-) kullanılabilir. Örn: <code>ilk-anket</code>
            </p>
          </div>
          {/* Etiketler */}
          <div>
            <label className="block text-sm font-medium text-primary-dark mb-1">Etiketler (en fazla 3)</label>

            <div className="flex gap-2 mb-2 flex-wrap">
              {formData.tags.map(tag => (
                <div
                  key={tag}
                  className="flex items-center bg-primary-light text-primary-text rounded-full px-3 py-1 text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-primary-dark hover:text-danger"
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
              className="w-full p-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
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
          <div className="flex items-center space-x-3">
            <label
              className="text-sm font-medium text-primary-dark select-none cursor-pointer"
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
            className="w-full py-2 rounded-lg font-semibold transition bg-primary hover:bg-secondary text-white"
          >
            Kaydet
          </button>
        </form>
      </div>
    </div>

  );
}
