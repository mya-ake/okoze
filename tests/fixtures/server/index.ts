const express = require('express');
import * as expressTypes from 'express';
import * as faker from 'faker';

export const app = express();

const createUser = () => ({
  id: faker.random.number(),
  name: faker.name.findName(),
});

const createUsers = () => {
  return [...Array(3)].map(createUser);
};

app.use(
  (
    req: expressTypes.Request,
    res: expressTypes.Response,
    next: expressTypes.NextFunction,
  ) => {
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

app.get('/users', (req: expressTypes.Request, res: expressTypes.Response) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.json({ users: createUsers() });
});

app.all('*', (req: expressTypes.Request, res: expressTypes.Response) => {
  res.status(404);
  res.json({ message: 'not found' });
});
