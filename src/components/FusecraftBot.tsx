"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { botReplies, brand } from "@/data/site";

type Msg = { role: "bot" | "user"; text: string };

const quickPrompts = [
  { label: "Approach", key: "approach" },
  { label: "What you make", key: "work" },
  { label: "Start a project", key: "contact" },
  { label: "Studio", key: "location" },
] as const;

function replyFor(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("fusion") || q.includes("method")) return botReplies.fusion;
  if (q.includes("approach") || q.includes("how") || q.includes("process"))
    return botReplies.approach;
  if (q.includes("work") || q.includes("furniture") || q.includes("facade") || q.includes("lighting") || q.includes("make"))
    return botReplies.work;
  if (q.includes("contact") || q.includes("email") || q.includes("project") || q.includes("start") || q.includes("inquire"))
    return botReplies.contact;
  if (q.includes("where") || q.includes("nagpur") || q.includes("location") || q.includes("studio"))
    return botReplies.location;
  return botReplies.default;
}

export function FusecraftBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "bot",
      text: `Welcome. I'm the Fusecrafts assistant — ask about our method, disciplines, or how to begin a project in ${brand.location}.`,
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function pushBot(keyOrText: string, isKey = false) {
    const text = isKey
      ? botReplies[keyOrText as keyof typeof botReplies] ?? botReplies.default
      : replyFor(keyOrText);
    setMessages((m) => [...m, { role: "bot", text }]);
  }

  function onQuick(key: string, label: string) {
    setMessages((m) => [...m, { role: "user", text: label }]);
    window.setTimeout(() => pushBot(key, true), 350);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    window.setTimeout(() => pushBot(text), 400);
  }

  return (
    <div className="fixed right-4 bottom-4 z-[60] md:right-6 md:bottom-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 flex h-[min(520px,70vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-line bg-cream shadow-[0_20px_60px_rgba(49,51,31,0.18)]"
          >
            <div className="flex items-center justify-between bg-moss px-4 py-3.5 text-sand">
              <div>
                <p className="font-display text-sm font-medium tracking-wide">
                  Fusecraft Bot
                </p>
                <p className="text-[0.65rem] text-almond/70">
                  Leads · studio info · next steps
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="nav-link text-sand/80 hover:text-sand"
                aria-label="Close chat"
              >
                Close
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-br-md bg-chestnut text-cream"
                        : "rounded-bl-md bg-sand text-ink"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <div className="flex flex-wrap gap-2 border-t border-line px-3 py-2.5">
              {quickPrompts.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => onQuick(p.key, p.label)}
                  className="rounded-full border border-line bg-sand px-3 py-1 text-[0.65rem] font-medium tracking-wide text-mocha uppercase transition hover:border-chestnut hover:text-chestnut"
                >
                  {p.label}
                </button>
              ))}
            </div>

            <form
              onSubmit={onSubmit}
              className="flex gap-2 border-t border-line bg-sand/60 px-3 py-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about fusion, work, contact…"
                className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-mocha/45"
              />
              <button type="submit" className="btn-primary !px-4 !py-2 text-[0.65rem]">
                Send
              </button>
            </form>

            <div className="border-t border-line px-4 py-2 text-center">
              <Link
                href="/contact"
                className="type-annotation text-[0.7rem] text-chestnut hover:underline"
              >
                Prefer email? Open contact →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label={open ? "Close Fusecraft Bot" : "Open Fusecraft Bot"}
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-chestnut text-cream shadow-[0_12px_32px_rgba(139,79,53,0.35)] transition hover:bg-chestnut-deep"
      >
        {open ? (
          <span className="text-lg leading-none">×</span>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v6a2.5 2.5 0 0 1-2.5 2.5H12l-4 4v-4H7.5A2.5 2.5 0 0 1 5 12.5v-6Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </motion.button>
    </div>
  );
}
