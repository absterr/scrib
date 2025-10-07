import Footer from "../../Footer";
import ActionButtons from "./ActionButtons";

const LandingPage = () => (
  <>
    <div className="px-8 flex flex-col items-center justify-center">
      <section
        className="flex flex-col items-center justify-center text-center max-w-3xl min-h-[calc(90vh)]"
        id="hero"
      >
        <header className="space-y-6">
          <h1 className="font-bold text-6xl">Your ideas, instantly in sync</h1>
          <p className="text-gray-400 text-xl">
            Turn creativity into momentum. Write, share and create, together.
          </p>
        </header>

        <ActionButtons />

        <div className="pt-30 text-gray-400 text-sm font-semibold">
          <p>Featuring state of the art technologies</p>
          <div></div>
        </div>
      </section>

      <section className="flex justify-center pt-76 max-w-3xl min-h-[calc(90vh)]">
        <div className="text-center">
          <p className="font-semibold text-lg">Support for over</p>
          <h2 className="font-bold text-6xl pb-4">100 Collaborators</h2>
          <p className="font-semibold text-xl">per note</p>
        </div>
      </section>

      <section className="text-center pt-48 pb-24 max-w-3xl min-h-[calc(50vh)]">
        <div className="flex flex-col gap-6 items-center">
          <h2 className="text-5xl font-bold w-lg">Ideas move together</h2>
          <p className="text-gray-400 text-lg w-lg">
            Great ideas are born from imagination and carried forward by the
            people who believe in them. Now it&apos;s your time to carry yours
            forward.
          </p>
        </div>

        <ActionButtons />
      </section>
    </div>

    <Footer />
  </>
);
export default LandingPage;
