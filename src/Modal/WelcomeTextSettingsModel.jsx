import { React, useState, useEffect } from "react";
import WelcomeText from "../components/WelcomeText";
import ModalLayout from "../components/layouts/ModalLayout";

function WelcomeTextSettingsModel({ isOpen, onClose, onSave, onChange, initialData }) {
    const [title, setTitle] = useState("");
    const [helpText, setHelpText] = useState("");
    const [SurveyNumberVisible, setSurveyNumberVisible] = useState(true);

    useEffect(() => {
        onChange?.({ title, helpText });
    }, [title, helpText]);

    useEffect(() => {
        setTitle(initialData?.title || "");
        setHelpText(initialData?.helpText || "");
    }, [initialData]);

    if (!isOpen) return null;
    const leftPanel = (
        <div className="tw-space-y-4">
            <h2 className="tw-text-lg tw-font-bold">Hoşgeldiniz Metni Ayarları</h2>

            <div>
                <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Mesajınız</label>
                <input
                    type="text"
                    className="tw-w-full tw-border tw-rounded tw-p-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ankete hoş geldiniz!"
                />
            </div>

            <div>
                <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Alt Mesaj</label>
                <input
                    type="text"
                    className="tw-w-full tw-border tw-rounded tw-p-2"
                    value={helpText}
                    onChange={(e) => setHelpText(e.target.value)}
                />
            </div>

            <div className="tw-flex tw-gap-2 tw-p-5 tw-absolute tw-left-0 tw-bottom-0 tw-bg-neutral tw-md:w-1/2 tw-w-full tw-">
                <button className="tw-px-4 tw-py-2 tw-bg-gray-300 tw-rounded" onClick={onClose}>
                    Vazgeç
                </button>
                <button
                    className="tw-px-4 tw-py-2 tw-bg-blue-500 tw-text-white tw-rounded"
                    onClick={() => {
                        onSave({ title, helpText });
                        setTitle("");
                        setHelpText("");
                    }}
                >
                    Kaydet
                </button>
            </div>
        </div>
    );

    const rightPanel = (
        <WelcomeText title={title} helpText={helpText} />
    );

    return <ModalLayout leftPanel={leftPanel} rightPanel={rightPanel} />;

}

export default WelcomeTextSettingsModel;
