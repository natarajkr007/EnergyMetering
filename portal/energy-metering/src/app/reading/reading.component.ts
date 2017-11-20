import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ReadingService } from '../services/reading.service';

@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.css'],
  providers: [ReadingService]
})
export class ReadingComponent implements OnInit {
  allReadings: Array<object>;
  todayReadings: Array<object> = [];
  absToday;

  // GRAPH GENERATION DATA INITIALIZATION

  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  constructor(private route: ActivatedRoute, private readingService: ReadingService, private location: Location) { }

  ngOnInit() {
    const now: Date = new Date();
    const year: number = now.getFullYear();
    const month: number = now.getMonth();
    const day: number = now.getDate();
    const Today = new Date(year, month, day);
    this.absToday = new Date(Today);
    this.getReadings();
  }

  getReadings(): void {
    const device_id: String = this.route.snapshot.paramMap.get('device_id');
    const req = {
      device_id: device_id
    };

    this.readingService.getReadings(req).subscribe(
      res => {
        if (res.success) {
          this.allReadings = res.readings;
          this.makeTodayReadings();
        }
      }
    );
  }

  makeTodayReadings(): void {
    let flag = 0;
    this.allReadings.forEach(reading => {
      const readingDate = new Date(reading['date']);
      if (readingDate >= this.absToday) {
        this.todayReadings.push(reading);
      }
      flag++;
      if (flag === this.allReadings.length) {
        this.makeData();
      }
    });
  }

  makeData(): void {
    let flag = 0;
    const data = [];
    const labels = [];
    this.todayReadings.forEach(reading => {
      const date = new Date(reading['date']);
      data.push(reading['value']);
      labels.push(date.getHours().toString() + ':' + date.getMinutes().toString());
      flag++;
      if (flag === this.todayReadings.length) {
        const temp = {
          data: data,
          label: 'Enery consumption'
        };
        this.lineChartData.push(temp);
        this.lineChartLabels = labels;
      }
    });
  }

}
