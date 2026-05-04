import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  @InjectEntityManager()
  private readonly manager: EntityManager;

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  create(createUserDto: CreateUserDto) {
    this.manager.save(User, createUserDto);
  }

  findAll() {
    // return this.manager.find(User);
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.manager.findOne(User, { where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.manager.save(User, {
      id,
      ...updateUserDto,
    });
  }

  remove(id: number) {
    return this.manager.delete(User, id);
  }
}
