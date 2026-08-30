import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Saisen } from "@/components/Saisen";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SnapshotsGrid } from "@/components/SnapshotsGrid";
import { asset } from "@/lib/asset";
import { getSnapshotPhotos } from "@/lib/get-snapshot-photos";
import {
  INDIVIDUAL,
  INDIVIDUAL_CTA,
  INDIVIDUAL_FOR_YOU,
  INDIVIDUAL_INTRO,
  INDIVIDUAL_MESSAGE,
  INDIVIDUAL_PROGRAMS,
  INDIVIDUAL_WHY,
} from "@/lib/individual";

export const metadata: Metadata = {
  title: "個人の方へ | もなか",
  description: "あそぶ。ただ、あそんでみる。そこから、すべてがはじまる。",
};

export default async function AsobuPage() {
  const snapshotPhotos = (await getSnapshotPhotos()).slice(0, 8);

  return (
    <div className="individual-page">
      <SiteHeader variant="inner" />
      <main>
        <section className="individual-hero">
          <img
            src={asset(INDIVIDUAL.heroSrc)}
            alt={INDIVIDUAL.heroAlt}
            className="individual-hero__photo"
          />
          <div className="individual-hero__copy">
            <p className="individual-hero__eyebrow">{INDIVIDUAL.eyebrow}</p>
            <h1 className="individual-hero__title">
              <span className="individual-hero__play">
                {INDIVIDUAL.titleLead}
                <svg
                  className="individual-hero__underline"
                  viewBox="0 0 120 12"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8 Q 20 2, 40 7 T 78 7 T 118 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              {INDIVIDUAL.titleRest}
            </h1>
            <p className="individual-hero__sub">{INDIVIDUAL.sub}</p>
            <div className="individual-hero__scroll" aria-hidden="true">
              <span>SCROLL</span>
              <i />
            </div>
          </div>
        </section>

        <section className="individual-intro">
          <Reveal>
            <p className="individual-intro__soft">
              {INDIVIDUAL_INTRO.soft.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
            <p className="individual-intro__body">
              {INDIVIDUAL_INTRO.body.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </Reveal>
        </section>

        <section className="individual-feed">
          <Reveal>
            <div className="individual-feed__bar">
              <p className="individual-kicker">SNAPSHOTS &nbsp;/&nbsp; @asobimonaca</p>
              <a
                className="individual-feed__ig"
                href="https://www.instagram.com/asobimonaca/"
                target="_blank"
                rel="noreferrer"
              >
                Instagramで見る →
              </a>
            </div>
            <SnapshotsGrid photos={snapshotPhotos} />
          </Reveal>
        </section>

        <section className="individual-why">
          <Reveal>
            <p className="individual-kicker">{INDIVIDUAL_WHY.kicker}</p>
            <h2 className="individual-heading">
              {INDIVIDUAL_WHY.heading[0]}
              <br />
              {INDIVIDUAL_WHY.heading[1]}
            </h2>
            {INDIVIDUAL_WHY.paragraphs.map((lines) => (
              <p key={lines[0]} className="individual-prose">
                {lines.map((line, index) => (
                  <span key={line}>
                    {index > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </p>
            ))}
          </Reveal>
        </section>

        <section className="individual-programs" id="programs">
          <div className="individual-programs__inner">
            <Reveal>
              <div className="individual-programs__head">
                <p className="individual-kicker">{INDIVIDUAL_PROGRAMS.kicker}</p>
                <h2 className="individual-heading">{INDIVIDUAL_PROGRAMS.heading}</h2>
                <p className="individual-programs__lead">{INDIVIDUAL_PROGRAMS.lead}</p>
              </div>
            </Reveal>
            <div className="individual-programs__list">
              {INDIVIDUAL_PROGRAMS.items.map((item, index) => (
                <Reveal key={item.no}>
                  <article
                    className={
                      index % 2 === 1
                        ? "individual-program individual-program--flip"
                        : "individual-program"
                    }
                  >
                    <img
                      src={asset(item.photo)}
                      alt={item.photoAlt}
                      className={
                        item.shape === "blob"
                          ? "individual-program__photo individual-program__photo--blob"
                          : "individual-program__photo"
                      }
                    />
                    <div className="individual-program__body">
                      <p className="individual-program__no">{item.no}</p>
                      <h3 className="individual-program__title">{item.title}</h3>
                      <p className="individual-program__lead">{item.lead}</p>
                      {item.body.map((paragraph) => (
                        <p key={paragraph} className="individual-prose">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="individual-foryou" id="foryou">
          <Reveal>
            <div className="individual-foryou__grid">
              <div>
                <p className="individual-kicker">{INDIVIDUAL_FOR_YOU.kicker}</p>
                <h2 className="individual-heading">
                  {INDIVIDUAL_FOR_YOU.heading[0]}
                  <br />
                  {INDIVIDUAL_FOR_YOU.heading[1]}
                </h2>
                <img
                  src={asset(INDIVIDUAL_FOR_YOU.photo)}
                  alt={INDIVIDUAL_FOR_YOU.photoAlt}
                  className="individual-foryou__photo"
                />
              </div>
              <div>
                <ul className="individual-checks">
                  {INDIVIDUAL_FOR_YOU.checks.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="individual-and">
                  <p>{INDIVIDUAL_FOR_YOU.andThen}</p>
                  {INDIVIDUAL_FOR_YOU.extras.map((extra) => (
                    <p key={extra.text}>
                      {extra.text}
                      <span>（{extra.note}）</span>
                    </p>
                  ))}
                  <p className="individual-and__close">
                    {INDIVIDUAL_FOR_YOU.close[0]}
                    <br />
                    {INDIVIDUAL_FOR_YOU.close[1]}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="individual-message">
          <Reveal>
            <p className="individual-kicker">{INDIVIDUAL_MESSAGE.kicker}</p>
            <h2 className="individual-heading">
              {INDIVIDUAL_MESSAGE.heading[0]}
              <br />
              {INDIVIDUAL_MESSAGE.heading[1]}
            </h2>
            <p className="individual-prose">
              {INDIVIDUAL_MESSAGE.body.map((line, index) => (
                <span key={line}>
                  {index > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </p>
            <p className="individual-message__close">{INDIVIDUAL_MESSAGE.close}</p>
          </Reveal>
        </section>

        <Saisen />

        <section className="individual-cta" id="cta">
          <Reveal>
            <h2 className="individual-heading individual-heading--cta">
              {INDIVIDUAL_CTA.heading}
            </h2>
            <p className="individual-cta__lead">{INDIVIDUAL_CTA.lead}</p>
            <div className="individual-cta__grid">
              {INDIVIDUAL_CTA.items.map((item) => (
                <Link key={item.href} href={item.href} className="individual-cta__card">
                  <span className="individual-cta__title">{item.title}</span>
                  <span className="individual-cta__sub">{item.sub}</span>
                </Link>
              ))}
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
