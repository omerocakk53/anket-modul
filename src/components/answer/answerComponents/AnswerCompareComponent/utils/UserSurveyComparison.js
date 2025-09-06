export function UserSurveyComparison(survey, answers, { surveyPeriod1, surveyPeriod2 }) {
  const start1 = new Date(surveyPeriod1.startDate);
  const end1 = new Date(surveyPeriod1.endDate);
  const start2 = new Date(surveyPeriod2.startDate);
  const end2 = new Date(surveyPeriod2.endDate);

  const userMap = {};

  for (const entry of answers) {
    const user = entry.userName;
    const createdAt = new Date(entry.createdAt);

    if (!userMap[user]) {
      userMap[user] = { period1: [], period2: [] };
    }

    if (createdAt >= start1 && createdAt <= end1) {
      userMap[user].period1.push(entry);
    } else if (createdAt >= start2 && createdAt <= end2) {
      userMap[user].period2.push(entry);
    }
  }

  const itemChangeMap = {};

  for (const [userName, { period1, period2 }] of Object.entries(userMap)) {
    const flatten = (entries) => {
      const map = {};
      for (const entry of entries) {
        for (const ans of entry.answers) {
          map[ans.itemId] = {
            value: ans.value,
            itemType: ans.itemType,
          };
        }
      }
      return map;
    };

    const p1 = flatten(period1);
    const p2 = flatten(period2);

    const allItemIds = new Set([...Object.keys(p1), ...Object.keys(p2)]);

    for (const itemId of allItemIds) {
      const val1 = p1[itemId]?.value ?? null;
      const val2 = p2[itemId]?.value ?? null;
      const itemType = p1[itemId]?.itemType || p2[itemId]?.itemType || "Unknown";

      // Sadece Rating ve Scale fark hesaplaması yapılır
      const isNumeric = ["Rating", "Scale"].includes(itemType);

      const itemMeta = survey.items.find((i) => i.id === itemId);
      const title = itemMeta?.title || "Bilinmeyen Soru";
      const maxValue = itemMeta?.maxValue ?? itemMeta?.data?.max ?? null;

      if (val1 !== null || val2 !== null) {
        if (!itemChangeMap[itemId]) {
          itemChangeMap[itemId] = {
            itemId,
            itemType,
            title,
            changes: [],
          };
        }

        const change = isNumeric ? (val2 ?? 0) - (val1 ?? 0) : null;

        const percent1 =
          isNumeric && val1 !== null && maxValue ? (val1 / maxValue) * 100 : null;
        const percent2 =
          isNumeric && val2 !== null && maxValue ? (val2 / maxValue) * 100 : null;
        const changePercent =
          percent1 !== null && percent2 !== null ? percent2 - percent1 : null;

        itemChangeMap[itemId].changes.push({
          userName,
          period1Value: val1,
          period2Value: val2,
          change,
          period1Percent: percent1,
          period2Percent: percent2,
          changePercent,
        });
      }
    }
  }

  return Object.values(itemChangeMap);
}
