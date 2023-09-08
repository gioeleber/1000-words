export const strToSousageCase = (str: string): string => {
  return str.toLowerCase().split(" ").join("-");
};

export const strToSlug = (str: string): string => {
  return strToSousageCase(str).replace(/[^a-z0-9-]/gi, "");
};

export const strToSnakeCase = (str: string): string => {
  return str.split(" ").join("_");
};

export const removeSpecialChar = (str: string): string => {
  return str.replace(/[^-_a-zA-Z0-9 ]/g, "");
};

export const formatNickname = (str?: string): string => {
  if (!str) {
    return "";
  }
  return removeSpecialChar(strToSnakeCase(str.trim().toLowerCase()));
};

export const capitalize = (str: string): string => {
  return (str[0]?.toUpperCase() ?? "") + str.slice(1);
};
