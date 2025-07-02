import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import QuestionGroup from "../components/QuestionGroup";
import ModalLayout from "../components/layouts/ModalLayout";
function QuestionGroupSettingsModal({ isOpen, onClose, onSave, initialData, count }) {
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
    setSurveyNumberVisible(initialData?.SurveyNumberVisible)
  };

  useEffect(() => {
    if (Object.keys(initialData).length !== 0) {
      setTitle(initialData?.title || "");
      setHelpText(initialData?.helpText || "");
      setComplusory(initialData?.complusory ?? true);
      setQuestions(Array.isArray(initialData?.questions) ? initialData.questions : []);
    } else {
      setTitle("");
      setHelpText("");
      setComplusory(true);
      setQuestions([]);
      setSurveyNumberVisible(true)
    }
  }, [initialData]);

  if (!isOpen) return null;
  const leftPanel = (
    <div className="tw-space-y-4">
      <h2 className="tw-text-lg tw-font-bold">Soru Grubu Ayarları</h2>

      <div>
        <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Başlık</label>
        <input
          className="tw-w-full tw-border tw-rounded tw-p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Soru grubu başlığı"
        />
      </div>

      <div>
        <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Yardım Metni</label>
        <input
          className="tw-w-full tw-border tw-rounded tw-p-2"
          value={helpText}
          onChange={(e) => setHelpText(e.target.value)}
        />
      </div>

      <div>
        <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">Alt Sorular</label>
        {questions.map((q, idx) => (
          <div key={idx} className="tw-flex tw-items-center tw-gap-2 tw-mb-2">
            <input
              className="tw-flex-1 tw-border tw-rounded tw-p-2"
              value={q}
              onChange={(e) => handleQuestionChange(idx, e.target.value)}
              placeholder={`Soru ${idx + 1}`}
            />
            <button
              onClick={() => removeQuestion(idx)}
              className="tw-text-red-500 tw-hover:text-red-700"
              title="Soruyu Sil"
            >
              <FaTrash />
            </button>
          </div>
        ))}
        <button className="tw-mt-2 tw-text-blue-600" onClick={addQuestion}>
          + Soru Ekle
        </button>
      </div>
      <div className="tw-flex tw-items-center tw-space-x-3">
        <label
          className="tw-text-sm tw-font-medium tw-text-primary-dark tw-select-none tw-cursor-pointer"
          onClick={() => setComplusory(prev => !prev)}
        >
          Zorunlu alan
        </label>
        <button
          type="button"
          aria-pressed={complusory}
          onClick={() => setComplusory(prev => !prev)}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${complusory ? 'bg-primary' : 'bg-neutral-light'
            }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${complusory ? 'translate-x-6' : 'translate-x-0'
              }`}
          />
        </button>
      </div>
      <div className="tw-flex tw-items-center tw-space-x-3">
        <label
          className="tw-text-sm tw-font-medium tw-text-primary-dark tw-select-none tw-cursor-pointer"
          onClick={() => setSurveyNumberVisible(prev => !prev)}
        >
          Soru Numarası Gözüksün
        </label>
        <button
          type="button"
          aria-pressed={SurveyNumberVisible}
          onClick={() => setSurveyNumberVisible(prev => !prev)}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${SurveyNumberVisible ? 'bg-primary' : 'bg-neutral-light'
            }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${SurveyNumberVisible ? 'translate-x-6' : 'translate-x-0'
              }`}
          />
        </button>
      </div>
      <div className="tw-flex tw-gap-2 tw-p-5 tw-absolute tw-left-0 tw-bottom-0 tw-bg-neutral tw-md:w-1/2 tw-w-full tw-">
        <button className="tw-px-4 tw-py-2 tw-bg-gray-300 tw-rounded" onClick={onClose}>
          Vazgeç
        </button>
        <button className="tw-px-4 tw-py-2 tw-bg-blue-500 tw-text-white tw-rounded" onClick={handleSave}>
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
      onChange={(value) => { setValue(value) }}
      value={value}
      count={count}
      SurveyNumberVisible={SurveyNumberVisible}
    />
  );

  return <ModalLayout leftPanel={leftPanel} rightPanel={rightPanel} />;

}

export default QuestionGroupSettingsModal;
