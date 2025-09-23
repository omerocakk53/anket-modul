import { React, useState, useEffect } from "react";
import FinishText from "../Items/FinishText";
import ModalLayout from "../../../layouts/ModalLayout";
import RichTextEditor from "../../common/RichTextEditor";
import he from "he";

function WelcomeTextSettingsModel({
  isOpen,
  onClose,
  onSave,
  onChange,
  initialData,
}) {
  const [title, setTitle] = useState("");
  const [titleStyle, setTitleStyle] = useState("");
  const [helpText, setHelpText] = useState("");
  const [helpTextStyle, setHelpTextStyle] = useState("");
  const [socialLinks, setSocialLinks] = useState([]);
  const [platform, setPlatform] = useState("");

  useEffect(() => {
    onChange?.({ title, helpText });
  }, [title, helpText]);

  useEffect(() => {
    setTitle(initialData?.title || "");
    setHelpText(initialData?.helpText || "");
    setTitleStyle(initialData?.titleStyle || "");
    setHelpTextStyle(initialData?.helpTextStyle || "");
    setSocialLinks(
      initialData?.socialLinks || [
        { platform: "Facebook", url: "" },
        { platform: "Twitter", url: "" },
        { platform: "Instagram", url: "" },
        { platform: "LinkedIn", url: "" },
        { platform: "YouTube", url: "" },
        { platform: "TikTok", url: "" },
        { platform: "WhatsApp", url: "" },
        { platform: "Telegram", url: "" },
      ]
    );
    setPlatform(initialData?.platform || "");
  }, [initialData]);

  if (!isOpen) return null;
  const leftPanel = (
    <div className="space-y-2">
      <h2 className="text-lg font-bold">Bitiş Sayfası Metni Ayarları</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Mesajınız</label>
        <RichTextEditor
          value={he.decode(titleStyle)}
          onChange={(html) => {
            setTitleStyle(html);
            const tempEl = document.createElement("div");
            tempEl.innerHTML = html;
            setTitle(tempEl.innerText || "");
          }}
          placeholder="Mesajınız"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Alt Mesaj (isteğe bağlı)
        </label>
        <RichTextEditor
          value={he.decode(helpTextStyle)}
          onChange={(html) => {
            setHelpTextStyle(html);
            const tempEl = document.createElement("div");
            tempEl.innerHTML = html;
            setHelpText(tempEl.innerText || "");
          }}
          placeholder="Alt Mesaj"
        />
      </div>

      <div className="flex flex-col items-start gap-2">
        <label className="block text-sm font-medium mb-1">
          Sosyal Medya Bağlantıları
        </label>

        <div className="flex items-center gap-2 mb-2">
          <select
            className="border p-1 rounded"
            value={platform}
            onChange={(e) => {
              setPlatform(e.target.value);
            }}
          >
            <option value="">Platform Seçin</option>
            {socialLinks.map((data, index) => (
              <option key={index} value={data.platform}>
                {data.platform}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="border p-1 rounded w-full"
            placeholder={`https://${platform.toLowerCase()}.com/`}
            value={
              socialLinks?.find((link) => link.platform === platform)?.url || ""
            }
            onChange={(e) => {
              setSocialLinks(
                socialLinks.map((link) => {
                  if (link.platform === platform) {
                    return { ...link, url: e.target.value };
                  }
                  return link;
                })
              );
            }}
          />
        </div>
      </div>

      <div className="flex gap-2 p-5 absolute left-0 bottom-0 bg-neutral md:w-1/2 w-full ">
        <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
          Vazgeç
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => {
            onSave({
              title,
              helpText,
              helpTextStyle,
              titleStyle,
              socialLinks,
              platform,
            });
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
    <FinishText
      titleStyle={titleStyle}
      helpTextStyle={helpTextStyle}
      socialLinks={socialLinks}
    />
  );

  return <ModalLayout leftPanel={leftPanel} rightPanel={rightPanel} />;
}

export default WelcomeTextSettingsModel;
