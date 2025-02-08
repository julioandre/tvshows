export interface MenuItem {
  id: string | number;
  label: string;
  icon?: string;
  route?: string;
  children?: MenuItem[];
}
