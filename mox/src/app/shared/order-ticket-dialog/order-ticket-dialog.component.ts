import { Component, ElementRef, Inject, OnInit, ViewChild,Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Transaction } from 'src/app/app.models';
import jsPDF from 'jspdf';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-order-ticket-dialog',
  templateUrl: './order-ticket-dialog.component.html',
  styleUrls: ['./order-ticket-dialog.component.scss']
})
export class OrderTicketDialogComponent implements OnInit {
  //@ViewChild('htmlData', {static: false}) htmlData:ElementRef | undefined;
  /* public idtienda:any;
  public idsucursal:any; */
  @Input() idtienda:any;
  @Input() idsucursal:any;
  public idtie:any;
  public idsucc:any;
  public idd:any
  constructor(public appService:AppService,private activatedRoute: ActivatedRoute,public dialogRef: MatDialogRef<OrderTicketDialogComponent>,@Inject(MAT_DIALOG_DATA) public transaction: Transaction) { }

  ngOnInit(): void {
    this.idtie = this.transaction.idtienda;
    this.idsucc = this.transaction.idsuc;
    this.idd = this.transaction.idcli;
    this.idtienda = this.activatedRoute.snapshot.paramMap.get('idtienda');
    this.idsucursal = this.activatedRoute.snapshot.paramMap.get('idsuc');
    this.mostrartiesuc();
    this.statee(this.idtie,this.idsucc,this.idd);
  }

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      
      let PDF = new jsPDF('portrait', 'mm', [80,150]);
     // PDF.setFont("helvetica");
     // PDF.("bold");
     
      PDF.setFontSize(1);
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
    this.appService.getOrderscomple2(this.idtie,this.idsucc,this.idd).subscribe(result => this.datosmpl  = result)
    console.log('holaaa'+ this.datosmpl);
    console.log(this.idd);
   console.log("tienda: " + this.idtie);
   console.log("suc: " + this.idsucc);
    //this.suma();
    //this.insertarpla();
    //this.state();
  }
  
  hayregistropla(){
    if(this.datosmpl == null){
      return false;
    } else{
      return true;
    }
  }
public activo: any;
  public statee( id: any,idtiendaa:any,idsucursall:any): void {

    
     
    /* this.appService.bajaplato3(this.idtienda, this.idsucursal,id, proveedor).subscribe((menuItems) => {
    }); */
    //this.ngOnInit();
   /* console.log(id);
   console.log("tienda: " + idtiendaa);
   console.log("suc: " + idsucursall); */
   this.appService.getOrderscomple2(this.idtie,this.idsucc,this.idd).subscribe((transactions:any[]) => { 
    //this.initDataSource(transaction);
    console.log(transactions);
  });  
   }
  

}
