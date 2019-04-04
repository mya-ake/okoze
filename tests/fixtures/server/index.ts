import express = require('express');
import * as faker from 'faker';

export const app = express();

type User = {
  id: number;
  name: string;
  role: string;
};

const createUser = ({ role = 'general' } = {}): User => ({
  id: faker.random.number(),
  name: faker.name.findName(),
  role,
});

const createUsers = (): User[] => {
  return [...Array(2)].map(createUser).concat(createUser({ role: 'admin' }));
};

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.set({
      'Access-Control-Allow-Headers': Object.keys(req.headers),
      'Access-Control-Allow-Methods': [
        'GET',
        'POST',
        'PUT',
        'DELETE',
        'HAED',
        'PATCH',
      ],
      'Access-Control-Allow-Origin': '*',
    });
    next();
  },
);

app.get('/users', (req: express.Request, res: express.Response) => {
  const query = req.query;
  const filters = ((query.filter as string) || '')
    .split(',')
    .filter(item => item.includes(':'))
    .map(item => item.split(':'));

  const filterFunc = (user: User) => {
    if (filters.length === 0) {
      return true;
    }
    return filters.some(([key, value]) => {
      switch (key) {
        case 'role':
          return user.role === value;
        default:
          return false;
      }
    });
  };
  const users = createUsers().filter(filterFunc);

  res.set('Access-Control-Allow-Origin', '*');
  res.json({ users });
});

app.all('*', (req: express.Request, res: express.Response) => {
  res.status(404);
  res.json({ message: 'not found' });
});
