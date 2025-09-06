import React, { forwardRef } from "react";

const CustomTable = forwardRef(({ tableData }, ref) => (
  <div className="overflow-auto w-full mt-4" style={{ maxHeight: "450px" }}>
    <table
      className="min-w-[600px] w-full text-sm border border-gray-300"
      ref={ref}
    >
      <thead className="bg-gray-100 font-semibold">
        <tr>
          <th className="px-3 py-2 border">Satır / Sütun</th>
          {tableData.columns.map((col) => (
            <th key={col} className="px-3 py-2 border">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.rows.map((row, i) => (
          <tr key={row} className="even:bg-gray-50 hover:bg-blue-50">
            <td className="px-3 py-2 border">{row}</td>
            {tableData.value[i].map((val, j) => (
              <td key={j} className="px-3 py-2 border">
                {val}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
));

export default CustomTable;
