import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Data, Success, User } from './users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = 'auth-token';

  public isLoggedIn = this._isLoggedIn.asObservable();
  public user!: User;

  // public url = environment.url + '/users/';
  public url = 'http://localhost/proyecto-grupal-backend/';

  constructor(private http: HttpClient) {
    this._isLoggedIn.next(Object.keys(this.getUser()).length !== 0);

    console.log(this.getUser());
  }

  login(login: User): any {
    return this.http.post<any>(this.url + 'api/usuarios/login', login).pipe(
      tap((res: any) => {
        if (this._login(res)) {
          this._isLoggedIn.next(true);
          this.setupUser(res);
        }
      })
    );
  }

  _login(res: any): boolean {
    return res !== 'Usuario o contraseña incorrecto' && res.Activo === 'S';
  }

  logout() {
    this._isLoggedIn.next(false);
    localStorage.removeItem(this.TOKEN_NAME);

    window.location.reload();
  }

  signup(user: User): Observable<Success> {
    return this.http.post<Success>(this.url + 'add', user);
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem(this.TOKEN_NAME) || '{}');
  }

  setUser(user: User) {
    localStorage.setItem(this.TOKEN_NAME, JSON.stringify(user));
  }

  setupUser(user: any) {
    const userData: User = {
      id: user.ID_usuario,
      username: user.Usuario,
      profile: { image: user.image },
      contacts: { email: user.Correo },
    };

    this.setUser(userData);
  }

  public changePassword(password: any): Observable<any> {
    return this.http.put<any>(this.url + 'api/usuarios/modificar_pass/' + this.getUser().id, password);
  }
}
