"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { asset } from "@/lib/asset";
import { OMOI_LEAD, OMOI_SECTIONS, OMOI_TITLE } from "@/lib/omoi";

export function OmoiModal() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="quiet-word__open"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        もなかの想い
      </button>
      {open
        ? createPortal(
            <div
              className="omoi"
              role="dialog"
              aria-modal="true"
              aria-labelledby="omoi-title"
            >
              <div className="omoi__bar" aria-hidden="true" />
              <img
                className="omoi__bloom"
                src={asset("/logo/mark.png")}
                alt=""
                width={548}
                height={442}
              />
              <button
                ref={closeRef}
                type="button"
                className="omoi__close"
                onClick={() => setOpen(false)}
              >
                閉じる
              </button>
              <div className="omoi__inner">
                <header className="omoi__head">
                  <img
                    className="omoi__flower"
                    src={asset("/logo/mark.png")}
                    alt=""
                    width={548}
                    height={442}
                  />
                  <p className="omoi__kicker">THOUGHTS</p>
                  <h2 id="omoi-title" className="omoi__title">
                    {OMOI_TITLE}
                  </h2>
                </header>
                <div className="omoi__lead">
                  {OMOI_LEAD.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
                {OMOI_SECTIONS.map((section) => (
                  <section key={section.heading} className="omoi__section">
                    <h3 className="omoi__heading">{section.heading}</h3>
                    {section.blocks.map((block, index) => (
                      <p key={`${section.heading}-${index}`}>
                        {block.map((line, lineIndex) => (
                          <span key={line}>
                            {lineIndex > 0 ? <br /> : null}
                            {line}
                          </span>
                        ))}
                      </p>
                    ))}
                  </section>
                ))}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
