import { updateUserName } from "@/actions/user-actions";
import { auth } from "@/lib/auth";
import { changeEmail } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import DeleteAccountDialog from "./_DeleteAccountDialog/DeleteAccountDialog";
import DetailsForm from "./DetailsForm";
import { FormDetails } from "./formDetails";

const AccountPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session.user) redirect("/login");

  const userId = session.user.id;
  const formDetails: FormDetails[] = [
    {
      title: "Name",
      purpose: "Edit name",
      placeholder: session.user.name,
      description:
        "This will be visible on your profile and for your note collaborators to see",
      field: "Full name",
      action: updateUserName,
    },
    {
      title: "Email",
      purpose: "Edit email address",
      placeholder: session.user.email,
      description: "This will be used for logging in and account recovery",
      field: "Email address",
      action: changeEmail,
    },
  ];

  return (
    <section className="max-w-3xl mx-auto pt-20 flex flex-col gap-18">
      <div className="flex flex-col gap-6">
        <h2 className="font-semibold text-2xl">Personal details</h2>
        <div className="flex flex-col gap-6">
          {formDetails.map((detail) => (
            <DetailsForm
              formDetails={detail}
              userId={userId}
              key={detail.title}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="font-semibold text-2xl">Manage account</h2>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">Delete account</h3>
            <p className="text-neutral-700">
              Permanently delete your scrib account
            </p>
          </div>
          <DeleteAccountDialog userId={userId} />
        </div>
      </div>
    </section>
  );
};

export default AccountPage;
