import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import QuestionGroup from "../Items/QuestionGroup";
import ModalLayout from "../../../layouts/ModalLayout";
function QuestionGroupSettingsModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  count,
}) {
  const [title, setTitle] = useState("");
  const [helpText, setHelpText] = useState("");
  const [questions, setQuestions] = useState([]);
  const [complusory, setComplusory] = useState(true);
  const [value, setValue] = useState();
  const [SurveyNumberVisible, setSurveyNumberVisible] = useState(true);
  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSave = () => {
    onSave({ title, helpText, questions, complusory, SurveyNumberVisible });
    setHelpText("");
    setQuestions([]);
    setTitle("");
    setComplusory(true);
    setSurveyNumberVisible(initialData?.SurveyNumberVisible);
  };

  useEffect(() => {
    if (Object.keys(initialData).length !== 0) {
      setTitle(initialData?.title || "");
      setHelpText(initialData?.helpText || "");
      setComplusory(initialData?.complusory ?? true);
      setQuestions(
        Array.isArray(initialData?.questions) ? initialData.questions : [],
      );
    } else {
      setTitle("");
      setHelpText("");
      setComplusory(true);
      setQuestions([]);
      setSurveyNumberVisible(true);
    }
  }, [initialData]);

  if (!isOpen) return null;
  const leftPanel = (
    <div className="space-y-2 mb-24">
      <h2 className="text-lg font-bold">Soru Grubu Ayarları</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Başlık</label>
        <input
          className="w-full border rounded p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Soru grubu başlığı"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Yardım Metni (isteğe bağlı)
        </label>{" "}
        <input
          className="w-full border rounded p-2"
          value={helpText}
          onChange={(e) => setHelpText(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Alt Sorular</label>
        {questions.map((q, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-2">
            <input
              className="flex-1 border rounded p-2"
              value={q}
              onChange={(e) => handleQuestionChange(idx, e.target.value)}
              placeholder={`Soru ${idx + 1}`}
            />
            <button
              onClick={() => removeQuestion(idx)}
              className="text-red-500 hover:text-red-700"
              title="Soruyu Sil"
            >
              <FaTrash />
            </button>
          </div>
        ))}
        <button className="mt-2 text-blue-600" onClick={addQuestion}>
          + Soru Ekle
        </button>
      </div>
      <div className="flex items-center space-x-3">
        <label
          className="text-sm font-medium text-primary-dark select-none cursor-pointer"
          onClick={() => setComplusory((prev) => !prev)}
        >
          Zorunlu alan
        </label>
        <button
          type="button"
          aria-pressed={complusory}
          onClick={() => setComplusory((prev) => !prev)}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
            complusory ? "bg-primary" : "bg-neutral-light"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
              complusory ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>
      <div className="flex items-center space-x-3">
        <label
          className="text-sm font-medium text-primary-dark select-none cursor-pointer"
          onClick={() => setSurveyNumberVisible((prev) => !prev)}
        >
          Soru Numarası Gözüksün
        </label>
        <button
          type="button"
          aria-pressed={SurveyNumberVisible}
          onClick={() => setSurveyNumberVisible((prev) => !prev)}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
            SurveyNumberVisible ? "bg-primary" : "bg-neutral-light"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
              SurveyNumberVisible ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>
      <div className="flex gap-2 p-5 absolute left-0 bottom-0 bg-neutral md:w-1/2 w-full ">
        <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
          Vazgeç
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleSave}
        >
          Kaydet
        </button>
      </div>
    </div>
  );
  const rightPanel = (
    <QuestionGroup
      title={title}
      helpText={helpText}
      questions={questions.map((q, i) => `${i + 1}. ${q}`)}
      id={`preview-${count}`}
      onChange={(value) => {
        setValue(value);
      }}
      value={value}
      count={count}
      SurveyNumberVisible={SurveyNumberVisible}
    />
  );

  return <ModalLayout leftPanel={leftPanel} rightPanel={rightPanel} />;
}

export default QuestionGroupSettingsModal;
