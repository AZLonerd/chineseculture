const PrivacyPolicyPage = () => {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col px-6 py-16">
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
        Privacy policy
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        How we handle your information
      </h1>
      <div className="mt-8 space-y-6 text-sm leading-7 text-muted-foreground sm:text-base">
        <p>
          ChinaYaCulture collects only the information needed to run the app, support login,
          and improve the learning experience.
        </p>
        <p>
          If you create an account, your authentication details are handled through our secure
          sign-in system. We do not use this page for direct messaging or email collection.
        </p>
        <p>
          Activity inside the app, such as likes, saved vocab, and comments, may be stored so
          your progress and interactions can appear correctly across sessions.
        </p>
        <p>
          This policy page is a general product placeholder and can be expanded later with more
          detailed legal or compliance language if needed.
        </p>
      </div>
    </main>
  );
};

export default PrivacyPolicyPage;
