const quote = {
  sentence: `Nothing's perfect, the world's not perfect, but it's there for us, trying the best it can. That's what makes it so damn beautiful.`,
  author: "Roy Mustang",
};

export function QuoteSection() {
  return (
    <section className="border-y border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-8 py-16 sm:py-20">
      <div className="mx-auto max-w-2xl flex flex-col items-center text-center gap-6">

        <p className="text-[1.15rem] sm:text-[1.3rem] leading-relaxed tracking-tight font-medium text-zinc-600 dark:text-zinc-400 italic">
          &ldquo;{quote.sentence}&rdquo;
        </p>
        <div className="flex items-center gap-4 w-full justify-center">
          <span className="flex-1 max-w-[80px] h-px bg-zinc-300 dark:bg-zinc-700" />
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
            {quote.author}
          </span>
          <span className="flex-1 max-w-[80px] h-px bg-zinc-300 dark:bg-zinc-700" />
        </div>
      </div>
    </section>
  );
}