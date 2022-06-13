import { InMemoryDbService } from 'angular-in-memory-web-api';
export class UsersData implements InMemoryDbService {
  createDb() {
    const users = [
        {
            id: 1,
            username: "alan",
            password: "alancastro24",
            profile: {
                name: "Allan",
                surname: "Castro",
                birthday: new Date(2000,8,12),
                gender: "hombre",
                image: "assets/images/profile/perfil.jpeg"
            },
            work: {
                company: "Tiendita doña panchita",
                position: "Mesero",
                salary: 750
            },
            contacts:{
                email: "alan.castro.1226.ac@gmail.com",
                phone: "(668) 144-3027",
                address: "Pioneros #1992 Col. Ampliación San fernando"
            },
            settings:{
                isActive: true,
                isDeleted: false,
                registrationDate: "2012-10-13T12:20:40.511Z",
                joinedDate: "2017-04-21T18:25:43.511Z"
            }
        },
        {
            id: 2,
            username: "alo123",
            password: "Alondra123",
            profile: {
                name: "Alondra",
                surname: "Gardea",
                birthday: new Date(2000,12,15),
                gender: "mujer",
                image: "assets/images/profile/alondra.jpg"
            },
            work: {
                company: "Tiendita doña panchita",
                position: "Cajera",
                salary: 1500
            },
            contacts:{
                email: "alondra.gardea24@gmail.com",
                phone: "(687) 157-1062",
                address: "Col. Lopez Vargas, calle mazatlan poste 25"
            },
            settings:{
                isActive: true,
                isDeleted: false,
                registrationDate: "2011-01-05T08:45:23.511Z",
                joinedDate: "2017-05-20T18:25:43.511Z"
            }
        },{
            id: 3,
            username: "brandon",
            password: "brandon123",
            profile: {
                name: "Brandon",
                surname: "Jimenez",
                birthday: new Date(1998,3,8),
                gender: "hombre",
                image: "assets/images/profile/brandon.jpg"
            },
            work: {
                company: "Tiendita doña panchita",
                position: "Conserje",
                salary: 5000
            },
            contacts:{
                email: "brandon@gmail.com",
                phone: "(668) 208-7177",
                address: "Saul Aguilar Pico # 3277 Col. Nuevo horizonte"
            },
            settings:{
                isActive: true,
                isDeleted: false,
                registrationDate: "2012-10-13T12:20:40.511Z",
                joinedDate: "2017-04-21T18:25:43.511Z"
            }
        }];
    return {users};
  }
}