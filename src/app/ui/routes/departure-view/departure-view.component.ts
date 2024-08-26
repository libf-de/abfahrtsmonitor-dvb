import { Component } from '@angular/core';
import { DepartureData } from '../../../data/models/departure-data';
import { Datasource } from '../../../data/sources/datasource';
import { DepartureCardComponent } from "../../components/departure-card/departure-card.component";
import { TimeFooterComponent } from "../../components/time-footer/time-footer.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-departure-view',
  standalone: true,
  imports: [DepartureCardComponent, TimeFooterComponent, NgFor, RouterLink],
  templateUrl: './departure-view.component.html',
  styleUrl: './departure-view.component.scss'
})
export class DepartureViewComponent {
  dataSource: Datasource;

  data?: DepartureData;

  compatMode: boolean = false;

  private intervalObject?: any;
  private paramSub?: any;
  private elem?: any;
  private stationId?: string;

  constructor(dataSource: Datasource, private route: ActivatedRoute) {
    this.dataSource = dataSource;

    const compatModeSaved = localStorage.getItem('compatMode');
    if(compatModeSaved != null && compatModeSaved != undefined) {
      this.compatMode = compatModeSaved === 'true';
    }
  }

  async ngOnInit() {
    this.paramSub = this.route.params.subscribe(async params => {
      this.stationId = params['id'];

      await this.fetchDepartures();

      if(this.intervalObject == undefined) 
        this.intervalObject = setInterval(async () => await this.fetchDepartures() , 60000);
    });

    this.elem = document.documentElement;
  }

  ngOnDestroy() {
    if(this.intervalObject != undefined)
      clearInterval(this.intervalObject);
  }

  private async fetchDepartures() {
    this.data = await this.dataSource.getDeparturesForStationId(this.stationId || "33000312");
  }

  async openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }

    try {
      navigator.wakeLock.request("screen");
    } catch (e) {
      console.error(e);
    }
  }
}
