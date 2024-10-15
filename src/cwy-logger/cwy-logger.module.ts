import { Module } from '@nestjs/common';
import { CwyLoggerService } from './cwy-logger.service';
import { CwyLoggerController } from './cwy-logger.controller';

@Module({
  controllers: [CwyLoggerController],
  providers: [CwyLoggerService]
})
export class CwyLoggerModule {}
