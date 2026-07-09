import type { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Container({ className = "", children, ...rest }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-5xl px-4 ${className}`} {...rest}>
      {children}
    </div>
  );
}
