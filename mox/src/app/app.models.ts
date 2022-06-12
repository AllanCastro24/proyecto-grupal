export class Restaurant {
    constructor(public id: number,
                public name: string,
                public address: string,
                public phone: string){}
}

export class Employee {
    constructor(public id: number,
                public image: string,
                public firstName: string,
                public lastName: string,
                public middleName: string,
                public email: string,
                public phone: string,
                public addresses: Address[], 
                public position: Position){}
}

//['General Manager','Assistant Manager'] ... https://aptito.com/blog/restaurant-positions-and-descriptions
export class Position {
    constructor(public id: number,
                public name: string){}
}

export class Address {
    constructor(public id: number,
                public country: Country, 
                public city: string,
                public place: string,
                public postalCode: string,
                public addressLine: string){}
}

export class Country {
    constructor(public name: string,
                public code: string){}
}

export class Customer {
    constructor(public id: number,
                public fullName: string, 
                public email: string,
                public phoneNumber: string,
                public address: string){}
}

export class Reservation {
    constructor(public id: number,
                public date: string,
                public time: string,
                public customer: Customer,
                public guests: number,
                public tableNumber: number,
                public status: ReservationStatus){}
} 

// Approved, Cancelled, Pending
export class ReservationStatus {
    constructor(public id: number,
                public name: string){}
}
 

export class Order {
    constructor(//public id: number,
                //public date: string,
                //public items: MenuItem[],
                //public quantity: number,
                //public amount: number,
                //public status: OrderStatus,
                public id: number,
                public idcli: number,
                public name: string,
                public description: MenuItem[],
                public price: number,
                public cartCount: number,
                public estatus: string,
                public image: string,
                public firstName: string,
                public lastName: string,
                public email: string,
                public phone: number,
                public city: string,
                public place: string,
                public postalCode: string,
                public address: string,
                public descr: string,
                public namee: string,
                
                public valuee: string,
                public cardNumber: string,
                public nameee: string,
                public descri: string,


                ){}
}  
export class Transaction {
    constructor(//public id: number,
                //public date: string,
                //public items: MenuItem[],
                //public quantity: number,
                //public amount: number,
                //public status: OrderStatus,
                public id: number,
                public idcli: number,
                public idsuc: number,
                public idtienda: number,
                public name: string,
                public description: MenuItem[],
                public price: number,
                public cartCount: number,
                public estatus: string,
                public image: string,
                public firstName: string,
                public lastName: string,
                public email: string,
                public phone: number,
                public city: string,
                public place: string,
                public postalCode: string,
                public address: string,
                public descr: string,
                public namee: string,
                public valuee: string,
                public cardNumber: string,


                ){}
}  
//Completed, Processing, On Hold, Refunded, Pending
export class OrderStatus {
    constructor(public id: number,
                public name: string){}
}

export class MenuItem {
    constructor(public idtienda: number,
        public idsuc: number,
        public id: number,
                public name: string,
                public description: string,
                public price: number,
                public image: string,
                public discount: number,
                public ratingsCount: number,
                public ratingsValue: number,
                public availibilityCount: number,
                public cartCount: number,
                public weight: number,
                public isVegetarian: boolean,
                public categoryId: number,
                public descripcion: string){}
}

export class MenuItemImage {
    constructor(public small: string,
                public medium: string,
                public big: string){ }
}

export class Category {
    [x: string]: any;
    constructor(public id: number,
                public idtienda: number,
                public idsucursal: number,
                public name: string,
                public description: string,
                public estatus: string){ }
}   

export class Tiendas {
    constructor(public ID_tienda: number,
                public Nombre: string,
                public Telefono: string,
                public Correo: string,
                public Fecha: string){ }
}   
export class Horario {
    constructor(
        public ID_horario: number,
        public InicioLunes: string,
        public FinLunes: string,
        public InicioMartes: string,
        public FinMartes: string,
        public InicioMiercoles: string,
        public FinMiercoles: string,
        public InicioJueves: string,
        public FinJueves: string,
        public InicioViernes: string,
        public FinViernes: string,
        public InicioSabado: string,
        public FinSabado: string,
        public InicioDomingo: string,
        public FinDomingo: string,){ }
} 

export class Sucursales {
    constructor(public ID_sucursal: number,
                public Pseudonimo: string,
                public Ubicacion: string,
                public Fechaalta: string,
                public Status: string,
                public ID_zonasucursal: number,
                public ID_empleado: number,
                public ID_tienda: number,
                public ID_horario: number,
                ){ }
}  

export class Unidades {
    constructor(public id: number,
                public name: string,
                ){ }
}  

export class Pagination {
    constructor(public page: number,
                public perPage: number,
                public prePage: number | null,
                public nextPage: number | null,
                public total: number,
                public totalPages: number){ }
}

