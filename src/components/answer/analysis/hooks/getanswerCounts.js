export default function getAnswerCounts(question, allAnswers) {
    const { id, type } = question;
    const counts = {};
    const answers = [];

    allAnswers.forEach(userAnswer => {
        const answerObj = userAnswer.answers.find(a => a.itemId === id);
        if (!answerObj) return;

        const answer = {
            user: userAnswer.userName,
            date: userAnswer.createdAt,
            value: answerObj.value,
        };

        answers.push(answer);

        if (type === 'MultipleChoice' || type === 'Dropdown') {
            let vals = answerObj.value;
            if (!Array.isArray(vals)) vals = [vals];
            vals.forEach(val => {
                if (val) {
                    counts[val] = counts[val] || { count: 0, users: [] };
                    counts[val].count += 1;
                    counts[val].users.push({ user: userAnswer.userName, date: userAnswer.createdAt });
                }
            });
        } else if (type === 'ImageChoice') {
            let vals = answerObj.value;
            if (!Array.isArray(vals)) vals = [vals];
            vals.forEach(val => {
                const title = val?.title || `Görsel ${val?.idx + 1}`;
                if (title) {
                    counts[title] = counts[title] || { count: 0, users: [] };
                    counts[title].count += 1;
                    counts[title].users.push({ user: userAnswer.userName, date: userAnswer.createdAt });
                }
            });
        } else if (type === 'Scale' || type === 'Rating' || type === 'Numeric') {
            const val = answerObj.value;
            if (val !== undefined && val !== null) {
                counts[val] = counts[val] || { count: 0, users: [] };
                counts[val].count += 1;
                counts[val].users.push({ user: userAnswer.userName, date: userAnswer.createdAt });
            }
        } else if (type === 'Matris') {
            const val = answerObj.value;
            if (val && typeof val === 'object') {
                Object.entries(val).forEach(([row, colVal]) => {
                    const key = `${row}: ${colVal}`;
                    counts[key] = counts[key] || { count: 0, users: [] };
                    counts[key].count += 1;
                    counts[key].users.push({ user: userAnswer.userName, date: userAnswer.createdAt });
                });
            }
        }
    });

    // Dönüşüm: {cevap: {count, users}} -> {cevap: count}, ayrıca users listesini de döndür
    const simpleCounts = {};
    Object.entries(counts).forEach(([k, v]) => {
        simpleCounts[k] = v.count;
    });

    return { counts: simpleCounts, answers, rawCounts: counts };
}