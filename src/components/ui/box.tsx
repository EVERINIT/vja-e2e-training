import type { HTMLAttributes } from "react";

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Box({ className = "", children, ...rest }: BoxProps) {
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
}
