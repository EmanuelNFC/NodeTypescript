import { getRepository, Repository } from 'typeorm';

import iUsersRepositories from '@modules/users/repositories/iUsersRepositories'
import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';

import Users from '@modules/users/infra/typeorm/entities/Users';

class UsersRepository implements iUsersRepositories{

  private ormRepository: Repository<Users>
  constructor(){
    this.ormRepository = getRepository(Users);
  }

  public async findByName (name:string): Promise<Users | undefined>{

    const findUser = await this.ormRepository.findOne({
      where: {name}
    });

    return findUser;
  }
  public async findByTag (tag:string): Promise<Users | undefined>{

    const findUser = await this.ormRepository.findOne({
      where: {tag}
    });

    return findUser;
  }

  public async findById (id:string): Promise<Users | undefined>{

    const findUser = await this.ormRepository.findOne(id);

    return findUser;
  }

  public async create(data: CreateUserDTO): Promise<Users>{
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: Users): Promise<Users>{
    return this.ormRepository.save(user);
  }

}

export default UsersRepository;
