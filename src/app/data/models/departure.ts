import { Vehicle } from "./vehicle";

export interface Departure {
    id: string;
    vehicle: Vehicle;
    line: string;
    direction: string;
    departureTime: Date;
    scheduledDeparture: Date;
    delayed: boolean;
    platform?: string;
}
