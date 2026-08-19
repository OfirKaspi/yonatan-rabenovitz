const CLOUD_NAME = "dudwjf2pu";

export const CLOUDINARY_IMAGE_BASE =
  `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;
export const CLOUDINARY_VIDEO_BASE =
  `https://res.cloudinary.com/${CLOUD_NAME}/video/upload`;

function isVersionSegment(segment: string): boolean {
  return /^v\d+$/.test(segment);
}

/** Cloudinary transform tokens use underscores and/or commas (e.g. w_800,c_fill). */
function isTransformSegment(segment: string): boolean {
  return segment.includes("_") || segment.includes(",");
}

function stripExtension(path: string): string {
  const lastSlash = path.lastIndexOf("/");
  const file = lastSlash >= 0 ? path.slice(lastSlash + 1) : path;
  if (!file.includes(".")) return path;
  return path.slice(0, path.length - file.split(".").pop()!.length - 1);
}

export function extractCloudinaryPublicId(url: string): string | null {
  if (!url.includes("cloudinary.com")) return null;

  const uploadMarker = "/upload/";
  const uploadIndex = url.indexOf(uploadMarker);
  if (uploadIndex === -1) return null;

  const segments = url.slice(uploadIndex + uploadMarker.length).split("/");
  while (segments.length > 0) {
    const segment = segments[0]!;
    if (isVersionSegment(segment) || isTransformSegment(segment)) {
      segments.shift();
      continue;
    }
    break;
  }

  if (segments.length === 0) return null;
  return stripExtension(segments.join("/"));
}

export function cloudinaryResourceType(
  url: string,
): "image" | "video" | "raw" {
  if (url.includes("/video/upload/")) return "video";
  if (url.includes("/raw/upload/")) return "raw";
  return "image";
}

/** True when src is already a Cloudinary delivery URL with transform segments applied. */
export function cloudinaryUrlHasTransforms(url: string): boolean {
  const uploadMarker = "/upload/";
  const uploadIndex = url.indexOf(uploadMarker);
  if (uploadIndex === -1) return false;
  const first = url.slice(uploadIndex + uploadMarker.length).split("/")[0] ?? "";
  return isTransformSegment(first);
}

export function buildCloudinaryDeliveryUrl(
  src: string,
  transformations: string[],
): string | null {
  const publicId = extractCloudinaryPublicId(src);
  if (!publicId) return null;
  const type = cloudinaryResourceType(src);
  return `https://res.cloudinary.com/${CLOUD_NAME}/${type}/upload/${transformations.join(",")}/${publicId}`;
}

/** Insert Cloudinary transforms without stacking them on an already-transformed URL. */
export function cld(transform: string, url: string): string {
  if (!url.includes("/upload/")) return url;
  if (cloudinaryUrlHasTransforms(url)) return url;
  return url.replace("/upload/", `/upload/${transform}/`);
}

export type CloudinaryCrop = "fill" | "fit" | "scale" | "crop" | "thumb" | "limit";
export type CloudinaryGravity =
  | "auto"
  | "center"
  | "face"
  | "north"
  | "south"
  | "east"
  | "west";

export function getOptimizedImageUrl(
  src: string,
  width: number,
  height?: number,
  options: {
    crop?: CloudinaryCrop;
    quality?: number | "auto";
    format?: "auto" | "webp" | "jpg" | "png";
    gravity?: CloudinaryGravity;
    effects?: string[];
  } = {},
): string {
  if (!src.includes("cloudinary.com")) return src;
  if (cloudinaryUrlHasTransforms(src)) return src;

  const {
    crop = height ? "fill" : "limit",
    quality = "auto",
    format = "auto",
    gravity = "auto",
    effects = [],
  } = options;

  const transformations = [
    `w_${width}`,
    ...(height ? [`h_${height}`] : []),
    `c_${crop}`,
    `f_${format}`,
    `q_${quality}`,
    ...(crop === "fill" || crop === "crop" || crop === "thumb"
      ? [`g_${gravity}`]
      : []),
    ...effects,
    "fl_progressive",
    "fl_immutable_cache",
  ];

  return buildCloudinaryDeliveryUrl(src, transformations) ?? src;
}
