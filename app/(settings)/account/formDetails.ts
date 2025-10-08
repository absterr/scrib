import { type changeEmail } from "@/lib/auth-client";

type FormProps = {
  title: string;
  purpose: string;
  placeholder: string;
  description: string;
  field: string;
};

export type FormDetails =
  | (FormProps & {
      title: "Name";
      action: (
        userId: string,
        newName: string
      ) => Promise<{ success: boolean; message: string }>;
    })
  | (FormProps & {
      title: "Email";
      action: typeof changeEmail;
    });
