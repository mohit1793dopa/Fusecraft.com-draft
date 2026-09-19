"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { brand } from "@/data/site";

export default function ContactClient() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main className="bg-sand px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow text-mocha">Contact</p>
          <h1 className="type-display mt-3 text-4xl md:text-6xl">
            Let&apos;s resolve the detail together.
          </h1>
          <p className="type-body mt-6 max-w-md text-base md:text-lg">
            Share a brief, drawings, or a room that needs a piece that truly
            belongs. We typically reply within a few business days.
          </p>
          <div className="mt-10 space-y-5 text-sm">
            <p>
              <span className="eyebrow block text-mocha/60">Studio</span>
              <span className="type-body">{brand.location}</span>
            </p>
            <p>
              <span className="eyebrow block text-mocha/60">Email</span>
              <a
                href={`mailto:${brand.email}`}
                className="font-normal text-ink underline decoration-line underline-offset-4 transition-colors hover:text-chestnut"
              >
                {brand.email}
              </a>
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-cream px-6 py-12 md:px-10"
              >
                <p className="font-display text-2xl text-moss">Message noted.</p>
                <p className="mt-3 text-mocha">
                  This form is a front-end placeholder for now. Email us directly
                  at {brand.email} and we&apos;ll take it from there.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-cream px-6 py-10 md:px-10 md:py-12"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <Field label="Name" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                </div>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="eyebrow text-mocha" htmlFor="role">
                      Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      className="mt-2 w-full border-b border-line bg-transparent py-3 text-moss outline-none transition-colors focus:border-chestnut"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select…
                      </option>
                      <option value="architect">Architect</option>
                      <option value="designer">Interior designer</option>
                      <option value="client">Client</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <Field
                    label="Project type"
                    name="type"
                    placeholder="Facade, lighting, furniture…"
                  />
                </div>
                <div className="mt-6">
                  <label className="eyebrow text-mocha" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="mt-2 w-full border-b border-line bg-transparent py-3 text-moss outline-none transition-colors placeholder:text-mocha/40 focus:border-chestnut"
                    placeholder="Tell us about the space and the detail…"
                  />
                </div>
                <button type="submit" className="btn-primary mt-10">
                  Send message →
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="eyebrow text-mocha" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full border-b border-line bg-transparent py-3 text-moss outline-none transition-colors placeholder:text-mocha/40 focus:border-chestnut"
      />
    </div>
  );
}
