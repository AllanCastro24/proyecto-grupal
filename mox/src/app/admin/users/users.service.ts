import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, usuario } from './user.model';

@Injectable()
export class UsersService {
    public url = "";
    public api = "http://localhost:8888/";

    constructor(public http:HttpClient) { }
    //Consulta de empleados
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.api+"api/usuarios/consultar_empleado");
    }
    //Consulta de usuarios
    getUsuarios():Observable<usuario[]> {
        return this.http.get<usuario[]>(this.api+"api/usuarios/consultar_usuarios");
    }
    
    //Activar/desactivar usuario
    activarUser(user:User){
        return this.http.put(this.api + "api/usuarios/activar/"+user.ID_usuario,user);
    }
    desactivarUser(user:User) {
        return this.http.put(this.api + "api/usuarios/desactivar/"+user.ID_usuario,user);
    } 

    activarUsuario(usuario:usuario){
        return this.http.put(this.api + "api/usuarios/activar/"+usuario.ID_usuario,usuario);
    }
    desactivarUsuario(usuario:usuario) {
        return this.http.put(this.api + "api/usuarios/desactivar/"+usuario.ID_usuario,usuario);
    } 
    //Modificar empleado desde el admin
    modificarEmpleado(user:User) {
        return this.http.put(this.api + "api/empleado/modificar/"+user.ID_empleado,user);
    }
    //Agregar empleado (contratación)
    agregarEmpleado(user:User) {
        return this.http.post(this.api + "api/empleado/add",user);
    }
    //Agregar usuario (Registro)
    agregarUser(user:any){	    
        return this.http.post(this.api + "api/usuarios/add", user);
    }
    //Modificar usuario
    modificarUser(user:any,id:number){	    
        return this.http.put(this.api + "api/usuarios/modificar/"+id, user);
    }
    //Modificar contraseña de usuario
    modificarPass(user:any,id:number){
        return this.http.put(this.api + "api/usuarios/modificar/"+id, user);
    }
    //Login
    login(user:any){	    
        return this.http.post(this.api + "api/usuarios/login", user);
    }
} 