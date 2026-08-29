import { asset } from "@/lib/asset";

type SiteLogoProps = {
  size?: "header" | "footer";
};

export function SiteLogo({ size = "header" }: SiteLogoProps) {
  return (
    <span className={`site-logo site-logo--${size}`}>
      <img
        src={asset("/logo/mark.png")}
        alt=""
        width={548}
        height={442}
        className="site-logo__mark"
        decoding="async"
      />
      <img
        src={asset("/logo/wordmark.png")}
        alt="もなか"
        width={940}
        height={297}
        className="site-logo__word"
        decoding="async"
      />
    </span>
  );
}
