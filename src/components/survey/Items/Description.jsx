import he from "he";

export default function Description({ titleStyle, helpTextStyle }) {
  return (
    <div className="sticky p-4 rounded gap-2 text-primary-text w-full">
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
            <h1 className="text-primary-text text-xl">Tasarlamaya Başlayın</h1>
          </div>
        </>
      )}
    </div>
  );
}
