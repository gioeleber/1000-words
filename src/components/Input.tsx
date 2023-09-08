import { forwardRef, type InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

import { strToSousageCase } from "../utils/strUtils";
import Label from "./Label";
import ExclamationIcon from "/public/icons/exclamation-circle.svg";
import clsx from "clsx";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  hideLabel?: boolean;
  className?: string;
  fullWidth?: boolean;
  required?: boolean;
  status?: "error";
  error?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      placeholder,
      hideLabel,
      className,
      fullWidth,
      required,
      status,
      error,
      ...rest
    },
    ref,
  ) => {
    const inputID = strToSousageCase(label);

    return (
      <div className={twMerge(className, !fullWidth && "max-w-lg")}>
        <Label htmlFor={inputID} hidden={hideLabel} required={required}>
          {label}
        </Label>
        <input
          ref={ref}
          type="text"
          name={inputID}
          id={inputID}
          className={clsx(
            "outline-primary block w-full rounded-md border p-2",
            status === "error" ? "border-red-500" : "border-slate-400",
          )}
          placeholder={placeholder}
          {...rest}
        />
        {status === "error" && error && (
          <div className="mt-1 flex gap-x-2">
            <ExclamationIcon width="18" className="stroke-red-500" />
            <small className="text-red-500">{error}</small>
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
