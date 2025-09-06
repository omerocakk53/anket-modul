export default function WelcomeText({ title, helpText, image }) {
  return (
    <div className="sticky t p-4 rounded text-center gap-2 text-primary-text">
      {image && (
        <div className="mb-4">
          <img
            src={URL.createObjectURL(image)}
            alt="Image"
            className="w-[85%] h-auto mb-4"
          />
        </div>
      )}
      {title ? (
        <>
          {" "}
          <h1 className="text-5xl font-bold mb-5">{title}</h1>
          <p className="text-3xl text-neutral">{helpText}</p>
        </>
      ) : (
        <>
          <div className="flex justify-center items-center">
            <h1 className="text-primary-text text-xl">Mesajınız</h1>
          </div>
        </>
      )}
    </div>
  );
}
