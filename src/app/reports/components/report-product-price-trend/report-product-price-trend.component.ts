import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import { BarChartOptionsData, Series, Xaxis } from '../../model/bar-chart-options-data';
import { ReportProductPriceTrend } from '../../model/report-product-price-trend';
import { ReportsService } from '../../service/reports-service.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-report-product-price-trend',
  templateUrl: './report-product-price-trend.component.html',
  styleUrls: ['./report-product-price-trend.component.css']
})
export class ReportProductPriceTrendComponent implements OnInit {

  @ViewChild("chart") chart?: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;

  constructor(private reportsService: ReportsService) {
    this.chartOptions = {};
  }

  ngOnInit(): void {
    this.retrieveData();
  }

  private retrieveData(): void {
    this.reportsService.getProductsPriceTrentByYear(2022).subscribe({
      next: ((resp: ReportProductPriceTrend[]) => {
        console.log('total products by year');
        this.initChart(resp);
      }),
      error: ((err) => console.error(err))
    });
  }

  private initChart(data: Array<ReportProductPriceTrend>): void {
    this.buildChart();

    // Get Categories
    let categories = data.map((val: ReportProductPriceTrend) => this.parseMonth(val.month));
    categories = categories.filter((item, index) => categories.indexOf(item) === index);
    
    const xaxis: Xaxis = {
      categories: categories
    };

    const result = data.reduce((r, a) => {
        console.log(r);
        console.log(a);

        r[a.name] = r[a.name] || [];
        r[a.name].push(a);
        return r;
    }, Object.create(null));
    console.log(result);

    // Get Series of Data
    const seriesArr: Series[] = [];
    data.forEach((val: ReportProductPriceTrend) => {
      let currentName: string = val.name;

      // Find Item Index on Data Series Array
      let itemPosition = seriesArr.findIndex((serie: Series) => serie.name === currentName);

      // if found, add value
      if (itemPosition > -1) {
        seriesArr[itemPosition].data.push(val.price);
      } else {
        // Create a new Serie for this item
        let pricesArray: number[] = [];      
        pricesArray.push(val.price);
        let series: Series = {
          name: val.name,
          data: pricesArray
        };
        seriesArr.push(series);
      }
    })
    console.log(seriesArr);

    // Build Chart Data
    let barChartOptions: BarChartOptionsData = {
      series: seriesArr,
      xaxis: xaxis
    };

    this.chartOptions.series = barChartOptions.series;
    this.chartOptions.xaxis = barChartOptions.xaxis;
  
  }

  private buildChart() {
    this.chartOptions.chart = {
      height: 350,
      type: "line",
      zoom: {
        enabled: false
      }
    };

    this.chartOptions.dataLabels = {
      enabled: false
    };
    
    this.chartOptions.stroke = {
      curve: "straight"
    };

    this.chartOptions.title = {
      text: "Product Price by Year",
      align: "left"
    };

    this.chartOptions.grid = {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5
      }
    }    
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

}
