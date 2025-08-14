export default function NavigationButtons({
    currentIndex,
    maxIndex,
    onBack,
    onNext,
    disableBack,
}) {
    const completionPercent = Math.round(((currentIndex + 1) / (maxIndex + 1)) * 100);

    return (
        <div
            className="fixed left-0 w-full px-4 flex flex-col gap-2 justify-center items-center mx-auto z-50"
            style={{ bottom: `calc(10px + env(safe-area-inset-bottom))` }}
        >
            <div className="text-primary-text text-sm font-semibold w-full text-center">
                % {completionPercent} tamamlandı
            </div>
            <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
                <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${completionPercent}%` }}
                ></div>
            </div>
            <div className="flex justify-between w-full mt-2 gap-4">
                <button
                    onClick={onBack}
                    disabled={disableBack}
                    className="flex-1 px-6 py-2 rounded bg-neutral-darkest text-primary-text hover:bg-primary-darktext disabled:opacity-50 transition-colors duration-200"
                >
                    Geri
                </button>
                <button
                    onClick={onNext}
                    className="flex-1 px-6 py-2 rounded bg-primary text-primary-text hover:bg-primary-dark transition-colors duration-200"
                >
                    {currentIndex === maxIndex ? 'Gönder' : 'İleri'}
                </button>
            </div>
        </div>
    );
}
