import { Router } from 'express';
import userRouter from  '@modules/users/infra/http/routes/User.routes';
import sessionRouter from '@modules/users/infra/http/routes/Session.routes';

const router = Router();


router.use('/api', userRouter);
router.use('/session', sessionRouter);

export default router;
