import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportProductPriceTrendComponent } from './report-product-price-trend.component';

describe('ReportProductPriceTrendComponent', () => {
  let component: ReportProductPriceTrendComponent;
  let fixture: ComponentFixture<ReportProductPriceTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportProductPriceTrendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportProductPriceTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
