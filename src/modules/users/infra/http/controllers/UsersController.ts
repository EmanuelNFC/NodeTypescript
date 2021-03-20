import {Request, Response} from 'express';
import {container} from 'tsyringe';
import CreateUserService from'@modules/users/services/CreateUserService';

export default class UserController {

  public async create (req: Request, res: Response): Promise< Response >{

    //dados no body da requisição
    const { name, password, tag} = req.body;
    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({name, password, tag});

    return res.json(user);

  }
}
