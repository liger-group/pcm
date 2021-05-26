import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDailyReportComponent } from './details-daily-report.component';

describe('DetailsDailyReportComponent', () => {
  let component: DetailsDailyReportComponent;
  let fixture: ComponentFixture<DetailsDailyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsDailyReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDailyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
