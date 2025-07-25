import React from "react";

function MixedItemUserDeltaTable({ item, ItemTip, ref }) {
  if (!Array.isArray(item)) return null;
  function renderSpecialCell(itemType, value) {
    if (!value) return "-";

    try {
      if (itemType === "QuestionGroup") {
        const parsed = JSON.parse(value);
        return (
          <ul className="list-disc list-inside text-left">
            {Object.entries(parsed).map(([key, val], i) => (
              <li key={i}>
                <span className="font-medium">{key}:</span> {val}
              </li>
            ))}
          </ul>
        );
      }

      if (itemType === "MultipleChoice" || itemType === "ImageChoice") {
        return value.split(",").map((v, i) => (
          <span
            key={i}
            className="inline-block px-2 py-1 m-1 text-sm bg-blue-100 text-blue-800 rounded-full"
          >
            {v.trim()}
          </span>
        ));
      }

      if (itemType === "Matris") {
        // ör: "1: 2, 2: 1" formatındaki veriyi liste yap
        return value.split(",").map((pair, i) => (
          <div key={i}>
            <span className="font-medium">{pair.trim()}</span>
          </div>
        ));
      }

      return value;
    } catch (e) {
      return value;
    }
  }


  return (
    <>
      {item.map((itemData, idx) => {
        if (ItemTip && ItemTip !== itemData.itemId) return null;

        return (
          <div
            key={idx}
            className="rounded-xl border bg-gray-50 p-4 shadow-sm space-y-2"
            ref={ref}
          >
            <h3 className="text-md font-semibold text-gray-700 mb-2">
              {itemData.title} ({itemData.itemType})
            </h3>

            <div className="overflow-x-auto p-5">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Kullanıcı</th>
                    <th className="px-4 py-2 text-center">Periyot 1</th>
                    <th className="px-4 py-2 text-center">Periyot 2</th>
                  </tr>
                </thead>
                <tbody>
                  {itemData.changes.map((change, index) => {
                    return (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2">{change.userName}</td>
                        <td className="px-4 py-2 text-center align-top">
                          {renderSpecialCell(itemData.itemType, change.period1Value)}
                        </td>
                        <td className="px-4 py-2 text-center align-top">
                          {renderSpecialCell(itemData.itemType, change.period2Value)}
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
  );
}

export default MixedItemUserDeltaTable;
