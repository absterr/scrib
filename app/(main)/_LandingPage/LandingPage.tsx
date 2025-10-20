import Footer from "@/components/Footer";
import ActionButtons from "./ActionButtons";

const LandingPage = () => (
  <>
    <div className="px-8 flex flex-col items-center justify-center">
      <section
        className="flex flex-col items-center text-center max-w-xs md:max-w-md lg:max-w-3xl min-h-[calc(90vh)]"
        id="hero"
      >
        <header className="text-center pt-36 md:pt-56">
          <h1 className="font-bold text-4xl lg:text-6xl pb-4 lg:pb-6">
            Your ideas, instantly in sync
          </h1>
          <p className="text-gray-400 text-sm lg:text-xl">
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
          <p className="font-semibold md:text-lg">Support for over</p>
          <h2 className="font-bold text-4xl md:text-5xl lg:text-6xl pb-4 pt-1">
            100 Collaborators
          </h2>
          <p className="font-semibold md:text-xl">per note</p>
        </div>
      </section>

      <section className="text-center pt-48 pb-24 max-w-3xl min-h-[calc(50vh)]">
        <div className="flex flex-col gap-6 items-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Ideas move together
          </h2>
          <p className="text-gray-400 lg:text-lg md:w-lg">
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
