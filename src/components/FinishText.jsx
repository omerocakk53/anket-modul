export default function FinishText({ title, helpText }) {
  return (
    <div className="p-4 rounded text-center gap-2 text-primary-text">
      {title ? (<>   <h1 className="text-5xl font-bold mb-5">{title}</h1>
        <p className="text-3xl text-neutral">{helpText}</p></>) : (<><div className="flex justify-center items-center"><h1 className="text-primary-text text-xl">Tasarlamaya Başlayın</h1></div></>)}
    </div>
  );
}