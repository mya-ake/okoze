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

app.get('/users', (req: expressTypes.Request, res: expressTypes.Response) => {
  res.json({ users: createUsers() });
});

app.all('*', (req: expressTypes.Request, res: expressTypes.Response) => {
  res.status(404);
  res.json({ message: 'not found' });
});
