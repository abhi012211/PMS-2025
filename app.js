import express from 'express';
import morgan from 'morgan';
import rateLimit from './middleware/rateLimit.js';
import error from './middleware/error.js';
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import companyRoute from './routes/company.js';
import projectRoute from './routes/project.js';
import taskRoute from './routes/task.js';
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(rateLimit)
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/company', companyRoute);
app.use('/api/project', projectRoute);
app.use('/api/task', taskRoute);
app.use(error);
export default app;