import {Request, Response, NextFunction} from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppErrors';

interface TokenPayload{
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        throw new AppError ('JWT token is empty', 401);
    }

    const [, token] = authHeader.split(' ');

    try{

        const decodeTokenAuth = verify(token, authConfig.jwt.secret);

        const { sub } = decodeTokenAuth as TokenPayload;

        req.user = {
            id: sub
        }
        return next();
    }
    catch{
        throw new AppError ('Invalid JWT token', 401);
    }


}
