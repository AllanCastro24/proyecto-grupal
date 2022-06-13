import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'UserSearchPipe', pure: false })
export class UserSearchPipe implements PipeTransform {
  transform(value:any, args?:any) {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter((user:any) => {
        if (user.Nombre) {
          return user.Nombre.search(searchText) !== -1;
        }
        else{
          return user.Usuario.search(searchText) !== -1;
        }
      });
    }
  }
}