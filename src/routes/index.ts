import { Router, Request, Response } from 'express';
import auth from './auth';
import api from './api';
import cookieJwtAuth from '../middleware/cookieJwtAuth';
import cookieParser from 'cookie-parser';

const router: Router = Router();

// CookieParser attaches json converted cookies to Request Object. It can then get by req.cookies...
router.use(cookieParser());
router.use('/auth', auth);

// Login Route
router.get('/login', (req: Request, res: Response) => {
    res.sendFile('./public/login.html', {root: process.env.ROOT});
});

// API route secured by json token
router.use('/api', cookieJwtAuth, api);

// Home. Greets the logged in user, if that's the case. Otherwise middleware "cookieJwtAuth will redirect to /login"
router.get('/', cookieJwtAuth, (req: Request, res: Response) => {
    res.send("Welcome home, <br>" + JSON.stringify(req.user));
});

export default router;