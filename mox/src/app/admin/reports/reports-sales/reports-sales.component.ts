import { Component, Inject, OnInit, PLATFORM_ID, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { MenuItem } from 'src/app/app.models';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { isPlatformBrowser } from '@angular/common';
import { analytics } from '..//dashboard.data';
import { montly_sales } from '../dashboard.data';




@Component({
  selector: 'app-reports-sales',
  templateUrl: './reports-sales.component.html',
  styleUrls: ['./reports-sales.component.scss']
})
export class ReportsSalesComponent implements OnInit {
  public form!: FormGroup;
  public form2!: FormGroup;
  public form3!: FormGroup;
  public form4!: FormGroup;
  ExisteSucursal: boolean = false;
  ExisteTienda: boolean = false;
  public nSucursal: any;
  public nTienda: any;
  public optionValue = "";
  years: number[] = [];
  public anio: number = 0;
  displayedColumns: string[] = ['id_producto', 'cantidad', 'id_mesero', 'fecha', 'id_sucursal'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  private sub: any;
  public hours = ['1:00am', '2:00am', '3:00am', '4:00am', '5:00am', '6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00am',
    '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm', '9:00pm', '10:00pm', '11:00pm', '12:00pm'];
  public today = new Date();

  //GRAFICA
  public analytics: any[] = [];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = false;
  public showXAxisLabel = false;
  public xAxisLabel = 'Year';
  public showYAxisLabel = false;
  public yAxisLabel = 'Profit';
  // public colorScheme: any = {
  //   domain: ['#283593', '#039BE5', '#FF5252']
  // };
  public autoScale = true;
  public roundDomains = true;
  @ViewChild('resizedDiv') resizedDiv!: ElementRef;
  public previousWidthOfResizedDiv: number = 0;

  //GRAFICA PASTEL
  public data: any[] = [];


  public colorScheme: any = {
    domain: ['#2F3E9E', '#D22E2E', '#378D3B']
  };
  public showLabels = true;
  public explodeSlices = true;
  public doughnut = false;




  constructor(public appService: AppService,
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object) { }




  ngOnInit(): void {
    this.ExisteSucursal = localStorage.getItem('ID_sucursal') ? true : false;
    this.ExisteTienda = localStorage.getItem('ID_tienda') ? true : false;
    if (this.ExisteSucursal) {
      this.nSucursal = localStorage.getItem("ID_sucursal");
      this.nTienda = localStorage.getItem("ID_tienda");
    }

    this.anio = new Date().getFullYear();
    // this.appService.ObtenerGastosFijos().subscribe(respuesta => {
    //   this.initDataSource(respuesta);
    //   console.log(respuesta);
    //   // this.Equipos = respuesta;
    // });
    for (let i = this.anio; i > 2000; i--) {

      this.years.push(i);
      // this.anos.push(i);

    }
    this.form4 = this.formBuilder.group({
      // "id": 0,
      // "name": [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      // "description": null,
      // "buscarPor": [null, Validators.required],
      "mes": null,
      "ano": null,
      "id_sucursal": null,
      "id_tienda": null,
      // "fecha": null,
      // "fecha2": null,
      // "dia": null,

    });

    this.form = this.formBuilder.group({
      // "id": 0,
      // "name": [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      // "description": null,
      "buscarPor": [null, Validators.required],
      // "mes": null,
      // "fecha": null,
      // "fecha2": null,
      // "dia": null,

    });
    this.form2 = this.formBuilder.group({
      // "id": 0,
      // "name": [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      // "description": null,
      // "buscarPor": [null, Validators.required],
      "fecha": null,
      "fecha2": null,
      "id_sucursal": null,
      "id_tienda": null,

    });
    this.form3 = this.formBuilder.group({
      // "id": 0,
      // "name": [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      // "description": null,

      "dia": null,
      "id_sucursal": null,
      "id_tienda": null,

    });
    this.form4.value.id_sucursal = this.nSucursal;
    this.form4.value.id_tienda = this.nTienda;
    this.form2.value.id_sucursal = this.nSucursal;
    this.form2.value.id_tienda = this.nTienda;
    this.form3.value.id_sucursal = this.nSucursal;
    this.form3.value.id_tienda = this.nTienda;
    // this.getCategories();
    // this.sub = this.activatedRoute.params.subscribe(params => {  
    //   if(params['id']){
    //     this.id = params['id'];
    //     this.getMenuItemById(); 
    //   } 
    //   else{
    //     this.showImage = true;
    //   }
    // }); 

    // this.analytics = analytics; 

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public getCategories() {
    if (!this.appService.Data.categories.length) {
      this.appService.getCategories().subscribe(categories => {
        this.appService.Data.categories = categories;
      });
    }
  }

  public initDataSource(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }




  public onSubmit() {
    this.ExisteSucursal = localStorage.getItem('ID_sucursal') ? true : false;
    this.ExisteTienda = localStorage.getItem('ID_tienda') ? true : false;
    if (this.ExisteSucursal) {
      this.nSucursal = localStorage.getItem("ID_sucursal");
      this.nTienda = localStorage.getItem("ID_tienda");

      if (this.optionValue == "Mes") {
        // alert("Mes");
        console.log(this.form4.value);
        this.appService.ObtenerVentasXMes(this.form4.value).subscribe(respuesta => {
          // this.initDataSource(respuesta);
          this.data = respuesta;
        });
      } else if (this.optionValue == "Dia") {
        // alert("Dia");
        console.log(this.form3.value);
        this.appService.ObtenerVentasXDia(this.form3.value).subscribe(respuesta => {
          // this.initDataSource(respuesta);
          this.data = respuesta;
          // console.log(respuesta);
          // this.Equipos = respuesta;
        });
      } else if (this.optionValue == "Rango") {
        // alert("Rango");
        console.log(this.form2.value);
        this.appService.ObtenerVentasXRango(this.form2.value).subscribe(respuesta => {
          // this.initDataSource(respuesta);
          this.data = respuesta;

        });
      } else if (this.optionValue == "Productos mas vendidos en el mes") {
        console.log(this.form4.value);
        this.appService.ProductosMasVendidos(this.form4.value).subscribe(respuesta => {
          // this.initDataSource(respuesta);
          this.analytics = [...respuesta];
          this.data = respuesta;
          // console.log(respuesta);
          // this.Equipos = respuesta;
        });
      }
      else if (this.optionValue == "Productos menos vendidos en el mes") {
        console.log(this.form4.value);
        this.appService.ProductosMenosVendidos(this.form4.value).subscribe(respuesta => {
          // this.initDataSource(respuesta);
          this.analytics = respuesta;
          this.data = respuesta;
          // console.log(respuesta);
          // this.Equipos = respuesta;
        });
      }

    }


  }
  onSelect(event: any) {
    console.log(event);
  }

  ngAfterViewChecked() {
    if (this.previousWidthOfResizedDiv != this.resizedDiv.nativeElement.clientWidth) {
      // this.analytics = [...analytics];
    }
    if (this.previousWidthOfResizedDiv != this.resizedDiv.nativeElement.clientWidth) {
      // setTimeout(() => this.data = [...montly_sales] );
    }
    this.previousWidthOfResizedDiv = this.resizedDiv.nativeElement.clientWidth;
  }

}
