import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = 'auth-token';

  public isLoggedIn = this._isLoggedIn.asObservable();
  public user!: User;

  public url = 'http://localhost/proyecto-grupal-backend/';

  constructor(private http: HttpClient) {
    this._isLoggedIn.next(this.getCurrentUser() !== -1);

    console.log(this.getUser());
  }

  login(login: User): any {
    return this.http.post<any>(this.url + 'api/usuarios/login', login).pipe(
      tap(async (res: any) => {
        if (await this._login(res)) {
          this._isLoggedIn.next(true);
          this.setupUser(res);
        }
      })
    );
  }

  simpleLogin(login: any): Observable<any> {
    return this.http.post<any>(this.url + 'api/usuarios/login', login);
  }

  async _login(res: any): Promise<boolean> {
    const employee = await this.getEmployee(res)
      .toPromise()
      .catch((err) => {
        console.log(err);
      });

    return (
      res !== 'Usuario o contraseña incorrecto' &&
      res.Activo === 'S' &&
      employee !== 'No es empleado' &&
      (employee.ID_puesto == 3 || employee.ID_puesto == 6)
    );
  }

  getEmployee(user: any) {
    return this.http.post<any>(this.url + 'api/usuarios/buscarUser', user);
  }

  logout() {
    this._isLoggedIn.next(false);
    let users: User[] = this.getUsers();

    users = users.map((u) => {
      u.default = false;
      return u;
    });

    localStorage.setItem(this.TOKEN_NAME, JSON.stringify(users));

    window.location.reload();
  }

  signup(user: User): Observable<any> {
    return this.http.post<any>(this.url + 'api/usuarios/add', user);
  }

  getCurrentUser(): number {
    const users = this.getUsers();
    const index = users.findIndex((u) => u.default);

    if (index !== -1) {
      this.user = users[index];
    }

    return index;
  }

  getUser(): User {
    return (this.user || {}).default ? this.user : <User>{};
  }

  getUsers(): User[] {
    const users = localStorage.getItem(this.TOKEN_NAME);

    if (!users) {
      localStorage.setItem(this.TOKEN_NAME, JSON.stringify([]));

      return [];
    }

    return JSON.parse(users);
  }

  setUser(user: User, setDefault: boolean = false) {
    this.user = user;

    let users: User[] = this.getUsers();
    const index = users.findIndex((u) => u.id === user.id);

    if (setDefault) {
      users = users.map((u) => {
        u.default = false;
        return u;
      });
    }

    if (index !== -1) {
      const _user: any = user;

      _user.default = true;

      for (const key in _user) {
        (users as any)[index][key] = _user[key];
      }
    } else {
      users.push(user);
    }

    localStorage.setItem(this.TOKEN_NAME, JSON.stringify(users));
  }

  async setupUser(user: any) {
    const employee = await this.getEmployee(user).toPromise();
    const userData: User = {
      id: user.ID_usuario,
      default: true,
      username: user.Usuario,
      profile: {
        image: user.image,
        name: employee.Nombre,
        surname: employee.Apellidos,
        gender: employee.Genero,
      },
      contacts: {
        email: user.Correo,
        phone: employee.Telefono,
      },
      work: {
        companyId: employee.ID_tienda,
        branchId: employee.ID_sucursal,
        positionId: employee.ID_puesto,
        salary: employee.Sueldo,
      },
    };

    this.setUser(userData, true);
  }

  updateUser(user: any) {
    const currentUser = this.getUser();

    for (const key in currentUser) {
      if (user[key]) {
        (currentUser as any)[key] = user[key];
      }
    }

    this.setUser(currentUser);
  }

  public changePassword(password: any, id: number = 0): Observable<any> {
    const userId = id || this.getUser().id;

    return this.http.put<any>(this.url + 'api/usuarios/modificar_pass/' + userId, password);
  }

  public getUsersFromBd(): Observable<any> {
    return this.http.get<any>(this.url + 'api/usuarios/consultar_usuarios');
  }

  public editUser(userId: number, user: any): Observable<any> {
    return this.http.put<any>(this.url + 'api/usuarios/modificar/' + userId, user);
  }
}
