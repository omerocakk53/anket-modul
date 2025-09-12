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
  Image,
}) {
  const handleSave = async (WelcomeTextData, image) => {
    if (!WelcomeTextData?.title) {
      toast.error("Boş değerler var");
      return;
    }

    // Mevcut imageName veya upload sonucu
    let uploadedPath = null;

    // imageName string mi object mi kontrol et
    const newImageName = typeof image === "string" ? image : image?.name; // obje ise name alanını al

    let oldImageName = "";
    if (Array.isArray(items) && items.length > 0) {
      oldImageName = items[0]?.imageName?.filename || "";
    }

    // Yeni resim varsa yükle
    if (newImageName && newImageName !== oldImageName) {
      try {
        uploadedPath = await Image(image);
      } catch (err) {
        toast.error("Görsel yüklenemedi");
        return err;
      }
    } else {
      uploadedPath = items?.[0]?.imageName ?? "";
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
