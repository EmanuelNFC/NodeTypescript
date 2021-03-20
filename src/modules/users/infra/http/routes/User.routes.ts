import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticate';
import UsersController from '../controllers/UsersController'

const UserRoutes = Router();
UserRoutes.use(ensureAuthenticated);

const userController = new UsersController();

UserRoutes.post('/', userController.create);

export default UserRoutes;
