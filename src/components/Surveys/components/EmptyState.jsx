import { FiFolderPlus } from "react-icons/fi";

export default function EmptyState({ onCreate }) {
  return (
    <div className="col-span-full text-center py-12 bg-neutral-white rounded-lg shadow-md border border-neutral-DEFAULT mx-4 md:mx-0">
      <h3 className="text-xl md:text-2xl font-bold text-neutral-darkest mb-4">
        Hoş Geldiniz!
      </h3>
      <p className="text-neutral-dark text-base md:text-lg">
        Başlamak için yeni bir klasör oluşturun.
      </p>
      <button
        className="btn bg-primary text-primary-text px-5 py-2 rounded-lg shadow-md hover:bg-primary-dark transition-colors duration-200 mt-6 text-base md:text-lg"
        onClick={onCreate}
      >
        <div className="flex items-center justify-center">
          <FiFolderPlus className="h-5 w-5 mr-2" />
          Yeni Klasör Oluştur
        </div>
      </button>
    </div>
  );
}
