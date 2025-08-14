import React from "react";
import { IoMdClose } from "react-icons/io";
import FixSurveyCard from "./FixSurveyCard";

export default function TemplateSurveyModal({ isOpen, onClose, onSelectTemplate }) {
  if (!isOpen) return null;

  // Örnek şablonlar
  const templates = [
    {
      title: "Üye Memnuniyet Anketi",
      description: "Üyelerin genel memnuniyetini ölçmek için kullanılır.",
      tags: ["Memnuniyet", "Üye"],
      surveyType: "MemberSatisfaction",
      items: [
      ],
      createdAt: new Date().toISOString(),
    },
    {
      title: "Etkinlik Memnuniyet Anketi",
      description: "Etkinlik sonrası katılımcı geri bildirimlerini toplamak için.",
      tags: ["Etkinlik", "Feedback"],
      surveyType: "ActivitySatisfaction",
      items: [

      ],
      createdAt: new Date().toISOString(),
    },
    {
      title: "Eğitim Memnuniyet Anketi",
      description: "Eğitim sonrası katılımcı geri bildirimlerini toplamak için.",
      tags: ["Eğitim", "Feedback"],
      surveyType: "EducationSatisfaction",
      items: [
        {
          "data": {
            "rows": [
              "İşime katkısı olacağına inanıyorum",
              "Derin ve ayrıntılı bilgiler içeriyordu",
              "Verilen mesajlar açıktı",
              "Konuyla ilgili verilen örnekler aydınlatıcıydı",
              "Yeterli örnekleme yapıldı",
              "Eğitimde kullanılan materyaller öğrenmeme yardımcı oldu",
              "Kullanılan materyaller konunun içeriğine uygundu"
            ],
            "columns": [
              "Kesinlikle Katılıyorum",
              "Katılıyorum",
              "Emin Değilim",
              "Katılmıyorum",
              "Kesinlikle Katılmıyorum"
            ]
          },
          "SurveyNumberVisible": true,
          "MemberSatificaitonMatris": false,
          "type": "Matris",
          "id": "matris-1",
          "iconKey": "FaTable",
          "label": "Matris",
          "title": "Eğitim hakkındaki görüşleriniz:",
          "helpText": "",
          "complusory": true,
          "allowCustomValue": false
        },
        {
          "data": {
            "rows": [
              "Eğitmen verdiği konuda bilgiliydi",
              "Bilgisini kolaylıkla aktarabiliyordu",
              "Uygun dil ve seviye seçebiliyordu",
              "Sorulara olumlu yaklaşıyor ve soru sormaya teşvik ediyordu",
              "Sorulara açık ve dürüst cevaplar veriyordu",
              "İlgiyi konu üzerinde yoğunlaştırabiliyordu"
            ],
            "columns": [
              "Kesinlikle Katılıyorum",
              "Katılıyorum\t",
              "Emin Değilim",
              "Katılmıyorum",
              "Kesinlikle Katılmıyorum"
            ]
          },
          "SurveyNumberVisible": true,
          "MemberSatificaitonMatris": false,
          "type": "Matris",
          "id": "matris-2",
          "iconKey": "FaTable",
          "label": "Matris",
          "title": "Eğitmen hakkındaki görüşleriniz:",
          "helpText": "",
          "complusory": true,
          "allowCustomValue": false
        },
        {
          "data": {
            "rows": [
              "Büyüklüğü katılımcı sayısına göre uygundu",
              "Ortam sıcaklığı uygundu",
              "Havalandırma yeterliydi"
            ],
            "columns": [
              "Kesinlikle Katılıyorum",
              "Katılıyorum",
              "Emin Değilim",
              "Katılmıyorum",
              "Kesinlikle Katılmıyorum"
            ]
          },
          "SurveyNumberVisible": true,
          "MemberSatificaitonMatris": false,
          "type": "Matris",
          "id": "matris-3",
          "iconKey": "FaTable",
          "label": "Matris",
          "title": "Eğitim yeri hakkındaki görüşleriniz:",
          "helpText": "",
          "complusory": true,
          "allowCustomValue": false
        }
      ],
      createdAt: new Date().toISOString(),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl p-8 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-700 hover:text-red-600 transition"
        >
          <IoMdClose size={26} />
        </button>
        <h3 className="text-2xl font-semibold text-center text-neutral-800 mb-6">
          Örnek Anket Şablonları
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[70vh] overflow-y-auto">
          {templates.map((survey) => (
            <FixSurveyCard
              key={survey._id}
              survey={survey}
              onSelect={onSelectTemplate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
