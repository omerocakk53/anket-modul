export default function Loading() {
    return (
        <div className="flex items-center justify-center p-4">
            <div className="animate-spin h-5 w-5 border-b-2 border-primary"></div>
            <span className="ml-2 text-primary">Anket yükleniyor...</span>
        </div>
    );
}
