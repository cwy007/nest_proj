import { PartialType } from '@nestjs/mapped-types';
import { CreateCwyLoggerDto } from './create-cwy-logger.dto';

export class UpdateCwyLoggerDto extends PartialType(CreateCwyLoggerDto) {}
