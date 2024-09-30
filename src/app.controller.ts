import { Controller, Get, Inject, Query, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';

@Controller()
// @UseInterceptors(TimeInterceptor) // 作用于Controller中的每一个handler
// @UsePipes(ValidatePipe) // 对整个controller都生效
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
  ccc(@Query('num', ValidatePipe) num: number) {
    return num + 1;
  }
}
