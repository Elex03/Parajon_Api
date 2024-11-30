import express from 'express'
import appRouter from './routes';
import morgan from 'morgan'
import cors from 'cors'
import { PORT } from './config';



const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.use('/apiParajon', appRouter);


app.listen(PORT, () => {
    console.log('Api listen in 3000 port');
})