"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { stages } from "@/lib/protocol";

export function Mechanism() {
  const reduced = useReducedMotion() === true;
  const [active, setActive] = useState(0);
  const stage = stages[active];

  return (
    <section id="mechanism" className="section-anchor">
      <div className="mx-auto max-w-6xl px-5 pt-10 pb-20 sm:px-8 sm:pt-14 sm:pb-28">
        <p className="text-xs font-medium tracking-[0.16em] text-brass uppercase">How it works</p>
        <div className="mt-3 max-w-2xl">
          <h2 className="font-serif text-4xl text-paper sm:text-5xl">Five turns of the same wheel.</h2>
          <p className="mt-4 text-base leading-7 text-paper-dim">
            Trading fees move through five stations, from collection to buyback.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <ol className="border-t border-line" aria-label="PaperMill stations">
            {stages.map((item, index) => {
              const selected = index === active;
              return (
                <li key={item.id} className="border-b border-line">
                  <button
                    type="button"
                    className="flex w-full items-start gap-5 py-5 text-left"
                    aria-expanded={selected}
                    onClick={() => setActive(index)}
                  >
                    <span className={`mt-1 font-mono text-xs ${selected ? "text-paper" : "text-muted"}`}>
                      {item.index}
                    </span>
                    <span>
                      <span className="block text-xl tracking-[-0.03em] text-paper">{item.title}</span>
                      <span className="mt-1 block text-sm leading-6 text-paper-dim">{item.summary}</span>
                    </span>
                  </button>
                  <div className={`grid lg:hidden ${selected ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="pb-5 pl-10 text-sm leading-6 text-paper-dim">{item.body}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.article
                key={stage.id}
                id={`stage-panel-${stage.id}`}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: reduced ? 0 : 0.28 }}
                className="panel sticky top-28 p-8"
              >
                <p className="font-mono text-xs text-muted">{stage.index}</p>
                <h3 className="mt-3 font-serif text-4xl text-paper">{stage.title}</h3>
                <p className="mt-3 text-lg text-paper">{stage.summary}</p>
                <p className="mt-5 text-base leading-7 text-paper-dim">{stage.body}</p>
                <p className="mt-5 border-t border-line pt-4 text-sm leading-6 text-muted">{stage.check}</p>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
