import { getCustomRepository, getRepository } from 'typeorm';
import Users from '../models/Users';
import UsersRepository from '../repositories/UsersRepository';

//PASSO 1 -> Cria uma interface de dados do tipo Request
interface Request {
  name: string;
  password: string;
  tag: string;
}

class CreateUserService {

  //O METODO EXECUTE CRIA A INSTÂNCIA DOS DADOS
  public async execute({name, password, tag}:Request): Promise<Users>{

    const usersRepository = getCustomRepository(UsersRepository);

    const findUser = await usersRepository.findByTag(tag);

    if (findUser) {
      throw Error('This user already exist!');
    }
    const user = usersRepository.create({
      name,
      password,
      tag,
    });

    await usersRepository.save(user);

    return user;
  }

  public async findAll (){

    const usersRepository = getRepository(Users);

    const users = usersRepository.find();

    return users;
  }

  public async Update (id: string, name: string, password: string, tag: string): Promise<boolean>{

    const usersRepository = getRepository(Users);

    usersRepository.createQueryBuilder().update()
    .where('id = :id', {
      id: id,
      name: name,
      password: password,
      tag: tag 
    });

    return true;
  }



}

export default CreateUserService ;