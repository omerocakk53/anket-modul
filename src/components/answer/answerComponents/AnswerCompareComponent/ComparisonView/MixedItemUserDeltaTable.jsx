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

      if (itemType === "Dropdown") {
        return (
          <span
            className="inline-block px-2 py-1 m-1 text-sm bg-blue-100 text-blue-800 rounded-full"
          >
            {value}
          </span>
        );
      }

      if (itemType === "Matris") {
        return value.split(",").map((pair, i) => (
          <div key={i}>
            <span className="font-medium">{pair.trim()}</span>
          </div>
        ));
      }

      if (itemType === "Table") {
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

  const MostLessValues = (itemType, changes) => {
    const period1Data = changes.map(c => c.period1Value);
    const period2Data = changes.map(c => c.period2Value);

    // Frekans hesaplayan yardımcı fonksiyon
    const findMostAndLeast = (arr) => {
      const frequency = {};

      arr.forEach(value => {
        if (!value) return;
        frequency[value] = (frequency[value] || 0) + 1;
      });

      const total = arr.filter(Boolean).length;
      if (total === 0) {
        return { most: [], least: [] };
      }

      const maxCount = Math.max(...Object.values(frequency));
      const minCount = Math.min(...Object.values(frequency));

      // En çok çıkanların listesi
      const most = Object.entries(frequency)
        .filter(([_, count]) => count === maxCount)
        .map(([value, count]) => ({
          value,
          count,
          percent: ((count / total) * 100).toFixed(1),
        }));

      // En az çıkanların listesi
      const least = Object.entries(frequency)
        .filter(([_, count]) => count === minCount)
        .map(([value, count]) => ({
          value,
          count,
          percent: ((count / total) * 100).toFixed(1),
        }));

      return { most, least };
    };

    const result1 = findMostAndLeast(period1Data);
    const result2 = findMostAndLeast(period2Data);

    console.log(result1, result2);

    return {
      mostValue1: result1.most,   // Array olacak
      leastValue1: result1.least,
      mostValue2: result2.most,
      leastValue2: result2.least,
    };
  };


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

            {(itemData.itemType !== "LongText" &&
              itemData.itemType !== "ShortText" &&
              itemData.itemType !== "QuestionsGroup" &&
              itemData.itemType !== "Numeric" &&
              itemData.itemType !== "Email" &&
              itemData.itemType !== "FileUpload") && (() => {
                const { mostValue1, leastValue1, mostValue2, leastValue2 } =
                  MostLessValues(itemData.itemType, itemData.changes);

                const renderRow = (label, dataArray) => (
                  <li className="flex flex-col gap-1 bg-gray-50 px-3 py-2 rounded-lg shadow-sm hover:bg-gray-100 transition">
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                    <div className="flex flex-wrap gap-2">
                      {dataArray.map((data, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg shadow-sm border"
                        >
                          <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                            {data.value}
                          </span>
                          <span className="text-xs text-gray-600">
                            {data.count} kişi – %{data.percent}
                          </span>
                        </div>
                      ))}
                    </div>
                  </li>
                );

                return (
                  <div className="p-4 border border-gray-200 rounded-xl bg-white shadow-md">
                    <h4 className="text-sm font-semibold text-gray-800 mb-3">Seçim Analizi</h4>
                    <ul className="space-y-3">
                      {renderRow("Periyot 1'de en çok seçilen", mostValue1)}
                      {renderRow("Periyot 1'de en az seçilen", leastValue1)}
                      {renderRow("Periyot 2'de en çok seçilen", mostValue2)}
                      {renderRow("Periyot 2'de en az seçilen", leastValue2)}
                    </ul>
                  </div>
                );
              })()}


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
