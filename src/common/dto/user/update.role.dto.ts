import { IsNotEmpty } from 'class-validator';

export class UsersUpdateRoleDto {
  @IsNotEmpty({ message: 'ID không được trống' })
  id: string;

  @IsNotEmpty({ message: 'Quyền không được trống' })
  roles: string;
}
