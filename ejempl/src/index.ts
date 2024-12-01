import express from 'express'
import productRouter from './routes/product.route';

const app = express();

app.use(express.json())
app.use('/product', productRouter)

app.listen(3000, () => {
    console.log('Api listen in 3000')
})