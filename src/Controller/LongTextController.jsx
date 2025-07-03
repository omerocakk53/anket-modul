import { React, useState, useEffect } from 'react'

import LongTextSettingsModel from '../Modal/LongTextSettingsModel';
import { toast } from 'react-toastify'

function LongTextController({ isOpen, setControllerOpen, items, Item, setItems, count, Edit, SetEdit }) {

  const [LongText, setLongText] = useState({});

  useEffect(() => {
    if (!Item.id) return;

    if (!LongText?.title || !LongText?.helpText) {
      toast.warn("boş değerler var")
      return;
    };

    const updatedItem = {
      ...Item,
      title: LongText.title,
      helpText: LongText.helpText,
      complusory: LongText.complusory,
      SurveyNumberVisible: LongText.SurveyNumberVisible,
      charLimit: LongText.charLimit
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
  }, [LongText]);

  return (
    <>
      <LongTextSettingsModel
        isOpen={isOpen}
        onClose={() => { setControllerOpen(false); SetEdit(false) }}
        onSave={(LongTextData) => { setLongText(LongTextData) }}
        count={count}
        initialData={Edit ? Item : {}} />
    </>
  )
}

export default LongTextController