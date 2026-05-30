import Navbar from "@/components/features/navbar";

const SubmitDefinitionPage = () => {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="mx-auto flex w-full max-w-3xl flex-col px-6 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
          Submit definition
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Help us improve the vocabulary collection
        </h1>

        <div className="mt-8 space-y-6 text-sm leading-7 text-muted-foreground sm:text-base">
          <p>
            If you know a better explanation for a word, a clearer translation, or a more useful
            real-life example, this is where community contributions can begin.
          </p>
          <p>
            For now, this page is a placeholder for a future submission flow where users will be
            able to suggest new definitions, slang meanings, usage notes, and cultural context.
          </p>
          <p>
            The goal is to make ChinaYaCulture more accurate, more current, and more helpful for
            learners who want to understand how words are really used.
          </p>
          <p>
            A proper form can be connected here next so people can submit suggestions directly.
          </p>
        </div>
      </section>
    </main>
  );
};

export default SubmitDefinitionPage;
