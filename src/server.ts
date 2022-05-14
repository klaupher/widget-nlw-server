import cors from 'cors';
import express from 'express';
import { routes } from './routes';

const app = express();

app.use(cors());
app.use(express.json()); //informa que a informação recebida está em formato JSON
app.use(routes);

app.listen(3333, () =>{
  console.log("HTTP server running!");
})