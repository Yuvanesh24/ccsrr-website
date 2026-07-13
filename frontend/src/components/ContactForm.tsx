"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.get("name"), email: data.get("email"), message: data.get("message") }),
      });

      if (!res.ok) throw new Error("Failed to send message");
      setSubmitted(true);
      form.reset();
    } catch {
      setError("Failed to send. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12 card-base bg-white">
        <div className="text-3xl mb-3 text-[#B84A18]">✓</div>
        <p className="font-semibold text-[#1C1C1A] text-[16px]">Message sent successfully</p>
        <p className="text-[14px] text-[#6B6860] mt-1">We will get back to you shortly.</p>
        <Button
          variant="outline"
          className="mt-4 border-[#B84A18] text-[#B84A18] hover:bg-[#FEF7F2]"
          onClick={() => setSubmitted(false)}
        >
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label htmlFor="name" className="text-[14px] font-medium text-[#1C1C1A]">
            Name <span className="text-red-500">*</span>
          </label>
          <Input id="name" name="name" required placeholder="Your name" className="border-[#E8E5E0]" />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-[14px] font-medium text-[#1C1C1A]">
            Email <span className="text-red-500">*</span>
          </label>
          <Input id="email" name="email" type="email" required placeholder="your@email.com" className="border-[#E8E5E0]" />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-[14px] font-medium text-[#1C1C1A]">
          Message <span className="text-red-500">*</span>
        </label>
        <Textarea id="message" name="message" required placeholder="Your message..." rows={5} className="border-[#E8E5E0]" />
      </div>

      {error && <p className="text-[14px] text-red-600">{error}</p>}

      <Button type="submit" disabled={isSubmitting} className="bg-[#B84A18] hover:bg-[#963C14] text-white">
        <Send className="h-4 w-4 mr-2" />
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
