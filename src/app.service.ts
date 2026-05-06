import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class AppService {

  @Inject('REDIS_CLIENT')
  private readonly redisClient: RedisClientType;

  async getHello(): Promise<string> {
    // return 'Hello World!';
    await this.redisClient.set('name', 'cwy007');
    const name = await this.redisClient.get('name');
    return 'Hello World! ' + name;
  }
}
