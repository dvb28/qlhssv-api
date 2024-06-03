import { GenderEnum } from 'src/common/enums/students/gender.enum';

export class UsersDto {
  id: string;
  email: string;
  fullname: string;
  phone: string;
  gender: GenderEnum;
  avatar: string;
  created_at: Date;
  updated_at: Date;

  constructor(object: any) {
    this.id = object.id;
    this.email = object.email;
    this.fullname = object.fullname;
    this.phone = object.phone;
    this.gender = object.gender;
    this.avatar = object.avatar;
    this.created_at = object.created_at;
    this.updated_at = object.updated_at;
  }
}
