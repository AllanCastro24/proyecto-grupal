import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AppService } from 'src/app/app.service';
import { emailValidator, maxWordsValidator } from 'src/app/theme/utils/app-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public psConfig: PerfectScrollbarConfigInterface = {
    wheelPropagation:true
  };
  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen:boolean = true; 
  public checkoutForm:FormGroup = new FormGroup({});
  //public countries:any[] = [];
  public deliveryMethods:any[] = [];
  public paymentMethodss:any[] = [];
  public months:any[] = [];
  public years:any[] = []; 
  public step = 0;
  public deliveryMethodSubmitted:boolean = false;
  public paymentMethodSubmitted:boolean = false;
  public orderCompleted:boolean = false;
  public orderEmail:string = '';

  constructor(public appService:AppService, private fb: FormBuilder) { }

  ngOnInit(): void {
    if(window.innerWidth < 960){
      this.sidenavOpen = false;
    };  
    //this.countries = this.appService.getCountries();
    this.deliveryMethods = this.appService.getDeliveryMethods();
    this.paymentMethodss = this.appService.getpaymentmethods();
    this.months = this.appService.getMonths();
    this.years = this.appService.getYears(); 
    this.checkoutForm = this.fb.group({ 
      deliveryAddress: this.fb.group({
        'firstName': [null, Validators.compose([Validators.required, maxWordsValidator(1)])],
        'lastName': [null, Validators.compose([Validators.required, maxWordsValidator(1)])],
        'middleName': [null, maxWordsValidator(1)], 
        //'company': '',
        'email': [null, Validators.compose([Validators.required, emailValidator])],
        'phone': [null, Validators.required], 
        //'country': [null, Validators.required],
        'city': [null, Validators.required],
        'place': [null, Validators.required],
        'postalCode': [null, Validators.required],
        'address': [null, Validators.required],
      }),
      deliveryMethod: this.fb.group({
        'method': [null, Validators.required]
      }),
     
      paymentMethods: this.fb.group({
        'method': [null, Validators.required],
        
      })
    }); 

  }

  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }  

  
  public setStep(index: number) {
    this.step = index;
  }
  public onSubmitForm(form:any){
    if(this.checkoutForm.get(form)?.valid){
      this.nextStep(); 
    }
    if(form == 'deliveryMethod'){
      this.deliveryMethodSubmitted = true;
    }
  }
  public nextStep() {
    this.step++; 
  }
  public prevStep() {
    this.step--;
  }

  public placeOrder(){ 
    this.checkoutForm.updateValueAndValidity();
    this.checkoutForm.markAllAsTouched();
    console.log(this.checkoutForm.value);
    //console.log(this.appService.Data.cartList.values);
    console.log(this.appService.Data.cartList);
    console.log("sddd");
    
    
    if(this.checkoutForm.valid){
      console.log(this.checkoutForm.value);
      //console.log(this.checkoutForm.value);
      this.appService.insertarpedido(this.checkoutForm.value  ).subscribe (
        datos => {
          console.log('hola'+ datos);
          //this.ngOnInit();
          //buscar como insertar array de datos mysql slim4 php
        }
      )
      this.objcarrito();
      
      this.step = 4;
      this.orderCompleted = true; 
      this.orderEmail = (this.checkoutForm.get('deliveryAddress') as any)['controls'].email.value; 
      //this.checkoutForm.reset();
      this.appService.Data.cartList.length = 0;    
      this.appService.Data.totalPrice = 0;
      this.appService.Data.totalCartCount = 0;

    }   
    
  }

  /**
   * objcarrito
   */
  public objcarrito() {
    for (let index = 0; index < this.appService.Data.cartList.length; index++) {
      //const element = array[index];
      this.appService.insertarpedidocomi(this.appService.Data.cartList[index] ).subscribe (
        datos => {
          console.log('hola'+ datos);
          //this.ngOnInit();
          //buscar como insertar array de datos mysql slim4 php
        }
      )
  }
  }
}
