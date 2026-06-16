const githubUser = "Abhishek-IITP";

export function GithubStreak() {
     return (
          <section className="relative mx-auto mt-10 w-full max-w-none overflow-hidden border-y border-zinc-200 bg-zinc-50 px-10 py-4 text-zinc-900 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
               <div className="flex items-center justify-between border-y border-zinc-200 py-1.5">
                    <h2 className="text-[1.9rem] font-semibold leading-none tracking-tight text-zinc-950">
                         GitHub
                    </h2>
                    <span className="text-[0.7rem] font-medium uppercase tracking-[0.24em] text-zinc-500">
                         {githubUser}
                    </span>
               </div>

               <div className="mt-8 overflow-hidden rounded-xs border border-zinc-200 bg-white p-2">
                    <img
                         src={`https://ghchart.rshah.org/${githubUser}`}
                         alt={`${githubUser} GitHub contributions chart`}
                         className="block h-auto w-full min-w-full"
                    />
               </div>

               <div className="mt-4 flex items-center justify-between text-[0.85rem] text-zinc-500">
                    <span>Contributions in the past 365 days</span>
                    <div className="flex items-center gap-2">
                         <span>Less</span>
                         <span className="flex gap-1">
                              <span className="h-3 w-3 bg-emerald-100" />
                              <span className="h-3 w-3 bg-emerald-200" />
                              <span className="h-3 w-3 bg-emerald-300" />
                              <span className="h-3 w-3 bg-emerald-500" />
                              <span className="h-3 w-3 bg-emerald-700" />
                         </span>
                         <span>More</span>
                    </div>
               </div>
          </section>
     );
}