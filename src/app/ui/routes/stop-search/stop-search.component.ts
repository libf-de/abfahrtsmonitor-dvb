import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Datasource } from '../../../data/sources/datasource';
import { Stop } from '../../../data/models/stop';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-stop-search',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, RouterLink],
  templateUrl: './stop-search.component.html',
  styleUrl: './stop-search.component.scss'
})
export class StopSearchComponent {
  dataSource: Datasource;
  
  searchQuery: string = "";
  searchResults: Stop[] = [];

  constructor(dataSource: Datasource) { this.dataSource = dataSource; }

  async doSearch() {
    this.searchResults = await this.dataSource.searchStops(this.searchQuery);
  }
}
