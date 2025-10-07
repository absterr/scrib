"use client";
import GoogleIcon from "@/components/GoogleIcon";
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
import { signIn } from "@/lib/auth-client";
import providers from "@/lib/providers";
import { cn } from "@/lib/utils";
import { loginSchema } from "@/lib/zod/authSchema";
import { ErrorContext } from "@better-fetch/fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const LoginForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    startTransition(async () => {
      await signIn.email(
        {
          email: values.email,
          password: values.password,
        },
        {
          onSuccess: () => {
            router.replace("/");
          },
          onError: (ctx: ErrorContext) => {
            switch (ctx.error.status) {
              case 400:
                form.reset();
                toast.error("Invalid credentials, please try again.");
                break;
              case 401:
                toast.error("Incorrect credentials", {
                  description: "Email or password is incorrect",
                });
                break;
              case 403:
                form.reset();
                toast.error("Email address is unverified", {
                  description: "Please verify your email address.",
                });
                break;
              case 404:
                form.reset();
                toast.error("User not found", {
                  description:
                    "A user with this email does not exist. Please sign up.",
                });
                break;
              case 429:
                toast.error("Too many requests. Please try again later.");
                break;
              default:
                console.log("Error: ", ctx.error.message);
                toast.error("Something went wrong. Please try again.");
            }
          },
        }
      );
    });
  };

  const handleSocialSignIn = (provider: providers) => () => {
    startTransition(async () => {
      await signIn.social(
        {
          provider: provider,
        },
        {
          onSuccess: () => {
            router.replace("/");
            router.refresh();
          },
          onError: () => {
            toast.error("Couldn't sign in", {
              description: `Could not sign in with ${provider}. Please try again`,
            });
          },
        }
      );
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Sign in with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <Button
                variant="outline"
                className="w-full"
                disabled={isPending}
                onClick={handleSocialSignIn("google")}
              >
                <GoogleIcon />
                Continue with Google
              </Button>
            </div>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-card text-muted-foreground relative z-10 px-2">
                Or continue with
              </span>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-6">
                  {["email", "password"].map((field) => (
                    <FormField
                      key={field}
                      control={form.control}
                      name={field as keyof z.infer<typeof loginSchema>}
                      render={({ field: fieldProps }) => (
                        <FormItem className="grid gap-2 text-left">
                          <div className="flex">
                            <FormLabel htmlFor={field}>
                              {field.charAt(0).toUpperCase() + field.slice(1)}
                            </FormLabel>
                            {field === "password" && (
                              <Link
                                href={"/forgot-password"}
                                className="ml-auto text-sm text-gray-500 underline-offset-4 hover:underline"
                              >
                                Forgot your password?
                              </Link>
                            )}
                          </div>
                          <FormControl>
                            <Input
                              type={field === "email" ? "email" : "password"}
                              placeholder={
                                field === "email" ? "m@example.com" : undefined
                              }
                              {...fieldProps}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? <LoadingSpinner /> : "Login"}
                  </Button>
                </div>
              </form>
            </Form>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href={"/signup"} className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <Link href="#">Terms of Service</Link> and{" "}
        <Link href="#">Privacy Policy</Link>.
      </div>
    </div>
  );
};

export default LoginForm;
