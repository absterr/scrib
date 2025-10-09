import { Skeleton } from "@/components/ui/skeleton";

const DetailSection = ({ title }: { title: string }) => (
  <div className="flex flex-col gap-6">
    <div className="flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        {title === "Delete account" ? (
          <p className="text-neutral-700">
            Permanently delete your scrib account
          </p>
        ) : (
          <div className="pt-2">
            <Skeleton className="w-48 h-4" />
          </div>
        )}
      </div>
      <Skeleton className="w-8 h-4" />
    </div>
    {title !== "Delete account" && <hr />}
  </div>
);

const AccountLoading = () => (
  <div className="max-w-3xl mx-auto pt-20 flex flex-col gap-18">
    <div className="flex flex-col gap-6">
      <h2 className="font-semibold text-2xl">Personal details</h2>
      {["Name", "Email"].map((title) => (
        <DetailSection title={title} key={title} />
      ))}
    </div>

    <div>
      <h2 className="font-semibold text-2xl pb-6">Manage account</h2>
      <DetailSection title="Delete account" />
    </div>
  </div>
);

export default AccountLoading;
