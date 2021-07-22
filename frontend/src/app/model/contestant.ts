import { Category } from "./category";
import { Location } from "./location";

export class Contestant {
    id: number;
    name: string;
    lastName: string;
    age: number;
    location: Location;
    jmbg: number;
    category: Category;
}