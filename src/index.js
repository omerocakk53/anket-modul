// ✅ TailwindCSS’i doğrudan projeye uygulamak için
import './styles/tailwind.css';

// ✅ Ana sayfa export
export { default as Anketler } from './Anketler';
export { default as AnketOynatıcısıWrapper } from './pages/AnketOynatıcısıWrapper';
export { default as Share } from './components/Share/Share';
export { default as AnketOlusturucu } from './components/AnketOlusturucu';
export { default as ToastProvider } from './components/toast/ToastProvider';
export { default as SuccessMessagePortal } from './components/successMesage/SuccessMessagePortal';
export { default as CevaplarSayfasi } from './components/Cevaplar/CevaplarSayfasi';

// ✅ Tüm modül export'ları aşağıda gruplanmıştır

// 🎨 Renk & Tema
export * from './Colors/ColorEditor';
export * from './Colors/colors';
export * from './Colors/RenkUygulama';
export * from './hooks/useThemeManager';

// 🔧 Ortak bileşenler
export * from './components/common/Sidebar';
export * from './components/common/Header';
export * from './components/common/FilterSortSearch';
export * from './components/common/EditSurveyModal';
export * from './components/common/SurveyCard';

// 🧱 Ana komponentler
export * from './components/AnketOynatıcısı';
export * from './components/Component';
export * from './components/Description';
export * from './components/Dropdown';
export * from './components/Email';
export * from './components/FileUpload';
export * from './components/FinishText';
export * from './components/ImageChoice';
export * from './components/Link';
export * from './components/LongText';
export * from './components/Matris';
export * from './components/MultipleChoice';
export * from './components/Numeric';
export * from './components/Payment';
export * from './components/QuestionGroup';
export * from './components/Ranking';
export * from './components/Rating';
export * from './components/Scale';
export * from './components/ShortText';
export * from './components/WelcomeText';

// 📦 Layout & modal bileşenleri
export * from './components/layouts/ModalLayout';
export * from './components/modals/CreateNewGroupModal';
export * from './components/modals/CreateSurveyModal';

// ✅ Başarı Mesajı
export * from './components/successMesage/successController';
export * from './components/successMesage/SuccessMessage';


// 📊 Cevaplar
export * from './components/Cevaplar/AnswerTable';
export * from './components/Cevaplar/CevaplarSayfasi';
export * from './components/Cevaplar/ChartView';
export * from './components/Cevaplar/ComparisonPage';
export * from './components/Cevaplar/FilterBar';
export * from './components/Cevaplar/ViewSwitcher';
export * from './components/AnswerItem';

// 🎮 Kontrolcü (controller) dosyaları
export * from './Controller/DescriptionController';
export * from './Controller/DropdownController';
export * from './Controller/EmailController';
export * from './Controller/FileUploadController';
export * from './Controller/FinishTextController';
export * from './Controller/ImageChoiceController';
export * from './Controller/LinkController';
export * from './Controller/LongTextController';
export * from './Controller/MatrisController';
export * from './Controller/MultipleChoiceController';
export * from './Controller/NumericController';
export * from './Controller/PaymentController';
export * from './Controller/QuestionGroupController';
export * from './Controller/RankingController';
export * from './Controller/RatingController';
export * from './Controller/ScaleController';
export * from './Controller/ShortTextController';
export * from './Controller/WelcomeTextController';

// 🧩 Items
export * from './Items/ComponentViewItems';

// 🔐 Giriş / Kayıt
export * from './Login/Login';
export * from './Login/Register';

// ⚙️ Ayar modalları
export * from './Modal/DescriptionSettingsModal';
export * from './Modal/DropdownSettingsModal';
export * from './Modal/EmailSettingsModal';
export * from './Modal/FileUploadSettingsModal';
export * from './Modal/ImageChoiceSettingsModal';
export * from './Modal/LinkSettingsModal';
export * from './Modal/LongTextSettingsModel';
export * from './Modal/MatrisSettingsModal';
export * from './Modal/MultipleChoiceSettingsModal';
export * from './Modal/NumericSettingsModal';
export * from './Modal/PaymentSettingsModal';
export * from './Modal/QuestionGroupSettingsModal';
export * from './Modal/RankingSettingsModal';
export * from './Modal/RatingSettingsModal';
export * from './Modal/ScaleSettingsModal';
export * from './Modal/ShortTextSettingsModel';
export * from './Modal/WelcomeTextSettingsModel';

// 📄 Sayfalar
export * from './pages/Anketler';
export * from './pages/AnketListele';
export * from './pages/Home';
export * from './pages/NotFoundPage';

// 🔧 Servisler
export * from './services/AnketiGüncelle';
export * from './services/AnketKaydedici';
export * from './services/AnketleriGetir';
export * from './services/AnketleriSil';
export * from './services/authService';
export * from './services/cevaplariGetir';
export * from './services/cevaplariKaydet';
export * from './services/cevaplariSil';
export * from './services/colorService';
export * from './services/surveyShareService';
export * from './services/themeService';
export * from './services/tokenHelper';
export * from './services/user';

// 🧠 Utils
export * from './utils/axiosInstance';
export * from './utils/iconMap';
