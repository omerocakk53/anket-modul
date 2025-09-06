import { arrayMove } from "@dnd-kit/sortable";
import toast from "react-hot-toast";

export default function useDragAndDrop({
  items,
  setItems,
  finishWelcomeItems,
  setFinishWelcomeItems,
  updatesurvey,
  surveyId,
  setShouldReload,
}) {
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over?.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);

      updatesurvey(surveyId, {
        items: newItems,
        FinishWelcomeitems: finishWelcomeItems,
      });

      toast.success("Anket kaydedildi");
      setShouldReload(true);
    }
  };

  const handleDelete = (id) => {
    setItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== id);
      updatesurvey(surveyId, {
        items: newItems,
        FinishWelcomeitems: finishWelcomeItems,
      });
      setShouldReload(true);
      return newItems;
    });
    toast.success("Öğe Silindi id: " + id);
  };

  const handleDeleteWelcomeFinish = (id) => {
    setFinishWelcomeItems((prev) => {
      const newFinishItems = prev.filter((item) => item.id !== id);
      updatesurvey(surveyId, { items, FinishWelcomeitems: newFinishItems });
      setShouldReload(true);
      return newFinishItems;
    });
    toast.success("Öğe Silindi id: " + id);
  };

  return {
    handleDragEnd,
    handleDelete,
    handleDeleteWelcomeFinish,
  };
}
