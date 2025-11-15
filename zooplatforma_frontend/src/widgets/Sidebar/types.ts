export type Favorite = {
  name: string;
  url: string;
};

export type SidebarProps = {
  favoritesCount: number;
  favorites: Favorite[];
};
