import { SetMetadata } from '@nestjs/common';

// 自定义装饰器
export const Aaa = (...args: string[]) => SetMetadata('aaa', args);
