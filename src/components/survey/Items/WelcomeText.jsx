import he from "he";
import { useRef, useState, useEffect } from "react";
import { clampImagePos, clampImagePosRatio } from "../utils/image-pos";

export default function WelcomeText({
  titleStyle,
  helpTextStyle,
  image,
  imageName,
  imagePos,
}) {
  const containerRef = useRef(null);
  const [bounds, setBounds] = useState({ width: 1, height: 1 });

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || !entries.length) return;
      const rect = entries[0].contentRect;
      setBounds({ width: rect.width, height: rect.height });
    });

    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  // imagePos yoksa default
  const finalPos = imagePos
    ? clampImagePosRatio(imagePos)
    : { x: 0.1, y: 0.05, width: 0.8, height: 0.5 };
  const pxPos = {
    x: finalPos.x * bounds.width,
    y: finalPos.y * bounds.height,
    width: finalPos.width * bounds.width,
    height: finalPos.height * bounds.height,
  };
  const clampedStyle = clampImagePos(pxPos, bounds);

  return (
    <div className="p-4 flex flex-col gap-2 w-full relative">
      <div
        ref={containerRef}
        className="rounded gap-2 text-primary-text w-full relative"
        style={{ minHeight: 300 }}
      >
        {(image || imageName) && (
          <img
            src={imageName ? window.location.origin + imageName.file : image}
            alt="Image"
            style={{
              position: "absolute",
              left: clampedStyle.x,
              top: clampedStyle.y,
              width: clampedStyle.width,
              height: clampedStyle.height,
              objectFit: "contain",
              pointerEvents: "none",
            }}
          />
        )}
      </div>
      <div className="rounded gap-2 text-primary-text w-full relative">
        {titleStyle ? (
          <>
            <h1
              className="leading-relaxed mt-2"
              dangerouslySetInnerHTML={{ __html: he.decode(titleStyle) }}
            />
            <p
              className="leading-relaxed"
              dangerouslySetInnerHTML={{ __html: he.decode(helpTextStyle) }}
            />
          </>
        ) : (
          <div className="flex justify-center items-center">
            <h1 className="text-primary-text text-xl">Mesajınız</h1>
          </div>
        )}
      </div>
    </div>
  );
}
