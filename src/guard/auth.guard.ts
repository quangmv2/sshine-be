import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthGuardGQL implements CanActivate {

    constructor(private readonly authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = await GqlExecutionContext.create(context).getContext();
        let token = ctx.req.headers.authorization;
        const user = await this.authService.verifyToken(token);
        if (!user) return false;
        console.log(user);
        
        ctx.req.user = user;
        ctx.req.token = token;
        return true;
    }

}

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(private readonly authService: AuthService){}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const req = context.switchToHttp().getRequest();
        const token = req && req.headers.authorization;
        const user = await this.authService.verifyToken(token);
        if (!user) return false;
        req.user = user;
        return true;
    }
}