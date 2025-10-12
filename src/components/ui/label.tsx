import type * as React from "react";

export const Label = ({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium mb-1 text-muted-foreground"
    >
      {children}
    </label>
  );
};
