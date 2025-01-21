import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bootstrap from './src/app.controller.js';


const app = express();

bootstrap(app,express);

app.listen(process.env.PORT || 3000, ()=>{
    console.log('listening on port 5000');
})