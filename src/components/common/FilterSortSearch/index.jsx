import React, { useState } from "react";
import { toast } from "react-hot-toast";
import SearchModeDropdown from "./SearchModeDropdown";
import SortDropdown from "./SortDropdown";
import OrderToggle from "./OrderToggle";
import ActiveToggle from "./ActiveToggle";
import DateFilter from "./DateFilter";
import SearchInput from "./SearchInput";

export default function FilterSortSearch({
  onSearch,
  searchMode,
  setSearchMode,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  active,
  setActive,
  dateRange,
  setDateRange,
}) {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch?.(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {/* Sol taraf - Arama */}
      <div className="flex flex-col gap-3 p-4 border rounded-xl shadow-sm relative">
        <h2 className="font-semibold text-lg text-neutral-darkest"> Arama</h2>
        <div className="flex gap-3 items-center">
          <SearchInput
            searchText={searchText}
            onSearchChange={handleSearchChange}
          />
          <SearchModeDropdown
            searchMode={searchMode}
            setSearchMode={setSearchMode}
            toast={toast}
          />
        </div>
      </div>

      {/* Orta - Sıralama */}
      <div className="flex flex-col gap-3 p-4 border rounded-xl shadow-sm relative">
        <h2 className="font-semibold text-lg text-neutral-darkest">Sıralama</h2>
        <div className="flex gap-3 items-center">
          <SortDropdown sortBy={sortBy} setSortBy={setSortBy} toast={toast} />
          <OrderToggle sortOrder={sortOrder} setSortOrder={setSortOrder} />
        </div>
      </div>

      {/* Tarih Filtresi */}
      {sortBy === "createTime" && (
        <div className="flex flex-col gap-3 p-4 border rounded-xl shadow-sm relative">
          <h2 className="font-semibold text-lg text-neutral-darkest">
            Tarih Filtresi
          </h2>
          <DateFilter dateRange={dateRange} setDateRange={setDateRange} />
        </div>
      )}

      {/* Sağ taraf - Aktiflik */}
      <div className="flex flex-col gap-3 p-4 border rounded-xl shadow-sm relative">
        <h2 className="font-semibold text-lg text-neutral-darkest">Aktiflik</h2>
        <ActiveToggle active={active} setActive={setActive} />
      </div>
    </div>
  );
}
