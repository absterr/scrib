"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";
import { useEffect, useState } from "react";

const AlertMessage = ({
  status,
  action,
}: {
  status: string | undefined;
  action: string | undefined;
}) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  let title = "Upgrade successful",
    description = "You are now on the pro plan",
    variant: "default" | "destructive" | "success" = "success";

  if (action === "checkout" && status === "cancel") {
    title = "Checkout canceled";
    description = "No subscription was made";
    variant = "destructive";
  }

  return (
    <>
      {visible && (
        <Alert variant={variant}>
          {status === "success" && <CheckCircle2Icon />}
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default AlertMessage;
