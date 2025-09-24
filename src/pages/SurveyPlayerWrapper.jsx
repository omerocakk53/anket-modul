import { useParams } from "react-router-dom";
import SurveyPlayer from "./surveyplayer/index.jsx";

export default function SurveyPlayerWrapper({
  fetchsurveyById,
  answersave,
  user,
  viewsCount,
  fetchallsurvey,
  devicecount,
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
      devicecount={devicecount}
    />
  );
}
