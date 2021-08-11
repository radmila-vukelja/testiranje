import { Location } from "./location";
import { Category } from "./category";

export class Contestant {
    id: number;
    name: string;
    lastName: string;
    age: number;
    location: Location;
    jmbg: number;
    weightCategory: Category;
}