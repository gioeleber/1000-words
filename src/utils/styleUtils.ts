import clsx from "clsx";
import { ButtonStyle } from "../types/components";

export const buttonStyleClasses = (buttonStyle?: ButtonStyle) => {
  const BUTTON_CLASSES = "rounded-lg text-lg border px-4 py-2 sm:text-base";

  switch (buttonStyle) {
    case ButtonStyle.NULL:
      return "";
    case ButtonStyle.LINK:
      return "text-zinc-500 underline";
    case ButtonStyle.SECONDARY_OUTLINE:
      return clsx(BUTTON_CLASSES, "bg-white text-zinc-500 border-zinc-200");
    case ButtonStyle.ERROR:
      return clsx(BUTTON_CLASSES, "bg-red-600 text-white border-red-600");
    case ButtonStyle.SPOTIFY:
      return clsx(BUTTON_CLASSES, "bg-spotify text-white border-spotify");
    default:
      return clsx(BUTTON_CLASSES, "text-white bg-teal-400 border-teal-400");
  }
};
