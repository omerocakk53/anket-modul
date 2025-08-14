import React, { useState, useMemo } from 'react';
import QuestionFilter from './QuestionFilter';
import AnswerChartCard from './AnswerChartCard';
import getAnswerCounts from '../../analysis/hooks/getanswerCounts';

const analyzableTypes = [
  'MultipleChoice', 'Dropdown', 'ImageChoice', 'Scale', 'Rating', 'Numeric', 'Matris', 'Table',
];

function AnswerAnalysis({ survey, answers }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);

  const filteredQuestions = useMemo(() => {
    return survey.items.filter(q => {
      const matchesType = analyzableTypes.includes(q.type);
      const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [survey.items, searchTerm]);

  const filteredAnswers = useMemo(() => {
    if (!dateRange[0] || !dateRange[1]) return answers;
    const [start, end] = dateRange;
    return answers.filter(ans => {
      const createdAt = new Date(ans.createdAt);
      return createdAt >= start && createdAt <= end;
    });
  }, [answers, dateRange]);

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <QuestionFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} dateRange={dateRange} setDateRange={setDateRange} />
      <div className='flex flex-wrap justify-center gap-5'>
        {filteredQuestions.map(question => {
          const { counts, rawCounts , tableData } = getAnswerCounts(question, filteredAnswers);
          return (
            <AnswerChartCard
              key={question.id}
              question={question}
              counts={counts}
              rawCounts={rawCounts}
              tableData={tableData}
            />
          );
        })}
      </div>
    </div>
  );
}

export default AnswerAnalysis;
