import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Reveal } from "@/components/Reveal";

export function ComingSoon({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="coming-soon">
      <SiteHeader variant="inner" />
      <main className="coming-soon__body">
        <Reveal>
          <p className="coming-soon__kicker">{kicker}</p>
          <h1 className="coming-soon__title">{title}</h1>
          <p className="coming-soon__note">このページは、これから整えていきます。</p>
        </Reveal>
      </main>
      <SiteFooter />
    </div>
  );
}
