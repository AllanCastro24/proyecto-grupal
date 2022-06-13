import { Component, OnInit } from '@angular/core';
import { Position, User } from 'src/app/users/users';
import { UsersService } from 'src/app/users/users.service';
import { RestaurantService } from '../../restaurants/restaurant.service';
import { Company, Restaurant } from '../../restaurants/restaurants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user!: User;

  company!: Company;
  branch!: Restaurant;
  position!: Position;

  constructor(public usersService: UsersService, private restaurantService: RestaurantService) {}

  async ngOnInit() {
    this.user = this.usersService.getUser();

    const companyId = Number(this.user.work?.companyId);
    const branchId = Number(this.user.work?.branchId);
    const positionId = Number(this.user.work?.positionId);
    
    this.company = await this.restaurantService.getCompany(companyId);
    this.branch = await this.restaurantService.getRestaurant(branchId, companyId);
    this.position = await this.restaurantService.getPosition(positionId);
  }
}
