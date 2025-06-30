import { useParams } from "react-router-dom";
import AnketOynatıcısı from "../components/AnketOynatıcısı";

export default function AnketOynatıcısıWrapper({ fetchsurveyById, answersave, user }) {
  const { surveyId } = useParams();
  return <AnketOynatıcısı user={user} surveyId={surveyId} fetchsurveyById={fetchsurveyById} answersave={answersave} />;
}
