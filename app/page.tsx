import Link from "next/link";
import { OmoiModal } from "@/components/OmoiModal";
import { PhotoBand } from "@/components/PhotoBand";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SnapshotsGrid } from "@/components/SnapshotsGrid";
import { asset } from "@/lib/asset";
import { getSnapshotPhotos } from "@/lib/get-snapshot-photos";

export default async function HomePage() {
  const snapshotPhotos = await getSnapshotPhotos();
  return (
    <>
      <a className="skip-link" href="#branch">
        本文へスキップ
      </a>

      <section className="hero">
        <div className="hero__media">
          <img
            src={asset("/images/top/hero.jpg")}
            alt="もなかの仲間たち"
            className="cover-photo cover-photo--hero"
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div className="hero__shade" aria-hidden="true" />
        <SiteHeader variant="hero" />
        <h1 className="hero-catch">
          <span>あそびが、</span>
          <span>ぼくらを</span>
          <span>連れ出す。</span>
        </h1>
        <div className="hero-scroll" aria-hidden="true">
          <span />
        </div>
      </section>

      <section className="quiet-word">
        <Reveal>
          <div className="quiet-word__inner">
            <p className="quiet-word__text">
              あそびが先。
              <br />
              いみは、あとから。
            </p>
            <OmoiModal />
          </div>
        </Reveal>
      </section>

      <PhotoBand />

      <section className="snapshots">
        <Reveal>
          <div className="snapshots__intro">
            <h2 className="snapshots__heading">
              人は、もともと、
              <br />
              おもしろい。
            </h2>
            <p className="snapshots__sub">もなか ＝ あなたもなかま</p>
          </div>
        </Reveal>
        <Reveal>
          <SnapshotsGrid photos={snapshotPhotos} />
          <a
            className="snapshots__ig"
            href="https://www.instagram.com/asobimonaca/"
            target="_blank"
            rel="noreferrer"
          >
            @asobimonaca
          </a>
        </Reveal>
      </section>

      <section id="branch" className="branch">
        <Reveal>
          <div className="branch__inner">
            <Link href="/play/individual" className="branch-card branch-card--individual">
              <span className="branch-card__paint" aria-hidden="true" />
              <div className="branch-card__label">
                <div className="branch-card__en">FOR INDIVIDUALS</div>
                <div className="branch-card__ja">個人の方へ</div>
              </div>
            </Link>
            <Link href="/play/business" className="branch-card branch-card--business">
              <span className="branch-card__paint" aria-hidden="true" />
              <div className="branch-card__label">
                <div className="branch-card__en">FOR ORGANIZATIONS</div>
                <div className="branch-card__ja">企業の方へ</div>
              </div>
            </Link>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </>
  );
}
