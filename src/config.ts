import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv'

dotenv.config({path: '.env'
})


export const prismaclient = new PrismaClient();
export const PORT = process.env.PORT;