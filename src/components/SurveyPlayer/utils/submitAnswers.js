import { toast } from 'react-hot-toast';
import { showSuccess } from "../../successMesage/successController.js";

export async function submitAnswers(answers, data, surveyId, user, startDate, answersave) {
    const finishedAt = new Date();
    const diffMs = finishedAt.getTime() - startDate.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffSec / 60);
    const seconds = diffSec % 60;

    try {
        const formattedAnswers = Object.entries(answers).map(([id, value]) => {
            const item = data.find(q => q.id === id);
            return {
                itemId: id,
                itemType: item?.type || "Unknown",
                value: value
            };
        });

        const response = await answersave(surveyId, user.name, { minutes, seconds }, formattedAnswers);

        if (response.message) {
            toast.error(response.message);
        } else {
            showSuccess("Anket Cevabınız Alındı");
        }
    } catch (err) {
        console.error("Cevaplar kaydedilemedi:", err);
        toast.error("Cevaplar kaydedilemedi");
    }
}
