export class User {
  ID_usuario: number = 0;
  ID_empleado: number = 0;
  Usuario: string = '';
  pass: string = '';  
  Nombre: string = '';
  Apellidos: string = '';  
  Genero: string = '';
  image: string = '';
  ID_tienda: number = 0;
  ID_tipo_pago: number = 0;
  ID_puesto: number = 0;
  Sueldo: number = 0;
  Correo: string = '';
  Telefono: string = '';
  Direccion: string = '';  
  Activo: string = '';
  Fecha_registro!: Date;
  Ultimo_ingreso!: Date;
}


//Asi estaba antes
/**export class User {
  id: number = 0;
  username: string = '';
  password: string = '';  
  profile!: UserProfile;
  work!: UserWork;
  contacts!: UserContacts;
  settings!: UserSettings;
}

export class UserProfile {  
  name: string = '';
  surname: string = '';  
  gender: string = '';
  image: string = '';
}

export class UserWork {
  company: string = '';
  position: string = '';
  salary: number = 0;
}

export class UserContacts{
  email: string = '';
  phone: string = '';
  address: string = '';  
}

export class UserSettings{
  isActive: boolean = false;
  isDeleted: boolean = false;
  registrationDate!: Date;
  joinedDate!: Date;
}**/