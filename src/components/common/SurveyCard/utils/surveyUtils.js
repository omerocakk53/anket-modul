import toast from "react-hot-toast";

export const SaveSurvey = async (EditingData, createSurvey, setRefreshKey) => {
  try {
    if (!Object.keys(EditingData).length) {
      return;
    }
    const response = await createSurvey(EditingData);
    toast.success(
      `"${response.title}" Anketi "${response.group}" Klasörüne  Kopyalandı.`,
    );
    setRefreshKey((prev) => prev + 1);
  } catch (error) {
    console.log(error);
  }
};
