import { DailyReportService } from 'src/app/_services/daily-report.service';
import { WorkEntry, WorkEntryRequest } from './../../../_models/work-entry';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-entry',
  templateUrl: './edit-entry.component.html',
  styleUrls: ['./edit-entry.component.css']
})
export class EditEntryComponent implements OnInit {

  selectedEntry: WorkEntry;
  editForm: FormGroup;
  request: WorkEntryRequest;
  isLoading = false;
  constructor(public modal: NgbActiveModal, private route: ActivatedRoute, 
    private dailyReportService: DailyReportService, 
    private fb: FormBuilder, private router: Router) { }
 
  ngOnInit() {
    this.setForm();
  }
 
  deleteEntry() {
    this.dailyReportService.deleteEntry(this.selectedEntry.id).subscribe(x => {
      this.isLoading = false;
      this.modal.close('Yes');
    },
      error => {
        this.isLoading = false;
        this.modal.close('Yes');
      });
  }

  onSubmit() {
    if (this.editForm.invalid || this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.dailyReportService.updateEntry(this.selectedEntry.id,this.editForm.value).subscribe(x => {
      this.isLoading = false;
      this.modal.close('Yes');
    },
      error => {
        this.isLoading = false;
      });
  }
 
  get editFormData() { return this.editForm.controls; }
 
  private setForm() {
    console.log(this.selectedEntry);
    console.log(this.selectedEntry.daily_report);

    this.editForm = this.fb.group({
      daily_report_id: this.selectedEntry.daily_report,
      employee_id: "",
      hours: new FormControl(this.selectedEntry.hours, [Validators.required]),
      factor: this.selectedEntry.factor,
      night: this.selectedEntry.night,
      height: this.selectedEntry.height,
      description: this.selectedEntry.description
      //new FormControl(this.selectedEntry.hours, [Validators.required]),
    })

    this.request = new WorkEntryRequest();
  }
}