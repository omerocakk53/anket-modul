import React from 'react'

function PeriotSelector({ periods, onChangePeriod1, onChangePeriod2 }) {
    const [selectedPeriod1, setSelectedPeriod1] = React.useState(null)
    const [selectedPeriod2, setSelectedPeriod2] = React.useState(null)

    const handlePeriod1Change = (option) => {
        setSelectedPeriod1(option)
        onChangePeriod1(option)
        // Eğer ikinci seçimde aynı varsa temizle (isteğe bağlı)
        if (selectedPeriod2?._id === option?._id) {
            setSelectedPeriod2(null)
            onChangePeriod2(null)
        }
    }

    const handlePeriod2Change = (option) => {
        setSelectedPeriod2(option)
        onChangePeriod2(option)
    }

    return (
        <div className="flex flex-col gap-6 max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
            {/* 1. Tarih */}
            <div className="flex flex-col">
                <label className="mb-2 font-semibold text-gray-700">1. Tarih</label>
                <select
                    className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-base text-gray-700 shadow-sm
                               focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                    value={selectedPeriod1?._id || ''}
                    onChange={(e) => handlePeriod1Change(periods.find((p) => p._id === e.target.value))}
                >
                    <option value="">Seçiniz</option>
                    {periods.map((period) => (
                        <option key={period._id} value={period._id}>
                            {new Date(period.startDate).toLocaleDateString('tr-TR')} - {new Date(period.endDate).toLocaleDateString('tr-TR')}
                        </option>
                    ))}
                </select>
            </div>

            {/* 2. Tarih */}
            <div className="flex flex-col">
                <label className="mb-2 font-semibold text-gray-700">2. Tarih</label>
                <select
                    className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-base text-gray-700 shadow-sm
                               focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                    value={selectedPeriod2?._id || ''}
                    onChange={(e) => handlePeriod2Change(periods.find((p) => p._id === e.target.value))}
                >
                    <option value="">Seçiniz</option>
                    {periods.map((period) => (
                        <option
                            key={period._id}
                            value={period._id}
                            disabled={period._id === selectedPeriod1?._id} // 1. tarih seçileni devre dışı bırak
                            className={period._id === selectedPeriod1?._id ? 'text-gray-400' : ''}
                        >
                            {new Date(period.startDate).toLocaleDateString('tr-TR')} - {new Date(period.endDate).toLocaleDateString('tr-TR')}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default PeriotSelector
