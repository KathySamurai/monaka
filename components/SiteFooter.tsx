import Link from "next/link";
import { GLOBAL_NAV } from "@/lib/nav";
import { Reveal } from "@/components/Reveal";
import { SiteLogo } from "@/components/SiteLogo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Reveal>
        <Link href="/" className="site-footer__logo" aria-label="もなか">
          <SiteLogo size="footer" />
        </Link>
        <nav className="site-footer__nav" aria-label="フッター">
          <Link href="/play/individual">個人の方へ</Link>
          <Link href="/play/business">企業の方へ</Link>
          {GLOBAL_NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="site-footer__tag">あそびが、ぼくらを連れ出す。</p>
      </Reveal>
    </footer>
  );
}
