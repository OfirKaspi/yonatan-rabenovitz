export function cld(transform: string, url: string): string {
  return url.replace("/image/upload/", `/image/upload/${transform}/`);
}

export type GalleryImageItem = { type: "image"; src: string; alt?: string };

export type GalleryVideoItem = {
  type: "video";
  src: string;
  poster: string;
  alt?: string;
};

export type GalleryItem = GalleryImageItem | GalleryVideoItem;
