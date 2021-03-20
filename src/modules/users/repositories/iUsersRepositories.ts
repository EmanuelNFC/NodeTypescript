import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/Users';

export default interface iUsersRepositories{
  findByTag(tag: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  findByName(name: string): Promise<User | undefined>;
  create( {name, password, tag}: CreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;

}
