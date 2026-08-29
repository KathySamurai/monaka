import { Reveal } from "@/components/Reveal";
import { asset } from "@/lib/asset";

export function PhotoBand() {
  return (
    <section className="photo-band">
      <div className="photo-band__media">
        <img
          src={asset("/images/top/band.jpg")}
          alt="絵を持って並ぶもなかの仲間たち"
          className="cover-photo cover-photo--band"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="photo-band__shade" aria-hidden="true" />
      <Reveal className="photo-band__reveal">
        <p className="photo-band__text">その人のまま、いていい。</p>
      </Reveal>
    </section>
  );
}
