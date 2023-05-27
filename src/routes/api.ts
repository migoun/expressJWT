import { Router, Request, Response } from 'express';

const api: Router = Router();
export default api;

api.get('/', (req: Request, res: Response) => {
    res.send({page: "api", body: "Only authorized people can see this"});
});