import { hash } from 'bcryptjs'
import { injectable ,inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import Users from '@modules/users/infra/typeorm/entities/Users';
import iUsersRepositories from '@modules/users/repositories/iUsersRepositories'

//Cria uma interface de dados do tipo Request
interface Request {
  name: string;
  password: string;
  tag: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: iUsersRepositories
  ) {}
  //O METODO EXECUTE CRIA A INSTÂNCIA DOS DADOS
  public async execute({name, password, tag}:Request): Promise<Users>{

    const findUser = await this.usersRepository.findByTag(tag);
    if (findUser) {
      throw new AppError('This user already exist!');
    }

    const passHashed = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      password: passHashed,
      tag,
    });
    return user;
  }
}
export default CreateUserService ;
