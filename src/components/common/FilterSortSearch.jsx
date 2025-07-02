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
    <div className="tw-flex tw-items-center tw-justify-between tw-flex-wrap tw-gap-4 tw-mb-6">
      <div className="tw-flex tw-gap-3 tw-items-center">

        {/* Arama Modu */}
        <div className="tw-relative tw-inline-block tw-text-left" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="tw-flex tw-items-center tw-gap-1 tw-px-3 tw-py-1.5 tw-text-sm tw-border tw-border-primary-light tw-text-primary-darktext tw-rounded-lg tw-hover:bg-primary-dark tw-hover:text-primary-text tw-transition"
          >
            <FiTag className="tw-w-4 tw-h-4" />
            {searchMode === 'title' ? 'Başlık ile Ara' : 'Etiket ile Ara'}
            <FiChevronDown className="tw-w-4 tw-h-4 tw-ml-1" />
          </button>

          {dropdownOpen && (
            <div className="tw-absolute tw-right-0 tw-mt-2 tw-w-40 tw-bg-white tw-border tw-border-primary-light tw-rounded-md tw-shadow-lg tw-z-10">
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
        <div className="tw-relative tw-inline-block tw-text-left" ref={sortRef}>
          <button
            onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
            className="tw-flex tw-items-center tw-gap-1 tw-px-3 tw-py-1.5 tw-text-sm tw-border tw-border-secondary tw- tw-rounded-lg tw-hover:bg-secondary tw-hover:text-primary-text tw-transition"
          >
            <FiList className="tw-w-4 tw-h-4" />
            Sırala
            <FiChevronDown className="tw-w-4 tw-h-4 tw-ml-1" />
          </button>

          {sortDropdownOpen && (
            <div className="tw-absolute tw-right-0 tw-mt-2 tw-w-48 tw-bg-white tw-border tw-border-secondary-light tw-rounded-md tw-shadow-lg tw-z-10">
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
        <div className="tw-relative tw-w-full tw-max-w-md">
          <button
            onClick={() => setCalendarOpen(!calendarOpen)}
            className="tw-flex tw-items-center tw-gap-2 tw-px-3 tw-py-1.5 tw-border tw-border-primary tw-text-primary-darktext tw-hover:bg-primary tw-hover:text-primary-text tw-transition tw-w-full tw-justify-center tw-text-sm tw-rounded-lg"
          >
            <FiCalendar className="tw-w-5 tw-h-5" />
            {dateRange.startDate && dateRange.endDate
              ? `${formatDate(dateRange.startDate)} - ${formatDate(dateRange.endDate)}`
              : 'Tarih Aralığı Seç'}
          </button>

          {calendarOpen && (
            <div ref={calendarRef} className="tw-absolute tw-top-full tw-mt-2 tw-z-20 tw-shadow-lg tw-rounded-lg">
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
                className="tw-shadow-md tw-rounded-md"
              />
            </div>
          )}
        </div>
      )}

      {/* Arama kutusu */}
      <div className="tw-relative tw-w-full tw-max-w-sm">
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Ara..."
          className="tw-w-full tw-pl-10 tw-pr-4 tw-py-2 tw-text-sm tw-border tw-border-neutral-light tw-rounded-lg tw-shadow-sm tw-focus:outline-none tw-focus:ring-1 tw-focus:ring-primary tw-focus:border-primary tw-text-neutral-darkest"
        />
        <FiSearch className="tw-absolute tw-left-3 tw-top-1/2 tw-transform tw--translate-y-1/2 tw-text-primary tw-w-4 tw-h-4" />
      </div>
    </div>
  );
}
