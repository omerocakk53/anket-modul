#  Anket Modülü

Bu modül **Odanet Projesi** için geliştirilmiştir.  
Amaç; anket oluşturma, düzenleme, paylaşma ve sonuçları yönetilebilir hale getirmektir.  

---

# 📂 Proje Yapısı

AnaDosyalar
│── Colors
│ ├── colors.js
│ ├── ColorEditor.jsx
│ └── RenkUygulama.jsx
│
│── components
│ ├── answer
│ ├── Common
│ ├── Items
│ ├── Layouts
│ ├── Logic
│ ├── Modals
│ ├── Share
│ ├── SuccessMessage
│ ├── SurveyCreate
│ ├── SurveyPlayer
│ ├── Surveys
│ ├── Toast
│ └── Component.jsx
│
│── Controller
│ └── Anket Soruları Controller Kodları
│
│── hooks
│ └── useThemeManager.js
│
│── Items
│ └── ComponentViewItems.jsx
│
│── Modal
│ └── Anket Soruları Düzenleme Sayfaları
│
│── pages
│ ├── SurveyList.jsx
│ ├── SurveyPlayerWrapper.jsx
│ └── Survey.jsx
│
│── utils
│ └── iconMap.js

---

## 🛠️ Açıklamalar

- **Colors** → Renk yönetimi ve tema bileşenleri  
- **components** → Anket bileşenleri (SurveyCreate, SurveyPlayer, Toast, Modals vb.)  
- **Controller** → Anket soruları ile ilgili kontrol kodları  
- **hooks** → Özel hook’lar (`useThemeManager`)  
- **Items** → Item görünüm dosyaları  
- **Modal** → Anket düzenleme ekranları  
- **pages** → Sayfa bazlı bileşenler (`SurveyList`, `SurveyPlayerWrapper`, `Survey`)  
- **utils** → Yardımcı fonksiyonlar (ör. `iconMap.js`)  





