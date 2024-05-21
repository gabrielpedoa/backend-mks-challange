import { Column, Entity, JoinColumn, JoinTable, ManyToMany } from 'typeorm';
import { DefaultEntity } from './default.entity';
import { CategoryEntity } from './category.entity';

@Entity({name:'movies'})
export class MovieEntity extends DefaultEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  year: number;

  @ManyToMany(() => CategoryEntity, (category) => category.movies)
  @JoinColumn({ name: 'category_id' })
  category_id: CategoryEntity[];
}
