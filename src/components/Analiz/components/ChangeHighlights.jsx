const ChangeHighlights = ({ data }) => {
  const sorted = [...data].sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff))
  const topIncrease = sorted.find(d => d.diff > 0)
  const topDecrease = sorted.find(d => d.diff < 0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
      {topIncrease && (
        <div className="bg-success/10 border-l-4 border-success p-4 rounded">
          <div className="text-success font-semibold">⬆ En çok gelişen soru</div>
          <div><strong>{topIncrease.label}</strong> (+{topIncrease.diff.toFixed(1)})</div>
        </div>
      )}
      {topDecrease && (
        <div className="bg-danger/10 border-l-4 border-danger p-4 rounded">
          <div className="text-danger font-semibold">⬇ En çok düşüş gösteren soru</div>
          <div><strong>{topDecrease.label}</strong> ({topDecrease.diff.toFixed(1)})</div>
        </div>
      )}
    </div>
  )
}

export default ChangeHighlights
