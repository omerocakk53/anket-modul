import React, { useState, useEffect } from 'react';
import { FiX, FiInfo } from 'react-icons/fi';
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
  const [newStartDate, setNewStartDate] = useState('');
  const [newEndDate, setNewEndDate] = useState('');

  useEffect(() => {
    setFormData({
      title: '',
      description: '',
      group: '',
      active: survey.active || false,
      tags: survey.tags || [],
      link: survey.link || '',
      activePeriodDates: survey.activePeriodDates || [],
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
    if (!tag) return toast.error("Etiket boş olamaz.");
    if (formData.tags.includes(tag)) return toast("Bu etiket zaten eklenmiş.");
    if (formData.tags.length >= 3) return toast("En fazla 3 etiket ekleyebilirsiniz.");
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

  // ✅ Tarih periyodu ekleme
  const handleAddPeriod = () => {
    if (!newStartDate || !newEndDate) return toast.error("Başlangıç ve bitiş tarihlerini giriniz.");
    if (new Date(newStartDate) >= new Date(newEndDate)) return toast.error("Bitiş tarihi, başlangıç tarihinden sonra olmalı.");

    setFormData(prev => ({
      ...prev,
      activePeriodDates: [...prev.activePeriodDates, { startDate: newStartDate, endDate: newEndDate }],
    }));
    setNewStartDate('');
    setNewEndDate('');
  };

  const handleRemovePeriod = (index) => {
    setFormData(prev => ({
      ...prev,
      activePeriodDates: prev.activePeriodDates.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const minCharLimit = 2;
    const errors = [];

    // KONTROL
    if (formData.title && formData.title.trim().length < minCharLimit) errors.push('Anket başlığı en az 2 karakter olmalı.');
    if (formData.description && formData.description.trim().length < minCharLimit) errors.push('Açıklama en az 2 karakter olmalı.');
    if (formData.group && formData.group.trim().length < minCharLimit) errors.push('Klasör adı en az 2 karakter olmalı.');
    if (formData.link && formData.link.trim().length < minCharLimit) errors.push('Link en az 2 karakter olmalı.');
    if (formData.link && !/^[a-zA-Z0-9-_'']+$/.test(formData.link.trim())) errors.push('Link yalnızca "a-z", "A-Z", "0-9", "-", "_" karakterlerini içerebilir.');

    if (errors.length > 0) return errors.forEach(err => toast(err));

    const filteredData = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === 'string' && value.trim().length >= minCharLimit) filteredData[key] = value.trim();
      else if (key === 'tags' && Array.isArray(value) && value.length > 0) filteredData[key] = value;
      else if (typeof value === 'boolean') filteredData[key] = value;
      else if (key === 'link' && value.trim().length >= minCharLimit) filteredData[key] = value.trim();
      else if (key === 'activePeriodDates') filteredData[key] = value;
    });

    if (Object.keys(filteredData).length === 0) return toast("Geçerli bir değişiklik yapmadınız.");

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
        <button onClick={onClose} className="absolute top-3 right-3 text-neutral-dark hover:text-danger-dark transition">
          <FiX size={28} />
        </button>

        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-primary-dark">Anketi Düzenle</h2>

        <div className="flex items-start bg-info/10 text-info p-3 rounded-md text-sm gap-2 mb-5">
          <FiInfo className="mt-1" />
          <span><strong>Bilgi:</strong> Sadece doldurduğunuz alanlar güncellenecektir.</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Sadece MemberSatisfaction için tarih */}
          {survey.surveyType === 'MemberSatisfaction' && (
            <div className="space-y-3">
              <h3 className="font-medium">Tarih Periyotları</h3>
              <div className="flex gap-3">
                <input type="datetime-local" value={newStartDate} onChange={(e) => setNewStartDate(e.target.value)} className="border p-2 rounded" />
                <input type="datetime-local" value={newEndDate} onChange={(e) => setNewEndDate(e.target.value)} className="border p-2 rounded" />
                <button type="button" onClick={handleAddPeriod} className="bg-primary text-white px-4 rounded hover:bg-secondary">Ekle</button>
              </div>

              <ul className="space-y-2">
                {formData.activePeriodDates.map((period, index) => (
                  <li key={index} className="flex justify-between bg-neutral-100 p-2 rounded">
                    <div className="text-sm">
                      <p>Başlangıç: {new Date(period.startDate).toLocaleString()}</p>
                      <p>Bitiş: {new Date(period.endDate).toLocaleString()}</p>
                    </div>
                    <button onClick={() => handleRemovePeriod(index)} type="button" className="text-red-600 hover:text-red-800">
                      <FiX size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Diğer alanlar */}
          {/* Başlık */}
          <div>
            <label className="block text-sm font-medium">Anket Başlığı</label>
            <input name="title" value={formData.title} onChange={handleChange} placeholder={survey.title || 'Anket başlığı'} className="w-full p-2 border rounded" />
          </div>

          {/* Açıklama */}
          <div>
            <label className="block text-sm font-medium">Açıklama</label>
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder={survey.description || 'Anket açıklaması'} className="w-full p-2 border rounded" />
          </div>

          {/* Klasör */}
          <div>
            <label className="block text-sm font-medium">Klasör Adı</label>
            <input name="group" value={formData.group} onChange={handleChange} placeholder={survey.group || 'Klasör adı'} className="w-full p-2 border rounded" />
          </div>

          {/* Link */}
          <div>
            <label className="block text-sm font-medium">Link</label>
            <div className="flex gap-2">
              <span className="text-sm text-neutral-dark">https://anketline.odanet.net/</span>
              <input name="link" value={formData.link} onChange={handleChange} placeholder={survey.link || 'anket-linki'} className="flex-1 p-2 border rounded" />
            </div>
          </div>

          {/* Etiketler */}
          {/* (Senin mevcut etiket kodun buraya gelir) */}

          {/* Aktif Toggle */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium cursor-pointer" onClick={handleToggleActive}>Anket Aktif mi?</label>
            <button type="button" onClick={handleToggleActive} className={`w-12 h-6 rounded-full ${formData.active ? 'bg-primary' : 'bg-neutral-light'}`}>
              <div className={`bg-white w-4 h-4 rounded-full transform ${formData.active ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* Kaydet */}
          <button type="submit" className="w-full py-2 rounded-lg font-semibold bg-primary text-white hover:bg-secondary">Kaydet</button>
        </form>
      </div>
    </div>
  );
}
