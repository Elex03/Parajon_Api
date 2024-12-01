import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv'

dotenv.config({path: '.env'
})

export const CURRENT_DIR = __dirname;
export const MIMETYPES = ['image/jpeg', 'image/png']; 
export const prismaclient = new PrismaClient();
export const PORT = process.env.PORT;

