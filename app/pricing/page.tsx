import Footer from "../Footer";

const PricingPage = () => (
  <>
    <div className="flex flex-col items-center justify-center">
      <section
        className="text-center flex flex-col gap-8 max-w-3xl pt-18 pb-12"
        id="hero"
      >
        <header className="space-y-4">
          <h1 className="font-bold text-6xl">Plans for innovators</h1>
          <p className="text-neutral-400 text-xl">
            Choices designed to match different approaches
          </p>
        </header>
      </section>

      <section className="w-full max-w-5xl"></section>

      <section className="py-36 flex flex-col gap-18">
        <h2 className="font-bold text-5xl text-center">
          Frequently asked questions
        </h2>

        <div className="w-3xl flex flex-col gap-3"></div>

        <p className="text-center font-semibold">
          Still have more questions? Contact out support team.
        </p>
      </section>

      <Footer />
    </div>
  </>
);

export default PricingPage;
