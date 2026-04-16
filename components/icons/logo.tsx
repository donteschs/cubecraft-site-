import clsx from "clsx";

export default function LogoIcon({
  className,
  size = "md",
  ...props
}: React.ComponentProps<"svg"> & { size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: 28, md: 36, lg: 48 };
  const px = sizes[size];

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="CubeCraft"
      className={clsx("flex-shrink-0", className)}
      {...props}
    >
      {/* Left face */}
      <polygon points="4,24 24,36 24,48 4,36" fill="#388E3C" />
      {/* Right face */}
      <polygon points="24,36 44,24 44,36 24,48" fill="#2E7D32" />
      {/* Top face */}
      <polygon points="4,24 24,12 44,24 24,36" fill="#4CAF50" />
      {/* Top-right mini cube */}
      <polygon points="32,4 44,10 44,18 32,12" fill="#66BB6A" opacity="0.9" />
      <polygon points="32,4 20,10 20,18 32,12" fill="#4CAF50" opacity="0.85" />
      <polygon points="20,10 32,4 44,10 32,16" fill="#81C784" opacity="0.95" />
    </svg>
  );
}
