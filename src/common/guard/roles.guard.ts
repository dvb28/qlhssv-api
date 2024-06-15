import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { Role } from '../enums/users/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Exception
    try {
      const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      // Check role require for route
      if (!requiredRoles) return true;

      // Get user from request
      const request = context.switchToHttp().getRequest();

      // Get roles
      const roles = this.extractRolesFromHeader(request);

      // Check is route match
      if (!requiredRoles.some((role) => roles?.includes(role))) throw Error();

      // Return true
    } catch (error) {
      // Throw error
      throw new HttpException(
        'Tài khoản này không có quyền truy cập tài nguyên này',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  // Get token from header
  private extractRolesFromHeader(request: any): string | undefined {
    // Get type and token from request headers
    const roles = request.headers?.roles?.split(' ') ?? [];

    // Return
    return roles;
  }
}
