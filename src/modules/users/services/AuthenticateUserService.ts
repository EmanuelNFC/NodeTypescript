import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '@shared/errors/AppErrors';
import Users from '@modules/users/infra/typeorm/entities/Users';
import authConfig from '@config/auth';
import iUsersRepository from '@modules/users/repositories/iUsersRepositories'

    interface Request {
        name: string;
        password    : string;
    }

    interface Response {
        user: Users
        token: string
    }



class   AthenticateUserService {
    constructor(
      private usersRepository: iUsersRepository
    ) {}

    public async execute({name, password}: Request): Promise<Response>{

        const user = await this.usersRepository.findByName(name);

        if(!user){
            throw new AppError ('Name or Password is incorrect!', 401);
        }

        const passwordCompare = await compare(password, user.password);

        if (!passwordCompare){
            throw new AppError ('Name or Password is incorrect!', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn: expiresIn
        });

        return {user, token};

    }
}

export default AthenticateUserService;
