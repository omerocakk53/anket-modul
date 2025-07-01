export function calculateItemAverages(data) {
  const totals = {}
  const counts = {}

  data.forEach(entry => {
    entry.answers.forEach(answer => {
      if (['Rating', 'Scale', 'Numeric'].includes(answer.itemType) && typeof answer.value === 'number') {
        const key = answer.itemId
        totals[key] = (totals[key] || 0) + answer.value
        counts[key] = (counts[key] || 0) + 1
      }
    })
  })

  const averages = {}
  Object.keys(totals).forEach(key => {
    averages[key] = totals[key] / counts[key]
  })

  return averages
}

export function mergeAverages(first, second, questionLabels = {}) {
  const keys = [...new Set([...Object.keys(first), ...Object.keys(second)])]

  return keys.map(key => ({
    itemId: key,
    label: questionLabels[key] || key,
    firstPeriod: first[key] || 0,
    secondPeriod: second[key] || 0,
    diff: (second[key] || 0) - (first[key] || 0)
  }))
}
