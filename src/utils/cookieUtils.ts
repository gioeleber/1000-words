interface setCookieParams {
  key: string;
  value: string;
  expires?: string | number;
  path?: string;
}

export const expiresDate = (timePeriod?: "year"): string => {
  const date = new Date();
  if (timePeriod === "year") {
    return new Date(date.setFullYear(date.getFullYear() + 1)).toUTCString();
  }
  return new Date(date.setHours(date.getHours() + 1)).toUTCString();
};

export const setCookie = ({
  key,
  value,
  expires = expiresDate(),
  path = "/",
}: setCookieParams): void => {
  document.cookie = `${key}=${value}; expires=${expires}; path=${path}`;
};

export const getCookie = (key: string): string | undefined => {
  return document.cookie
    .split(" ")
    .find((cookie) => cookie.split("=")[0] === key)
    ?.split("=")[1];
};

export const removeCookie = (key: string): void => {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
