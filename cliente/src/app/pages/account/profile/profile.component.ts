import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from '../../../users/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public infoForm!: FormGroup;
  constructor(public formBuilder: FormBuilder, public snackBar: MatSnackBar, private UsersService: UsersService) {}

  ngOnInit() {
    this.infoForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.minLength(3)])],
      email: [''],
      phone: [''],
      image: null,
    });
  }

  public async onInfoFormSubmit(): Promise<boolean> {
    const users = await this.UsersService.getUsersFromBd().toPromise();
    const currentUser = this.UsersService.getUser();
    const data = {
      Usuario: this.infoForm.get('name')?.value,
      Correo: this.infoForm.get('email')?.value,
    };
    const fields = ['Usuario', 'Correo'];

    if (!this.infoForm.valid || !this.isUnique(users, fields, data) || (data.Usuario === '' && data.Correo === '')) {
      return false;
    }

    const user = {
      name: data.Usuario || currentUser.username,
      email: data.Correo || currentUser.contacts?.email,
    };

    await this.UsersService.editUser(currentUser.id || -1, user)
      .toPromise()
      .catch((err) => {
        console.log(err);
      });

    const userUpdated = {
      username: user.name,
      contacts: {
        email: user.email,
      },
    };

    this.UsersService.updateUser(userUpdated);

    this.snackBar.open('Datos actualizados', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });

    this.infoForm.reset();

    return true;
  }

  public isUnique(users: any[], fields: string[], data: any) {
    for (const field of fields) {
      for (const user of users) {
        if (user[field] == data[field]) {
          return false;
        }
      }
    }

    return true;
  }

  public fileChange(files: any) {
    if (files.length) {
      this.infoForm.controls.image.patchValue(files[0].content);
    } else {
      this.infoForm.controls.image.patchValue(null);
    }
  }
}
