import { Departure } from "./departure";

export interface DepartureData {
    stationName: string;
    expires: Date;
    departures: Departure[];
}
