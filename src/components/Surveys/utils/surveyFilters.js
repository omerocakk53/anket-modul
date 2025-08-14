export function filterAndSortSurveys(
  surveys,
  selectedGroup,
  searchTerm,
  searchMode,
  sortBy,
  sortOrder,
  dateRange
) {
  return surveys
    .filter((s) => s.group === selectedGroup)
    .filter((s) => {
      if (!searchTerm) return true;

      if (searchMode === "title") {
        return s.title.toLowerCase().includes(searchTerm);
      } else {
        return s.tags && s.tags.some((tag) => tag.toLowerCase().includes(searchTerm));
      }
    })
    .filter((s) => {
      if (sortBy === "createTime" && (dateRange.startDate || dateRange.endDate)) {
        const created = new Date(s.createdAt).getTime();
        const start = dateRange.startDate
          ? new Date(dateRange.startDate).getTime()
          : null;
        let end = null;
        if (dateRange.endDate) {
          const endDate = new Date(dateRange.endDate);
          endDate.setDate(endDate.getDate() + 1);
          end = endDate.getTime();
        }
        if (start && end) {
          return created >= start && created < end;
        } else if (start) {
          return created >= start;
        } else if (end) {
          return created < end;
        }
        return true;
      }
      return true;
    })
    .sort((a, b) => {
      if (!sortBy) return 0;

      let compareResult = 0;
      if (sortBy === "title") {
        compareResult = a.title.localeCompare(b.title);
      } else if (sortBy === "tags") {
        const extractFirstNumber = (tags) => {
          for (const tag of tags || []) {
            const match = tag.match(/\d+/);
            if (match) return parseInt(match[0], 10);
          }
          return null;
        };
        const numA = extractFirstNumber(a.tags);
        const numB = extractFirstNumber(b.tags);

        if (numA !== null && numB !== null) {
          compareResult = numA - numB;
        } else if (numA !== null) {
          compareResult = -1;
        } else if (numB !== null) {
          compareResult = 1;
        } else {
          const lenA = a.tags ? a.tags.length : 0;
          const lenB = b.tags ? b.tags.length : 0;
          compareResult = lenA - lenB;
        }
      } else if (sortBy === "createTime") {
        compareResult = new Date(a.createdAt) - new Date(b.createdAt);
      }
      return sortOrder === "asc" ? compareResult : -compareResult;
    });
}
