import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';

@Controller()
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
  bbb(): string {
    console.log('bbb-->');
    return 'bbb';
  }
}
