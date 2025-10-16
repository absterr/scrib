import { auth } from "@/lib/auth";
import { getUserOwnedNotesCount, getUserRecentNotes } from "@/lib/queries";
import { getFirstName } from "@/lib/utils";
import { headers } from "next/headers";
import CustomCarousel from "./_CustomCarousel";
import LandingPage from "./_LandingPage";
import { PLAN_LIMITS } from "@/lib/planLimits";

const HomePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session.user) return <LandingPage />;

  const userInfo = {
    id: session.user.id,
    name: session.user.name,
    plan: session.user.plan,
  };

  const userRecentNotes = await getUserRecentNotes(userInfo.id);
  const userLimit = PLAN_LIMITS[userInfo.plan];
  const { count } = await getUserOwnedNotesCount(userInfo.id);
  const maxNotesReached = count >= userLimit.maxNotes;

  return (
    <section className="max-w-4xl py-8 mx-auto px-4">
      <header className="mb-12 flex justify-center">
        <h1>Hello, {getFirstName(userInfo.name)}</h1>
      </header>

      <div>
        <h2 className="font-light text-lg mb-4">Recent notes</h2>
        <div>
          <CustomCarousel
            notes={userRecentNotes}
            userId={userInfo.id}
            userPlan={userInfo.plan}
            maxNotesReached={maxNotesReached}
          />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
