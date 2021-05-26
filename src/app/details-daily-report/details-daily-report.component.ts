import { WorkEntry } from './../_models/work-entry';
import { EditEntryComponent } from './edit/edit-entry/edit-entry.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DailyReport } from '../_models/daily-report';
import { DailyReportService } from '../_services/daily-report.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-details-daily-report',
  templateUrl: './details-daily-report.component.html',
  styleUrls: ['./details-daily-report.component.css'],
})
export class DetailsDailyReportComponent implements OnInit {
  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private dailyReportService: DailyReportService,
    private modalService: NgbModal
  ) {}

  request: DailyReport = new DailyReport();
  entriesList: Array<WorkEntry> = [];

  customer_name: string = '';

  signatureImage!: SafeResourceUrl;

  signatureLoaded: boolean = false;

  reportNumber: string = '0';

  private categories = new Map([
    ["OFICIAL", "OFICIAL"],
    ["TECNICO", "TÉCNICO"],
    ["AYUDANTE", "AYUDANTE"],
    ["UNDEFINED", "SIN CATEGORÍA"]
  ]); 

  @ViewChild('sig', { static: false }) sig!: ElementRef;

  getCategory(s: string){
    return this.categories.get(s);
  }

  ngOnInit(): void {
    //console.log('firma:' + this.signatureImage);
    this.setEntriesList();
  }

  editItem(entry: WorkEntry) {
    const ref = this.modalService.open(EditEntryComponent, { centered: true });
    ref.componentInstance.selectedEntry = entry;

    ref.result.then((yes) => {
      console.log("Yes Click");
      this.setEntriesList();
    },
      (cancel) => {
        console.log("Cancel Click");
      });
  }

  makePDF() {
    let pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });
    var img = new Image();
    var src = 'https://i.imgur.com/VFbz68g.jpeg';
    img.src = src;
    pdf.setLineWidth(1);
    pdf.addImage(img, 'JPEG', 15, 7, 70, 35);
    pdf.setFontSize(12.5);
    pdf.text('Los Tilos esq Los Ligustros - PIO I', 110, 15);
    pdf.text('(7400) Olavarría -  Bs. As. - Argentina', 106, 20);
    pdf.text('Tel-Fax: 02284 - 443642', 119, 25);
    pdf.text('e-mail: info@pcmmetalmecanica.com.ar', 104, 30);
    pdf.text('www.pcmmetalmecanica.com.ar', 111, 35);

    if (this.request.name != null) pdf.text(this.request.name, 204, 191);

    pdf.setFontSize(14);
    pdf.text(
      'Responsable: ' +
        this.request.manager.name +
        ' ' +
        this.request.manager.last_name,
      15,
      50
    );

    pdf.line(180, 194, 280, 194);
    pdf.text('Firma y aclaración', 209, 201);

    var splitDesc = pdf.splitTextToSize(
      'Detalle trabajos realizados: ' + this.request.detail,
      155
    );
    pdf.text(splitDesc, 15, 165);

    pdf.text('OSE: ' + this.request.ose, 38, 200);
    pdf.text('OST: ' + this.request.ost, 88, 200);

    pdf.setFontSize(18);
    this.reportNumber = this.request.id.toString().padStart(5, '0');
    pdf.text('Parte Diario N°' + this.reportNumber, 200, 17);
    pdf.text('Lugar: ' + this.request.customer.address, 200, 27);
    pdf.text('Fecha: ' + this.request.date, 200, 37);

    autoTable(pdf, {
      html: '#tabla',
      theme: 'grid',
      headStyles: { fillColor: [255, 0, 0] },
      margin: { top: 55 },
    });

    pdf.rect(5, 5, 287, 200);

    if (this.signatureLoaded)
      pdf.html(this.sig.nativeElement, {
        callback: (pdf) => {
          pdf.save('PCM - Parte Diario N°' + this.reportNumber + '.pdf');
        },
        x: 175,
        y: 157,
        html2canvas: {
          scale: 0.2,
        },
      });
    else pdf.save('PCM - Parte Diario N°' + this.reportNumber + '.pdf');
  }


  private setEntriesList(){

    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      this.dailyReportService.details(id).subscribe(
        (data) => {
          console.log(data);
          this.request = data;
          this.entriesList = this.request.entries;
          this.customer_name = this.request.customer.name;
          if (this.request.signature != null) this.signatureLoaded = true;
          this.signatureImage = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.request.signature
          );
        },
        (error) => {
          //this.errorMessage = err.error.message;
          //this.isLoginFailed = true;
        }
      );
    });

  }


    
}
