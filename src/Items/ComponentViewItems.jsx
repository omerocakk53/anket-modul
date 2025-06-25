// components/SortableItem.jsx
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FaTrash, FaGripVertical } from 'react-icons/fa';
import { iconMap } from '../utils/iconMap';

function ComponentViewItems({ item, onDelete, count, onClick }) {
  const { id, iconKey = id.split("-")[0], label } = item;
  const { Icon, textColor, bgColor, hoverBg } = iconMap[iconKey] || {};

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between rounded p-3 shadow cursor-grab ${bgColor} ${hoverBg}`}
    >
      <div onClick={onClick} className="flex items-center gap-2" {...attributes} {...listeners}>
        <FaGripVertical className="text-gray-400" />
        {Icon && <Icon className={`text-xl ${textColor}`} />}
        <span>{count + " - " + item.title}</span>
      </div>
      <button onClick={() => onDelete(id)} className="text-red-500 hover:text-red-700">
        <FaTrash />
      </button>
    </div>
  );
}

export default ComponentViewItems;
