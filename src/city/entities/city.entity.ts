import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  RelationId,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Tree('closure-table')
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: 0,
  })
  status: number;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @Column()
  name: string;

  @TreeChildren()
  children: City[];

  @TreeParent()
  parent: City;

  @RelationId((city: City) => city.parent)
  parentId: number;
}
