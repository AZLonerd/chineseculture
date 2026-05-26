import { Suspense } from "react";

const formatSectionName = (value: string) => {
    if (!value) return "Culture";

    return value.charAt(0).toUpperCase() + value.slice(1);
};

type CulturePageProps = {
    params: Promise<{
        id: string;
    }>;
};

async function CulturePageContent({ params }: CulturePageProps) {
    const { id } = await params;
    const sectionName = formatSectionName(id);

    return (
        <main className="flex min-h-[60vh] items-center justify-center px-6 py-16">
            <div className="max-w-xl text-center">
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
                    {sectionName}
                </p>
                <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                    Under construction
                </h1>
                <p className="mt-4 text-base text-muted-foreground">
                    We&apos;re building this culture page right now. Check back soon for updates.
                </p>
            </div>
        </main>
    );
}

export default function Page({ params }: CulturePageProps) {
    return (
        <Suspense fallback={<div>Loading culture page...</div>}>
            <CulturePageContent params={params} />
        </Suspense>
    );
}
