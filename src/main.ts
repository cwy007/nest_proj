import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NextFunction, Request, Response } from 'express';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';

const PORT = 3009;

// main.ts 是负责启动 Nest 的 ioc 容器的
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/static' });

  // 全局中间件
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

  await app.listen(PORT);
  console.log(`visit http://localhost:${PORT}`);

  // 3s 后调用 app.close() 触发销毁（app.close() 只是触发销毁逻辑，但不会真正退出进程）
  // setTimeout(() => {
  //   app.close();
  // }, 3000)
}

bootstrap();
