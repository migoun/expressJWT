import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { ADUser } from '../lib/aduser';


export default (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    jwt.verify(
        token,
        process.env.SECRET!,
        (error: jwt.VerifyErrors | null, decoded: string | jwt.JwtPayload | undefined) => {
            if (error) {
                console.log(error.message);
                res.redirect('/auth/logout');
            } else {
                req.user = decoded as ADUser;
                next();
            }
        });
}