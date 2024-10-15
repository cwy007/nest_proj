import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, Inject } from '@nestjs/common';
import { CwyLoggerService } from './cwy-logger.service';
import { CreateCwyLoggerDto } from './dto/create-cwy-logger.dto';
import { UpdateCwyLoggerDto } from './dto/update-cwy-logger.dto';
import { MyLogger } from 'src/MyLogger';

@Controller('cwy-logger')
export class CwyLoggerController {
  private logger = new Logger();

  // @Inject(MyLogger)
  // private myLogger: MyLogger

  constructor(private readonly cwyLoggerService: CwyLoggerService) {}

  @Get()
  getHello(): string {
    this.logger.debug('aaa', CwyLoggerController.name);
    this.logger.error('bbb', CwyLoggerController.name);
    this.logger.log('ccc', CwyLoggerController.name);
    this.logger.verbose('ddd', CwyLoggerController.name);
    this.logger.warn('eee', CwyLoggerController.name);
    // this.myLogger.warn('eee2', CwyLoggerController.name);

    return this.cwyLoggerService.findAll();
  }

  @Post()
  create(@Body() createCwyLoggerDto: CreateCwyLoggerDto) {
    return this.cwyLoggerService.create(createCwyLoggerDto);
  }

  @Get()
  findAll() {
    return this.cwyLoggerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cwyLoggerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCwyLoggerDto: UpdateCwyLoggerDto) {
    return this.cwyLoggerService.update(+id, updateCwyLoggerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cwyLoggerService.remove(+id);
  }
}
