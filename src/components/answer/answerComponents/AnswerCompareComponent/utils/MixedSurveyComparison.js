// Karmaşık cevapları okunabilir stringe çevirir
function flattenAnswerValue(itemType, value) {
  if (value == null) return null;

  if (itemType === "QuestionGroup" && Array.isArray(value)) {
    return value.map((v) => JSON.stringify(v)).join(", ");
  }

  if (
    itemType === "Matris" &&
    typeof value === "object" &&
    !Array.isArray(value)
  ) {
    return Object.entries(value)
      .map(([k, v]) => `${k}: ${v}`)
      .join(", ");
  }

  if (
    itemType === "Table" &&
    typeof value === "object" &&
    !Array.isArray(value)
  ) {
    return Object.entries(value)
      .map(([rowName, cols]) => {
        if (typeof cols === "object" && cols !== null) {
          const colValues = Object.entries(cols)
            .map(([colName, cellValue]) => `${colName}: ${cellValue}`)
            .join(", ");
          return `${rowName} => { ${colValues} }`;
        }
        return `${rowName}: ${cols}`;
      })
      .join(" | ");
  }

  if (itemType === "ImageChoice" && Array.isArray(value)) {
    return value
      .map((v) =>
        typeof v === "object" && v.title ? v.title : JSON.stringify(v),
      )
      .join(", ");
  }

  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return value;
}

export function MixedSurveyComparison(
  survey,
  answers,
  { surveyPeriod1, surveyPeriod2 },
) {
  const start1 = new Date(surveyPeriod1.startDate);
  const end1 = new Date(surveyPeriod1.endDate);
  const start2 = new Date(surveyPeriod2.startDate);
  const end2 = new Date(surveyPeriod2.endDate);

  const userMap = {};

  for (const entry of answers) {
    const user = entry.userName;
    const createdAt = new Date(entry.createdAt);
    if (!userMap[user]) userMap[user] = { period1: [], period2: [] };

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
      const itemType =
        p1[itemId]?.itemType || p2[itemId]?.itemType || "Unknown";
      const rawVal1 = p1[itemId]?.value ?? null;
      const rawVal2 = p2[itemId]?.value ?? null;

      const val1 = flattenAnswerValue(itemType, rawVal1);
      const val2 = flattenAnswerValue(itemType, rawVal2);

      const itemMeta = survey.items.find((i) => i.id === itemId);
      const title = itemMeta?.title || "Bilinmeyen Soru";
      const maxValue = itemMeta?.maxValue ?? itemMeta?.data?.max ?? null;

      if (!itemChangeMap[itemId]) {
        itemChangeMap[itemId] = {
          itemId,
          itemType,
          title,
          changes: [],
        };
      }

      let change = null;
      let changePercent = null;
      let period1Percent = null;
      let period2Percent = null;

      // Sadece Rating ve Scale için yüzde hesapla
      if (["Rating", "Scale"].includes(itemType) && maxValue) {
        const numVal1 = typeof rawVal1 === "number" ? rawVal1 : null;
        const numVal2 = typeof rawVal2 === "number" ? rawVal2 : null;

        period1Percent = numVal1 !== null ? (numVal1 / maxValue) * 100 : null;
        period2Percent = numVal2 !== null ? (numVal2 / maxValue) * 100 : null;
        changePercent =
          period1Percent !== null && period2Percent !== null
            ? period2Percent - period1Percent
            : null;
        change =
          numVal1 !== null && numVal2 !== null ? numVal2 - numVal1 : null;
      }

      itemChangeMap[itemId].changes.push({
        userName,
        period1Value: val1,
        period2Value: val2,
        change,
        period1Percent,
        period2Percent,
        changePercent,
      });
    }
  }

  return Object.values(itemChangeMap);
}
