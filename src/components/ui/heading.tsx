import type { HTMLAttributes } from "react";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3;
  className?: string;
}

const SIZES: Record<1 | 2 | 3, string> = {
  1: "text-3xl font-bold",
  2: "text-2xl font-semibold",
  3: "text-xl font-semibold",
};

export function Heading({ level = 1, className = "", children, ...rest }: HeadingProps) {
  const Tag = (`h${level}`) as "h1" | "h2" | "h3";
  return (
    <Tag className={`${SIZES[level]} text-gray-900 ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
