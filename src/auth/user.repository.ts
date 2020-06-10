import User from './entities/user.entity';
import { Repository, EntityRepository } from 'typeorm';
import { UserCreateDTO } from './dto/signup.dto';
import { hashStringWithSalt, compareStringHashes } from './common/helper';
import { ConflictException } from '@nestjs/common';
import { UserLoginDTO } from './dto/login.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async createUser(userCreateDTO: UserCreateDTO): Promise<void> {
    const { username } = userCreateDTO;

    const { salt, hash: password } = await hashStringWithSalt(
      userCreateDTO.password,
    );

    const user = new User();

    user.username = username;
    user.salt = salt;
    user.password = password;

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      }

      throw error;
    }
  }

  public async login(userLoginDTO: UserLoginDTO): Promise<User | null> {
    const { username, password } = userLoginDTO;

    const user = await this.createQueryBuilder()
      .where({ username })
      .addSelect('User.password')
      .addSelect('User.salt')
      .getOne();

    if (!user) {
      return null;
    }

    const hashMatch = await compareStringHashes(
      password,
      user.salt,
      user.password,
    );

    if (!hashMatch) {
      return null;
    }

    return user;
  }
}
