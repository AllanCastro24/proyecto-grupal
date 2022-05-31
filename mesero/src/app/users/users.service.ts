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
  public _isLoggedIn = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = 'auth-token';

  public isLoggedIn = this._isLoggedIn.asObservable();
  public user!: User;

  // public url = environment.url + '/users/';
  public url = 'http://localhost:3000/users/';

  constructor(private http: HttpClient) {
    this._isLoggedIn.next(Object.keys(this.getUser()).length !== 0);

    console.log(this.getUser());
  }

  login(login: User): Observable<Data> {
    return this.http.post<Data>(this.url + 'login', login).pipe(
      tap((res: Data) => {
        if (res.success) {
          this._isLoggedIn.next(true);
          this.setUser(res.data);
        }
      })
    );
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
}
