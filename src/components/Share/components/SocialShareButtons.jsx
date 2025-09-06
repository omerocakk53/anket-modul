import React from "react";
import {
  FaSquareWhatsapp,
  FaTelegram,
  FaSquareXTwitter,
  FaSquareFacebook,
  FaLinkedin,
} from "react-icons/fa6";

function SocialShareButtons({ shareData, surveyLink }) {
  const buttons = [
    {
      name: "WhatsApp",
      color: "text-green-600",
      url: `https://wa.me/?text=${encodeURIComponent(shareData?.title + "\n" + surveyLink)}`,
      icon: <FaSquareWhatsapp size={32} />,
    },
    {
      name: "Telegram",
      color: "text-sky-500",
      url: `https://t.me/share/url?url=${encodeURIComponent(surveyLink)}&text=${encodeURIComponent(
        shareData?.title,
      )}`,
      icon: <FaTelegram size={32} />,
    },
    {
      name: "X (Twitter)",
      color: "text-black",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        surveyLink,
      )}&text=${encodeURIComponent(shareData?.title)}`,
      icon: <FaSquareXTwitter size={32} />,
    },
    {
      name: "LinkedIn",
      color: "text-blue-700",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(surveyLink)}`,
      icon: <FaLinkedin size={32} />,
    },
    {
      name: "Facebook",
      color: "text-blue-600",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(surveyLink)}`,
      icon: <FaSquareFacebook size={32} />,
    },
  ];

  return (
    <div>
      <h3 className="text-base md:text-lg font-semibold mb-2">
        Sosyal Medyada Paylaş
      </h3>
      <div className="flex flex-wrap gap-4 justify-start min-w-0">
        {buttons.map((btn, i) => (
          <a
            key={i}
            href={btn.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl transition-all duration-300 ease-in-out shadow-md bg-white hover:scale-110 hover:shadow-lg ${btn.color}`}
            aria-label={`${btn.name} ile paylaş`}
            title={`${btn.name} ile paylaş`}
          >
            <div className="transition-transform duration-300 group-hover:rotate-[12deg] group-hover:scale-110">
              {btn.icon}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default SocialShareButtons;
