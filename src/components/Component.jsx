import React from 'react';
import { iconMap } from '../utils/iconMap';

const items = [
  { id: 'welcome', type: 'Welcome', iconKey: 'RxEnter', label: 'Hoşgeldin Sayfası' },
  { id: 'short_text', type: 'ShortText', iconKey: 'FaFont', label: 'Kısa Metin' },
  { id: 'multiple_choice', type: 'MultipleChoice', iconKey: 'FaCheckSquare', label: 'Çoktan Seçmeli' },
  { id: 'long_text', type: 'LongText', iconKey: 'FaAlignLeft', label: 'Uzun Metin' },
  { id: 'image_choice', type: 'ImageChoice', iconKey: 'FaImage', label: 'Resimli Çoktan Seçmeli' },
  { id: 'question_group', type: 'QuestionGroup', iconKey: 'FaListUl', label: 'Soru Grubu' },
  { id: 'dropdown', type: 'Dropdown', iconKey: 'FaBars', label: 'Açılan Liste' },
  { id: 'numeric', type: 'Numeric', iconKey: 'FaHashtag', label: 'Sayısal Cevap' },
  { id: 'scale', type: 'Scale', iconKey: 'FaTh', label: 'Değerlendirme Ölçeği' },
  { id: 'email', type: 'Email', iconKey: 'FaAt', label: 'E-posta' },
  { id: 'rating', type: 'Rating', iconKey: 'FaStar', label: 'Derecelendirme' },
  { id: 'link', type: 'Link', iconKey: 'FaLink', label: 'Bağlantı/Site Adresi' },
  { id: 'ranking', type: 'Ranking', iconKey: 'FaArrowUp', label: 'Sıralama' },
  { id: 'description', type: 'Description', iconKey: 'FaCommentAlt', label: 'Açıklama' },
  { id: 'file_upload', type: 'FileUpload', iconKey: 'FaFileUpload', label: 'Dosya Yükleme' },
  { id: 'payment', type: 'Payment', iconKey: 'FaMoneyBillWave', label: 'Ödeme' },
  { id: 'matris', type: 'Matris', iconKey: 'FaTable', label: 'Matris' },
  { id: 'finish', type: 'Finish', iconKey: 'MdOutlineWavingHand', label: 'Bitiş Sayfası' },
];

import { FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
function Component({ onAddItem, sideBar, setSidebarOpen }) {
  const [isClosing, setIsClosing] = useState(false);
  // Animasyonlu kapama
  useEffect(() => {
    if (!sideBar && isClosing) {
      const timeout = setTimeout(() => {
        setIsClosing(false);
      }, 400); // animasyon süresi ile uyumlu
      return () => clearTimeout(timeout);
    }
  }, [sideBar, isClosing]);
  const renderButton = (item, fullWidth = false) => {
    const iconProps = iconMap[item.iconKey] || {};
    const IconComponent = iconProps.Icon;
    
    return (
      <button
        key={item.id}
        onClick={() => onAddItem(item)}
        className={`flex items-center ${fullWidth ? 'justify-center w-full p-3' : 'gap-2 p-2'} 
                    rounded-md shadow-xl hover:shadow-lg transition-all 
                    ${iconProps.bgColor || 'bg-gray-200'} 
                    ${iconProps.textColor || 'text-gray-800'} 
                    ${iconProps.hoverBg || 'hover:bg-gray-300'}`}
      >
        <div className="text-xl">
          {IconComponent && <IconComponent size={20} />}
        </div>
        <span className={fullWidth ? 'font-semibold' : 'text-sm font-medium'}>
          {item.label}
        </span>
      </button>
    );
  };

  const welcomeItem = items.find(i => i.id === 'welcome');
  const finishItem = items.find(i => i.id === 'finish');
  const regularItems = items.filter(i => i.id !== 'welcome' && i.id !== 'finish');

  return (
    <>
      {/* Masaüstü için sabit görünüm */}
      <div className="hidden lg:block p-4 border border-secondary-light w-full h-full shadow-xl bg-neutral/50 rounded-lg">
        {renderButton(welcomeItem, true)}
        <div className="grid grid-cols-2 gap-3 mt-3">
          {regularItems.map(item => renderButton(item))}
        </div>
        <div className="mt-4">
          {renderButton(finishItem, true)}
        </div>
      </div>

      {/* Mobil için sağdan kayan menü */}
      {(sideBar || isClosing) && (
        <div className={`lg:hidden fixed top-0 right-0 h-full w-4/5 max-w-sm z-50 bg-white shadow-lg border-l border-gray-200 p-4 
                        ${sideBar && !isClosing ? 'animate-slide-in' : 'animate-slide-out'} overflow-y-auto`}>
          {/* Kapatma butonu */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Bileşen Menüsü</h2>
            <button
              onClick={() => {
                setIsClosing(true);
                setSidebarOpen(false); // Bu sidebar durumu parent bileşenden gelmeli
              }}
              className="text-primary-darktext hover:text-danger"
              title="Kapat"
            >
              <FiX size={24} />
            </button>
          </div>

          {renderButton(welcomeItem, true)}

          <div className="grid grid-cols-2 gap-3 mt-3">
            {regularItems.map(item => renderButton(item))}
          </div>

          <div className="mt-4">
            {renderButton(finishItem, true)}
          </div>
        </div>
      )}
    </>
  );
}

export default Component;
