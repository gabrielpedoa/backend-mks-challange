import { Column, Entity, ManyToMany } from 'typeorm';
import { DefaultEntity } from './default.entity';
import { MovieEntity } from './movie.entity';

@Entity({ name: 'movie_categories' })
export class CategoryEntity extends DefaultEntity {
  @Column()
  category: string;

  @Column()
  description: string;

  @Column({ type: 'int', default: 1 })
  enable: number;

  @ManyToMany(() => MovieEntity, movie => movie.category_id)
  movies: MovieEntity[];
}
