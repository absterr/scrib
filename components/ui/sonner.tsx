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
          "--normal-bg": "hsl(var(--background))",
          "--normal-text": "hsl(var(--foreground))",
          "--normal-border": "hsl(var(--border))",

          "--success-bg": "hsl(var(--success))",
          "--success-text": "hsl(var(--success-foreground))",
          "--success-border": "hsl(var(--success))",

          "--destructive-bg": "hsl(var(--destructive))",
          "--destructive-text": "hsl(var(--destructive-foreground))",
          "--destructive-border": "hsl(var(--destructive))",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
