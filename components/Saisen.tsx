"use client";

import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SAISEN_AMOUNTS, SAISEN_DEFAULT_ID, type SaisenAmountId } from "@/lib/saisen";

export function Saisen({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;
  const [selectedId, setSelectedId] = useState<SaisenAmountId>(SAISEN_DEFAULT_ID);
  const selected = SAISEN_AMOUNTS.find((amount) => amount.id === selectedId) ?? SAISEN_AMOUNTS[1];

  return (
    <section id="saisen" className="saisen">
      <Reveal className="saisen__inner">
        <p className="saisen__label">あそび賽銭 &nbsp;/&nbsp; SAISEN</p>
        <Heading className="saisen__heading">
          つづいてほしい、を、
          <br />
          そっとかたちに。
        </Heading>
        <p className="saisen__lead">
          だれかの「もっとあそびたい」が、誰かの「あしたもあそべる」になる。
        </p>
        <p className="saisen__lead">
          これは寄付でも、クラウドファンディングでもありません。
          <br />
          見返りを求めるものでも、ありません。
        </p>
        <p className="saisen__lead">
          「このあそび、つづいてほしい」。
          <br />
          「自分ではできないけれど、ありがとう」。
          <br />
          そんな気持ちを、そっと、かたちにするだけ。
        </p>

        <div className="saisen-card">
          <p className="saisen-card__hint">気持ちのぶんだけ、えらんでみて。</p>
          <div className="saisen-grid" role="radiogroup" aria-label="気持ちの金額">
            {SAISEN_AMOUNTS.map((amount) => {
              const selectedNow = amount.id === selectedId;
              return (
                <button
                  key={amount.id}
                  type="button"
                  role="radio"
                  aria-checked={selectedNow}
                  className={selectedNow ? "saisen-option is-selected" : "saisen-option"}
                  onClick={() => setSelectedId(amount.id)}
                >
                  <div className="saisen-option__label">{amount.label}</div>
                  <div className="saisen-option__note">{amount.note}</div>
                </button>
              );
            })}
          </div>
          <div className="saisen-selected">
            <div className="saisen-selected__text">
              えらんだ気持ち：
              <span className="saisen-selected__value">{selected.label}</span>
            </div>
            <Link
              className="saisen-submit"
              href={`/contact?from=saisen&amount=${selected.id}`}
            >
              これで参加する
            </Link>
          </div>
          <p className="saisen-card__note">
            ※ 月々ちょっとずつも、ボーナスでドンとも。金額はあくまで&quot;気持ちの目安&quot;です。代わりに何かをお願いしたい、もOK。
          </p>
        </div>
      </Reveal>
    </section>
  );
}
