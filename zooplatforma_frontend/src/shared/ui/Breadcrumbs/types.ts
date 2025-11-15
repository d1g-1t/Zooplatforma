export interface Crumb {
  label: string;
  path: string;
}

export interface BreadcrumbsProps {
  crumbs: Crumb[];
}
