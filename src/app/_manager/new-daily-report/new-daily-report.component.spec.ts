import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDailyReportComponent } from './new-daily-report.component';

describe('NewDailyReportComponent', () => {
  let component: NewDailyReportComponent;
  let fixture: ComponentFixture<NewDailyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDailyReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDailyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
