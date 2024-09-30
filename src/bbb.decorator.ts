import { applyDecorators, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { Aaa } from './aaa.decorator';
import { LoginGuard } from './login.guard';

// 将多个装饰器和成一个
export const Bbb = (path, role) => {
  return applyDecorators(
    Get(path),
    Aaa(role),
    UseGuards(LoginGuard),
    SetMetadata('roles', [role]),
  )
};
