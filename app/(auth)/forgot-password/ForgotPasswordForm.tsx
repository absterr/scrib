"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { forgetPassword } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { emailSchema } from "@/lib/zod/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ForgotPasswordForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (value: z.infer<typeof emailSchema>) => {
    startTransition(async () => {
      const { error } = await forgetPassword({
        email: value.email,
        redirectTo: "/reset-password",
      });
      if (error) toast.error(`Couldn't send reset link, ${error.message}`);
      else {
        toast.success("Reset link sent.", {
          description: "Password reset link sent. Please check your email.",
        });
        form.reset();
      }
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgot your Password?</CardTitle>
          <CardDescription>Enter your email to verify</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name={"email" as keyof z.infer<typeof emailSchema>}
                    render={({ field }) => (
                      <FormItem className="grid gap-2 text-left">
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="m@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? <LoadingSpinner /> : "Send Reset Link"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;
