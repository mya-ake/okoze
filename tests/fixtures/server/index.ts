import express = require('express');
import bodyParser = require('body-parser');
import * as faker from 'faker';

export const app = express();

type User = {
  id: number;
  name: string;
  role: string;
};

const createUser = ({
  id = faker.random.number(),
  name = faker.name.findName(),
  role = 'general',
} = {}): User => ({
  id,
  name,
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

app.use(bodyParser.json());

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

app.post('/users', (req: express.Request, res: express.Response) => {
  res.status(201);
  res.json({ user: createUser({ ...req.body }) });
});

app.put('/users/:id', (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  res.status(200);
  res.json({ user: createUser({ ...req.body, id: Number(id) }) });
});

app.patch('/users/:id', (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  res.status(200);
  res.json({ user: createUser({ ...req.body, id: Number(id) }) });
});

app.delete('/users/:id', (req: express.Request, res: express.Response) => {
  res.status(204);
  res.send();
});

app.options('*', (req: express.Request, res: express.Response) => {
  res.status(200);
  res.send();
});

app.all('*', (req: express.Request, res: express.Response) => {
  res.status(404);
  res.json({ message: 'not found' });
});
