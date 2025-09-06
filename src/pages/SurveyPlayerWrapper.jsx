import { useParams } from "react-router-dom";
import SurveyPlayer from "../components/SurveyPlayer/index";

export default function SurveyPlayerWrapper({
  fetchsurveyById,
  answersave,
  user,
  viewsCount,
  fetchallsurvey,
}) {
  const { slug, tester } = useParams();
  return (
    <SurveyPlayer
      user={user}
      slug={slug}
      fetchsurveyById={fetchsurveyById}
      tester={tester}
      answersave={answersave}
      viewsCount={viewsCount}
      fetchallsurvey={fetchallsurvey}
    />
  );
}
