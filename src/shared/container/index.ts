import {container} from 'tsyringe';

import iUsersRepositories from '@modules/users/repositories/iUsersRepositories';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<iUsersRepositories>('UsersRepository', UsersRepository)

