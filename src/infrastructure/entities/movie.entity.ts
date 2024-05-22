import { Column, Entity } from 'typeorm';
import { DefaultEntity } from './default.entity';

@Entity({ name: 'movies' })
export class MovieEntity extends DefaultEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  year: number;

  @Column({ type: 'int', default: 1 })
  enable: number;

  @Column()
  category_id: string;
}
