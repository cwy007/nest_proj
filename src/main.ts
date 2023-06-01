import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 3009;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // await app.listen(3000);
  await app.listen(PORT);
  console.log(`visit http://localhost:${PORT}`);
}
bootstrap();
