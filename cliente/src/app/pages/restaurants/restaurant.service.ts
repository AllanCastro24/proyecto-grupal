import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/users/users.service';
import { environment } from 'src/environments/environment';
import { Plate } from './plates';
import { CartList, Company, Menu, Order, Restaurant } from './restaurants';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  public totalPrice: number = 0;
  public totalCartCount: number = 0;
  public totalCartList: number = 0;

  public url = environment.url + '/assets/data/';
  public urlDb = 'https://tmp02.appsdev.cyou/proyecto-grupal-backend/';

  constructor(public http: HttpClient, public usersService: UsersService) {}

  public async getRestaurant(id: number, companyId: number): Promise<Restaurant> {
    const restaurants = await this.getRestaurantsByCompany(companyId);

    for (const restaurant of restaurants) {
      if (restaurant.id == id) {
        return restaurant;
      }
    }

    return <Restaurant>{};
  }

  public async getCompanies(): Promise<Company[]> {
    const url = `${this.url}restaurants/companies.json`;
    const companies = (await this.http.get<Company[]>(url).toPromise()) || [];
    const companiesDb = (await this.getCompaniesDb()) || [];
    const formattedCompanies = [];

    for (const company of companiesDb) {
      const formattedCompany: Company = {
        id: company.ID_tienda,
        name: company.Nombre,
      };

      formattedCompanies.push(formattedCompany);
    }

    return [...companies, ...formattedCompanies];
  }

  public getCompaniesDb() {
    return this.http.get<any[]>(`${this.urlDb}api/usuarios/tienda`).toPromise();
  }

  public async getBranchsDb() {
    const restaurants = (await this.http.get<any[]>(`${this.urlDb}api/sucursales/consultar`).toPromise()) || [];

    const formattedRestaurants = [];

    for (const restaurant of restaurants) {
      const formattedRestaurant: Restaurant = {
        id: restaurant.ID_sucursal,
        companyId: restaurant.ID_tienda,
        managerId: restaurant.ID_empleado,
        name: restaurant.Pseudonimo,
        description: 'Sin descripción',
        address: 'Calle 200 contra esquina de carcelCalle 200 conta',
        latitude: 25.795072,
        longitude: -108.983466,
        schedule: {
          lunes: [
            {
              start: '11:00',
              end: '13:00',
            },
            {
              start: '15:00',
              end: '18:00',
            },
          ],
          martes: [
            {
              start: '11:00',
              end: '13:00',
            },
            {
              start: '15:00',
              end: '18:00',
            },
          ],
          miercoles: [
            {
              start: '11:00',
              end: '13:00',
            },
            {
              start: '15:00',
              end: '18:00',
            },
          ],
        },
        image: 'assets/images/restaurantes/default.png',
        rating: {
          average: 2.5,
          count: 50,
        },
        categoryId: [1],
        tagId: [1],
        delivery: {
          price: 40,
          time: 720,
        },
        pickup: {
          price: 20,
          time: 900,
        },
      };

      formattedRestaurants.push(formattedRestaurant);
    }

    return formattedRestaurants;
  }

  public async getBranchDb(id: number, companyId: number) {
    const restaurants = await this.getBranchsDb();

    for (const restaurant of restaurants) {
      if (restaurant.companyId == companyId && restaurant.id == id) {
        return restaurant;
      }
    }

    return <Restaurant>{};
  }

  public async getRestaurantsByCompany(id: number) {
    const url = `${this.url}restaurants/${id}/restaurants.json`;
    const restaurants = await this.http
      .get<Restaurant[]>(url)
      .toPromise()
      .catch(async (err) => {
        const restaurantsDb = await this.getBranchsDb();
        const restaurants = [];

        for (const restaurant of restaurantsDb) {
          if (restaurant.companyId == id) {
            restaurants.push(restaurant);
          }
        }

        return restaurants;
      });

    return restaurants || [];
  }

  public async getPlate(restaurantId: number, companyId: number, id: number) {
    const url = `${this.url}restaurants/${companyId}/${restaurantId}/plates/menu-item-${id}.json`;
    const plate = await this.http
      .get<Plate>(url)
      .toPromise()
      .catch(async (err) => {
        const plates = await this.getPlates(restaurantId, companyId);

        for (const plateItem of plates) {
          if (plateItem.id == id) {
            return plateItem;
          }
        }

        return <Plate>{};
      });

    return plate;
  }

  public async getPlates(restaurantId: number, companyId: number): Promise<Plate[]> {
    const url = `${this.url}restaurants/${companyId}/${restaurantId}/plates/menu-items.json`;
    const plates =
      (await this.http
        .get<Plate[]>(url)
        .toPromise()
        .catch(async () => {
          return await this.getPlatesDb(restaurantId, companyId);
        })) || [];

    return plates;
  }

  public async getPlatesDb(restaurantId: number, companyId: number) {
    const plates = (await this.http.get<any[]>(`${this.urlDb}succ/${companyId}/${restaurantId}`).toPromise()) || [];
    const formattedPlates = [];

    for (const plate of plates) {
      const formattedPlate: Plate = {
        id: plate.id,
        companyId: plate.idtienda,
        branchId: plate.idsuc,
        menuId: plate.categoryId,
        name: plate.name,
        description: plate.description,
        price: plate.price,
        image: {
          small: 'assets/images/foods/default.png',
          medium: 'assets/images/foods/default.png',
          big: 'assets/images/foods/default.png',
        },
        availibilityCount: plate.availibilityCount,
        cartCount: 0,
        weight: plate.weight,
      };

      formattedPlates.push(formattedPlate);
    }

    return formattedPlates;
  }

  public getMenu(restaurantId: number, companyId: number): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.url}restaurants/${companyId}/${restaurantId}/menu.json`);
  }

  public getMenuDb(restaurantId: number, companyId: number): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.urlDb}categoriasmenu/${companyId}/${restaurantId}`);
  }

  public getFavorites(): Restaurant[] {
    return this.usersService.getUser().favoriteRestaurants || [];
  }

  public addToFavorites(restaurant: Restaurant): boolean {
    const user = this.usersService.getUser();

    if (!user.favoriteRestaurants) {
      user.favoriteRestaurants = [];
    }

    const index = user.favoriteRestaurants.findIndex((data) => data.companyId == restaurant.companyId && data.id == restaurant.id);

    let status = false;

    if (index === -1) {
      user.favoriteRestaurants.push(restaurant);
      status = true;
    } else {
      user.favoriteRestaurants.splice(index, 1);
    }

    this.usersService.setUser(user);

    console.log(this.usersService.getUser(), restaurant);

    return status;
  }

  public getCartList(branchId: number, companyId: number): Plate[] {
    const cartList = this.usersService.getUser().cartList || [];

    const indexCartList = cartList.findIndex((cartList) => cartList.branchId == branchId && cartList.companyId == companyId);

    if (indexCartList !== -1) {
      return cartList[indexCartList].items;
    }

    return [];
  }

  public setCartList(branchId: number, companyId: number, items: Plate[]) {
    const user = this.usersService.getUser();
    const cartList = user.cartList || [];
    const indexCartList = cartList.findIndex((cartList) => cartList.branchId == branchId && cartList.companyId == companyId);

    if (indexCartList !== -1) {
      cartList[indexCartList].items = items;
    }

    user.cartList = cartList;

    this.usersService.setUser(user);
  }

  public removeCartList(branchId: number, companyId: number) {
    const user = this.usersService.getUser();
    const cartList = user.cartList || [];
    const indexCartList = cartList.findIndex((cartList) => cartList.branchId == branchId && cartList.companyId == companyId);

    if (indexCartList !== -1) {
      cartList.splice(indexCartList, 1);

      user.cartList = cartList;

      this.usersService.setUser(user);
    }
  }

  public async addToCart(plate: Plate) {
    const user = this.usersService.getUser();

    if (!user.cartList) {
      user.cartList = [];
    }

    const indexCartList = user.cartList.findIndex((cartList) => cartList.branchId == plate.branchId && cartList.companyId == plate.companyId);

    if (indexCartList === -1) {
      const restaurant = await this.getRestaurant(plate.branchId, plate.companyId);

      const cartList: CartList = {
        id: user.cartList.length + 1,
        name: restaurant.name,
        image: plate.image.medium,
        branchId: plate.branchId,
        companyId: plate.companyId,
        items: [plate],
      };

      user.cartList.push(cartList);

      this.usersService.setUser(user);
    } else {
      const index = user.cartList[indexCartList].items.findIndex((data) => data.id == plate.id);

      if (index === -1) {
        user.cartList[indexCartList].items.push(plate);

        this.usersService.setUser(user);
      }
    }

    this.calculateCartTotal(plate.branchId, plate.companyId);

    console.log(this.usersService.getUser(), plate);
  }

  public calculateCartTotal(branchId: number, companyId: number) {
    this.totalPrice = 0;
    this.totalCartCount = 0;

    const items = this.getCartList(branchId, companyId);

    for (const item of items) {
      this.totalPrice += item.price * item.cartCount;
      this.totalCartCount += item.cartCount;
    }

    this.calculateCartListTotal();
  }

  public calculateCartListTotal() {
    this.totalCartList = (this.usersService.getUser().cartList || []).length;
  }

  public getOrders() {
    return this.usersService.getUser().orderList || [];
  }

  public addOrder(order: Order) {
    const user = this.usersService.getUser();

    if (!user.orderList) {
      user.orderList = [];
    }

    user.orderList.push(order);

    this.usersService.setUser(user);
  }

  public addOrderInfoDb(order: any) {
    return this.http.post(this.urlDb + 'addpedidos', order);
  }

  public addOrderDb(order: any) {
    return this.http.post(this.urlDb + 'addpedidoscomi', order);
  }
}
