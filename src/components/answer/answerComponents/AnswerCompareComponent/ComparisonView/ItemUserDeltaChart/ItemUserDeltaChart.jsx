import React from "react";
import ChartWrapper from "./ChartWrapper";
import { processItemData } from "./chartDataUtils";

function ItemUserDeltaChart({
  item,
  ItemTip = "rating-1",
  color,
  ChartType,
  ref,
}) {
  if (!Array.isArray(item) || item.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500">
        Gösterilecek veri bulunmamaktadır.
      </div>
    );
  }

  const processedData = processItemData(item);

  return (
    <>
      {processedData.map((itemData, index) => {
        if (ItemTip !== itemData.itemId) return null;
        return (
          <ChartWrapper
            key={index}
            itemData={itemData}
            ChartType={ChartType}
            color={color}
            ref={ref}
          />
        );
      })}
    </>
  );
}

export default ItemUserDeltaChart;
