import React, { useState } from 'react';
import AnswerChartSwitcher from './answerChartSwitcher/index';
import ToggleableSection from './ToggleableSection';

function AnswerChartCard({ question, counts, rawCounts, tableData }) {
  const [isVisible, setIsVisible] = useState(true);
  const [viewType, setViewType] = useState('bar');
  console.log(question,counts,rawCounts);
  return (
    <ToggleableSection
      title={`${question.title} (${question.type})`}
      isVisible={isVisible}
      onToggle={() => setIsVisible(!isVisible)}
    >
      {isVisible && (
        <div className="p-4 mx-auto" style={{ minWidth: '600px', maxWidth: '100%', overflowX: 'auto' }}>
          <AnswerChartSwitcher
            view={viewType}
            setView={setViewType}
            labels={Object.keys(counts)}
            data={Object.values(counts)}
            rawCounts={rawCounts}
            questionData={question.data}
            questionMemberSatificaitonMatris={question.MemberSatificaitonMatris}
            questionType={question.type}
            tableData={tableData}
          />
        </div>
      )}
    </ToggleableSection>
  );
}

export default AnswerChartCard;
