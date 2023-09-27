import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import LoaderIcon from "/public/icons/puff-loader.svg";
import { buttonStyleClasses } from "~/utils/styleUtils";
import { type ButtonStyle } from "~/types/components";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  isEnabled?: boolean;
  buttonStyle?: ButtonStyle;
  className?: string;
}

export default function Button({
  children,
  isLoading,
  isEnabled = true,
  buttonStyle,
  className,
  ...rest
}: Props): JSX.Element {
  return (
    <button
      className={twMerge(
        "relative flex cursor-pointer items-center justify-center",
        buttonStyleClasses(buttonStyle),
        className,
        !isEnabled && "cursor-not-allowed bg-gray-200 text-gray-500",
        isLoading && "cursor-wait text-transparent",
      )}
      disabled={isLoading ?? !isEnabled}
      {...rest}
    >
      {isLoading && (
        <LoaderIcon
          className={twMerge(
            "absolute bottom-[50%] left-[50%] translate-x-[-50%] translate-y-[50%] stroke-white",
            buttonStyle?.includes("secondary") && "stroke-gray-500",
          )}
        />
      )}
      {children}
    </button>
  );
}
