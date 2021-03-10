import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
export declare class AuthGuardGQL implements CanActivate {
    private readonly authService;
    constructor(authService: AuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export declare class AuthGuard implements CanActivate {
    private readonly authService;
    constructor(authService: AuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
