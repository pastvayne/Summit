"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { faqs } from "@/lib/protocol";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-anchor border-t border-line">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="font-mono text-[11px] tracking-[0.22em] text-brass uppercase">05 / FAQ</p>
        <h2 className="mt-3 max-w-xl font-serif text-4xl tracking-tight text-paper sm:text-5xl">
          Common questions, answered plainly.
        </h2>
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {faqs.map((item, index) => {
            const expanded = open === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;
            return (
              <article key={item.question} className="border border-line bg-ink-2">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpen(expanded ? null : index)}
                  >
                    <span className="font-serif text-xl text-paper">{item.question}</span>
                    <ChevronDown
                      aria-hidden="true"
                      size={18}
                      className={`shrink-0 text-brass transition-transform ${expanded ? "rotate-180" : ""}`}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${
                    expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-6 text-paper-dim">{item.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
