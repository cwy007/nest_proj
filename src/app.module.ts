import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AaaModule } from './aaa/aaa.module';
import { XxxModule } from './xxx/xxx.module';
import { PersonModule } from './person/person.module';
import { BookModule } from './book/book.module';
import { Person2Module } from './person2/person2.module';
import { CccModule } from './ccc/ccc.module';
import { DddModule } from './ddd/ddd.module';
import { LogMiddleware } from './log.middleware';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';
import { HostController } from './host.controller';
import { CwyLoggerModule } from './cwy-logger/cwy-logger.module';
import { MyLogger3 } from './MyLogger3';
import { LoggerModule } from './logger/logger.module';

// 这些自定义 provider 的方式里，最常用的是 useClass，不过我们一般会用简写，也就是直接指定 class。
// useClass 的方式由 IoC 容器负责实例化，我们也可以用 useValue、useFactory 直接指定对象。
// useExisting 只是用来起别名的，有的场景下会用到。

@Module({
  imports: [AaaModule, XxxModule, PersonModule, BookModule, Person2Module, CccModule, DddModule, CwyLoggerModule, LoggerModule],
  controllers: [AppController, HostController],
  providers: [
    AppService,
    MyLogger3,
    {
      provide: 'app_service',
      useClass: AppService,
    },
    {
      provide: 'person',
      useValue: {
        name: 'cwy007',
        age: 32,
      }
    },
    {
      provide: 'person2',
      useFactory() {
        return {
          name: 'cgs007',
          age: 58,
        }
      }
    },
    {
      provide: 'person3',
      // 这个 useFactory 支持通过参数注入别的 provider：
      useFactory(person: { name: string }, appService: AppService) {
        return {
          name: person.name,
          desc: appService.getHello()
        }
      },
      inject: ['person', AppService], // 指定 useFactory 的参数
    },
    // useFactory 支持异步
    {
      provide: 'person4',
      async useFactory() {
        await new Promise((resolve) => {
          setTimeout(resolve, 3000);
        });
        return {
          name: 'bbb',
          desc: 'ccc',
        }
      },
    },
    // provider 还可以通过 useExisting 来指定别名
    {
      provide: 'fooo', // 这个是别名
      useExisting: 'person4',
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: LoginGuard, // 启用全局-路由守卫-方式2
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: TimeInterceptor, // 全局启用拦截器，作用于所有controller
    // },
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidatePipe, // 全局生效
    // },
    // {
    //   provide: APP_FILTER, // 全局生效
    //   useClass: TestFilter,
    // }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('aaa*'); // 路由中间件
  }
}
