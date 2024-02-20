import { Project } from 'src/my-tasks/project/entities/project.entity';
import DefaultEntity from 'src/utils/entity/default.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('users')
export class User extends DefaultEntity {
  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];
}
