import { type LabelHTMLAttributes, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import Required from "./Required";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  hidden?: boolean;
  required?: boolean;
  className?: string;
}

export default function Label({
  children,
  hidden,
  required,
  className,
}: Props) {
  return (
    <label
      className={twMerge(
        hidden ? "hidden" : "block",
        "text-sm font-bold",
        className,
      )}
    >
      {children}
      {required && <Required required={required} />}
    </label>
  );
}
