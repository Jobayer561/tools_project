import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {connectDb} from './config/database.js';
import userRoutes from './routes/userRoutes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users', userRoutes);
const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server listening on port  ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server - DB connection error:', err);
    process.exit(1);
  }
};

startServer();
