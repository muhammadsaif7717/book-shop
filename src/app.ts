import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { productRoutes } from './app/modules/product/product.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use('/api/products', productRoutes);
// app.use('/api/orders', order);

//middlewares

app.get('/', (req: Request, res: Response) => {
  res.send('Book shop server is running...');
});

export default app;
