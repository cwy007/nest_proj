import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NextFunction, Request, Response } from 'express';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';
import * as session from 'express-session';
import { VersioningType } from '@nestjs/common';
import { MyLogger } from './MyLogger';
import { MyLogger3 } from './MyLogger3';

const PORT = 3000;

// main.ts 是负责启动 Nest 的 ioc 容器的
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    // logger: new MyLogger()
    // bufferLogs: true,
  });
  // app.useLogger(app.get(MyLogger3))
  app.useLogger(new MyLogger())
  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/static' });
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  // 全局中间件
  // 不需要依赖注入的情况
  app.use(function(req: Request, res: Response, next: NextFunction) {
    console.log('before-->', req.url);
    next();
    console.log('after-->', req.url);
  });

  // 那为什么都是声明全局 Guard，需要有两种方式呢？
  // 因为方式1是手动 new 的 Guard 实例，不在 IoC 容器里：
  // 而用 provider 的方式声明的 Guard 是在 IoC 容器里的，可以注入别的 provider：
  //
  // app.useGlobalGuards(new LoginGuard()); // 全局路由守卫 - 方式1

  // 全局启用，作用域全部controller
  // app.useGlobalInterceptors(new TimeInterceptor());

  // 全局生效
  // app.useGlobalPipes(new ValidatePipe());

  // 全局生效
  // app.useGlobalFilters(new TestFilter());

  // 指定加密的密钥和 cookie 的存活时间。
  app.use(session({
    secret: 'guang',
    cookie: { maxAge: 100000 },
  }));

  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'version',
  })

  app.enableCors(); // 开启跨域支持

  await app.listen(PORT);
  console.log(`visit http://localhost:${PORT}`);

  // 3s 后调用 app.close() 触发销毁（app.close() 只是触发销毁逻辑，但不会真正退出进程）
  // setTimeout(() => {
  //   app.close(); // 测试声明周期
  // }, 3000)
}

bootstrap();
