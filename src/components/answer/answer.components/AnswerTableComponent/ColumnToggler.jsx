import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { BiChevronUp } from "react-icons/bi";

const ColumnToggler = ({ columns, visibleColumns, setVisibleColumns }) => {
  const toggleColumn = (key) => {
    if (visibleColumns.includes(key)) {
      setVisibleColumns(visibleColumns.filter((col) => col !== key));
    } else {
      // Orijinal sırasına göre yeniden oluştur
      const newVisible = [...visibleColumns, key];
      const ordered = columns
        .map((col) => col.key)
        .filter((colKey) => newVisible.includes(colKey));
      setVisibleColumns(ordered);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-6 static top-0">
      <Disclosure>
        {({ open }) => (
          <div>
            <Disclosure.Button className="rounded-2xl flex justify-between items-center w-full border-gray-200 border-b-0 max-w-xl bg-blue-50 px-4 py-3 text-left text-sm font-medium text-blue-900 hover:bg-blue-100 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75 shadow" style={{ borderBottomLeftRadius: open ? 0 : undefined, borderBottomRightRadius: open ? 0 : undefined }}>
              <span>Sütunları Göster / Gizle</span>
              <BiChevronUp
                className={`${open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-blue-500 transition-transform`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="p-4 bg-blue-50 border-gray-200 border-t-0 rounded-b-2xl shadow max-w-4xl">
              <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {columns.map((col) => (
                  <label
                    key={col.key}
                    className="flex items-center space-x-2 text-sm text-gray-800 cursor-pointer hover:text-blue-600 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={visibleColumns.includes(col.key)}
                      onChange={() => toggleColumn(col.key)}
                      className="accent-blue-600 w-4 h-4"
                    />
                    <span className="max-w-[100px]">{col.label}</span>
                  </label>
                ))}
              </div>
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>
    </div>
  );
};

export default ColumnToggler;
