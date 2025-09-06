export function SurveyComparison(survey, answers, { surveyPeriod1, surveyPeriod2 }) {
  const start1 = new Date(surveyPeriod1.startDate);
  const end1 = new Date(surveyPeriod1.endDate);
  const start2 = new Date(surveyPeriod2.startDate);
  const end2 = new Date(surveyPeriod2.endDate);

  const period1Map = {};
  const period2Map = {};

  const addToMap = (map, answerEntry) => {
    for (const ans of answerEntry.answers) {
      const { itemId, value, itemType } = ans;
      if (typeof value !== "number") continue;

      // SADECE Rating & Scale işlenir
      if (!["Rating", "Scale"].includes(itemType)) continue;

      if (!map[itemId]) {
        map[itemId] = { total: 0, count: 0, itemType };
      }

      map[itemId].total += value;
      map[itemId].count += 1;
    }
  };

  for (const entry of answers) {
    const createdAt = new Date(entry.createdAt);
    if (createdAt >= start1 && createdAt <= end1) {
      addToMap(period1Map, entry);
    } else if (createdAt >= start2 && createdAt <= end2) {
      addToMap(period2Map, entry);
    }
  }

  const allItemIds = new Set([
    ...Object.keys(period1Map),
    ...Object.keys(period2Map),
  ]);

  const result = [];

  for (const itemId of allItemIds) {
    const p1 = period1Map[itemId] || { total: 0, count: 0 };
    const p2 = period2Map[itemId] || { total: 0, count: 0 };
    const itemType = period1Map[itemId]?.itemType || period2Map[itemId]?.itemType || "Unknown";

    const itemMeta = survey.items.find((i) => i.id === itemId);
    const title = itemMeta?.title || "Bilinmeyen Soru";

    const maxValue = itemMeta?.maxValue ?? itemMeta?.data?.max ?? 100;

    const period1Avg = p1.count > 0 ? p1.total / p1.count : null;
    const period2Avg = p2.count > 0 ? p2.total / p2.count : null;

    const period1AvgPercent = period1Avg && maxValue ? (period1Avg / maxValue) * 100 : null;
    const period2AvgPercent = period2Avg && maxValue ? (period2Avg / maxValue) * 100 : null;

    result.push({
      itemId,
      itemType,
      title,
      period1Avg,
      period2Avg,
      change: period1Avg !== null && period2Avg !== null ? period2Avg - period1Avg : null,
      period1AvgPercent,
      period2AvgPercent,
      changePercent:
        period1AvgPercent !== null && period2AvgPercent !== null
          ? period2AvgPercent - period1AvgPercent
          : null,
    });
  }

  return result;
}
