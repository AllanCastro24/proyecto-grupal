import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppSettings, Settings } from '../../app.settings';
import { User, usuario } from './user.model';
import { UsersService } from './users.service';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ UsersService ]  
})
export class UsersComponent implements OnInit {
    public users: User[] = [];
    public usuarios: usuario[] = [];
    public searchText: string = '';
    public page:any;
    public settings: Settings;
    public maxSize:number = 5;
    public autoHide:boolean = true;
    constructor(public appSettings:AppSettings, 
                public dialog: MatDialog,
                public usersService:UsersService){
        this.settings = this.appSettings.settings; 
    }

    ngOnInit() {
        this.getUsers();//llamado a consulta de empleado
        this.getUsuario();//llamado a consulta de usuarios
    }
    //Llamado a la api de empleados
    public getUsers(): void {
        this.users = []; //for show spinner each time
        this.usersService.getUsers().subscribe(users => this.users = users);    
    }
    //Llamado a la api de usuarios
    public getUsuario(): void {
        this.usuarios = []; //for show spinner each time
        this.usersService.getUsuarios().subscribe(usuarios => this.usuarios = usuarios);    
    }

    public agregarEmpleado(user:User){
        this.usersService.agregarEmpleado(user).subscribe(user => this.getUsers());
    }
    public actualizarEmpleado(user:User){
        this.usersService.modificarEmpleado(user).subscribe(user => this.getUsers());
    }
    public onPageChanged(event:any){
        this.page = event;
        this.getUsers();
        window.scrollTo(0,0);
    }

    public openUserDialog(user:User | usuario){
        let dialogRef = this.dialog.open(UserDialogComponent, {
            data: user
        });
        dialogRef.afterClosed().subscribe(user => {
            if(user){
                (user.ID_empleado) ? this.actualizarEmpleado(user) : this.agregarEmpleado(user);
            }
        });
    }
    //Validación de campos 
    public validarActivo(user:User){
        if(user.Activo == "S"){
            return false;
        }else{
            return true;
        }
    }

    public validarUsuarioActivo(usuario:usuario){
        if(usuario.Activo == "S"){
            return false;
        }else{
            return true;
        }
    }

    public ActivarDesactivar(user:User){
        if(user.Activo == "S"){
            //Desactivar
            console.log("Desactivando...")
            this.desactivarUser(user);
        }else{
            //Activar
            console.log("Activando...")
            this.activarUser(user);
        }
    }

    public ActivarDesactivarUsuario(usuario:usuario){
        if(usuario.Activo == "S"){
            //Desactivar
            console.log("Desactivando...")
            this.desactivarUsuario(usuario);
        }else{
            //Activar
            console.log("Activando...")
            this.activarUsuario(usuario);
        }
    }
    //llamada a desactivar / activar
    public desactivarUser(user:User){//Empleados
        this.usersService.desactivarUser(user).subscribe(user => this.getUsers());
    }
    public activarUser(user:User){
        this.usersService.activarUser(user).subscribe(user => this.getUsers());
    }

    public desactivarUsuario(usuario:usuario){
        this.usersService.desactivarUsuario(usuario).subscribe(usuario => this.getUsuario());
    }
    public activarUsuario(usuario:usuario){
        this.usersService.activarUsuario(usuario).subscribe(usuario => this.getUsuario());
    }
}