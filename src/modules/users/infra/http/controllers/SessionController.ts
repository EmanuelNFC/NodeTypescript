import { Request, Response} from 'express';
import {container} from 'tsyringe';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionController {
  public async create(req: Request, res: Response){

    const { name, password } = req.body;
    const authenticateUser = container.resolve(AuthenticateUserService);

    const {user, token} = await authenticateUser.execute({name, password});

    // @ts-expect-error Aqui vai ocorrer um erro, mas estou ignorando
    delete user.password;

    return res.json({user, token});
  }
}
