import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors";
import ai from './routes/ai.routes.js';
import template from './routes/template.routes.js';


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
  });
  

app.get('/', (req, res) => {
    res.send('Hello, World!::');
});

app.use('/ai',ai);
app.use('/ai',template);


export default app;