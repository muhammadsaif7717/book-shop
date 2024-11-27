import express, { Request, Response }  from 'express'
import cors from 'cors';

const app = express()


//parsers
app.use(express.json());
app.use(cors());

//middlewares


app.get('/', (req:Request, res:Response) => {
  res.send('Book shop server is running...')
})

export default app;