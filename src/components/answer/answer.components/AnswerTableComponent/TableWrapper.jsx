import React, { useState, useMemo } from 'react';
import PaginationControls from './PaginationControls';
import ExportButtons from './ExportButtons';
import ColumnToggler from './ColumnToggler';
import TextSearch from './TextSearch';
import DateFilter from './DateFilter';
import AnswerTable from './AnswerTable';
import { FiFilter } from 'react-icons/fi';

const TableWrapper = ({ survey, answers, onDelete }) => {
    const allColumns = useMemo(() => [
        { key: '_id', label: 'ID' },
        { key: 'createdAt', label: 'Tarih' },
        ...survey.items.map(item => ({
            key: item.id,
            label: item.title
        })),
    ], [survey]);

    const [visibleColumns, setVisibleColumns] = useState(allColumns.map(c => c.key));
    const [searchText, setSearchText] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const filtered = useMemo(() => {
        if (!Array.isArray(answers) || answers.length === 0) return [];
        return answers.filter(ans => {
            const t = new Date(ans.createdAt);
            if (startDate && t < startDate) return false;
            if (endDate && t > endDate) return false;

            if (searchText) {
                const haystack = JSON.stringify(ans).toLowerCase();
                if (!haystack.includes(searchText.toLowerCase())) return false;
            }
            return true;
        });
    }, [answers, searchText, startDate, endDate]);

    const totalPages = Math.ceil(filtered.length / pageSize);
    const pageData = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filtered.slice(start, start + pageSize);
    }, [filtered, currentPage, pageSize]);

    return (
        <div className="p-6 rounded-2xl shadow-xl bg-white w-full mx-auto space-y-6">
            <div className="flex justify-between items-start gap-4 w-full">
                <div className="grid gap-4">
                    <div className="w-full">
                        <TextSearch searchText={searchText} setSearchText={setSearchText} />
                    </div>
                    <div className="w-full">
                        <DateFilter
                            startDate={startDate}
                            setStartDate={setStartDate}
                            endDate={endDate}
                            setEndDate={setEndDate}
                        />
                    </div>
                    <div className="w-full">
                        <ColumnToggler
                            columns={allColumns}
                            visibleColumns={visibleColumns}
                            setVisibleColumns={setVisibleColumns}
                        />
                    </div>
                </div>
                <div className="flex-shrink-0">
                    <ExportButtons answers={filtered} survey={survey} />
                </div>
            </div>

            <AnswerTable
                survey={survey}
                answers={pageData}
                visibleColumns={visibleColumns}
                onDelete={onDelete}
            />
            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={(p) => setCurrentPage(p)}
                onPageSizeChange={(s) => {
                    setPageSize(s);
                    setCurrentPage(1);
                }}
            />
        </div>
    );
};

export default TableWrapper;
