import { Injectable } from '@nestjs/common';
import { CreateCwyLoggerDto } from './dto/create-cwy-logger.dto';
import { UpdateCwyLoggerDto } from './dto/update-cwy-logger.dto';

@Injectable()
export class CwyLoggerService {
  create(createCwyLoggerDto: CreateCwyLoggerDto) {
    return 'This action adds a new cwyLogger';
  }

  findAll() {
    return `This action returns all cwyLogger`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cwyLogger`;
  }

  update(id: number, updateCwyLoggerDto: UpdateCwyLoggerDto) {
    return `This action updates a #${id} cwyLogger`;
  }

  remove(id: number) {
    return `This action removes a #${id} cwyLogger`;
  }
}
