import express from 'express';
import router from './router';
import morgan from 'morgan';
import { protect } from './modules/auth';
import { createNewUser, signIn } from './handlers/user';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200);
  res.json({ message: 'hello' });
});

app.use('/api', protect, router);

app.post('/user', createNewUser);
app.post('/sign-in', signIn);

app.use((err, req, res, next) => {
  if (err.type === 'auth') {
    res.sendStatus(401).json({ message: 'unauthorised' });
  } else if (err.type === 'input') {
    res.sendStatus(400).json({ message: 'invalid input' });
  } else {
    res.sendStatus(500).json({ message: 'server error' });
  }
});

export default app;
