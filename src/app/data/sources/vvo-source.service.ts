import { Injectable } from '@angular/core';
import { Datasource } from './datasource';
import { DepartureData } from '../models/departure-data';
import { Vehicle } from '../models/vehicle';
import { Stop } from '../models/stop';

@Injectable({
  providedIn: 'root'
})
export class VvoSourceService extends Datasource {
  constructor() {
    super();
  }

  override searchStops(query: string): Promise<Stop[]> {
    return fetch('https://webapi.vvo-online.de/tr/pointfinder', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: query, limit: 15, regionalOnly: true, stopsOnly: true }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.Status.Code != "Ok") throw new Error("API returned an error: " + data.Status.Code);

        return data.Points
        .map((point: string) => point.split("|"))
        //.filter((point: string) => !isNaN(+point[0]))
        .filter((point: string[]) => point[2].length == 0)
        .map((point: string) => {
          //0 = ID, 1=null 2=(city), 3=Name
          return {
            id: point[0],
            name: point[3]
          }
        });
      });
  }

  override _getDeparturesForStationId(stationId: string): Promise<DepartureData> {
    return fetch(`https://webapi.vvo-online.de/dm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stopid: stationId, limit: 15 }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.Status.Code != "Ok") throw new Error("API returned an error: " + data.Status.Code);
        return {
          stationName: data.Name,
          expires: this.convertDateString(data.ExpirationTime)!,
          departures: data.Departures.map((departure: any) => {
            return {
              id: departure.Id,
              vehicle: this.mapVehicleType(departure.Mot),
              line: departure.LineName,
              direction: departure.Direction,
              departureTime: this.convertDateString(departure.RealTime)!,
              scheduledDeparture: this.convertDateString(departure.ScheduledTime)!,
              delayed: departure.State == "Delayed",
              platform: departure.Platform?.Name
            }
          })
        };
      });
  }



  private convertDateString(dateString?: string): Date | undefined {
    if (!dateString) return undefined;

    const regex = /\/Date\((\d+)([+-]\d{4})?\)\//;
    const match = dateString.match(regex);

    if (match) {
      const timestamp = parseInt(match[1], 10);
      const timezoneOffset = match[2] ? match[2] : '+0000'; // Default to UTC if no offset

      // Create a Date object using the timestamp
      const date = new Date(timestamp);

      // Adjust the date based on timezone offset
      //const offsetHours = parseInt(timezoneOffset.slice(0, 3), 10);
      //const offsetMinutes = parseInt(timezoneOffset.slice(0, 3), 10) * 60 + parseInt(timezoneOffset.slice(3, 5), 10);
      //date.setHours(date.getHours() + offsetHours);
      //date.setMinutes(date.getMinutes() - offsetMinutes);

      return date;
    }

    return undefined; // Return null if the string format is incorrect
  }

  private mapVehicleType(type: string): Vehicle {
    switch (type.toLocaleLowerCase()) {
      case "tram":
        return Vehicle.TRAM;
      case "citybus":
        return Vehicle.BUS;
      case "intercitybus":
        return Vehicle.PLUSBUS;
      case "suburbanrailway":
        return Vehicle.METRO;
      case "hailedsharedtaxi":
        return Vehicle.ALITA;
      case "train":
        return Vehicle.TRAIN;
      case "cableway":
        return Vehicle.LIFT;
      case "ferry":
        return Vehicle.FERRY;
      default:
        return Vehicle.UNKNOWN;
    }
  }

  getImageUrlForVehicleType(vehicle: Vehicle): string {
    switch (vehicle) {
      case Vehicle.ALITA: return "assets/img/alita.svg";
      case Vehicle.BUS: return "assets/img/bus.svg";
      case Vehicle.FERRY: return "assets/img/ferry.svg";
      case Vehicle.LIFT: return "assets/img/lift.svg";
      case Vehicle.METRO: return "assets/img/metropolitan.svg";
      case Vehicle.TRAM: return "assets/img/tram.svg";
      case Vehicle.TRAIN: return "assets/img/train.svg";
      case Vehicle.PLUSBUS: return "assets/img/plusbus.svg";
      default: return "";
    }
  }
}
