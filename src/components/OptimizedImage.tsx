/* eslint-disable @next/next/no-img-element */
import type { CSSProperties, ImgHTMLAttributes } from "react";
import {
  getOptimizedImageUrl,
  type CloudinaryCrop,
  type CloudinaryGravity,
} from "@/lib/cloudinary";

type OptimizedImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "width" | "height"
> & {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  crop?: CloudinaryCrop;
  quality?: number | "auto";
  format?: "auto" | "webp" | "jpg" | "png";
  gravity?: CloudinaryGravity;
  priority?: boolean;
  grayscale?: boolean;
  blur?: boolean;
};

const FILL_STYLES: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: "100%",
  height: "100%",
};

/**
 * Cloudinary-native images — no next/image proxy.
 * Photos are already transformed on Cloudinary; sending them through
 * `/_next/image` would re-encode and add latency.
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  crop,
  quality = "auto",
  format = "auto",
  gravity = "auto",
  priority = false,
  grayscale = false,
  blur = false,
  className,
  loading,
  style,
  ...imgProps
}: OptimizedImageProps) {
  const trimmedSrc = src?.trim() ?? "";
  if (!trimmedSrc) return null;

  if (!fill && (!width || !height)) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "OptimizedImage: Either fill=true or both width and height must be provided",
      );
    }
    return null;
  }

  const effects: string[] = [];
  if (grayscale) effects.push("e_grayscale");
  if (blur) effects.push("e_blur:300");

  const optimizedSrc = getOptimizedImageUrl(
    trimmedSrc,
    width || 1600,
    height,
    { crop, quality, format, gravity, effects },
  );

  const fillStyles = fill ? FILL_STYLES : undefined;

  return (
    <img
      src={optimizedSrc}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={className}
      loading={priority ? "eager" : loading || "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      style={style ? { ...fillStyles, ...style } : fillStyles}
      {...imgProps}
    />
  );
}
