import { type ReactNode } from "react";

export enum ButtonStyle {
  NULL = "none",
  LINK = "link",
  PRIMARY = "primary",
  SECONDARY_OUTLINE = "secondary-outline",
  ERROR = "error",
  SPOTIFY = "spotify",
}

export interface ListItem {
  id: string;
  content: ReactNode;
}
