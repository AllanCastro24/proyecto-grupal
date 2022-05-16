import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/users/users';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user!: User;
  
  constructor(public usersService: UsersService) {}

  ngOnInit(): void {
    this.user = this.usersService.getUser();
  }
}
