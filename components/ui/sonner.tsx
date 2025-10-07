"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      richColors
      style={
        {
          "--success-bg": "var(--success)",
          "--success-text": "var(--primary)",
          "--success-border": "var(--success)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
