import { Location } from "./location";
import { WeightCategory } from "./weight-category";

export class Contestant {
    id: number;
    name: string;
    lastName: string;
    age: number;
    location: Location;
    jmbg: number;
    weightCategory: WeightCategory;
}