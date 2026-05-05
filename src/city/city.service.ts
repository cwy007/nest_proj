import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class CityService {
  @InjectEntityManager()
  private readonly entityManager: EntityManager;

  create(createCityDto: CreateCityDto) {
    return 'This action adds a new city';
  }

  async findAll() {
    // const city = new City();
    // city.name = '华北';
    // await this.entityManager.save(City, city);

    // const childCity = new City();
    // childCity.name = '北京';
    // const parent = await this.entityManager.findOne(City, {
    //   where: {
    //     name: '华北',
    //   },
    // });
    // if (parent) {
    //   childCity.parent = parent;
    // }
    // await this.entityManager.save(City, childCity);

    // const city = new City();
    // city.name = '华南';
    // await this.entityManager.save(City, city);

    // const childCity1 = new City();
    // childCity1.name = '云南';
    // const parent = await this.entityManager.findOne(City, {
    //   where: {
    //     name: '华南',
    //   },
    // });
    // if (parent) {
    //   childCity1.parent = parent;
    // }
    // await this.entityManager.save(City, childCity1);

    // const childCity2 = new City();
    // childCity2.name = '昆明';

    // const parent2 = await this.entityManager.findOne(City, {
    //   where: {
    //     name: '云南',
    //   },
    // });
    // if (parent2) {
    //   childCity2.parent = parent2;
    // }
    // await this.entityManager.save(City, childCity2);

    // return this.entityManager.getTreeRepository(City).findTrees();

    // return this.entityManager.getTreeRepository(City).findRoots();

    const parent = await this.entityManager.findOne(City, {
      where: {
        name: '云南',
      },
    });
    // return this.entityManager.getTreeRepository(City).findDescendantsTree(parent);
    // return this.entityManager.getTreeRepository(City).findAncestorsTree(parent);
    // return this.entityManager.getTreeRepository(City).findAncestors(parent);
    // return this.entityManager.getTreeRepository(City).findDescendants(parent);
    // return this.entityManager.getTreeRepository(City).find();
    // return this.entityManager.getTreeRepository(City).countAncestors(parent);
    return this.entityManager.getTreeRepository(City).countDescendants(parent);
  }

  findOne(id: number) {
    return `This action returns a #${id} city`;
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
