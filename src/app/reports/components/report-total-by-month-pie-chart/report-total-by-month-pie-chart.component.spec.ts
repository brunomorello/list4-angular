import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTotalByMonthPieChartComponent } from './report-total-by-month-pie-chart.component';

describe('ReportTotalByMonthPieChartComponent', () => {
  let component: ReportTotalByMonthPieChartComponent;
  let fixture: ComponentFixture<ReportTotalByMonthPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportTotalByMonthPieChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTotalByMonthPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
