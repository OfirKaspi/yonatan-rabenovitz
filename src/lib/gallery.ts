export { cld } from "@/lib/cloudinary";

export type GalleryImageItem = { type: "image"; src: string; alt?: string };

export type GalleryVideoItem = {
  type: "video";
  src: string;
  poster: string;
  alt?: string;
};

export type GalleryItem = GalleryImageItem | GalleryVideoItem;
