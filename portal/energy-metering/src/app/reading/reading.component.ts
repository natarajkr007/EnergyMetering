import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ReadingService } from '../services/reading.service';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.css'],
  providers: [ReadingService]
})
export class ReadingComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  allReadings: Array<object>;
  todayReadings: Array<object> = [];
  whenReading: string;
  absToday: Date;

  now: Date = new Date();
  year: number = this.now.getFullYear();
  month: number = this.now.getMonth();
  day: number = this.now.getDate();
  Today = new Date(this.year, this.month, this.day);

  // GRAPH GENERATION DATA INITIALIZATION

  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
    }]
  }
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
  public chartUpdate = false;

  constructor(private route: ActivatedRoute,
              private readingService: ReadingService,
              private location: Location) { }

  ngOnInit() {
    this.absToday = new Date(this.Today);
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
      if (readingDate.valueOf() >= this.absToday.valueOf()) {
        this.todayReadings.push(reading);
      }
      flag++;
      if (flag === this.allReadings.length) {
        this.makeData(this.todayReadings);
        this.whenReading = 'Today\'s power consumption';
      }
    });
  }

  getTodayReading(): void {
    window.location.reload();
  }

  getYesterdayReading(): void {
    const yesterday = new Date(this.year, this.month, this.day - 1);
    const absYesterday = new Date(yesterday);
    const yesterdayReadings = [];
    let flag = 0;
    this.allReadings.forEach(reading => {
      const readingDate = new Date(reading['date']);
      if ((readingDate.valueOf() >= absYesterday.valueOf()) && (readingDate.valueOf() < this.absToday.valueOf())) {
        yesterdayReadings.push(reading);
      }
      flag++;
      if (flag === this.allReadings.length) {
        this.lineChartData = [];
        this.lineChartLabels = [];
        this.chartUpdate = true;
        this.makeData(yesterdayReadings);
        this.whenReading = 'Yesterday\'s power consumption';
      }
    });
  }

  makeData(readings): void {
    let flag = 0;
    const data = [];
    const labels = [];
    readings.forEach(reading => {
      const date = new Date(reading['date']);
      data.push(reading['value']);
      labels.push(date.getHours().toString() + ':' + date.getMinutes().toString());
      flag++;
      if (flag === readings.length) {
        console.log(flag);
        const temp = {
          data: data,
          label: 'Enery consumption'
        };
        this.makeChart(temp, labels);
      }
    });
  }

  makeChart(dataset, labels): void {
    this.lineChartData = [dataset];
    this.lineChartLabels = labels;
    if (this.chartUpdate) {
    this.chart.chart.config.data.labels = this.lineChartLabels;
    }
    this.chartUpdate = false;
  }

}
