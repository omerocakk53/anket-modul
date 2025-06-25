import { useParams } from "react-router-dom";
import AnketOynatıcısı from "../Components/AnketOynatıcısı";

export default function AnketOynatıcısıWrapper() {
  const { surveyId } = useParams();
  return <AnketOynatıcısı surveyId={surveyId} />;
}
