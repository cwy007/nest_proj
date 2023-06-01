import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AaaModule } from './aaa/aaa.module';
import { XxxModule } from './xxx/xxx.module';
import { PersonModule } from './person/person.module';

@Module({
  imports: [AaaModule, XxxModule, PersonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
