import { toast } from "react-hot-toast";

export default function ConfirmDialog({
  title = "Emin misiniz?",
  description = "Bu işlem geri alınamaz.",
  confirmText = "Evet",
  cancelText = "Hayır",
  onConfirm,
  onCancel,
}) {
  return (t) => (
    <div className="p-4 max-w-xs">
      <p className="text-lg font-semibold mb-4 text-primary-darktext">
        {title}
      </p>
      <p className="text-sm text-primary-darktext mb-6">{description}</p>
      <div className="flex gap-4">
        <button
          onClick={async () => {
            toast.dismiss(t.id);
            if (onConfirm) await onConfirm();
          }}
          className="bg-danger text-white px-4 py-2 rounded hover:bg-danger-dark transition"
        >
          {confirmText}
        </button>
        <button
          onClick={() => {
            toast.dismiss(t.id);
            if (onCancel) onCancel();
          }}
          className="bg-neutral-light text-neutral-darkest px-4 py-2 rounded hover:bg-neutral-dark transition"
        >
          {cancelText}
        </button>
      </div>
    </div>
  );
}
