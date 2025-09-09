import React, { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";
import TitleInput from "./sections/TitleInput";
import DescriptionInput from "./sections/DescriptionInput";
import GroupSelect from "./sections/GroupSelect";
import LinkInput from "./sections/LinkInput";
import TagInput from "./sections/TagInput";
import PeriodInput from "./sections/PeriodInput";
import ActiveToggle from "./sections/ActiveToggle";
import { toast } from "react-hot-toast";

export default function EditSurveyModal({
  surveys,
  survey,
  onClose,
  onUpdate,
  updatesurveyfeature,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    group: "",
    active: false,
    tags: [],
    link: "",
    activePeriodDates: [],
  });
  const [newTag, setNewTag] = useState("");
  const [newPeriod, setNewPeriod] = useState({ startDate: "", endDate: "" });

  useEffect(() => {
    setFormData({
      title: survey.title || "",
      description: survey.description || "",
      group: survey.group || "",
      active: survey.active || false,
      tags: survey.tags || [],
      link: survey.link || "",
      activePeriodDates: survey.activePeriodDates || [],
    });
  }, [survey]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await updatesurveyfeature(survey._id, formData);
      toast.success("Anket Güncellendi");
      onUpdate(updated);
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Güncelleme başarısız");
    }
  };

  return (
    <ModalWrapper onClose={onClose}>
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-primary-dark">
        Anketi Düzenle
      </h2>
      <div className="flex items-start bg-info/10 text-info p-3 rounded-md text-sm gap-2 mb-5">
        <span>
          <strong>Bilgi:</strong> Sadece doldurduğunuz alanlar güncellenecektir.
          Boş bırakılan değerler eski haliyle kalır.
        </span>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        {survey.surveyType === "MemberSatisfaction" && (
          <PeriodInput
            periods={formData.activePeriodDates}
            setPeriods={(p) =>
              setFormData({ ...formData, activePeriodDates: p })
            }
            newPeriod={newPeriod}
            setNewPeriod={setNewPeriod}
          />
        )}
        <TitleInput
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder={survey.title}
        />
        <DescriptionInput
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder={survey.description}
        />
        <GroupSelect
          group={formData.group}
          setGroup={(g) => setFormData({ ...formData, group: g })}
          surveys={surveys}
        />
        <LinkInput
          link={formData.link}
          setLink={(l) => setFormData({ ...formData, link: l })}
        />
        <TagInput
          tags={formData.tags}
          setTags={(tags) => setFormData({ ...formData, tags })}
          newTag={newTag}
          setNewTag={setNewTag}
        />
        <ActiveToggle
          active={formData.active}
          setActive={(active) => setFormData({ ...formData, active })}
        />
        <button
          type="submit"
          className="w-full py-2 rounded-lg font-semibold transition bg-primary hover:bg-secondary text-white"
        >
          Kaydet
        </button>
      </form>
    </ModalWrapper>
  );
}
