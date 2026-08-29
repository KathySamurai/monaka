type WirePhotoShape = "rect" | "arch" | "blob" | "bleed";

type WirePhotoProps = {
  label: string;
  ratio?: `${number}/${number}`;
  fill?: boolean;
  shape?: WirePhotoShape;
  compact?: boolean;
};

export function WirePhoto({
  label,
  ratio = "4/3",
  fill = false,
  shape = "rect",
  compact = false,
}: WirePhotoProps) {
  const className = [
    "wire-photo",
    fill ? "wire-photo--fill" : "",
    `wire-photo--${shape}`,
    compact ? "wire-photo--compact" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={className}
      role="img"
      aria-label={label}
      style={fill ? undefined : { aspectRatio: ratio }}
    >
      <svg className="wire-photo__x" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" y1="0" x2="100" y2="100" vectorEffect="non-scaling-stroke" />
        <line x1="100" y1="0" x2="0" y2="100" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="wire-photo__label">{label}</div>
    </div>
  );
}
