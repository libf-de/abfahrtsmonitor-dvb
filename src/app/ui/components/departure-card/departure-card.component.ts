import { Component, Input } from '@angular/core';
import { Departure } from '../../../data/models/departure';
import { Datasource } from '../../../data/sources/datasource';
import { VvoSourceService } from '../../../data/sources/vvo-source.service';

@Component({
  selector: 'app-departure-card',
  standalone: true,
  imports: [],
  templateUrl: './departure-card.component.html',
  styleUrl: './departure-card.component.scss',
  providers: [{ provide: Datasource, useClass: VvoSourceService }]
})
export class DepartureCardComponent {
  @Input() departure!: Departure;
  dataSource: Datasource;

  constructor(dataSource: Datasource) {
    this.dataSource = dataSource;
  }
}
