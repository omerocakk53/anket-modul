import React from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { FaArrowsLeftRight } from "react-icons/fa6";

function ItemUserDeltaTable({ item, ItemTip = "rating-1", ref }) {
  if (!Array.isArray(item)) return null;
  const formatValue = (val) => (val != null ? val : "-");

  const data = item?.map((data) => ({
    changes: data.changes,
    itemId: data.itemId,
    itemType: data.itemType,
    itemTitle: data.title || "Bilinmeyen Soru",
  }));

  return (
    <>
      {data.map((item, idx) => {
        if (ItemTip !== item.itemId) return null;
        return (
          <div
            key={idx}
            className="rounded-xl border bg-gray-50 p-4 shadow-sm space-y-2"
            ref={ref}
          >
            <h3 className="text-md font-semibold text-gray-700 mb-2">
              {item.itemTitle} ({item.itemType})
            </h3>
            <div className="overflow-x-auto p-5">
              <table  className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Kullanıcı</th>
                    <th className="px-4 py-2 text-center">Periyot 1</th>
                    <th className="px-4 py-2 text-center">Periyot 2</th>
                    <th className="px-4 py-2 text-center">Değişim</th>
                  </tr>
                </thead>
                <tbody>
                  {item.changes.map((change, index) => {
                    const status =
                      change.change > 0
                        ? <FaArrowUp size={14} />
                        : change.change < 0
                          ? <FaArrowDown size={14} />
                          : <FaArrowsLeftRight size={14} />;
                    const className =
                      change.change > 0
                        ? "text-green-500"
                        : change.change < 0
                          ? "text-red-500"
                          : "text-gray-500";

                    return (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2">{change.userName}</td>
                        <td className="px-4 py-2 text-center">
                          {formatValue(change.period1Value)}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {formatValue(change.period2Value)}
                        </td>
                        <td
                          className={`px-4 py-2 text-center flex justify-center items-center gap-2 font-semibold ${className}`}
                        >
                          {formatValue(change.change)}{" "}
                          <span className="text-xs">{status}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </>
  )
}

export default ItemUserDeltaTable;
