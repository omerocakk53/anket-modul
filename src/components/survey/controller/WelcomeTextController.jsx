import { React } from "react";
import WelcomeTextSettingsModel from "../modal/WelcomeTextSettingsModel";
import { toast } from "react-hot-toast";

function WelcomeTextController({
  isOpen,
  setControllerOpen,
  items,
  Item,
  setItems,
  Edit,
  SetEdit,
  Image, // async upload fonksiyonu
}) {
  const handleSave = async (WelcomeTextData, ImageData) => {
    if (!WelcomeTextData?.title) {
      toast.error("Boş değerler var");
      return;
    }

    // Mevcut imageName veya upload sonucu
    let uploadedPath = Item.imageName || "";

    if (ImageData) {
      try {
        uploadedPath = await Image(ImageData); // Dosya upload bekleniyor
      } catch (err) {
        toast.error("Görsel yüklenemedi");
        return err;
      }
    }

    const updatedItem = {
      ...Item,
      ...WelcomeTextData,
      imageName: uploadedPath,
    };

    const index = items.findIndex((i) => i.id === Item.id);

    if (index >= 0) {
      // Var olanı güncelle
      const updatedItems = [...items];
      updatedItems[index] = updatedItem;
      setItems(updatedItems);
      toast.success("Bileşen güncellendi");
      SetEdit(false);
    } else {
      // Yeni ekle
      setItems([...items, updatedItem]);
      toast.success("Yeni bileşen eklendi");
    }

    setControllerOpen(false);
  };

  return (
    <WelcomeTextSettingsModel
      isOpen={isOpen}
      onClose={() => {
        setControllerOpen(false);
        SetEdit(false);
      }}
      onSave={handleSave}
      initialData={Edit ? Item : {}}
    />
  );
}

export default WelcomeTextController;
