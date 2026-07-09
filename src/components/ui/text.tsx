import type { HTMLAttributes } from "react";

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

export function Text({ className = "", children, ...rest }: TextProps) {
  return (
    <p className={`text-sm text-gray-700 ${className}`} {...rest}>
      {children}
    </p>
  );
}
