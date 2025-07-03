import { React, useState, useEffect } from 'react';
import ShortTextSettingsModal from '../Modal/ShortTextSettingsModel';
import { toast } from 'react-hot-toast';

function ShortTextController({ isOpen, setControllerOpen, items, Item, setItems, count, Edit, SetEdit }) {
  const [ShortText, setShortText] = useState({});
  useEffect(() => {
    if (!Item.id || !ShortText?.title || !ShortText?.helpText) return;

    const updatedItem = {
      ...Item,
      title: ShortText.title,
      helpText: ShortText.helpText,
      complusory: ShortText.complusory,
      SurveyNumberVisible: ShortText.SurveyNumberVisible,
      inputType: ShortText.inputType,
      charLimit: ShortText.charLimit,
    };

    if (Edit) {
      const updatedItems = items.map((i) => (i.id === Item.id ? updatedItem : i));
      setItems(updatedItems);
      toast.success("Bileşen güncellendi");
      SetEdit(false);
    } else {
      const newItem = {
        ...updatedItem,
        id: Item.id + '-' + count,
      };
      setItems([...items, newItem]);
      toast.success("Yeni bileşen eklendi");
    }

    setControllerOpen(false);
  }, [ShortText]);

  return (
    <ShortTextSettingsModal
      isOpen={isOpen}
      onClose={() => { setControllerOpen(false); SetEdit(false) }}
      onSave={(shortTextData) => { setShortText(shortTextData) }}
      count={count}
      initialData={Edit ? Item : {}}
    />
  );
}

export default ShortTextController;
