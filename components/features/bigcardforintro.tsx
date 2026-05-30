const Bigcardforintro = () => {
  return (
    <section className="mythic-surface p-8">
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium tracking-[0.25em] text-muted-foreground uppercase">
          Modern culture, timeless roots
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Welcome to <span className="text-secondary">ChinaYaCulture</span>
        </h1>
        <p className="text-muted-foreground max-w-prose">
          Learn Gen Z China culture and slang with bite-sized vocab, examples, and context.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <span className="rounded-full border border-secondary/40 bg-secondary/10 px-3 py-1 text-xs text-foreground">
          Vocab
        </span>
        <span className="rounded-full border border-secondary/40 bg-secondary/10 px-3 py-1 text-xs text-foreground">
          Shows
        </span>
        <span className="rounded-full border border-secondary/40 bg-secondary/10 px-3 py-1 text-xs text-foreground">
          Books
        </span>
        <span className="rounded-full border border-secondary/40 bg-secondary/10 px-3 py-1 text-xs text-foreground">
          Movies
        </span>
      </div>
    </section>
  );
};

export default Bigcardforintro;
