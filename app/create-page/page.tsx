import PageCreatorForm from "../components/layout/pageCreatorForm";

export const metadata = {
  title: "Create a Page",
  robots: { index: false, follow: false },
};

export default function CreatePagePage() {
  return (
    <main className="container-custom mx-auto px-6 py-24">
      <div className="max-w-xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold mb-3">Create a Page</h1>
        <p className="text-muted-foreground">Fill in the details below and a draft page will be created for review.</p>
      </div>
      <PageCreatorForm />
    </main>
  );
}
