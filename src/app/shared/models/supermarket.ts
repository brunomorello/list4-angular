import { Country } from "./country";

export interface Supermarket {
    id: number;
    name: string | null;
    country: Country | null;
}
