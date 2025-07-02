import React from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { tr } from 'date-fns/locale';

export default function FilterBar({ search, setSearch, dateRange, setDateRange }) {
    const handleRangeChange = (ranges) => {
        const { selection } = ranges;

        const start = new Date(selection.startDate);
        const end = new Date(selection.endDate);

        // Gün sonuna çek (23:59:59)
        end.setHours(23, 59, 59, 999);

        setDateRange({
            start,
            end,
        });
    };

    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <input
                type="text"
                placeholder="Cevapları ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-1/3 p-2 border rounded-lg"
            />
            <button
                onClick={() => {
                    setSearch("");
                    setDateRange({ start: "", end: "" });
                }}
                className="text-sm underline text-blue-600 mt-2"
            >
                Filtreleri Temizle
            </button>

            <div>
                <DateRange
                    ranges={[{
                        startDate: dateRange.start || new Date(),
                        endDate: dateRange.end || new Date(),
                        key: 'selection',
                    }]}
                    onChange={handleRangeChange}
                    maxDate={new Date()}
                    minDate={new Date("2020-01-01")}
                    rangeColors={["#3b82f6"]}
                    locale={tr}
                    showDateDisplay={false}
                />
            </div>
        </div>
    );
}
