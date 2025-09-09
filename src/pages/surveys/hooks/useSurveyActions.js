import { toast } from "react-hot-toast";

export default function useSurveyActions({
  createSurvey,
  chamber,
  userId,
  setRefreshKey,
  setSelectedGroup,
}) {
  const createSurveyInGroup = async ({
    title,
    description,
    surveyType,
    tags,
    items,
    FinishWelcomeitems,
    selectedGroup,
  }) => {
    if (!selectedGroup) {
      toast.error("Lütfen bir klasör seçin veya yeni bir klasör oluşturun.");
      return;
    }
    if (!title.trim()) {
      toast.error("Anket başlığı boş bırakılamaz.");
      return;
    }

    try {
      const surveyData = {
        title: title.trim(),
        chamber,
        userId,
        description: description?.trim() || "",
        group: selectedGroup,
        surveyType,
        tags: tags || [],
        items: items || [],
      };

      if (FinishWelcomeitems) {
        surveyData.FinishWelcomeitems = FinishWelcomeitems;
      }

      const createdSurvey = await createSurvey(surveyData);
      if (createdSurvey) {
        toast.success("Anket Oluşturuldu: " + title);
        setRefreshKey((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Anket oluşturulurken hata:", error);
      toast.error("Anket oluşturulamadı");
    }
  };
  const createNewGroupAndSurvey = async ({
    newGroupName,
    title,
    description,
    surveyType,
  }) => {
    if (!newGroupName.trim()) {
      toast.error("Klasör adı boş bırakılamaz.");
      return;
    }
    if (!title.trim()) {
      toast.error("Anket başlığı boş bırakılamaz.");
      return;
    }

    try {
      const surveyData = {
        title: title.trim(),
        description: description?.trim() || "",
        chamber,
        userId,
        group: newGroupName.trim(),
        surveyType,
      };

      const createdSurvey = await createSurvey(surveyData);
      if (createdSurvey) {
        toast.success(
          `"${newGroupName}" klasörü ve "${title}" anketi oluşturuldu.`,
        );
        setRefreshKey((prev) => prev + 1);
        setSelectedGroup(newGroupName.trim());
      }
    } catch (error) {
      console.error("Yeni klasör ve anket oluşturulurken hata:", error);
      toast.error("Yeni klasör ve anket oluşturulamadı");
    }
  };
  const createSurveyFromTemplate = async (templateData, selectedGroup) => {
    if (!selectedGroup) {
      toast.error("Bir klasör seçmelisiniz.");
      return;
    }
    try {
      await createSurveyInGroup({ ...templateData, selectedGroup });
    } catch (error) {
      toast.error("Şablondan anket oluşturulamadı");
    }
  };

  return {
    createSurveyInGroup,
    createNewGroupAndSurvey,
    createSurveyFromTemplate,
  };
}
