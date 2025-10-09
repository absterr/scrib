"use client";
const ErrorPage = () => (
  <section className="w-full min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center">
    <div className="flex justify-center gap-8">
      <div className="flex flex-col justify-center">
        <h1 className="text-6xl mb-0">500</h1>
      </div>
      <div className="border border-neutral-600"></div>
      <div className="space-y-5">
        <div className="space-y-1">
          <h2 className="font-semibold text-4xl pb-1">Bang!</h2>
          <p className="text-neutral-500 text-base">
            An unexpected error occured while we were trying to fetch resources.
            <br />
            Please check your internet connection and try again.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default ErrorPage;
