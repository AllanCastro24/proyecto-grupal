import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppSettings, Settings } from 'src/app/app.settings';
import { MenuService } from 'src/app/theme/components/menu/menu.service';
import { User } from 'src/app/users/users';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public hide = true;
  public settings: Settings;

  public snackBarDefault: any = {
    horizontalPosition: 'end',
    verticalPosition: 'top',
    duration: 2000,
  };

  constructor(
    public menuService: MenuService,
    public fb: FormBuilder,
    public router: Router,
    public appSettings: AppSettings,
    private snackBar: MatSnackBar,
    private UsersService: UsersService
  ) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      rememberMe: false,
    });

    this.menuService.toggleMenu(false);

    this.UsersService.isLoggedIn.subscribe((res) => {
      if (res) {
        this.router.navigate(['./tables']);
      }
    });
  }

  public onLoginFormSubmit(): void {
    if (this.loginForm.valid) {
      const data: User = {
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value,
      };

      console.log(data);

      const tmp =
        '{"id":24,"username":"test","profile":{"image":null},"work":{"position":2},"contacts":{"email":"test"},"cartList":[{"id":4,"name":"Little Caesars (Centenario)","image":"assets/images/foods/1-1/pizza_3_carnes.png","branchId":1,"companyId":1,"items":[{"id":4,"name":"Pizza 3 carnes","description":"Queso Oaxaca, cheddar, mozzarella, Salsa, Peperoni.","price":150,"image":{"small":"assets/images/foods/1-1/pizza_3_carnes.png","medium":"assets/images/foods/1-1/pizza_3_carnes.png","big":"assets/images/foods/1-1/pizza_3_carnes.png"},"discount":0,"ratingsCount":4.1,"ratingsValue":170,"availibilityCount":5,"cartCount":1,"weight":220,"isVegetarian":false,"branchId":1,"companyId":1,"menuId":1,"tagId":[1],"note":""}]}],"favoriteRestaurants":[{"id":"1","companyId":1,"categoryId":[1,6],"tagId":[1],"name":"Little Caesars (Centenario)","description":"Pizzas a buen precio","address":"Blvd Centenario 660 Ote, Morelos, 81290 Los Mochis, Sin.","latitude":"25.7678167","longitude":"-108.993423","schedule":{"lunes":[{"start":"11:00","end":"13:00"},{"start":"15:00","end":"18:00"}],"martes":[{"start":"11:00","end":"13:00"},{"start":"15:00","end":"18:00"}],"miercoles":[{"start":"11:00","end":"13:00"},{"start":"15:00","end":"18:00"}]},"image":"assets/images/restaurantes/1/little_caesars.png","rating":{"average":4.5,"count":200},"delivery":{"price":30,"time":900},"pickup":{"price":0,"time":600}}],"addressList":[{"firstName":"Emilio","lastName":"Verdines","middleName":"","company":"","email":"emilio.verdines@gmail.com","phone":"(+100) 123 456 7890","country":"US","city":"New York","place":"Brooklyn","postalCode":"11213","address":"(1) 1568 Atlantic Ave","id":2,"default":false},{"firstName":"Emilio","lastName":"Verdines","middleName":"","company":"","email":"emilio.verdines@gmail.com","phone":"(+100) 123 456 7890","country":"US","city":"New York","place":"Brooklyn","postalCode":"11213","address":"(2) 1568 Atlantic Ave","id":2,"default":true}],"paymentList":[{"name":"(1) Emilio Verdines","cardNumber":"1234123412341234","expiryMonth":"12","expiryYear":"2022","cvv":"123","id":2,"default":true},{"name":"(2) Emilio Verdines","cardNumber":"1234123412341234","expiryMonth":"12","expiryYear":"2022","cvv":"123","id":2,"default":false}],"orderList":[{"id":1,"accountId":24,"address":{"firstName":"Emilio","lastName":"Verdines","middleName":"","company":"","email":"emilio.verdines@gmail.com","phone":"(+100) 123 456 7890","country":"US","city":"New York","place":"Brooklyn","postalCode":"11213","address":"(2) 1568 Atlantic Ave","id":2,"default":true},"deliveryTypeId":1,"payment":{"name":"(1) Emilio Verdines","cardNumber":"1234123412341234","expiryMonth":"12","expiryYear":"2022","cvv":"123","id":2,"default":true},"date":"1653584378051","items":[{"id":2,"name":"Arrochito","description":"Arroz, Ensalada de Tampico, Philadelphia, Camarón, Res, Pollo, Aguacate, Ajonjoí.","price":142.99,"image":{"small":"assets/images/foods/5-1/arrochito.jpeg","medium":"assets/images/foods/5-1/arrochito.jpeg","big":"assets/images/foods/5-1/arrochito.jpeg"},"discount":0,"ratingsCount":4.3,"ratingsValue":298,"availibilityCount":5,"cartCount":3,"weight":299,"isVegetarian":false,"branchId":1,"companyId":5,"menuId":1,"tagId":[13],"note":""}],"status":{"id":1,"name":"Pendiente"}}]}';

      localStorage.setItem('auth-token', tmp);

      this.snackBar.open('Login exitoso', '', this.snackBarDefault);

      this.UsersService._isLoggedIn.next(true);

      this.menuService.toggleMenu(true);

      this.router.navigate(['./tables']);

      // this.UsersService.login(data).subscribe((res) => {
      //   if (res.success) {
      //     this.snackBar.open('Login exitoso', '', this.snackBarDefault);

      //     this.menuService.toggleMenu(true);

      //     this.router.navigate(['./tables']);
      //   } else {
      //     this.snackBar.open('Usuario y/o contraseña equivocados', '', this.snackBarDefault);
      //   }
      // });
    }
  }
}
