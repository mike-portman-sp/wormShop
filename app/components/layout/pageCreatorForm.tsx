"use client";

import { useState } from "react";

type Card = {
  id: string;
  heading: string;
  pills: string;
  url: string;
  linkTitle: string;
  imageRef: string;
  imagePreview: string;
  imageUploading: boolean;
};

type FormData = {
  title: string;
  slug: string;
  publishedDate: string;
  hero: { heading: string; body: string };
  cards: Card[];
  seo: { metaTitle: string; metaDescription: string };
};

const empty: FormData = {
  title: "",
  slug: "",
  publishedDate: "",
  hero: { heading: "", body: "" },
  cards: [],
  seo: { metaTitle: "", metaDescription: "" },
};

function toSlug(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function uid() {
  return Math.random().toString(36).slice(2, 8);
}

function emptyCard(): Card {
  return { id: uid(), heading: "", pills: "", url: "", linkTitle: "", imageRef: "", imagePreview: "", imageUploading: false };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-muted-foreground uppercase tracking-widest">{title}</p>
      {children}
      <div className="border-b border-border" />
    </div>
  );
}

export default function PageCreatorForm() {
  const [data, setData] = useState<FormData>(empty);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function set<K extends keyof FormData>(field: K, value: FormData[K]) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  function setHero(field: keyof FormData["hero"], value: string) {
    setData((prev) => ({ ...prev, hero: { ...prev.hero, [field]: value } }));
  }

  function setSeo(field: keyof FormData["seo"], value: string) {
    setData((prev) => ({ ...prev, seo: { ...prev.seo, [field]: value } }));
  }

  function addCard() {
    setData((prev) => ({ ...prev, cards: [...prev.cards, emptyCard()] }));
  }

  function updateCard(id: string, field: keyof Card, value: string) {
    setData((prev) => ({
      ...prev,
      cards: prev.cards.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    }));
  }

  function removeCard(id: string) {
    setData((prev) => ({ ...prev, cards: prev.cards.filter((c) => c.id !== id) }));
  }

  async function handleImageUpload(id: string, file: File) {
    updateCard(id, "imageUploading" as any, true as any);
    updateCard(id, "imagePreview", URL.createObjectURL(file));
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload-image", { method: "POST", body: form });
    const json = await res.json();
    updateCard(id, "imageRef", json.ref || "");
    updateCard(id, "imageUploading" as any, false as any);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/create-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong");
      setStatus("success");
    } catch (err: any) {
      setErrorMsg(err.message);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="max-w-xl mx-auto p-8 rounded-2xl border border-accent/40 bg-muted text-center">
        <p className="text-accent text-lg font-bold mb-2">Page created!</p>
        <p className="text-muted-foreground text-sm">
          <strong>/{data.slug}</strong> has been created as a draft in Sanity. Review and publish it in Studio.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col gap-8">

      <Section title="Basic Info">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Page Title <span className="text-primary">*</span></span>
          <input
            className="input"
            value={data.title}
            onChange={(e) => {
              set("title", e.target.value);
              set("slug", toSlug(e.target.value));
            }}
            placeholder="My Work"
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Slug <span className="text-primary">*</span></span>
          <input
            className="input"
            value={data.slug}
            onChange={(e) => set("slug", toSlug(e.target.value))}
            placeholder="my-work"
            required
          />
        </label>
      </Section>

      <Section title="Hero">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Heading</span>
          <input
            className="input"
            value={data.hero.heading}
            onChange={(e) => setHero("heading", e.target.value)}
            placeholder="My Work"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Body Text</span>
          <textarea
            className="input min-h-30 resize-y"
            value={data.hero.body}
            onChange={(e) => setHero("body", e.target.value)}
            placeholder="A short description shown below the heading..."
          />
        </label>
      </Section>

      <Section title="Job Cards">
        {data.cards.length === 0 && (
          <p className="text-muted-foreground text-sm">No cards yet.</p>
        )}
        {data.cards.map((card, i) => (
          <div key={card.id} className="flex flex-col gap-3 p-4 rounded-xl border border-border bg-muted">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Card {i + 1}</span>
              <button type="button" onClick={() => removeCard(card.id)} className="text-xs text-primary hover:underline">
                Remove
              </button>
            </div>
            <label className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">Heading</span>
              <input className="input" value={card.heading} onChange={(e) => updateCard(card.id, "heading", e.target.value)} placeholder="Company or project name" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">Pills (comma separated)</span>
              <input className="input" value={card.pills} onChange={(e) => updateCard(card.id, "pills", e.target.value)} placeholder="ID Security, Worflows, Zero Trust" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">Link URL</span>
              <input className="input" value={card.url} onChange={(e) => updateCard(card.id, "url", e.target.value)} placeholder="https://example.com" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">Image</span>
              {card.imagePreview && (
                <img src={card.imagePreview} alt="" className="w-full h-32 object-cover rounded-lg mb-1" />
              )}
              <input
                type="file"
                accept="image/*"
                className="input text-sm"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(card.id, f); }}
              />
              {card.imageUploading && <span className="text-xs text-muted-foreground">Uploading...</span>}
              {card.imageRef && !card.imageUploading && <span className="text-xs text-accent">✓ Uploaded</span>}
            </label>
          </div>
        ))}
        <button type="button" className="btn btn--outline-grey w-full" onClick={addCard}>
          + Add Card
        </button>
      </Section>

      <Section title="SEO">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Meta Title</span>
          <input className="input" value={data.seo.metaTitle} onChange={(e) => setSeo("metaTitle", e.target.value)} placeholder="Page title for search engines" />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Meta Description</span>
          <textarea className="input min-h-25 resize-y" value={data.seo.metaDescription} onChange={(e) => setSeo("metaDescription", e.target.value)} placeholder="Short description for search results (under 160 chars)" />
          <span className={`text-xs ${data.seo.metaDescription.length > 160 ? "text-primary" : "text-muted-foreground"}`}>
            {data.seo.metaDescription.length} / 160
          </span>
        </label>
      </Section>

      {status === "error" && (
        <p className="text-primary text-sm">{errorMsg}</p>
      )}

      <button type="submit" className="btn btn--sun w-full" disabled={status === "loading"}>
        {status === "loading" ? "Creating..." : "Create Page"}
      </button>

    </form>
  );
}
