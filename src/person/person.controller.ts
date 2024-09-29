import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('api/person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  // 注意，这个 find 的路由要放到 :id 的路由前面，因为 Nest 是从上往下匹配的，如果放在后面，那就匹配到 :id 的路由了。
  @Get('find')
  query(@Query('name') name: string, @Query('age') age: number) {
    return `received: name=${name}, age=${age}`;
  }

  @Get(':id')
  urlParam(@Param('id') id: string) {
    return `received: id=${id}`;
  }

  // 用 Nest 接收的话，使用 @Body 装饰器，Nest 会解析请求体，然后注入到 dto 中。
  // dto 是 data transfer object，就是用于封装传输的数据的对象
  @Post()
  body(@Body() createPersonDto: CreatePersonDto) {
    return `received: ${JSON.stringify(createPersonDto)}`;
  }

  @Post('file')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: 'uploads/',
    }),
  )
  body2(
    @Body() createPersonDto: CreatePersonDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
  //   {
  //   fieldname: 'file1',
  //   originalname: '1 09.41.00 (1).png',
  //   encoding: '7bit',
  //   mimetype: 'image/png',
  //   destination: 'uploads/',
  //   filename: '94da2f277882ad9edcba25bae7088cec', // TODO: 这个字段和 originalname 字段之间的关系?
  //   path: 'uploads/94da2f277882ad9edcba25bae7088cec',
  //   size: 888309
  // }
    console.log('files-->', files);
    return `received: ${JSON.stringify(createPersonDto)}`;
  }

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Get()
  findAll() {
    return this.personService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
