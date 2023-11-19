import { hasCookie, setCookie, deleteCookie, getCookie } from "cookies-next";

class CookieManager {
  // Set the authentication cookie
  static setCookie(key: string | undefined, value: any) {
    if (!key) {
      throw new Error("Unable to set cookie. <missing key>");
    }

    return setCookie(key, value);
  }

  static getCookie(key: string | undefined) {
    if (!key) {
      throw new Error("Unable to get cookie. <missing key>");
    }

    return getCookie(key);
  }

  // Remove the authentication cookie
  static removeCookie(key: string | undefined) {
    if (!key) {
      throw new Error("Unable to get cookie. <missing key>");
    }

    return deleteCookie(key);
  }
}

export default CookieManager;
