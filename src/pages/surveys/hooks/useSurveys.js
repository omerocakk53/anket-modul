import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function useSurveys({
  user,
  fetchallsurvey,
  fetchsurveychamberById,
}) {
  const [allSurveys, setAllSurveys] = useState([]);
  const [groupedSurveysData, setGroupedSurveysData] = useState({});
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [groupAssignment, setGroupAssignment] = useState(false);

  useEffect(() => {
    const storedSelectedGroup = localStorage.getItem("selectedGroup");
    if (selectedGroup === null) {
      setSelectedGroup(storedSelectedGroup);
      setGroupAssignment(true);
    } else if (selectedGroup !== storedSelectedGroup) {
      localStorage.setItem("selectedGroup", selectedGroup);
      setGroupAssignment(false);
    } else {
      toast("Seçili Klasör " + selectedGroup);
      setGroupAssignment(false);
    }
  }, [selectedGroup, setSelectedGroup]);

  useEffect(() => {
    if (!user || Object.keys(user).length === 0) return;
    const loadSurveys = async () => {
      try {
        let data;
        if (user.role === "superAdmin") {
          data = await fetchallsurvey();
        } else if (user.role === "admin") {
          data = await fetchsurveychamberById(user.chamber);
        } else {
          return toast.error("Kullanıcı yetkisi bulunamadı.");
        }

        setAllSurveys(data);
        const grouped = data.reduce((acc, survey) => {
          const groupName = survey.group?.trim() || "Geçersiz Klasör Adı";
          if (!acc[groupName]) acc[groupName] = [];
          acc[groupName].push(survey);
          return acc;
        }, {});
        setGroupedSurveysData(grouped);

        const validGroups = Object.keys(grouped).filter(
          (name) => name !== "Geçersiz Klasör Adı",
        );
        if (!selectedGroup || !validGroups.includes(selectedGroup)) {
          setSelectedGroup(
            validGroups.length > 0 && groupAssignment ? validGroups[0] : null,
          );
          setGroupAssignment(false);
        }
      } catch (error) {
        setAllSurveys([]);
        setGroupedSurveysData({});
        setSelectedGroup(null);
      }
    };
    loadSurveys();
  }, [user, refreshKey]);

  return {
    allSurveys,
    groupedSurveysData,
    selectedGroup,
    setSelectedGroup,
    setRefreshKey,
  };
}
