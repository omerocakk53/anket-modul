import React, { useState, useRef, useEffect } from 'react';
import { FiTag, FiList, FiSearch, FiChevronDown, FiCalendar } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // temel stil
import 'react-date-range/dist/theme/default.css'; // tema stil
import { tr } from 'date-fns/locale'; // Türkçe locale'i import et
export default function FilterSortSearch({
  onSearch,
  onSort,
  searchMode,
  setSearchMode,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  dateRange,
  setDateRange
}) {
  const [searchText, setSearchText] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const dropdownRef = useRef(null);
  const sortRef = useRef(null);
  const calendarRef = useRef(null);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch?.(value);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
      if (
        sortRef.current && !sortRef.current.contains(event.target)
      ) {
        setSortDropdownOpen(false);
      }
      if (
        calendarRef.current && !calendarRef.current.contains(event.target)
      ) {
        setCalendarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectMode = (mode) => {
    setSearchMode(mode);
    toast.info(`Arama modu: ${mode === 'title' ? 'Başlık araması' : 'Etiket araması'}`);
    setDropdownOpen(false);
  };

  const handleSortChange = (field) => {
    setSortBy(field);
    toast.info(`Sıralama: ${field === 'title' ? 'Başlık' : field === 'tags' ? 'Etiket' : 'Oluşturulma Tarihi'}`);
  };

  const handleOrderToggle = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const handleRangeChange = (ranges) => {
    const { selection } = ranges;
    setDateRange({
      startDate: selection.startDate,
      endDate: selection.endDate,
    });
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('tr-TR');
  };

  return (
    <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
      <div className="flex gap-3 items-center">

        {/* Arama Modu */}
        <div className="relative inline-block text-left" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm border border-primary-light text-primary-darktext rounded-lg hover:bg-primary-dark hover:text-primary-text transition"
          >
            <FiTag className="w-4 h-4" />
            {searchMode === 'title' ? 'Başlık ile Ara' : 'Etiket ile Ara'}
            <FiChevronDown className="w-4 h-4 ml-1" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-primary-light rounded-md shadow-lg z-10">
              <button
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-primary-light hover:text-primary-text ${searchMode === 'title' ? 'font-bold bg-primary-light text-primary-text' : ''}`}
                onClick={() => handleSelectMode('title')}
              >
                Başlık ile Ara
              </button>
              <button
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-primary-light hover:text-primary-text ${searchMode === 'tags' ? 'font-bold bg-primary-light text-primary-text' : ''}`}
                onClick={() => handleSelectMode('tags')}
              >
                Etiket ile Ara
              </button>
            </div>
          )}
        </div>

        {/* Sıralama */}
        <div className="relative inline-block text-left" ref={sortRef}>
          <button
            onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm border border-secondary  rounded-lg hover:bg-secondary hover:text-primary-text transition"
          >
            <FiList className="w-4 h-4" />
            Sırala
            <FiChevronDown className="w-4 h-4 ml-1" />
          </button>

          {sortDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-secondary-light rounded-md shadow-lg z-10">
              <button
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-secondary-light hover:text-primary-text ${sortBy === 'title' ? 'font-bold bg-secondary-light text-primary-text' : ''}`}
                onClick={() => handleSortChange('title')}
              >
                Başlığa Göre
              </button>
              <button
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-secondary-light hover:text-primary-text ${sortBy === 'tags' ? 'font-bold bg-secondary-light text-primary-text' : ''}`}
                onClick={() => handleSortChange('tags')}
              >
                Etikete Göre
              </button>
              <button
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-secondary-light hover:text-primary-text ${sortBy === 'createTime' ? 'font-bold bg-secondary-light text-primary-text' : ''}`}
                onClick={() => handleSortChange('createTime')}
              >
                Oluşturulma Tarihine Göre
              </button>
            </div>
          )}
        </div>

        {/* Artan / Azalan */}
        <button
          onClick={handleOrderToggle}
          className={`px-3 py-1.5 text-sm border rounded-lg transition 
    ${sortOrder === 'asc'
              ? 'hover:text-primary-text text-success border-success hover:bg-success/80'
              : 'hover:text-primary-text text-danger border-danger hover:bg-danger/80'}
  `}
        >
          {sortOrder === 'asc' ? 'Artan ↑' : 'Azalan ↓'}
        </button>
      </div>

      {/* Tarih filtresi */}
      {sortBy === 'createTime' && (
        <div className="relative w-full max-w-md">
          <button
            onClick={() => setCalendarOpen(!calendarOpen)}
            className="flex items-center gap-2 px-3 py-1.5 border border-primary text-primary-darktext hover:bg-primary hover:text-primary-text transition w-full justify-center text-sm rounded-lg"
          >
            <FiCalendar className="w-5 h-5" />
            {dateRange.startDate && dateRange.endDate
              ? `${formatDate(dateRange.startDate)} - ${formatDate(dateRange.endDate)}`
              : 'Tarih Aralığı Seç'}
          </button>

          {calendarOpen && (
            <div ref={calendarRef} className="absolute top-full mt-2 z-20 shadow-lg rounded-lg">
              <DateRange
                editableDateInputs={true}
                onChange={handleRangeChange}
                moveRangeOnFirstSelection={false}
                ranges={[{
                  startDate: dateRange.startDate || new Date(),
                  endDate: dateRange.endDate || new Date(),
                  key: 'selection'
                }]}
                locale={tr} // ← Türkçe olarak ayarlıyoruz
                maxDate={new Date()}
                className="shadow-md rounded-md"
              />
            </div>
          )}
        </div>
      )}

      {/* Arama kutusu */}
      <div className="relative w-full max-w-sm">
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Ara..."
          className="w-full pl-10 pr-4 py-2 text-sm border border-neutral-light rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-neutral-darkest"
        />
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary w-4 h-4" />
      </div>
    </div>
  );
}
