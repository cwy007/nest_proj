import { Global, Module } from '@nestjs/common';
import { MyLogger } from 'src/MyLogger';
import { MyLogger3 } from 'src/MyLogger3';

@Global()
@Module({
  providers: [MyLogger],
  exports: [MyLogger],
})
export class LoggerModule {}
