import React from 'react';
 // navigate fonksiyonunu kullanabilmek için
import authService from '../services/authService'; // authService'den getCurrentUser fonksiyonunu alıyoruz

function Home() {
  const navigate = useNavigate();

  // Anket oluşturma butonuna tıklanma işlemi
  const handleCreateSurvey = () => {
    const currentUser = authService.getCurrentUser();  // Kullanıcı bilgilerini alıyoruz

    if (currentUser) {
      // Eğer kullanıcı giriş yapmışsa, anket oluşturma sayfasına yönlendir
      navigate('/anketolustur', { state: { userId: currentUser.id } });
    } else {
      // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
      navigate('/login');
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Ana Sayfa</h1>
        <button
          onClick={handleCreateSurvey} // Butona tıklandığında giriş durumu kontrol edilir
          className="border-4 border-black rounded-4xl p-3 bg-gray-800 text-lg text-white font-bold hover:scale-105 active:scale-95 duration-75"
        >
          Anket Oluşturmaya Başla
        </button>
      </div>
    </>
  );
}

export default Home;
