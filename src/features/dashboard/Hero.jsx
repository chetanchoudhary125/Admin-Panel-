import { TopSelling } from "./TopSelling";
import { StatsCard } from "./StatsCard";

export const Hero = () => {
  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="rounded-[24px] bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-700 px-4 py-5 text-white shadow-xl sm:px-8 sm:py-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200 sm:text-sm sm:tracking-[0.3em]">
                Business intelligence
              </p>
              <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">
                Your command center for growth
              </h1>
              <p className="mt-3 text-sm text-blue-100 sm:text-base">
                Monitor sales, view top-performing products, and stay ahead with a clear overview of your store.
              </p>
            </div>

            <div className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm lg:w-auto">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-100">
                Today
              </p>
              <p className="mt-1 text-lg font-semibold">
                {new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        <StatsCard />
      </div>
      <TopSelling />
    </>
  );
};
