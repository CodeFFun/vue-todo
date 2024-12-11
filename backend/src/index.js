import express from 'express';
import cors from 'cors';

import connectDB from './database/connectDB.js';
import router from './routes/index.js';

const app = express();


connectDB();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(router)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})