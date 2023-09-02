import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import path from 'path'; // Import the path module
const port = process.env.PORT || 5000; 
import userRoutes from './routes/userRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import cors from 'cors'

connectDB(); //db connected from db.js

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin:"*"
}))
app.use(cookieParser()); // <-- Add parentheses here

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRouter)


//Here is.....connect frontend and backend session 
if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    );
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }




app.get('/', (req, res) => res.send(`Server is ready`));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`server started on ${port}`));
