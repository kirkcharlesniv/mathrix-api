import {
  Entity,
  Unique,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity({ name: 'users' })
@Unique(['username'])
class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ select: false })
  salt: string;
}

export default User;
