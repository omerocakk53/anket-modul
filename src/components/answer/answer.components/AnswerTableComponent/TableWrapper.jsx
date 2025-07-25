import React, { useState, useMemo } from 'react';
import PaginationControls from './PaginationControls';
import ExportButtons from './ExportButtons';
import ColumnToggler from './ColumnToggler';
import TextSearch from './TextSearch';
import DateFilter from './DateFilter';
import AnswerTable from './AnswerTable';

const TableWrapper = ({ survey, answers, onDelete, answerDelete }) => {
    console.log( answers)
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

    // Filtreleme
    const filtered = useMemo(() => {
        return answers.filter(ans => {
            // Tarih filtresi
            const t = new Date(ans.createdAt);
            if (startDate && t < startDate) return false;
            if (endDate && t > endDate) return false;

            // Metin filtresi
            if (searchText) {
                const haystack = JSON.stringify(ans).toLowerCase();
                if (!haystack.includes(searchText.toLowerCase())) return false;
            }
            return true;
        });
    }, [answers, searchText, startDate, endDate]);

    // Sayfalama
    const totalPages = Math.ceil(filtered.length / pageSize);
    const pageData = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filtered.slice(start, start + pageSize);
    }, [filtered, currentPage, pageSize]);

    // Export verisi
    const exportData = useMemo(() => {
        return filtered.map(ans => {
            const row = {
                ID: ans._id,
                Tarih: new Date(ans.createdAt).toLocaleString()
            };
            survey.items.forEach(item => {
                const a = ans.answers.find(a => a.itemId === item.id);
                row[item.title] = a ? (Array.isArray(a.value) ? a.value.join(', ') : a.value ?? '') : '';
            });
            return row;
        });
    }, [filtered, survey]);

    return (
        <div className="p-6 bg-white rounded-2xl shadow-xl w-full max-w-7xl mx-auto space-y-6">
            <div>
                <ExportButtons data={exportData} filename="anket_yanitlari" />
            </div>
            <div className="flex items-center justify-between gap-2">
                <div>
                    <TextSearch searchText={searchText} setSearchText={setSearchText} />
                    <DateFilter
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                    />
                </div>
                <ColumnToggler
                    columns={allColumns}
                    visibleColumns={visibleColumns}
                    setVisibleColumns={setVisibleColumns}
                />
            </div>
            <AnswerTable
                survey={survey}
                answers={pageData}
                visibleColumns={visibleColumns}
                onDelete={onDelete}
                answerDelete={answerDelete}
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
