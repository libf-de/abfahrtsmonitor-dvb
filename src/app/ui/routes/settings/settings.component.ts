import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  headerSize: number = 60;
  departureSize: number = 32;
  footerSize: number = 30;
  sidebarSize: number = 1;
  compatMode: boolean = false;

  ngOnInit() {
    const savedSettings = localStorage.getItem('styleSettings');
    if(savedSettings != null && savedSettings != undefined) {
      const styleSettings = JSON.parse(savedSettings);
      this.headerSize = styleSettings.headerSize || 60;
      this.departureSize = styleSettings.departureSize || 32;
      this.footerSize = styleSettings.footerSize || 30;
      this.sidebarSize = styleSettings.sidebarSize || 1;
    }

    const compatModeSaved = localStorage.getItem('compatMode');
    if(compatModeSaved != null && compatModeSaved != undefined) {
      this.compatMode = compatModeSaved === 'true';
    }
  }

  saveSettings() {
    localStorage.setItem('styleSettings', JSON.stringify({
      headerSize: this.headerSize,
      departureSize: this.departureSize,
      footerSize: this.footerSize,
      sidebarSize: this.sidebarSize
    }));

    localStorage.setItem('compatMode', this.compatMode.toString());
  }
  
  setSmall() {
    this.headerSize = 60;
    this.departureSize = 32;
    this.footerSize = 30;
    this.sidebarSize = .7;
    this.saveSettings();
  }

  setMedium() {
    this.headerSize = 72;
    this.departureSize = 72;
    this.footerSize = 60;
    this.sidebarSize = 1;
    this.saveSettings();
  }

  setLarge() {
    this.headerSize = 112;
    this.departureSize = 82;
    this.footerSize = 125;
    this.sidebarSize = 1;
    this.saveSettings();
  }

}
