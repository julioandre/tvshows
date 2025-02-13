import type { Country } from "./country";

export interface Network {
  id: number;
  name: string;
  country: Country;
  officialSite: string;
}
