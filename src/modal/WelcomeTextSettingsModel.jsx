import { React, useState, useEffect, useRef } from "react";
import WelcomeText from "../components/Items/WelcomeText";
import ModalLayout from "../components/layouts/ModalLayout";

function WelcomeTextSettingsModel({ isOpen, onClose, onSave, onChange, initialData }) {
    const [title, setTitle] = useState("");
    const [helpText, setHelpText] = useState("");
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        onChange?.({ title, helpText });
    }, [title, helpText]);

    useEffect(() => {
        setTitle(initialData?.title || "");
        setHelpText(initialData?.helpText || "");
        setImage(null); // Yeni açıldığında file reset
    }, [initialData]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImage(file); // Sadece dosyayı sakla
    };

    if (!isOpen) return null;

    const leftPanel = (
        <div className="space-y-2">
            <h2 className="text-lg font-bold">Hoşgeldiniz Metni Ayarları</h2>

            <div>
                <label className="block text-sm font-medium mb-1">Mesajınız</label>
                <input
                    type="text"
                    className="w-full border rounded p-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ankete hoş geldiniz!"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Alt Mesaj (isteğe bağlı)</label>
                <input
                    type="text"
                    className="w-full border rounded p-2"
                    value={helpText}
                    onChange={(e) => setHelpText(e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Karşılama Görseli</label>
                <div>
                    <div
                        onClick={() => fileInputRef.current.click()}
                        className="mt-2 flex items-center justify-center h-36 sm:h-40 border-2 border-dashed rounded-xl cursor-pointer hover:border-blue-400 hover:text-blue-500 transition text-center px-2"
                    >
                        <span className="text-sm text-gray-500">
                            {!image
                                ? "Yeni görsel seç"
                                : `Seçilen Görsel: ${image.name}`}
                        </span>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-2 p-5 absolute left-0 bottom-0 bg-neutral md:w-1/2 w-full ">
                <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
                    Vazgeç
                </button>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => {
                        const formData = new FormData();
                        if (image) {
                            formData.append("image", image); // multer burayı yakalar
                        }
                        onSave({ title, helpText }, formData); // Direkt FormData gönder
                        setTitle("");
                        setHelpText("");
                        setImage(null);
                    }}
                >
                    Kaydet
                </button>
            </div>
        </div>
    );

    const rightPanel = (
        <WelcomeText title={title} helpText={helpText} image={image} />
    );

    return <ModalLayout leftPanel={leftPanel} rightPanel={rightPanel} />;
}

export default WelcomeTextSettingsModel;
