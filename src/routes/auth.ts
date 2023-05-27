import express, { Router, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { ADUser } from '../lib/aduser';

const auth: Router = express.Router();
export default auth;


// express.urlencoded() for input-forms in html files, converts it to json
// express.json() to accept already prepared json requests, from fetch methods
// both middlewares are only used in POST or PUT requests
auth.post('/login', express.urlencoded(), async (req: Request, res: Response) => {    
    const { username, password } = req.body;
    const user: ADUser = await getUser(username, password);

    if (user.error)
    {
        res.sendStatus(401);
    }
    else
    {        
        const token = jwt.sign(user, process.env.SECRET!, {expiresIn: '2h'});
        res.cookie("token", token);
        res.redirect('/');
    }
});


auth.get('/logout', (req: Request, res: Response) => {
    res.clearCookie("token");
    res.redirect("/login");
});


// Get User from Ldap - Testfunction
const getUser = async (username: string, password: string): Promise<ADUser> => {
    let user: ADUser;
    if (password == "123")
    {
        user = {
            SAMAccountName: username,
            DisplayName: "Ad User's full name"
        }
    }
    else
    {
        user = {
            error: "Wrong Password"
        }
    }    

    return Promise.resolve<ADUser>(user);
}
