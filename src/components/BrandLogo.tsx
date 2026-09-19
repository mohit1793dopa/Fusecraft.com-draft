import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Tone = "dark" | "light";
type Variant = "wordmark" | "icon" | "stamp";

const sources: Record<Variant, Record<Tone, string>> = {
  wordmark: {
    dark: "/logos/wordmark-black.svg",
    light: "/logos/wordmark-inverted.svg",
  },
  icon: {
    dark: "/logos/icon-black.svg",
    light: "/logos/icon-inverted.svg",
  },
  stamp: {
    dark: "/logos/stamp-black.svg",
    light: "/logos/stamp-inverted.svg",
  },
};

const sizes: Record<Variant, { width: number; height: number; className: string }> = {
  wordmark: {
    width: 180,
    height: 62,
    className: "h-8 w-auto md:h-9",
  },
  icon: {
    width: 40,
    height: 44,
    className: "h-8 w-auto md:h-9",
  },
  stamp: {
    width: 120,
    height: 120,
    className: "h-16 w-16 md:h-20 md:w-20",
  },
};

type BrandLogoProps = {
  tone?: Tone;
  variant?: Variant;
  href?: string | null;
  className?: string;
  priority?: boolean;
};

export function BrandLogo({
  tone = "dark",
  variant = "wordmark",
  href = "/",
  className,
  priority,
}: BrandLogoProps) {
  const size = sizes[variant];
  const image = (
    <Image
      src={sources[variant][tone]}
      alt="Fusecrafts"
      width={size.width}
      height={size.height}
      priority={priority}
      unoptimized
      className={cn(size.className, "object-contain object-left transition-opacity duration-300 group-hover:opacity-80", className)}
    />
  );

  if (href === null) return image;

  return (
    <Link href={href} className="group inline-flex items-center" aria-label="Fusecrafts home">
      {image}
    </Link>
  );
}
