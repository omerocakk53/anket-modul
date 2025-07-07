export default function ViewSwitcher({ selectedView, setSelectedView }) {
  const views = ["Tablo", "Grafik", "Analiz"];

  return (
    <div className="flex gap-4 mb-4">
      {views.map(view => (
        <button
          key={view}
          onClick={() => setSelectedView(view)}
          className={`px-4 py-2 rounded-md font-medium transition-all
            ${selectedView === view ? "bg-primary text-white" : "bg-neutral-white border"}`}
        >
          {view}
        </button>
      ))}
    </div>
  );
}
