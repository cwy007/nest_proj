import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { Reflector } from '@nestjs/core';

// Guard 是路由守卫的意思，可以用于在调用某个 Controller 之前判断权限，返回 true 或者 false 来决定是否放行：
// 路由的权限控制
//
@Injectable()
export class LoginGuard implements CanActivate {
  // 所以，当需要注入别的 provider 的时候，就要用第二种全局 Guard 的声明方式。
  @Inject(AppService)
  private appService: AppService;

  @Inject(Reflector)
  private readonly reflector: Reflector;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('login check--->', this.appService.getHello());
    // return false;

    const classMetadata = this.reflector.get('roles', context.getClass());
    const methodMetadata = this.reflector.get('roles', context.getHandler());

    console.log('classMetadata-->roles', classMetadata)
    console.log('methodMetadata-->roles', methodMetadata)

    return true;
  }
}
