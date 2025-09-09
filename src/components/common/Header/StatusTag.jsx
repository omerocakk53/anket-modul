import { FiCheckCircle, FiXCircle } from "react-icons/fi";

const StatusTag = ({ active }) => (
  <div
    className={`flex items-center gap-1 px-2 py-0.5 rounded-full border font-medium shrink-0
    ${active ? "text-success bg-success/10 border-success" : "text-danger bg-danger/10 border-danger"}`}
  >
    {active ? <FiCheckCircle size={14} /> : <FiXCircle size={14} />}
    {active ? "Açık" : "Kapalı"}
  </div>
);

export default StatusTag;
