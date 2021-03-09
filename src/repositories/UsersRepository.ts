import { EntityRepository, getRepository, Repository } from 'typeorm';
import Users from '../models/Users';

@EntityRepository(Users)
class UsersRepository extends Repository<Users>{

  public async findByTag (tag:string): Promise<Users | null>{

    const findUser = await this.findOne({
      where: {tag}
    });
 
    return findUser || null;
  }

}

export default UsersRepository; 