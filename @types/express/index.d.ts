import { ADUser } from "../../src/lib/aduser";

declare global {
    namespace Express {
        interface Request {
            user: ADUser;
        }
    }
}