import React from "react";
import Description from "../Items/Description";
import Dropdown from "../Items/Dropdown";
import Email from "../Items/Email";
import FileUpload from "../Items/FileUpload";
import FinishText from "../Items/FinishText";
import ImageChoice from "../Items/ImageChoice";
import Link from "../Items/Link";
import LongText from "../Items/LongText";
import Matris from "../Items/Matris";
import MultipleChoice from "../Items/MultipleChoice";
import Numeric from "../Items/Numeric";
import Payment from "../Items/Payment";
import QuestionGroup from "../Items/QuestionGroup";
import Ranking from "../Items/Ranking";
import Rating from "../Items/Rating";
import Scale from "../Items/Scale";
import ShortText from "../Items/ShortText";
import WelcomeText from "../Items/WelcomeText";
import Table from "../Items/Table";

const questionLabels = [
  "Kısa Metin",
  "Çoktan Seçmeli",
  "Uzun Metin",
  "Resimli Çoktan Seçmeli",
  "Soru Grubu",
  "Açılan Liste",
  "Sayısal Cevap",
  "Değerlendirme Ölçeği",
  "E-posta",
  "Derecelendirme",
  "Bağlantı/Site Adresi",
  "Sıralama",
  "Dosya Yükleme",
  "Matris",
  "Tablo",
];

export default function QuestionRenderer({ item, answers, onChange }) {
  if (!item) return null;

  const questionItems = Object.values(answers).filter((i) =>
    questionLabels.includes(i.label),
  );
  const questionIndex = questionItems.findIndex((i) => i.id === item.id);
  const count = questionIndex !== -1 ? questionIndex + 1 : undefined;

  const commonProps = {
    ...item,
    id: item?.id,
    value: answers[item?.id],
    count,
    onChange: (value) => onChange(item?.id, value),
  };

  switch (item?.label) {
    case "Hoşgeldin Sayfası":
      return <WelcomeText {...item} />;
    case "Bitiş Sayfası":
      return <FinishText {...item} />;
    case "Kısa Metin":
      return <ShortText {...commonProps} />;
    case "Çoktan Seçmeli":
      return <MultipleChoice {...commonProps} />;
    case "Uzun Metin":
      return <LongText {...commonProps} />;
    case "Resimli Çoktan Seçmeli":
      return <ImageChoice {...commonProps} />;
    case "Soru Grubu":
      return <QuestionGroup {...commonProps} />;
    case "Açılan Liste":
      return <Dropdown {...commonProps} />;
    case "Sayısal Cevap":
      return <Numeric {...commonProps} />;
    case "Değerlendirme Ölçeği":
      return <Scale {...commonProps} />;
    case "E-posta":
      return <Email {...commonProps} />;
    case "Derecelendirme":
      return <Rating {...commonProps} />;
    case "Bağlantı/Site Adresi":
      return <Link {...commonProps} />;
    case "Sıralama":
      return <Ranking {...commonProps} />;
    case "Açıklama":
      return <Description {...item} />;
    case "Dosya Yükleme":
      return <FileUpload {...commonProps} />;
    case "Ödeme":
      return <Payment {...commonProps} />;
    case "Matris":
      return <Matris {...commonProps} />;
    case "Tablo":
      return <Table {...commonProps} />;
    default:
      return null;
  }
}
