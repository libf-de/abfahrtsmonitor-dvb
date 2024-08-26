import { Component, HostBinding } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { Datasource } from './data/sources/datasource';
import { DepartureData } from './data/models/departure-data';
import { NgFor, NgIf } from '@angular/common';
import { DepartureCardComponent } from "./ui/components/departure-card/departure-card.component";
import { TimeFooterComponent } from "./ui/components/time-footer/time-footer.component";
import { VvoSourceService } from './data/sources/vvo-source.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NgIf, DepartureCardComponent, TimeFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [{ provide: Datasource, useClass: VvoSourceService }]
})
export class AppComponent {
  title = 'dvb-monitor-angular';

  @HostBinding('style.--headline-size') headlineSize = '60px';
  @HostBinding('style.--departure-size') departureSize = '32px';
  @HostBinding('style.--footer-size') footerSize = '30px';
  @HostBinding('style.--sidebar-size') sidebarSize = '1rem';

  constructor(router: Router) {
    router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        console.log('NavigationStart', event);
        this.loadSettings();
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });
  }

  ngOnInit() {
    this.loadSettings();
  }

  loadSettings() {
    const savedSettings = localStorage.getItem('styleSettings');
    if(savedSettings != null && savedSettings != undefined) {
      const styleSettings = JSON.parse(savedSettings);
      this.headlineSize = (styleSettings.headerSize || 60) + 'px';
      this.departureSize = (styleSettings.departureSize || 32) + 'px';
      this.footerSize = (styleSettings.footerSize || 30) + 'px';
      this.sidebarSize = (styleSettings.sidebarSize || 1) + 'rem';
    }
  }
}
