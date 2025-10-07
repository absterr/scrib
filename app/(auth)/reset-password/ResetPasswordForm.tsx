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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { resetPassword } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { resetPasswordSchema } from "@/lib/zod/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { GalleryVerticalEnd } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ResetPasswordContent = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") as string;
  const error = searchParams.get("error");
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = (values: z.infer<typeof resetPasswordSchema>) => {
    startTransition(async () => {
      const { error } = await resetPassword({
        newPassword: values.password,
        token,
      });
      if (error)
        toast.error("Couldn't reset password", {
          description: `${error.message}`,
        });
      else {
        router.replace("/login");
        toast.success("Password reset successfull", {
          description:
            "Password has been successfully reset. Please login to continue.",
        });
      }
    });
  };

  if (error === "invalid_token" || !token)
    return (
      <div className="flex flex-col items-center h-screen mt-64">
        <h1 className="mb-2 text-2xl font-bold text-black">
          Invalid reset link
        </h1>
        <p className="text-gray-600">
          The password reset link is invalid or has expired
        </p>
      </div>
    );

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex items-center gap-2 self-center font-medium">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <GalleryVerticalEnd className="size-4" />
        </div>
        Scrib
      </div>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset your Password</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                {["password", "confirmPassword"].map((field) => (
                  <FormField
                    key={field}
                    control={form.control}
                    name={field as keyof z.infer<typeof resetPasswordSchema>}
                    render={({ field: fieldProps }) => (
                      <FormItem className="grid gap-2 text-left">
                        <FormLabel htmlFor={field}>
                          {field === "confirmPassword"
                            ? "Confirm Password"
                            : "New Password"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            {...fieldProps}
                            placeholder={
                              field === "password"
                                ? "Enter your new password"
                                : "Confirm your password"
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? <LoadingSpinner /> : "Change password"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

const ResetPasswordForm = () => {
  return (
    <Suspense>
      <ResetPasswordContent />
    </Suspense>
  );
};

export default ResetPasswordForm;
