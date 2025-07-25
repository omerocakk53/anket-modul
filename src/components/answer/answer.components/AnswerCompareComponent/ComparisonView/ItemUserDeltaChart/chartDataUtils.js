export function processItemData(item) {
  return item.map((data) => ({
    change: data.change,
    itemId: data.itemId,
    itemType: data.itemType,
    itemTitle: data.title || "Bilinmeyen Soru",
    period1Value: data.period1Avg,
    period2Value: data.period2Avg,
    period1Percent: parseFloat(data.period1AvgPercent),
    period2Percent: parseFloat(data.period2AvgPercent),
    changePercent: parseFloat(data.changePercent),
  }));
}
