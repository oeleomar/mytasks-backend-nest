import DefaultEntity from 'src/utils/entity/default.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class User extends DefaultEntity {
  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;
}
