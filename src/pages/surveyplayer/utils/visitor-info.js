import FingerprintJS from "@fingerprintjs/fingerprintjs";
import MobileDetect from "mobile-detect";
/**
 * Ziyaretçi bilgilerini döndürür
 * @returns {Promise<{ visitorId:string, deviceType:string }>}
 */
export async function getVisitorInfo() {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  const visitorId = result.visitorId;
  const md = new MobileDetect(window.navigator.userAgent);
  let deviceType = "desktop";
  if (md.tablet()) deviceType = "tablet";
  else if (md.mobile()) deviceType = "mobile";
  return { visitorId, deviceType };
}
