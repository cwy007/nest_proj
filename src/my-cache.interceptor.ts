import { RedisClientType } from 'redis';
import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class MyCacheInterceptor implements NestInterceptor {
  @Inject('REDIS_CLIENT')
  private readonly redisClient: RedisClientType;

  @Inject(HttpAdapterHost)
  private readonly httpAdapterHost: HttpAdapterHost;

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {

    const request = context.switchToHttp().getRequest();

    const key = this.httpAdapterHost.httpAdapter.getRequestUrl(request);


    const value = await this.redisClient.get(key) as string;
    console.log('key==>', key, value);

    if (!value) {
      return next.handle().pipe(
        // tap 是 rxjs 的一个操作符，可以在 Observable 的数据流中执行副作用操作，而不改变数据流本身。
        // 在这里，我们使用 tap 来将处理结果缓存到 Redis 中。
        tap(async (result) => {
          // EX 是以秒为单位设置过期时间，PX 是以毫秒为单位设置过期时间。这里我们使用 PX 设置过期时间为10秒。
          await this.redisClient.set(key, JSON.stringify(result), { PX: 10000 }); // 设置缓存过期时间为10秒
        }),
      );
    } else {
      return of(JSON.parse(value)); // of 是 rxjs 的一个创建操作符，用于将一个值转换为 Observable。在这里，我们将从 Redis 中获取的字符串值解析为对象，并返回一个 Observable。
    }
  }
}
