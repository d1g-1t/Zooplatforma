export type GalleryProps = {
  title: string;
  link: string;
  cardsPerColumn?: 4 | 3;
  rowsCount?: number;
  children: React.ReactNode;
  linkText: string;
};
