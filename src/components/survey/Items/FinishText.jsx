import he from "he";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaWhatsapp,
  FaTelegram,
} from "react-icons/fa";

const ICONS_MAP = {
  Facebook: FaFacebook,
  Twitter: FaTwitter,
  Instagram: FaInstagram,
  LinkedIn: FaLinkedin,
  YouTube: FaYoutube,
  TikTok: FaTiktok,
  WhatsApp: FaWhatsapp,
  Telegram: FaTelegram,
};

const PLATFORM_COLORS = {
  Facebook: "#1877F2",
  Twitter: "#1DA1F2",
  Instagram: "#C13584",
  LinkedIn: "#0077B5",
  YouTube: "#FF0000",
  TikTok: "#69C9D0",
  WhatsApp: "#25D366",
  Telegram: "#0088CC",
};

export default function FinishText({ titleStyle, helpTextStyle, socialLinks }) {
  const activeLinks = socialLinks?.filter((link) => link.url?.trim());

  return (
    <div className="sticky p-4 rounded gap-4 text-primary-text w-full">
      {titleStyle ? (
        <>
          <h1
            className="leading-relaxed mb-2 text-2xl font-bold"
            dangerouslySetInnerHTML={{ __html: he.decode(titleStyle) }}
          />
          <p
            className="leading-relaxed mb-4 text-lg"
            dangerouslySetInnerHTML={{ __html: he.decode(helpTextStyle) }}
          />

          {activeLinks.length > 0 && (
            <div className="flex flex-wrap gap-4 justify-center">
              {activeLinks.map((link) => {
                const Icon = ICONS_MAP[link.platform];
                const color = PLATFORM_COLORS[link.platform] || "#000";

                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-105 duration-300 flex items-center gap-3 p-4 max-w-40 rounded-lg shadow-md hover:shadow-lg transition bg-white dark:bg-gray-800"
                  >
                    <div className="text-3xl" style={{ color }}>
                      <Icon />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold">{link.platform}</p>
                      <p className="text-sm truncate" title={link.url}>
                        {link.url}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center">
          <h1 className="text-primary-text text-xl">Tasarlamaya Başlayın</h1>
        </div>
      )}
    </div>
  );
}
