import Navbar from "@/components/features/navbar";

const AboutPage = () => {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="mx-auto flex w-full max-w-3xl flex-col px-6 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
          About us
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Learning modern Chinese culture in a simple way
        </h1>

        <div className="mt-8 space-y-6 text-sm leading-7 text-muted-foreground sm:text-base">
          <p>
            ChinaYaCulture is a learning space for people who want to understand modern Chinese
            vocabulary, internet slang, and everyday cultural references without feeling lost.
          </p>
          <p>
            The goal is to make culture feel approachable. Instead of long textbook explanations,
            we focus on short vocab entries, examples, category browsing, and community features
            that help learners pick things up naturally.
          </p>
          <p>
            Whether you are curious about trending words, frequently used expressions, or the
            social context behind a phrase, this project is built to give you a practical starting
            point.
          </p>
          <p>
            ChinaYaCulture is still growing, and this page can expand over time with more about
            the mission, contributors, and the story behind the project.
          </p>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
