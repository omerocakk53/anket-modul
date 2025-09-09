import React, { useState, useEffect } from "react";
import DescriptionSettingsModal from "../modal/DescriptionSettingsModal";
import { toast } from "react-hot-toast";

function DescriptionController({
  isOpen,
  setControllerOpen,
  items,
  Item,
  setItems,
  count,
  Edit,
  SetEdit,
}) {
  const [DescriptionData, setDescriptionData] = useState({});
  useEffect(() => {
    if (!Item.id) return;
    if (!DescriptionData?.title) {
      toast.error("boş değerler var");
    }
    const updatedItem = {
      ...Item,
      title: DescriptionData.title,
      helpText: DescriptionData.helpText,
      SurveyNumberVisible: DescriptionData.SurveyNumberVisible,
    };
    if (Edit) {
      const updatedItems = items.map((i) =>
        i.id === Item.id ? updatedItem : i,
      );
      setItems(updatedItems);
      toast.success("Bileşen güncellendi");
      SetEdit(false);
    } else {
      const newItem = {
        ...updatedItem,
        id: Item.id + "-" + count,
      };
      setItems([...items, newItem]);
      toast.success("Yeni bileşen eklendi");
    }
    setControllerOpen(false);
  }, [DescriptionData]);
  return (
    <DescriptionSettingsModal
      isOpen={isOpen}
      onClose={() => {
        setControllerOpen(false);
        SetEdit(false);
      }}
      onSave={(data) => setDescriptionData(data)}
      count={count}
      initialData={Edit ? Item : {}}
    />
  );
}

export default DescriptionController;
