//Modelo de empleado
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
  ID_sucursal: number = 0;
  Sueldo: number = 0;
  Correo: string = '';
  Telefono: string = '';
  Direccion: string = '';  
  Activo: string = '';
  Fecha_registro!: Date;
  Ultimo_ingreso!: Date;
}

//Modelo de usuario
export class usuario{
  ID_usuario: number = 0;
  Usuario: string = '';
  pass: string = '';
  Activo: string = '';
  Fecha_registro!: Date;
  Ultimo_ingreso!: Date;
  Correo: string = '';
  image: string = '';
}