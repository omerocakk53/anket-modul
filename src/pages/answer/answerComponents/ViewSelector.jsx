import React, { useState } from "react";
import AnswerAnalysis from "./AnswerAnalysisComponent/AnswerAnalysis";
import { GoGraph } from "react-icons/go";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { MdCompare } from "react-icons/md";
import { PiScalesLight } from "react-icons/pi";
import AnswerScales from "./AnswerScales";
import TableWrapper from "./AnswerTableComponent/TableWrapper";
import AnswerComparison from "./AnswerComparison";
import { FiAlertCircle } from "react-icons/fi";
const ViewSelector = ({ survey, answers, handleDelete, getsurveyshare }) => {
  const [viewType, setViewType] = useState("scales");

  const handleViewChange = (newViewType) => {
    setViewType(newViewType);
  };

  const NoAnswers = () => (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow-lg flex items-center space-x-6">
      <div className="flex-shrink-0 rounded-full p-4 relative">
        <FiAlertCircle color="red" size={48} />
      </div>
      <div>
        <h2 className="text-xl text-blue-600 mb-1">Gösterilecek Cevap Yok</h2>
        <p className="text-md text-gray-500">
          Henüz bu bölüm için veri bulunmamaktadır.
        </p>
      </div>
    </div>
  );

  const averageAnswerTime =
    answers.length > 0
      ? (() => {
          const totalSeconds = answers.reduce((acc, ans) => {
            return (
              acc + (ans.responseTime.minutes * 60 + ans.responseTime.seconds)
            );
          }, 0);
          const avgSeconds = totalSeconds / answers.length;
          const avgMinutes = Math.floor(avgSeconds / 60);
          const remainingSeconds = Math.floor(avgSeconds % 60);
          if (avgMinutes === 0 && remainingSeconds === 0) return "0 dk 0 sn";
          if (avgMinutes > 0 && remainingSeconds === 0)
            return `${avgMinutes} dk`;
          if (avgMinutes === 0 && remainingSeconds > 0)
            return `${remainingSeconds} sn`;
          return `${avgMinutes} dk ${remainingSeconds} sn`;
        })()
      : "0 dk 0 sn";

  return (
    <div>
      <div className="flex p-4 gap-4 mb-4">
        <button
          onClick={() => handleViewChange("scales")}
          className={`px-4 py-2 rounded ${
            viewType === "scales"
              ? "border border-primary text-primary"
              : "border border-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <div className="flex items-center gap-2">
            <PiScalesLight size={20} /> Yanıt Ölçümü
          </div>
        </button>
        <button
          onClick={() => handleViewChange("table")}
          className={`px-4 py-2 rounded ${
            viewType === "table"
              ? "border border-primary text-primary"
              : "border border-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <div className="flex items-center gap-2">
            <GoGraph size={20} /> Sonuç Tablosu
          </div>
        </button>
        <button
          onClick={() => handleViewChange("graph")}
          className={`px-4 py-2 rounded ${
            viewType === "graph"
              ? "border border-primary text-primary"
              : "border border-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <div className="flex items-center gap-2">
            <TbBrandGoogleAnalytics size={20} /> Analiz
          </div>
        </button>
        <button
          onClick={() => handleViewChange("compare")}
          className={`px-4 py-2 rounded ${
            viewType === "compare"
              ? "border border-primary text-primary"
              : "border border-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <div className="flex items-center gap-2">
            <MdCompare size={20} /> Karşılaştırma
          </div>
        </button>
      </div>
      {viewType === "scales" && (
        <AnswerScales
          shareData={{
            viewCount: survey.numberViews?.length,
            answerCount: answers?.length,
            answerRate:
              ((answers?.length / survey.numberViews?.length) * 100).toFixed(
                0
              ) == "NaN"
                ? "0%"
                : (
                    (answers?.length / survey.numberViews?.length) *
                    100
                  ).toFixed(0) + "%",
            averageAnswerTime,
          }}
          surveyId={survey._id}
          getsurveyshare={getsurveyshare}
        />
      )}
      {viewType === "graph" &&
        (answers.length > 0 ? (
          <AnswerAnalysis survey={survey} answers={answers} />
        ) : (
          <NoAnswers />
        ))}
      {viewType === "table" &&
        (answers.length > 0 ? (
          <TableWrapper
            survey={survey}
            answers={answers}
            onDelete={handleDelete}
          />
        ) : (
          <NoAnswers />
        ))}
      {viewType === "compare" &&
        (answers.length > 0 ? (
          <AnswerComparison survey={survey} answers={answers} />
        ) : (
          <NoAnswers />
        ))}
    </div>
  );
};

export default ViewSelector;
