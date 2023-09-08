import { ReactNode } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface Props {
  children: ReactNode;
  priority: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export default function Heading({
  children,
  priority,
  className,
}: Props): JSX.Element | null {
  const classes = clsx(
    "font-extrabold leading-normal text-gray-700",
    className
  );
  switch (priority) {
    case 1:
      return (
        <h1 className={twMerge("mb-5 text-3xl sm:text-5xl", classes)}>
          {children}
        </h1>
      );
    case 2:
      return (
        <h2 className={twMerge("mb-4 text-2xl sm:text-4xl", classes)}>
          {children}
        </h2>
      );
    case 3:
      return (
        <h3 className={twMerge("mb-3 text-xl sm:text-3xl", classes)}>
          {children}
        </h3>
      );

    default:
      return null;
  }
}
