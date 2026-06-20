const githubUser = "Abhishek-IITP";

export function GithubStreak() {
     return (
          <section className="relative mx-auto mt-10 w-full max-w-none overflow-hidden border-y border-zinc-200 bg-zinc-50 px-6 sm:px-8 py-6 text-zinc-900 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
               <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
                    <h2 className="text-[2.5rem] font-bold leading-none tracking-tight text-zinc-950">
                         GitHub
                    </h2>
                    <a href="https://github.com/abhishek-IITP" target="_blank" className="text-xs border-b-1 font-semibold uppercase tracking-[0.24em] text-zinc-500">
                         @{githubUser}
                    </a>
               </div>

               <div className="mt-6 min-w-full overflow-x-auto rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-sm">
                    <div className="min-w-[700px] w-full">
                         <img
                              src={`https://ghchart.rshah.org/000000/${githubUser}`}
                              alt={`${githubUser} GitHub contributions chart`}
                              className="block h-auto w-full rounded-lg dark:invert"
                         />
                    </div>
               </div>

               <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:items-center justify-between text-xs text-zinc-500">
                    <span>Contributions in the past 365 days</span>
                    <div className="flex items-center gap-2">
                         <span>Less</span>
                         <span className="flex gap-1.5">
                              <span className="h-3.5 w-3.5 rounded-s border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800" />
                              <span className="h-3.5 w-3.5 rounded-s border border-zinc-200 dark:border-zinc-800 bg-zinc-300 dark:bg-zinc-600" />
                              <span className="h-3.5 w-3.5 rounded-s border border-zinc-200 dark:border-zinc-800 bg-zinc-400 dark:bg-zinc-500" />
                              <span className="h-3.5 w-3.5 rounded-s border border-zinc-200 dark:border-zinc-800 bg-zinc-600 dark:bg-zinc-300" />
                              <span className="h-3.5 w-3.5 rounded-s border border-zinc-200 dark:border-zinc-800 bg-zinc-950 dark:bg-zinc-100" />
                         </span>
                         <span>More</span>
                    </div>
               </div>
          </section>
     );
}