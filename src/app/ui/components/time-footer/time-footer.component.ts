import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-time-footer',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './time-footer.component.html',
  styleUrl: './time-footer.component.scss'
})
export class TimeFooterComponent {
  time: Date = new Date();
  timeInterval: any;

  ngOnInit() {
    this.timeInterval = setInterval(() => {
      this.time = new Date();
    }, 10000);
  }

  ngOnDestroy() {
    if(this.timeInterval != undefined)
      clearInterval(this.timeInterval);
  }
}
