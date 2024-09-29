import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Person2Service } from './person2.service';
import { CreatePerson2Dto } from './dto/create-person2.dto';
import { UpdatePerson2Dto } from './dto/update-person2.dto';

@Controller('person2')
export class Person2Controller {
  constructor(private readonly person2Service: Person2Service) {}

  @Post()
  create(@Body() createPerson2Dto: CreatePerson2Dto) {
    return this.person2Service.create(createPerson2Dto);
  }

  @Get()
  findAll() {
    return this.person2Service.findAll();
  }

  // url param 是 url 中的参数，Nest 里通过 `:参数名` 的方式来声明（比如下面的 :id），
  // 然后通过 `@Param(参数名)` 的装饰器取出来注入到 controller
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.person2Service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePerson2Dto: UpdatePerson2Dto) {
    return this.person2Service.update(+id, updatePerson2Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.person2Service.remove(+id);
  }
}
