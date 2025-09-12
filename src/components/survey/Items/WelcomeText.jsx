import he from "he";
export default function WelcomeText({ title, helpText, image }) {
  return (
    <div className="sticky p-4 rounded gap-2 text-primary-text w-full">
      {image && (
        <div className="mb-6 flex justify-center">
          <img src={image} alt="Image" className="w-2/6 h-auto" />
        </div>
      )}
      {title ? (
        <>
          <h1
            className="leading-relaxed"
            dangerouslySetInnerHTML={{ __html: he.decode(title) }}
          />
          <p
            className="leading-relaxed"
            dangerouslySetInnerHTML={{ __html: he.decode(helpText) }}
          />
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
