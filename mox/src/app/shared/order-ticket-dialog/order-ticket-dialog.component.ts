import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Transaction } from 'src/app/app.models';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-order-ticket-dialog',
  templateUrl: './order-ticket-dialog.component.html',
  styleUrls: ['./order-ticket-dialog.component.scss']
})
export class OrderTicketDialogComponent implements OnInit {

  constructor(public appService:AppService,public dialogRef: MatDialogRef<OrderTicketDialogComponent>,@Inject(MAT_DIALOG_DATA) public transaction: Transaction) { }

  ngOnInit(): void {
   // this.mostrartiesuc();
  }

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png',1.0);
      let PDF = new jsPDF('portrait', 'mm', [80,150]);
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, 0, 80, 150);
      //PDF.save('angular-demo.pdf');
      //window.open(DATA.output('bloburl'))
      window.open(PDF.output('bloburl'))
    });
    
  }
  openPDF2(){
    let DATA: any = document.getElementById('htmlData');
    let doc = new jsPDF('p','mm', 'a4');
   
   // doc.output('dataurlnewwindow');
   doc.setProperties({
       title: "new Report"
  });
   doc.output(DATA.innerHTML);
  //doc.output('dataurlnewwindow');
   //window.open(URL.createObjectURL(doc.output("blob")))
   window.open(doc.output('bloburl'))
  }

  datosmpl = null as any;

  mostrartiesuc(){
    this.appService.getOrderscomple().subscribe(result => this.datosmpl  = result)
    console.log('holaaa'+ this.datosmpl);
    //this.suma();
    //this.insertarpla();
    
  }
  
  hayregistropla(){
    if(this.datosmpl == null){
      return false;
    } else{
      return true;
    }
  }

}
