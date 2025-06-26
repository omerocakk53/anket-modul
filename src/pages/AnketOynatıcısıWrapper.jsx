import { useParams } from "react-router-dom";
import AnketOynatıcısı from "../components/AnketOynatıcısı";

export default function AnketOynatıcısıWrapper({fetchSurveyById, cevaplariKaydet}) {
  const { surveyId } = useParams();
  return <AnketOynatıcısı surveyId={surveyId} fetchSurveyById={fetchSurveyById} cevaplariKaydet={cevaplariKaydet} />;
}
