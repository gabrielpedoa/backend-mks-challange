import { Column, Entity } from 'typeorm';
import { DefaultEntity } from './default.entity';

@Entity({ name: 'users' })
export class UserEntity extends DefaultEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
