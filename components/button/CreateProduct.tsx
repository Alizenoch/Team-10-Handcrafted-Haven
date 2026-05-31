// CreateProductButton.tsx
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";

interface CreateButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  label?: string;
  ref?: React.Ref<HTMLButtonElement>; // React 19 native ref prop
}

export function CreateProductButton({
  children,
  label = "Create Product",
  className = "",
  disabled,
  ...props
}: CreateButtonProps) {
  // 1. Hook reads the parent form state automatically
  const { pending } = useFormStatus();

  // 2. Compute modern conditional tailwind classes cleanly
  const baseStyles = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors";
  const disabledStyles = "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500";
  const combinedClasses = `${baseStyles} ${disabledStyles} ${className}`.trim();

  return (
    <button
      {...props}
      disabled={disabled || pending}
      className={combinedClasses}
    >
      {pending ? "Creating..." : (children ?? label)}
    </button>
  );
}
