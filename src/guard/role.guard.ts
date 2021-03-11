import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { AuthService } from 'src/service/auth.service';
import { ROLE } from 'src/utils';

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(
        // private readonly authService: AuthService,
        private readonly roles: ROLE[]
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = await GqlExecutionContext.create(context).getContext();
        console.log(ctx.req);
        console.log(this.roles);
        
        return false;
        throw new Error('Method not implemented.');
    }

}