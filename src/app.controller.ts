import { Controller, Get, Inject, Query, SetMetadata, UseFilters, UseGuards, UseInterceptors, UsePipes, Headers, Ip, Session, Render, VERSION_NEUTRAL, Version, Post, UploadedFile, Body, UploadedFiles, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';
import { Aaa } from './aaa.decorator';
import { Bbb } from './bbb.decorator';
import { Ccc } from './ccc.decorator';
import { MyHeaders, MyQuery } from './my-headers.decorator';
import { AnyFilesInterceptor, FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller({
  path: 'version',
  version: VERSION_NEUTRAL,
})
// @UseInterceptors(TimeInterceptor) // 作用于Controller中的每一个handler
// @UsePipes(ValidatePipe) // 对整个controller都生效
// @UsePipes(TestFilter)
@SetMetadata('roles', ['user'])
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('app_service') private readonly appService2: AppService,
    @Inject('person') private readonly person: { name: string; age: number },
    @Inject('person2') private readonly person2: { name: string; age: number },
    @Inject('person3') private readonly person3: { name: string; desc: number },
    @Inject('person4') private readonly person4: { name: string; desc: number },
    @Inject('fooo') private readonly fooo: { name: string; desc: number },
  ) {}

  @Get()
  getHello(): string {
    // console.log(this);
    // debugger
    console.log('AppController getHello-->');
    return this.appService.getHello();
  }

  @Get('aaa')
  @UseGuards(LoginGuard)
  @SetMetadata('roles', ['admin'])
  @Aaa('admin')
  aaa(): string {
    console.log('aaa-->66');
    return 'aaa';
  }

  @Bbb('aaa2', 'admin') // 将多个装饰器和成一个
  // @UseGuards(LoginGuard)
  // @SetMetadata('roles', ['admin'])
  // @Aaa('admin')
  aaa2(): string {
    console.log('aaa2-->66');
    return 'aaa2';
  }

  @Get('bbb')
  @UseInterceptors(TimeInterceptor) // 在这个handler上启用拦截器
  bbb(): string {
    console.log('bbb-->');
    return 'bbb';
  }

  @Get('ccc')
  @UseFilters(TestFilter)
  ccc(@Query('num', ValidatePipe) num: number) {
    return num + 1;
  }

  @Get('header')
  header(@Headers('Accept') accept: string, @Headers() headers: Record<string, any>) {
    console.log('accept-->', accept);
    console.log('headers-->', headers);
    return headers;
  }

  @Get('ip')
  ip(@Ip() ip: string) {
    console.log('ip-->', ip);
    return ip;
  }

  @Get('session')
  session(@Session() session) {
    console.log('session-->33', session)

    // session-- > 33 Session {
    //   cookie: {
    //     path: '/',
    //     _expires: 2024-09-30T07:52:19.704Z,
    //     originalMaxAge: 100000,
    //     httpOnly: true
    //   }
    // }

    // 在 session 对象里存储信息
    // session 对象的使用场景有哪些？ // TODO
    if (!session.count) {
      session.count = 0;
    }
    session.count = session.count + 1;

    return session;
  }

  @Get('user')
  @Render('user')
  user() {
    return {
      name: 'cwy007',
      age: 32,
    }
  }

  @Get('hello4')
  getHello4(@Ccc() c) {
    return c;
  }

  @Get('hello5')
  getHello5(@Headers('Accept') headers1, @MyHeaders('Accept') headers2) {
    console.log('headers1-->', headers1)
    console.log('headers2-->', headers2)

    return headers1 + headers2;
  }

  @Get('hello6')
  getHello6(@Query('aaa') aaa, @MyQuery('bbb') bbb) {
    console.log('aaa-->', aaa)
    console.log('bbb-->', bbb)

    return aaa + bbb;
  }

  @Get('version')
  version() {
    return 'version';
  }

  @Version('2')
  @Get('version')
  version2() {
    return 'version';
  }

  @Post('aaa')
  @UseInterceptors(FileInterceptor('aaa', {
    dest: 'uploads',
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
    console.log('body-->', body)
    console.log('file-->', file)
  }

  // https://juejin.cn/book/7226988578700525605/section/7237073746689785893
  @Post('aaa2')
  @UseInterceptors(FilesInterceptor('aaa', 3, {
    dest: 'uploads',
  }))
  uploadFiles(@UploadedFiles() file: Express.Multer.File, @Body() body) {
    console.log('body-->', body)
    console.log('file-->', file)
  }

  @Post('ccc')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'aaa', maxCount: 2 },
    { name: 'bbb', maxCount: 3 },
  ], {
    dest: 'uploads'
  }))
  uploadFileFields(@UploadedFiles() files: { aaa?: Express.Multer.File[], bbb?: Express.Multer.File[] }, @Body() body) {
    console.log('body', body);
    console.log('files', files);
  }

  @Post('ddd')
  @UseInterceptors(AnyFilesInterceptor({
    dest: 'uploads'
  }))
  uploadAnyFiles(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body) {
    console.log('body', body);
    console.log('files', files);
  }

  @Post('fff')
  @UseInterceptors(FileInterceptor('aaa', {
    dest: 'uploads'
  }))
  uploadFile3(@UploadedFile(new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 1000 }),
      new FileTypeValidator({ fileType: 'image/jpeg' }),
    ],
  })) file: Express.Multer.File, @Body() body) {
    console.log('body', body);
    console.log('file', file);
  }


}
