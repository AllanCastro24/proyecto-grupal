import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, usuario } from './user.model';

@Injectable()
export class UsersService {
    public url = "";
    public api = "http://localhost:8888/proyecto-grupal-backend/public/";

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

    addUser(user:User){	    
        return this.http.post(this.url, user);
    }

    updateUser(user:User){
        return this.http.put(this.url, user);
    }

    deleteUser(id: number) {
        return this.http.delete(this.url + "/" + id);
    } 
} 