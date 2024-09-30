import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

// 目标 Controller 之前之后的处理
//
// 有的同学可能会觉得 Interceptor 和 Middleware 差不多，其实是有区别的，主要在于参数的不同。
// interceptor 可以拿到调用的 controller 和 handler：
//
@Injectable()
export class TimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('getClass==>', context.getClass())
    console.log('getHandler==>', context.getHandler())

    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        console.log('time: ', Date.now() - startTime);
      })
    );
  }
}
