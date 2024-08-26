import { Departure } from "../models/departure";
import { DepartureData } from "../models/departure-data";
import { Stop } from "../models/stop";
import { Vehicle } from "../models/vehicle";

export abstract class Datasource {
    cachedResponse?: DepartureData;

    abstract _getDeparturesForStationId(stationId: string): Promise<DepartureData>;
    abstract getImageUrlForVehicleType(vehicle: Vehicle): string;
    abstract searchStops(query: string): Promise<Stop[]>;

    getDeparturesForStationId(stationId: string): Promise<DepartureData> {
        if (this.cachedResponse && this.cachedResponse.expires <= new Date()) 
            return Promise.resolve(this.cachedResponse);
        
        return this._getDeparturesForStationId(stationId).then(response => {
            this.cachedResponse = response;
            return response;
        });
    }

    getTimeDeparture(dep: Departure): string {
        const date = dep.departureTime != undefined ? dep.departureTime : dep.scheduledDeparture;

        //get difference from now till departure
        const diff = date.getTime() - new Date().getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        if(minutes < 1) return '';

        return minutes.toString();

        // if(hours > 0)
        //     return `${hours}:${remainingMinutes}`;
        // return `${remainingMinutes}`;
    }
}