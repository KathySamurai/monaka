import { asset } from "@/lib/asset";

export function PhotoBand() {
  return (
    <section className="photo-band">
      <div className="photo-band__media">
        <img
          src={asset("/images/top/band.png")}
          alt="絵を持って並ぶもなかの仲間たち"
          className="cover-photo cover-photo--band"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
}
