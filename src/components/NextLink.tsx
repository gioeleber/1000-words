import { type AnchorHTMLAttributes, type ReactNode } from "react";
import NextLinkComponent from "next/link";
import { ButtonStyle } from "../types/components";
import { buttonStyleClasses } from "../utils/styleUtils";
import { twMerge } from "tailwind-merge";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  linkStyle?: ButtonStyle;
  className?: string;
  full?: boolean;
}

export default function NextLink({
  href,
  children,
  className,
  linkStyle = ButtonStyle.LINK,
  full,
  ...rest
}: Props): JSX.Element {
  return (
    <NextLinkComponent
      {...rest}
      href={href}
      className={twMerge(
        "inline-block cursor-pointer",
        buttonStyleClasses(linkStyle),
        full && "w-full text-center",
        className,
      )}
    >
      {children}
    </NextLinkComponent>
  );
}
