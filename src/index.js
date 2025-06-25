// src/index.js
export { default as Anketler } from './Anketler';
// 👇 BU SATIRI EN ÜSTE EKLE!
import './styles/tailwind.css'; 

// İstersen diğer yardımcı component veya servisleri de export edebilirsin:
export * from './components/common/Sidebar';
export * from './components/common/Header';
export * from './components/common/FilterSortSearch';

export * from './components/modals/CreateSurveyModal';
export * from './components/modals/CreateNewGroupModal';

export * from './pages/AnketListele';

export * from './services/AnketKaydedici';
export * from './services/tokenHelper';
export * from './services/authService';
export * from './services/user';
export * from './services/AnketleriGetir';
