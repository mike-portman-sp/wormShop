"use client";

import { useState } from "react";
import { getButtonStyles } from "../utils/buttonStyles";

type FormProps = {
  form: {
    formTitle?: string;
    buttonStyle?: string;
    formCTA?: string;
  };
};

export default function Form({ form }: FormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (

      <div className="container mx-auto relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Contact Form */}
          <div className="p-8 rounded-3xl bg-background border border-border shadow-soft">
            <p className="font-handwritten text-2xl text-muted-foreground mb-6">
              {form.formTitle} 👇
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-5 py-4 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Your name"
                  required
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-5 py-4 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={4}
                className="w-full px-5 py-4 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                placeholder="What's on your mind?"
                required
              />

              <button
                type="submit"
                disabled={status === "loading"}
                className={getButtonStyles(form.buttonStyle)}
              >
                {status === "loading" ? "Sending..." : `${form.formCTA} 🚀`}
              </button>

              {status === "success" && (
                <p className="text-sm px-4 py-3 rounded-xl bg-muted border border-accent/40 text-accent">
                  Message sent! I&apos;ll be in touch soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm px-4 py-3 rounded-xl bg-muted border border-primary/40 text-primary">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

  );
}
