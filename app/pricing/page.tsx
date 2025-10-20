import Footer from "@/components/Footer";
import FAQ from "./FAQ";
import PricingToggle from "./_PricingToggle";
import { pricingFAQs } from "@/lib/details";

const PricingPage = () => (
  <div className="flex flex-col items-center justify-center">
    <section
      className="text-center flex flex-col gap-8 max-w-xs md:max-w-xl lg:max-w-3xl pt-18 pb-12"
      id="hero"
    >
      <header>
        <h1 className="font-bold text-4xl lg:text-6xl pb-3 lg:pb-6">
          Plans for innovators
        </h1>
        <p className="text-neutral-400 lg:text-xl">
          Choices designed to match different approaches
        </p>
      </header>
    </section>

    <section className="w-full max-w-5xl">
      <PricingToggle />
    </section>

    <section className="py-36 flex flex-col gap-18 items-center">
      <h2 className="hidden md:block font-bold text-3xl lg:text-5xl text-center">
        Frequently asked questions
      </h2>
      <h2 className="font-bold text-3xl text-center md:hidden">FAQs</h2>

      <div className="w-3xl flex flex-col gap-3 max-w-xs md:max-w-xl lg:max-w-3xl">
        {pricingFAQs.map(({ question, answer }) => (
          <FAQ key={question} question={question} answer={answer} />
        ))}
      </div>

      <p className="text-center font-semibold text-sm md:text-base max-w-xs md:max-w-xl">
        Still have more questions? Contact out support team.
      </p>
    </section>

    <Footer />
  </div>
);

export default PricingPage;
