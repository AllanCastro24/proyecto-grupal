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
    
    //Activar usuario
    activarUser(id: number) {
        return this.http.delete(this.api + "api/usuarios/activar/" + id);
    }
    desactivarUser(id: number) {
        return this.http.delete(this.api + "/api/usuarios/desactivar" + id);
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