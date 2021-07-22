import { Contestant } from "./contestant";
import { Location } from "./location";

export class Club {
    id: number;
    name: string;
    location: Location;
    pictureURL: string;
    contenstantList: Contestant[];
}