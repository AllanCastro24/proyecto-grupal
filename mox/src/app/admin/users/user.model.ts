export class User {
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
}