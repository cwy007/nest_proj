import { Controller, Get, Inject, Query, SetMetadata, UseFilters, UseGuards, UseInterceptors, UsePipes, Headers, Ip, Session, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';

@Controller()
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
  aaa(): string {
    console.log('aaa-->66');
    return 'aaa';
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
}
