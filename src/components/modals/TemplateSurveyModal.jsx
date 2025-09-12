import React, { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import FixSurveyCard from "./FixSurveyCard";
import toast from "react-hot-toast";
import ConfirmDelete from "../confirm/ConfirmDelete";

export default function TemplateSurveyModal({
  user,
  isOpen,
  animateisOpen,
  onClose,
  onSelectTemplate,
  getallsurveytemplate,
  deletesurveytemplateId,
  createsurveytemplate,
  templateData,
  getChamberId,
}) {
  const [templates, setTemplates] = useState(null);
  const [chamberName, setChamberName] = useState("");
  const [edit, setEdit] = useState(false);
  const [Reload, setReload] = useState(0);
  const AddAnimateRef = useRef(null);

  useEffect(() => {
    getallsurveytemplate().then((data) => {
      setTemplates(data);
    });
  }, [getallsurveytemplate, Reload]);

  useEffect(() => {
    setEdit(user && user.role === "superAdmin");
  }, [user]);

  useEffect(() => {
    let isMounted = true;

    async function fetchChamber() {
      try {
        const response = await getChamberId(user ? user.chamber : null);
        if (isMounted) {
          setChamberName(response.data.name);
        }
      } catch (err) {
        console.error(err);
      }
    }

    if (user) {
      fetchChamber();
    }

    return () => {
      isMounted = false; // cleanup
    };
  }, [user, getChamberId]);

  useEffect(() => {
    const goToTemplate = async (survey) => {
      try {
        const template = await createsurveytemplate({ surveyId: survey._id });
        toast.success(template.title + " adlı anketin şablonu oluşturuldu.", {
          duration: 2000,
        });
        setReload((prev) => prev + 1);
        animateisOpen(true);
        setTimeout(() => {
          if (AddAnimateRef.current) {
            AddAnimateRef.current.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
            AddAnimateRef.current.classList.add("animate-pulse-slow");
            setTimeout(() => {
              AddAnimateRef.current.classList.remove("animate-pulse-slow");
            }, 2000);
          }
        }, 100);
      } catch (error) {
        if (error.response.status === 400) {
          toast.error(error.response.data.message, { duration: 2000 });
        }
        console.log(error);
      }
    };
    if (templateData) {
      goToTemplate(templateData);
    }
  }, [templateData]);

  if (!isOpen || !templates) return null;

  const handleDelete = (id) => {
    toast(
      ConfirmDelete({
        onConfirm: () => {
          deletesurveytemplateId(id);
          setTemplates((prev) => prev.filter((tpl) => tpl._id !== id));
        },
        message: "Bu şablonu silmek istediğinize emin misiniz?",
      }),
      { duration: 4000 }
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl p-8 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-700 hover:text-red-600 transition"
        >
          <IoMdClose size={26} />
        </button>
        <h3 className="text-2xl font-semibold text-center text-neutral-800 mb-6">
          {chamberName ? chamberName + " - " : ""} Anket Şablonları
        </h3>
        <div className="grid p-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[70vh] overflow-y-auto">
          {templates.map((survey, idx) => (
            <FixSurveyCard
              AddAnimateRef={
                idx === templates.length - 1 ? AddAnimateRef : null
              }
              key={survey._id}
              edit={edit}
              survey={survey}
              onSelect={onSelectTemplate}
              onClose={onClose}
              onDelete={() => handleDelete(survey._id)}
              chamberName={chamberName}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
