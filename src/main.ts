import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

const PORT = 3009;

// main.ts 是负责启动 Nest 的 ioc 容器的
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/static' });
  await app.listen(PORT);
  console.log(`visit http://localhost:${PORT}`);
}

bootstrap();
