import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive, ChartComponent } from 'ng-apexcharts';
import { BarChartOptionsData } from '../../model/bar-chart-options-data';
import { ReportTotalSpentByMonth } from '../../model/report-total-spent-by-month';
import { ReportsService } from '../../service/reports-service.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-report-total-by-month-pie-chart',
  templateUrl: './report-total-by-month-pie-chart.component.html',
  styleUrls: ['./report-total-by-month-pie-chart.component.css']
})
export class ReportTotalByMonthPieChartComponent implements OnInit {

  @ViewChild("chart") chart?: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;

  constructor(private reportsService: ReportsService) {
    this.chartOptions = {}
  }

  ngOnInit(): void {
    this.retrieveData();
  }

  private retrieveData() {
    this.reportsService.getTotalSpentByMonthOnYear(2022).subscribe({
      next: ((resp: Array<ReportTotalSpentByMonth>) => {
        this.initChart(resp);
      }),
      error: ((err) => console.error(err))
    });
  }

  private initChart(data: Array<ReportTotalSpentByMonth>) {
    this.buildChart();
    
    // Get Series of Data
    let series = data.map((val: ReportTotalSpentByMonth) => val.total);

    // Parse Months to use as Label
    let labels = data.map((val: ReportTotalSpentByMonth) => this.parseMonth(val.month));

    // Build Chart Data
    let barChartOptions: BarChartOptionsData = {
      series: series
    };
    
    this.chartOptions.series = barChartOptions.series;
    this.chartOptions.xaxis = barChartOptions.xaxis;
    this.chartOptions.labels = labels;

    console.log(this.chartOptions);
  }

  private parseMonth(monthNumber: number): string {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    return months[(monthNumber-1)];
  }

  private buildChart() {
    this.chartOptions.chart = {
      type: "pie",
      height: 380
    };
    this.chartOptions.responsive = [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ];
  }

}
