import { useParams } from "react-router-dom";
import SurveyPlayer from "../components/SurveyPlayer";

export default function AnketOynatıcısıWrapper({ fetchsurveyById, answersave, user, viewsCount }) {
  const { surveyId } = useParams();
  return <SurveyPlayer user={user} surveyId={surveyId} fetchsurveyById={fetchsurveyById} answersave={answersave} viewsCount={viewsCount} />;
}
