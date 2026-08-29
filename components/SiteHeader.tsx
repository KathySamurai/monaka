import Link from "next/link";
import { GLOBAL_NAV } from "@/lib/nav";
import { SiteLogo } from "@/components/SiteLogo";

export function SiteHeader({ variant }: { variant: "hero" | "inner" }) {
  const isHero = variant === "hero";

  return (
    <header className={isHero ? "site-header site-header--hero" : "site-header site-header--inner"}>
      <Link href="/" className="site-header__logo" aria-label="もなか">
        <SiteLogo size="header" />
      </Link>
      <nav className="site-header__nav" aria-label="グローバル">
        {GLOBAL_NAV.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
