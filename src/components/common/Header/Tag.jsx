const Tag = ({ icon, text }) => (
  <div className="flex items-center gap-1 border border-primary px-2 py-0.5 rounded-full text-primary-dark shrink-0">
    {icon}
    <span>{text}</span>
  </div>
);

export default Tag;
