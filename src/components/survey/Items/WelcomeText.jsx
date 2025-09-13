import he from "he";
export default function WelcomeText({ titleStyle, helpTextStyle, image }) {
  return (
    <div className="sticky p-4 rounded gap-2 text-primary-text w-full">
      {image && (
        <div className="mb-6 flex justify-center">
          <img
            src={image.imageName ? image.imageName.file : image}
            alt="Image"
            className="w-2/6 h-auto"
          />
        </div>
      )}
      {titleStyle ? (
        <>
          <h1
            className="leading-relaxed"
            dangerouslySetInnerHTML={{ __html: he.decode(titleStyle) }}
          />
          <p
            className="leading-relaxed"
            dangerouslySetInnerHTML={{ __html: he.decode(helpTextStyle) }}
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
