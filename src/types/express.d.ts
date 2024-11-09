// src/types/express.d.ts

import { User } from '../models'; // Replace with the correct path to your User model or type

declare global {
    namespace Express {
        interface Request {
            user?: User; // Assuming `User` is your user type
        }
    }
}